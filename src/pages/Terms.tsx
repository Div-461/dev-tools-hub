import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const Terms = () => (
  <>
    <Helmet>
      <title>Terms and Conditions – DevToolKitHub</title>
      <meta name="description" content="Terms and Conditions for using DevToolKitHub's free online developer tools. Read about usage rights, limitations, and disclaimers." />
      <link rel="canonical" href="https://code-helper-suite.lovable.app/terms" />
    </Helmet>

    <div className="container max-w-3xl py-12 md:py-16">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl mb-2">Terms and Conditions</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: March 12, 2026</p>

      <div className="prose prose-sm max-w-none space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground">1. Acceptance of Terms</h2>
          <p>
            By accessing and using DevToolKitHub ("the Website"), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you should not use the Website. These terms apply to all visitors, users, and others who access or use our services.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">2. Description of Service</h2>
          <p>
            DevToolKitHub provides free, browser-based developer tools including but not limited to JSON Viewer, JSON to CSV converter, CSV to JSON converter, XML Formatter, Base64 Encoder/Decoder, Timestamp Converter, JWT Decoder, SQL Formatter, and Text Compare. All tools process data entirely on the client side within your browser.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">3. Use of Tools</h2>
          <p>You may use our tools for personal and commercial purposes. You agree not to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Use the Website for any unlawful purpose or in violation of applicable laws.</li>
            <li>Attempt to interfere with the proper functioning of the Website.</li>
            <li>Scrape, crawl, or use automated means to access the Website without permission.</li>
            <li>Reproduce, duplicate, or resell the Website or its tools without authorization.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">4. Intellectual Property</h2>
          <p>
            The Website's design, code, content, logos, and graphics are the intellectual property of DevToolKitHub. You may not copy, modify, distribute, or create derivative works from our content without prior written consent, except where permitted by open-source licenses.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">5. Disclaimer of Warranties</h2>
          <p>
            The tools and services are provided "as is" and "as available" without warranties of any kind, either express or implied. We do not guarantee that the tools will be error-free, uninterrupted, or produce specific results. You use the tools at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">6. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, DevToolKitHub shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of data, revenue, or profits, arising from your use of the Website or tools, even if we have been advised of the possibility of such damages.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">7. Third-Party Content &amp; Advertising</h2>
          <p>
            The Website may display advertisements provided by third-party ad networks, including Google AdSense. We are not responsible for the content, accuracy, or practices of third-party advertisers. Your interactions with third-party ads are governed by the respective advertiser's terms and privacy policies.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">8. Modifications to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on this page. Your continued use of the Website after changes constitutes acceptance of the revised Terms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">9. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">10. Contact</h2>
          <p>
            For questions about these Terms, please visit our{" "}
            <Link to="/contact" className="text-primary hover:underline">Contact page</Link>.
          </p>
        </section>
      </div>
    </div>
  </>
);

export default Terms;
