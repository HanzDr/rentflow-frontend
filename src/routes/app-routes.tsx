import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/root-layout";
import LandingPage from "../pages/landing-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [{ index: true, element: <LandingPage /> }],
  },
]);

export default router;
