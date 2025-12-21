// src/components/ui/navigation-bar.tsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "@/hooks/useUser";
import { getNavigationByRole, type UserRole } from "@/config/navigation-config";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { LogOut, User, Menu } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutMutation } from "@/client/mutations/logout";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const NavigationBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, error } = useUser();

  const { mutate: logout, isPending: isLoggingOut } = useMutation({
    ...logoutMutation(),
    onSuccess: (data) => {
      toast.success(data.message || "Logged out successfully!");
      queryClient.clear();
      navigate("/login");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to log out");
    },
  });

  const user = data?.user;
  const userRole = user?.role as UserRole | undefined;
  const navItems = getNavigationByRole(userRole);

  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName || !lastName) return "U";
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  if (isLoading) {
    return (
      <nav className="border-b bg-background">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Skeleton className="h-8 w-32" />
            <div className="hidden md:flex gap-4">
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-10 w-20" />
            </div>
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>
      </nav>
    );
  }

  if (error || !user) {
    return null;
  }

  return (
    <nav className="border-b bg-background sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link
              to="/dashboard"
              className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity"
            >
              RentFlow
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <Button
                  key={item.href}
                  variant={isActive ? "secondary" : "ghost"}
                  asChild
                  className={cn("gap-2", isActive && "bg-secondary")}
                >
                  <Link to={item.href}>
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </Button>
              );
            })}
          </div>

          {/* Right side - User Menu */}
          <div className="flex items-center gap-2">
            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <div className="flex flex-col gap-4 mt-8">
                  <div className="flex items-center gap-3 pb-4 border-b">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user.avatarUrl} alt={user.firstName} />
                      <AvatarFallback>
                        {getInitials(user.firstName, user.lastName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <p className="font-medium">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.href;

                    return (
                      <Button
                        key={item.href}
                        variant={isActive ? "secondary" : "ghost"}
                        asChild
                        className={cn(
                          "justify-start gap-3",
                          isActive && "bg-secondary"
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        <Link to={item.href}>
                          <Icon className="h-4 w-4" />
                          {item.label}
                        </Link>
                      </Button>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>

            {/* Desktop User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar>
                    <AvatarImage src={user.avatarUrl} alt={user.firstName} />
                    <AvatarFallback>
                      {getInitials(user.firstName, user.lastName)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize bg-secondary px-2 py-0.5 rounded-md inline-block w-fit mt-1">
                      {user.role.toLowerCase()}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => logout()}
                  disabled={isLoggingOut}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {isLoggingOut ? "Logging out..." : "Log out"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
