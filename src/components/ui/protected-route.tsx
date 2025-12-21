// src/components/protected-route.tsx
import { Navigate } from "react-router-dom";
import { useUser } from "@/hooks/useUser";
import { Skeleton } from "@/components/ui/skeleton";

export const ProtectedRoute = ({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: string[];
}) => {
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

  if (error || !data?.user || !allowedRoles.includes(data.user.role || "")) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
