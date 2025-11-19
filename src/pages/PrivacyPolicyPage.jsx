import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-2xl">
          <Link to="/" className="text-purple-300 hover:text-purple-100 mb-4 inline-block">
            ← Back to Home
          </Link>
          
          <h1 className="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-gray-300 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-invert max-w-none text-gray-200">
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
              <p>
                [YOUR COMPANY NAME] ("we," "our," or "us") operates [YOUR WEBSITE] (the "Service"). 
                This page informs you of our policies regarding the collection, use, and disclosure of 
                personal data when you use our Service.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-purple-300 mb-3">Information You Provide</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Account Information:</strong> Email address, username, and password</li>
                <li><strong>Profile Information:</strong> Optional information you choose to provide</li>
                <li><strong>Learning Progress:</strong> Course progress, quiz results, and achievements</li>
                <li><strong>User Content:</strong> Any content you create or upload</li>
              </ul>

              <h3 className="text-xl font-semibold text-purple-300 mb-3">Automatically Collected Information</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Usage Data:</strong> Pages visited, time spent, features used</li>
                <li><strong>Device Information:</strong> Browser type, operating system, IP address</li>
                <li><strong>Cookies:</strong> Session management and user experience improvement</li>
              </ul>
            </section>

            {/* How We Use Your Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
              <p className="mb-3">We use the collected data for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Providing and maintaining our Service</li>
                <li>Tracking your learning progress and achievements</li>
                <li>Improving and personalizing your experience</li>
                <li>Communicating with you about updates and features</li>
                <li>Analyzing usage patterns to improve the platform</li>
                <li>Ensuring security and preventing fraud</li>
              </ul>
            </section>

            {/* Third-Party Services */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Third-Party Services</h2>
              <p className="mb-3">We use the following third-party services:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Supabase:</strong> Database and authentication (Privacy Policy: https://supabase.com/privacy)</li>
                <li><strong>Mixpanel:</strong> Analytics (Privacy Policy: https://mixpanel.com/legal/privacy-policy/)</li>
                <li><strong>Google Gemini AI:</strong> AI-powered tutoring features (Privacy Policy: https://policies.google.com/privacy)</li>
                <li><strong>Stripe:</strong> Payment processing (Privacy Policy: https://stripe.com/privacy)</li>
                <li><strong>WebRTC:</strong> Peer-to-peer real-time collaboration (data transmitted directly between users)</li>
              </ul>
              <p className="mt-4 text-sm text-gray-400">
                Note: When you make a payment, your payment information is processed directly by Stripe and is not stored on our servers.
              </p>
            </section>

            {/* Data Security */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Data Storage and Security</h2>
              <p>
                Your data is stored securely using industry-standard encryption. We implement 
                appropriate technical and organizational measures to protect your data. However, 
                no method of transmission over the Internet is 100% secure.
              </p>
            </section>

            {/* Your Rights */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
              <p className="mb-3">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Export your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent at any time</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, contact us at <a href="mailto:[YOUR EMAIL]" className="text-purple-300 hover:text-purple-100">[YOUR EMAIL]</a>
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Children's Privacy</h2>
              <p>
                Our Service is not intended for children under 13. We do not knowingly collect 
                personal information from children under 13. If you are a parent or guardian and 
                believe your child has provided us with personal data, please contact us.
              </p>
            </section>

            {/* Contact */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p>If you have questions about this Privacy Policy, contact us:</p>
              <ul className="list-none mt-4 space-y-2">
                <li><strong>Email:</strong> <a href="mailto:[YOUR EMAIL]" className="text-purple-300 hover:text-purple-100">[YOUR EMAIL]</a></li>
                <li><strong>Website:</strong> <a href="[YOUR WEBSITE]" className="text-purple-300 hover:text-purple-100">[YOUR WEBSITE]</a></li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
