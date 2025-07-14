// src/screens/Verify.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const VerifyAccount = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleVerify = () => {
    // In a real app, you'd verify the OTP with Supabase here
    toast({
      title: "Verification Successful",
      description: "Your account has been verified!",
    });
    navigate("/utils/record-vitals");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex flex-grow items-center justify-center py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">
                Verify Your Email
              </CardTitle>
              <CardDescription>
                We've sent a 6-digit code to your email address
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center space-x-2">
                {[...Array(6)].map((_, i) => (
                  <Input
                    key={i}
                    type="text"
                    maxLength={1}
                    className="w-12 h-12 text-center text-xl"
                  />
                ))}
              </div>
              <Button onClick={handleVerify} className="w-full">
                Verify Account
              </Button>
            </CardContent>
            <CardFooter className="flex justify-center">
              <div className="text-sm text-muted-foreground">
                <span>Didn't receive a code? </span>
                <button className="text-primary underline-offset-4 transition-colors hover:underline">
                  Resend
                </button>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default VerifyAccount;
