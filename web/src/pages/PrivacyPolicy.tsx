import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default function PrivacyPolicy() {
  return (
    <div>
      <Navigation />
      <Card className="shadow-md border border-border bg-background text-foreground">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">
            Privacy Policy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-6 leading-relaxed text-sm md:text-base">
              <p>
                At <strong>WasteLess</strong>, your privacy matters to us. This
                Privacy Policy explains how we collect, use, and protect your
                personal information when you use our app.
              </p>

              <h2 className="font-semibold text-lg text-primary">
                1. Information We Collect
              </h2>
              <ul className="list-disc pl-6">
                <li>
                  <strong>Account Info:</strong> We collect your name, email,
                  and authentication data via Supabase.
                </li>
                <li>
                  <strong>Location Data:</strong> Used to show nearby items
                  while using the app.
                </li>
                <li>
                  <strong>Item Listings:</strong> Includes item title,
                  description, category, image, and approximate location.
                </li>
              </ul>

              <h2 className="font-semibold text-lg text-primary">
                2. How We Use Your Information
              </h2>
              <ul className="list-disc pl-6">
                <li>To match givers and receivers based on location.</li>
                <li>To display relevant items in your area.</li>
                <li>To help ensure user trust and accountability.</li>
              </ul>

              <h2 className="font-semibold text-lg text-primary">
                3. Sharing Your Data
              </h2>
              <p>
                We do <strong>not</strong> sell your data. Your public listings
                may include your first name and general location to help others
                reach out responsibly.
              </p>

              <h2 className="font-semibold text-lg text-primary">
                4. Data Security
              </h2>
              <p>
                Your data is stored securely using trusted platforms like
                Supabase and Cloudinary with access control and encryption.
              </p>

              <h2 className="font-semibold text-lg text-primary">
                5. Your Choices
              </h2>
              <ul className="list-disc pl-6">
                <li>You may delete your listings or account at any time.</li>
                <li>
                  You can disable location sharing via device permissions.
                </li>
              </ul>

              <h2 className="font-semibold text-lg text-primary">
                6. Children’s Privacy
              </h2>
              <p>
                WasteLess is not intended for children under 13. We do not
                knowingly collect data from children.
              </p>

              <h2 className="font-semibold text-lg text-primary">
                7. Policy Updates
              </h2>
              <p>
                We may update this policy periodically. You will be notified of
                material changes through the app.
              </p>

              <h2 className="font-semibold text-lg text-primary">
                8. Contact Us
              </h2>
              <p>
                Questions or concerns? Email us at{" "}
                <a
                  href="mailto:support@wasteless.app"
                  className="underline text-muted-foreground"
                >
                  support@wasteless.app
                </a>
                .
              </p>

              <p className="mt-6 italic text-muted-foreground">
                Last updated: June 2025
              </p>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      <Footer />
    </div>
  );
}
