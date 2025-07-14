import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import LoadingPage from "./LoadingPage";
import { useToast } from "@/hooks/use-toast";
const OAuthCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleOAuthResponse = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data.session) {
        // localStorage.setItem('token', data.session.access_token);
        console.log("data.session.access_token", data.session.access_token);
        localStorage.setItem("auth", JSON.stringify(data));
        navigate("/user/dashboard");
        toast({
          title: "Login Successful",
          description: "Welcome to Health Tracker!",
        });
      } else {
        toast({
          title: "Something went wrong",
          description: "Please try again",
          variant: "destructive",
        });
        navigate("/auth/login");
        if (error) {
          toast({
            title: "Authentication Failed",
            description: error.message,
            variant: "destructive",
          });
          navigate("/auth/login");
        }
      }
    };

    handleOAuthResponse();
  }, [navigate, toast]);

  return <LoadingPage />;
};

export default OAuthCallback;
