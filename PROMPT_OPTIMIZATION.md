# 🎯 Gemini Vision Prompt Optimization

## Token Management Strategy

### Problem
Large prompts can cause:
- MAX_TOKENS errors
- Slow API responses
- Higher costs
- Rate limiting

### Solution: Minimal Prompts

## What We Send (SAFE ✅)

### Model Identification
```javascript
{
  prompt: "Identify this 3D model. Parts visible: Engine, Wing, Fuselage...",
  images: [base64Image],
  tokens: ~150-200 (prompt) + image tokens
}
```

### Part Analysis
```javascript
{
  prompt: "Analyze this Falcon 9 part: Engine_Main",
  tokens: ~50-80 per part
}
```

## What We DON'T Send (AVOIDED ❌)

We explicitly avoid sending:
- ❌ `node.toJSON()` - Can be 20,000+ tokens
- ❌ `geometry.attributes` - Vertex data (huge)
- ❌ `geometry.index` - Face indices (huge)
- ❌ Full material definitions
- ❌ UV maps, normals, tangents
- ❌ Transform matrices
- ❌ Child node hierarchies
- ❌ Skeleton/animation data

## Data Structure (Minimal)

```javascript
// What we store per part (NOT sent to API)
{
  id: 0,
  name: "Engine_Main",
  mesh: meshReference,  // Reference only, never serialized
  size: 12.5,
  volume: 156.3,
  isMajor: true
}

// What we send to API (ONLY the name)
prompt = `Analyze this Falcon 9 part: Engine_Main`
```

## Token Estimation

We log token estimates for debugging:
```javascript
console.log(`📝 Prompt tokens: ~${Math.ceil(prompt.length / 4)}`);
```

**Rule of thumb:** 1 token ≈ 4 characters

## Prompt Optimization Techniques

### 1. Concise Instructions
```javascript
// BEFORE (verbose)
"You are an expert engineer. Please analyze this 3D model image carefully..."

// AFTER (concise)
"Identify this 3D model. Parts visible: ..."
```

### 2. Limit Context
```javascript
// Limit part names to 10 (not all)
const partNames = majorParts.slice(0, 10).map(p => p.name).join(', ');
```

### 3. Short Field Requirements
```javascript
// Force short responses
"Keep ALL fields under 40 characters"
```

### 4. Remove Redundancy
```javascript
// BEFORE
"CRITICAL RULES:
1. Output ONLY valid JSON - no text before or after
2. NO markdown code blocks (no ```)
3. NO explanations or commentary
..."

// AFTER
"RULES:
- ONLY valid JSON output
- NO markdown blocks"
```

## Token Budget

| Request Type | Prompt Tokens | Max Output | Total |
|--------------|---------------|------------|-------|
| Model ID | ~150-200 | 300 | ~500 |
| Part Analysis | ~50-80 | 400 | ~480 |
| Image (1024x1024) | ~258 | - | ~258 |

**Total per model ID:** ~758 tokens
**Total per part:** ~738 tokens

## Benefits

✅ **Faster responses** - Less data to process
✅ **Lower costs** - Fewer tokens used
✅ **Higher success rate** - Less chance of MAX_TOKENS
✅ **Better rate limits** - More requests per minute
✅ **Cleaner logs** - Easier to debug

## Monitoring

Watch for these logs:
```
📝 Prompt tokens: ~45 (180 chars)
📝 Model ID prompt tokens: ~52 (208 chars)
```

If you see prompts over 300 tokens, investigate and optimize.

## Best Practices

1. ✅ Send only essential data (names, not geometry)
2. ✅ Use concise language
3. ✅ Limit context (10 parts max)
4. ✅ Force short responses (40 char fields)
5. ✅ Log token estimates
6. ✅ Monitor and optimize

---

**Status:** ✅ Optimized for minimal token usage
**Date:** November 21, 2025
