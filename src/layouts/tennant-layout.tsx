import { Outlet } from "react-router-dom";
import NavigationBar from "@/components/ui/navigation-bar";
const TennantLayout = () => {
  return (
    <div>
      <NavigationBar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default TennantLayout;
