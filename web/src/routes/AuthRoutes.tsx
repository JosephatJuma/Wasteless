import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import OAuthCallback from "@/pages/auth/OAuthCallback ";
import Index from "@/pages/Index";
import VerifyAccount from "@/pages/auth/VerifyAccount";
const AuthRoutes = {
  children: [
    {
      path: "/",
      element: <Index />,
    },

    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/verify-account",
      element: <VerifyAccount />,
    },
    {
      path: "/auth/callback",
      element: <OAuthCallback />,
    },
  ],
};

export default AuthRoutes;
