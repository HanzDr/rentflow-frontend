import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/root-layout";
import LandingPage from "../pages/landing-page";
import TestPage from "@/pages/test-page";
import SignUpPage from "@/pages/sign-up-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "test", element: <TestPage /> },
      { path: "sign-up", element: <SignUpPage /> },
    ],
  },
]);

export default router;
