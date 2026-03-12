import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => (
  <>
    <Helmet>
      <title>Privacy Policy – DevToolKitHub</title>
      <meta name="description" content="Privacy Policy for DevToolKitHub. Learn how we handle your data, cookies, Google AdSense advertising, and third-party tracking on our developer tools website." />
      <link rel="canonical" href="https://code-helper-suite.lovable.app/privacy-policy" />
    </Helmet>

    <div className="container max-w-3xl py-12 md:py-16">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl mb-2">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: March 12, 2026</p>

      <div className="prose prose-sm max-w-none space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground">1. Introduction</h2>
          <p>
            Welcome to DevToolKitHub ("we," "our," or "us"). We are committed to protecting your privacy and ensuring transparency about how your data is handled. This Privacy Policy explains what information we collect, how we use it, and your rights regarding your data when you use our website and developer tools.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">2. Information We Collect</h2>
          <p>
            <strong className="text-foreground">Client-Side Processing:</strong> All of our developer tools — including JSON Viewer, Base64 Encoder, SQL Formatter, Text Compare, and others — process data entirely in your browser. No input data is ever sent to our servers. Your code, JSON, CSV, SQL, or any other content you paste into our tools stays on your device.
          </p>
          <p>
            <strong className="text-foreground">Automatically Collected Information:</strong> We may collect non-personally identifiable information through analytics services, including page views, browser type, device type, referring URLs, and general geographic location. This helps us understand usage patterns and improve the site.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">3. Cookies &amp; Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to enhance your experience. Cookies are small text files stored on your device. We use the following types:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong className="text-foreground">Essential Cookies:</strong> Required for basic site functionality, such as storing your theme preference (dark/light mode).</li>
            <li><strong className="text-foreground">Analytics Cookies:</strong> Used by services like Vercel Analytics to collect anonymized usage data.</li>
            <li><strong className="text-foreground">Advertising Cookies:</strong> Third-party cookies placed by Google AdSense and its partners to serve personalized advertisements based on your browsing history across websites.</li>
          </ul>
          <p>
            You can manage cookie preferences through your browser settings. Disabling cookies may affect certain site features.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">4. Google AdSense &amp; Third-Party Advertising</h2>
          <p>
            We use Google AdSense to display advertisements on our website. Google AdSense uses cookies, including the DoubleClick cookie, to serve ads based on your prior visits to this site and other websites. Google's use of advertising cookies enables it and its partners to serve ads based on your browsing patterns.
          </p>
          <p>
            You may opt out of personalized advertising by visiting{" "}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Google Ads Settings
            </a>. For more information about how Google uses data, visit{" "}
            <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Google's Partner Sites Policy
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">5. Third-Party Services</h2>
          <p>We may use third-party services that collect information, including:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong className="text-foreground">Vercel Analytics:</strong> For anonymous performance and usage monitoring.</li>
            <li><strong className="text-foreground">Google AdSense:</strong> For displaying relevant advertisements.</li>
            <li><strong className="text-foreground">Google Fonts:</strong> For loading web fonts. Google may log your IP address when fonts are fetched.</li>
          </ul>
          <p>Each third-party service operates under its own privacy policy, which we encourage you to review.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">6. Data Security</h2>
          <p>
            Since our tools process all data client-side, your sensitive information never reaches our servers. We implement standard security measures for the website itself, including HTTPS encryption for all connections. However, no method of internet transmission is 100% secure.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">7. Children's Privacy</h2>
          <p>
            Our services are not directed to individuals under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us so we can take appropriate action.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">8. Your Rights</h2>
          <p>
            Depending on your jurisdiction, you may have rights regarding your personal data, including the right to access, correct, delete, or port your data, and the right to opt out of certain processing activities. To exercise these rights, please contact us using the information below.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. We encourage you to review this page periodically.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">10. Contact Us</h2>
          <p>
            If you have questions or concerns about this Privacy Policy, please visit our{" "}
            <Link to="/contact" className="text-primary hover:underline">Contact page</Link>.
          </p>
        </section>
      </div>
    </div>
  </>
);

export default PrivacyPolicy;
