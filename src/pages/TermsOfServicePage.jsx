import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfServicePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-2xl">
          <Link to="/" className="text-purple-300 hover:text-purple-100 mb-4 inline-block">
            ← Back to Home
          </Link>
          
          <h1 className="text-4xl font-bold text-white mb-2">Terms of Service</h1>
          <p className="text-gray-300 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-invert max-w-none text-gray-200">
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing or using Engineerium ("the Service"), you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use the Service.
              </p>
            </section>

            {/* Account Terms */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">2. Account Terms</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>You must be 13 years or older to use this Service</li>
                <li>You must provide accurate and complete information when creating an account</li>
                <li>You are responsible for maintaining the security of your account and password</li>
                <li>You are responsible for all activities that occur under your account</li>
                <li>You must not use the Service for any illegal or unauthorized purpose</li>
                <li>One person or legal entity may not maintain more than one free account</li>
              </ul>
            </section>

            {/* Acceptable Use */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">3. Acceptable Use</h2>
              <p className="mb-3">You agree NOT to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the Service to violate any laws or regulations</li>
                <li>Upload or share malicious code, viruses, or harmful content</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Impersonate any person or entity</li>
                <li>Attempt to gain unauthorized access to the Service or other users' accounts</li>
                <li>Scrape, copy, or download content using automated means without permission</li>
                <li>Interfere with or disrupt the Service or servers</li>
                <li>Use the Service to spam or send unsolicited messages</li>
              </ul>
            </section>

            {/* User Content */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">4. User Content</h2>
              <p className="mb-3">
                You retain ownership of any content you create or upload to the Service. However, by uploading content, you grant us:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>A worldwide, non-exclusive license to use, display, and distribute your content on the Service</li>
                <li>The right to use your content for promotional purposes (with attribution)</li>
                <li>The right to remove content that violates these terms</li>
              </ul>
              <p className="mt-4">
                You are responsible for the content you upload and must ensure you have the right to share it.
              </p>
            </section>

            {/* Intellectual Property */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">5. Intellectual Property</h2>
              <p className="mb-3">
                The Service and its original content (excluding user content), features, and functionality are owned by 
                Engineerium and are protected by international copyright, trademark, and other intellectual property laws.
              </p>
              <p>
                You may not copy, modify, distribute, sell, or lease any part of our Service without explicit permission.
              </p>
            </section>

            {/* Educational Content */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">6. Educational Content</h2>
              <p>
                The educational content provided on this platform is for informational and educational purposes only. 
                While we strive for accuracy, we make no guarantees about the completeness, reliability, or accuracy of the content. 
                Always verify critical information from authoritative sources.
              </p>
            </section>

            {/* Payments and Subscriptions */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">6.5. Payments and Subscriptions</h2>
              <p className="mb-3">
                If you purchase a paid subscription or service:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Payments are processed securely through Stripe</li>
                <li>All fees are in USD unless otherwise stated</li>
                <li>Subscriptions automatically renew unless cancelled</li>
                <li>You can cancel your subscription at any time from your account settings</li>
                <li>Refunds are handled on a case-by-case basis</li>
                <li>We reserve the right to change pricing with 30 days notice</li>
              </ul>
            </section>

            {/* AI Features */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">7. AI-Powered Features</h2>
              <p className="mb-3">
                Our Service includes AI-powered tutoring and assistance features. Please note:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>AI responses may not always be accurate or complete</li>
                <li>AI should be used as a learning aid, not as a sole source of information</li>
                <li>We are not responsible for decisions made based on AI-generated content</li>
                <li>Conversations with AI may be used to improve the Service</li>
              </ul>
            </section>

            {/* Termination */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">8. Termination</h2>
              <p className="mb-3">
                We reserve the right to suspend or terminate your account at any time for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Violation of these Terms of Service</li>
                <li>Fraudulent, abusive, or illegal activity</li>
                <li>Extended periods of inactivity</li>
              </ul>
              <p className="mt-4">
                You may terminate your account at any time by contacting us at youseflovemessi@gmail.com
              </p>
            </section>

            {/* Disclaimer of Warranties */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">9. Disclaimer of Warranties</h2>
              <p className="mb-3">
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Warranties of merchantability or fitness for a particular purpose</li>
                <li>Warranties that the Service will be uninterrupted, secure, or error-free</li>
                <li>Warranties regarding the accuracy or reliability of content</li>
              </ul>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">10. Limitation of Liability</h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, ENGINEERIUM SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, 
                SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY 
                OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES RESULTING FROM:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Your use or inability to use the Service</li>
                <li>Any unauthorized access to or use of our servers and/or any personal information stored therein</li>
                <li>Any bugs, viruses, or other harmful code transmitted through the Service</li>
                <li>Any errors or omissions in content or for any loss or damage incurred as a result of your use of any content</li>
              </ul>
            </section>

            {/* Changes to Service */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">11. Changes to Service</h2>
              <p>
                We reserve the right to modify or discontinue, temporarily or permanently, the Service (or any part thereof) 
                with or without notice. We shall not be liable to you or any third party for any modification, suspension, 
                or discontinuance of the Service.
              </p>
            </section>

            {/* Changes to Terms */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">12. Changes to Terms</h2>
              <p>
                We reserve the right to update these Terms of Service at any time. We will notify users of any material 
                changes by posting the new Terms of Service on this page and updating the "Last Updated" date. Your continued 
                use of the Service after such changes constitutes acceptance of the new terms.
              </p>
            </section>

            {/* Governing Law */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">13. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of Egypt, 
                without regard to its conflict of law provisions.
              </p>
            </section>

            {/* Contact */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">14. Contact Information</h2>
              <p>If you have questions about these Terms of Service, contact us:</p>
              <ul className="list-none mt-4 space-y-2">
                <li><strong>Email:</strong> <a href="mailto:youseflovemessi@gmail.com" className="text-purple-300 hover:text-purple-100">youseflovemessi@gmail.com</a></li>
                <li><strong>Website:</strong> <a href="[YOUR WEBSITE]" className="text-purple-300 hover:text-purple-100">[YOUR WEBSITE]</a></li>
              </ul>
            </section>

            {/* Severability */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">15. Severability</h2>
              <p>
                If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or 
                eliminated to the minimum extent necessary so that these Terms will otherwise remain in full force and effect.
              </p>
            </section>

            {/* Entire Agreement */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">16. Entire Agreement</h2>
              <p>
                These Terms of Service, together with our Privacy Policy, constitute the entire agreement between you and 
                Engineerium regarding the use of the Service.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
