import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/root-layout";
import LandingPage from "../pages/landing-page";
import TestPage from "@/pages/test-page";
import SignUpPage from "@/pages/sign-up-page";
import LoginPage from "@/pages/login-page";
import DashboardPage from "@/pages/dashboard-page";
import { ProtectedRoute } from "@/components/ui/protected-route";
import UserLayout from "@/layouts/user-layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      // Public routes
      { index: true, element: <LandingPage /> },
      { path: "sign-up", element: <SignUpPage /> },
      { path: "login", element: <LoginPage /> },

      // Protected routes
      {
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <UserLayout />
          </ProtectedRoute>
        ),
        children: [
          { path: "dashboard", element: <DashboardPage /> },
          { path: "test", element: <TestPage /> },
          // Add more protected routes here
        ],
      },
    ],
  },
]);

export default router;
