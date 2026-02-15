import React from 'react';

// AUTH DISABLED FOR BETA - Just pass through all routes
// To re-enable auth, uncomment the code below and remove the simple return
export default function ProtectedRoute({ children }) {
  // AUTH DISABLED - Allow everyone access
  return children;
  
  /* ORIGINAL AUTH CODE - Uncomment to re-enable
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
  */
}
