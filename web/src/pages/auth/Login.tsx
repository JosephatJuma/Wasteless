import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/navigation";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;
const Login = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // const onSubmit = async (user: LoginFormValues) => {
  //   setIsLoading(true);
  //   // In a real app, you'd verify credentials with Supabase here
  //   const { error, data } = await supabase.auth.signInWithPassword({
  //     email: user.email,
  //     password: user.password,
  //   });

  //   if (error) {
  //     toast({
  //       title: "Login Failed",
  //       description: error.message,
  //       variant: "destructive",
  //     });
  //   } else {
  //     toast({
  //       title: "Login Successful",
  //       description: "Welcome to Health Tracker!",
  //     });

  //     localStorage.setItem("auth", JSON.stringify(data));
  //     navigate("/user/dashboard");
  //   }
  //   setIsLoading(false);
  // };

  // const handleGoogleLogin = async () => {
  //   // In a real app, you'd implement Google OAuth here
  //   const { error } = await supabase.auth.signInWithOAuth({
  //     provider: "google",
  //     options: {
  //       redirectTo: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
  //     },
  //   });
  //   if (error) {
  //     toast({
  //       title: "Google Login Failed",
  //       description: error.message,
  //       variant: "destructive",
  //     });
  //   }
  // };
  return (
    <div>
      <Navigation />
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-card bg-card text-card-foreground border-border">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center text-card-foreground">
                Welcome back
              </CardTitle>
              <CardDescription className="text-center text-muted-foreground">
                Sign in to continue sharing and discovering items
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="rounded-xl"
                />
              </div>
              <Button className="w-full" size="lg">
                Sign In
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              <Button variant="outline" className="w-full" size="lg">
                Continue with Google
              </Button>
              <div className="text-center text-sm">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-primary hover:text-primary-light underline-offset-4 hover:underline"
                >
                  Sign up
                </Link>
              </div>
              <div className="text-center">
                <Link
                  to="/"
                  className="text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
                >
                  Back to home
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
