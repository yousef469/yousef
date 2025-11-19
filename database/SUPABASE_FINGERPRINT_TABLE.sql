-- Create device_fingerprints table for fraud prevention
CREATE TABLE IF NOT EXISTS device_fingerprints (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  fingerprint TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ip_address TEXT,
  is_vpn BOOLEAN DEFAULT FALSE,
  vpn_confidence DECIMAL(3,2),
  risk_score DECIMAL(3,2),
  confidence DECIMAL(3,2),
  method TEXT,
  suspicious_flags TEXT[],
  user_agent TEXT,
  country TEXT,
  first_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  usage_count INTEGER DEFAULT 1,
  is_blocked BOOLEAN DEFAULT FALSE,
  block_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_fingerprints_fingerprint ON device_fingerprints(fingerprint);
CREATE INDEX IF NOT EXISTS idx_fingerprints_user_id ON device_fingerprints(user_id);
CREATE INDEX IF NOT EXISTS idx_fingerprints_ip ON device_fingerprints(ip_address);
CREATE INDEX IF NOT EXISTS idx_fingerprints_blocked ON device_fingerprints(is_blocked);

-- Create account_links table to detect multi-accounting
CREATE TABLE IF NOT EXISTS account_links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  fingerprint TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  link_type TEXT NOT NULL CHECK (link_type IN ('device', 'ip', 'payment', 'behavior')),
  confidence DECIMAL(3,2),
  detected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(fingerprint, user_id, link_type)
);

-- Create index
CREATE INDEX IF NOT EXISTS idx_account_links_fingerprint ON account_links(fingerprint);
CREATE INDEX IF NOT EXISTS idx_account_links_user ON account_links(user_id);

-- Enable Row Level Security
ALTER TABLE device_fingerprints ENABLE ROW LEVEL SECURITY;
ALTER TABLE account_links ENABLE ROW LEVEL SECURITY;

-- Policies for device_fingerprints
CREATE POLICY "Service role can manage fingerprints"
  ON device_fingerprints FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Users can view their own fingerprints"
  ON device_fingerprints FOR SELECT
  USING (auth.uid() = user_id);

-- Policies for account_links
CREATE POLICY "Service role can manage links"
  ON account_links FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Users can view their own links"
  ON account_links FOR SELECT
  USING (auth.uid() = user_id);

-- Function to update last_seen and usage_count
CREATE OR REPLACE FUNCTION update_fingerprint_usage()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_seen = NOW();
  NEW.usage_count = OLD.usage_count + 1;
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to detect multi-accounting
CREATE OR REPLACE FUNCTION detect_multi_accounting(
  p_fingerprint TEXT,
  p_user_id UUID
) RETURNS TABLE (
  linked_user_id UUID,
  link_count INTEGER,
  risk_level TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    al.user_id,
    COUNT(*)::INTEGER as link_count,
    CASE 
      WHEN COUNT(*) >= 3 THEN 'HIGH'
      WHEN COUNT(*) >= 2 THEN 'MEDIUM'
      ELSE 'LOW'
    END as risk_level
  FROM account_links al
  WHERE al.fingerprint = p_fingerprint
    AND al.user_id != p_user_id
  GROUP BY al.user_id
  HAVING COUNT(*) >= 1;
END;
$$ LANGUAGE plpgsql;

-- Function to check if device should be blocked
CREATE OR REPLACE FUNCTION should_block_device(
  p_fingerprint TEXT
) RETURNS BOOLEAN AS $$
DECLARE
  v_usage_count INTEGER;
  v_user_count INTEGER;
  v_risk_score DECIMAL;
BEGIN
  -- Get device stats
  SELECT 
    usage_count,
    risk_score
  INTO v_usage_count, v_risk_score
  FROM device_fingerprints
  WHERE fingerprint = p_fingerprint;
  
  -- Count unique users
  SELECT COUNT(DISTINCT user_id)
  INTO v_user_count
  FROM account_links
  WHERE fingerprint = p_fingerprint;
  
  -- Block if:
  -- 1. More than 5 different users from same device
  -- 2. Risk score > 0.7
  -- 3. Usage count > 100 in short time
  IF v_user_count > 5 OR v_risk_score > 0.7 OR v_usage_count > 100 THEN
    RETURN TRUE;
  END IF;
  
  RETURN FALSE;
END;
$$ LANGUAGE plpgsql;

-- Grant permissions
GRANT ALL ON device_fingerprints TO authenticated;
GRANT ALL ON device_fingerprints TO service_role;
GRANT ALL ON account_links TO authenticated;
GRANT ALL ON account_links TO service_role;
