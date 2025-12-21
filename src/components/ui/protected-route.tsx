// src/components/protected-route.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@/hooks/useUser";
import { Skeleton } from "@/components/ui/skeleton";

export const ProtectedRoute = () => {
  const { data, isLoading, error } = useUser();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="space-y-4">
          <Skeleton className="h-12 w-[250px]" />
          <Skeleton className="h-12 w-[200px]" />
        </div>
      </div>
    );
  }

  if (error || !data?.user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
