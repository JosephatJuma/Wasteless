import { useEffect, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Copy, Mail, Lock, BadgeCheck } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Navigation } from "@/components/navigation";

export function UserProfile() {
  const [userData, setUserData] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const user = localStorage.getItem("auth");
    if (user) {
      setUserData(JSON.parse(user));
    }
  }, []);

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-64">
        <p>No user data found</p>
      </div>
    );
  }

  const user = userData.session.user;
  const providers = user.app_metadata?.providers || [];
  const googleIdentity = user.identities?.find((i) => i.provider === "google");
  const emailIdentity = user.identities?.find((i) => i.provider === "email");

  const getUserName = () => {
    return (
      user.user_metadata?.name ||
      user.user_metadata?.display_name ||
      user.user_metadata?.full_name ||
      user.email.split("@")[0]
    );
  };

  const getAvatarUrl = () => {
    return (
      user.user_metadata?.avatar_url ||
      user.user_metadata?.picture ||
      googleIdentity?.identity_data?.picture
    );
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: text.length > 20 ? `${text.substring(0, 20)}...` : text,
    });
  };

  return (
    <div>
      <Navigation />
      <div className="container mx-auto py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          //className="max-w-4xl mx-auto"
        >
          <Card className="overflow-hidden">
            {/* Profile Header */}
            <div className="relative bg-gradient-to-r from-primary/10 to-secondary/10 h-48">
              <div className="absolute -bottom-16 left-6">
                <Avatar className="h-32 w-32 border-4 border-background">
                  <AvatarImage
                    src={getAvatarUrl()}
                    className="object-cover"
                    alt={getUserName()}
                  />
                  <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20 text-4xl font-bold">
                    {getUserName().charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>

            <CardHeader className="pt-20">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-3xl font-bold">
                    {getUserName()}
                  </CardTitle>
                  <p className="text-muted-foreground mt-1">{user.email}</p>
                </div>
                <Button variant="outline" className="rounded-full">
                  Edit Profile
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {providers.map((provider) => (
                  <Badge
                    key={provider}
                    variant="outline"
                    className="capitalize flex items-center gap-1"
                  >
                    {provider === "google" ? (
                      <Lock className="h-3 w-3" />
                    ) : (
                      <Mail className="h-3 w-3" />
                    )}
                    {provider}
                  </Badge>
                ))}
                <Badge variant="secondary">
                  Member since {format(new Date(user.created_at), "MMM yyyy")}
                </Badge>
                <Badge
                  variant={user.email_confirmed_at ? "default" : "outline"}
                >
                  {user.email_confirmed_at ? "Verified" : "Unverified"}
                </Badge>
              </div>
            </CardHeader>

            <Separator className="my-4" />

            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Account Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Account Details
                  </h3>
                  <div className="space-y-2">
                    <DetailItem
                      label="User ID"
                      value={user.id}
                      onCopy={() => handleCopy(user.id)}
                    />
                    <DetailItem
                      label="Email"
                      value={user.email}
                      verified={!!user.email_confirmed_at}
                      onCopy={() => handleCopy(user.email)}
                    />
                    <DetailItem
                      label="Account Created"
                      value={format(new Date(user.created_at), "PPpp")}
                    />
                    <DetailItem
                      label="Last Sign In"
                      value={format(new Date(user.last_sign_in_at), "PPpp")}
                    />
                    <DetailItem
                      label="Last Updated"
                      value={format(new Date(user.updated_at), "PPpp")}
                    />
                  </div>
                </div>

                {/* Security */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Security</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Password</p>
                        <p className="text-sm text-muted-foreground">
                          {emailIdentity ? "Set" : "Not set"}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Change
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Two-Factor Authentication</p>
                        <p className="text-sm text-muted-foreground">
                          Not enabled
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Enable
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connected Accounts */}
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Connected Accounts
                </h3>
                <div className="space-y-3">
                  <ConnectedAccount
                    provider="google"
                    connected={providers.includes("google")}
                    email={googleIdentity?.identity_data?.email}
                    lastUsed={googleIdentity?.last_sign_in_at}
                  />
                  <ConnectedAccount
                    provider="email"
                    connected={providers.includes("email")}
                    email={emailIdentity?.identity_data?.email}
                    lastUsed={emailIdentity?.last_sign_in_at}
                  />
                </div>

                {/* Metadata */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-3">User Metadata</h3>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <pre className="text-xs overflow-x-auto">
                      {JSON.stringify(user.user_metadata, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="mt-6 border-destructive/20">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <p className="font-medium">Delete Account</p>
                  <p className="text-sm text-muted-foreground">
                    Permanently remove your account and all associated data
                  </p>
                </div>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

function DetailItem({
  label,
  value,
  verified = false,
  onCopy,
}: {
  label: string;
  value: string;
  verified?: boolean;
  onCopy?: () => void;
}) {
  return (
    <div className="flex justify-between items-center">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="flex items-center gap-2">
        <p className="text-sm font-medium max-w-[180px] truncate">{value}</p>
        {verified && (
          <Badge variant="outline" className="text-xs flex items-center gap-1">
            <BadgeCheck className="h-3 w-3 text-green-500" />
            Verified
          </Badge>
        )}
        {onCopy && (
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 text-muted-foreground"
            onClick={onCopy}
          >
            <Copy className="h-3 w-3" />
          </Button>
        )}
      </div>
    </div>
  );
}

function ConnectedAccount({
  provider,
  connected,
  email,
  lastUsed,
}: {
  provider: string;
  connected: boolean;
  email?: string;
  lastUsed?: string;
}) {
  // const ProviderIcon = provider === "google" ? Icons.google : Icons.mail;

  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div className="flex items-center gap-3">
        <div
          className={`p-2 rounded-full ${
            provider === "google" ? "bg-blue-50" : "bg-gray-50"
          }`}
        >
          {/* <ProviderIcon
            className={`h-5 w-5 ${
              provider === "google" ? "text-blue-500" : "text-gray-500"
            }`}
          /> */}
        </div>
        <div>
          <p className="font-medium capitalize">{provider}</p>
          {connected ? (
            <p className="text-xs text-muted-foreground">
              {lastUsed
                ? `Last used ${format(new Date(lastUsed), "PP")}`
                : "Connected"}
            </p>
          ) : (
            <p className="text-xs text-muted-foreground">Not connected</p>
          )}
        </div>
      </div>
      <Button variant={connected ? "outline" : "default"} size="sm">
        {connected ? "Disconnect" : "Connect"}
      </Button>
    </div>
  );
}
