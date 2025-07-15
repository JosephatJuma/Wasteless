import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import OAuthCallback from "@/pages/auth/OAuthCallback ";
import Index from "@/pages/Index";
import VerifyAccount from "@/pages/auth/VerifyAccount";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import { UserProfile } from "@/pages/profile/UserProfile";
import DeleteAccountInfo from "@/pages/profile/DeleteAccountInfo";
import NotFound from "@/pages/NotFound";
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
    {
      path: "/privacy-policy",
      element: <PrivacyPolicy />,
    },
    {
      path: "/profile",
      element: <UserProfile />,
    },
    {
      path: "/account-deletion-info",
      element: <DeleteAccountInfo />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
};

export default AuthRoutes;
