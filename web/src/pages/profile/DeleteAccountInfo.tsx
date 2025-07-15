import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function DeleteAccountInfo() {
  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">
        Account Deletion Instructions
      </h1>

      <Card>
        <CardContent className="space-y-4 p-6">
          <h2 className="text-xl font-semibold">
            📱 App: <span className="text-primary">Wasteless</span>
          </h2>
          <p className="text-muted-foreground">
            Developer: <strong>WashpaBoy (Wasteless Team)</strong>
          </p>

          <Separator />

          <h3 className="text-lg font-semibold">
            🔐 How to Delete Your Account
          </h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
            <li>Log into the Wasteless app using your registered account.</li>
            <li>
              Navigate to <strong>Account Settings</strong> from the profile
              screen.
            </li>
            <li>
              Click on <strong>“Delete My Account”</strong> at the bottom of the
              settings page.
            </li>
            <li>Confirm the deletion when prompted.</li>
            <li>
              Your account and associated data will be permanently deleted.
            </li>
          </ol>

          <Separator />

          <h3 className="text-lg font-semibold">📂 What Data Is Deleted</h3>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>Your profile information (name, email, etc.)</li>
            <li>Your listed items and any requests you've made</li>
            <li>Messages or interactions related to your account</li>
          </ul>

          <h3 className="text-lg font-semibold mt-4">
            📁 What Data May Be Retained
          </h3>
          <p className="text-sm text-muted-foreground">
            For legal, fraud prevention, or audit reasons, we may retain minimal
            metadata (such as logs or hashed identifiers) for up to{" "}
            <strong>30 days</strong> after deletion. No personally identifiable
            information (PII) will be retained.
          </p>

          <Separator />

          <h3 className="text-lg font-semibold">📧 Need Help?</h3>
          <p className="text-sm text-muted-foreground">
            You may also request deletion manually by emailing us at:{" "}
            <a
              href="mailto:support@wasteless.app"
              className="text-blue-600 underline"
            >
              support@wasteless.app
            </a>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
