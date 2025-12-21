import {
  Home,
  Users,
  FileText,
  Settings,
  BarChart,
  Building,
} from "lucide-react";

export type UserRole = "USER" | "ADMIN" | "LANDLORD" | "TENANT";

export interface NavigationItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: UserRole[];
}

export const navigationItems: NavigationItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: Home,
    roles: ["USER", "ADMIN", "LANDLORD", "TENANT"],
  },
  {
    label: "Properties",
    href: "/properties",
    icon: Building,
    roles: ["ADMIN", "LANDLORD"],
  },
  {
    label: "Tenants",
    href: "/tenants",
    icon: Users,
    roles: ["ADMIN", "LANDLORD"],
  },
  {
    label: "Reports",
    href: "/reports",
    icon: BarChart,
    roles: ["ADMIN", "LANDLORD"],
  },
  {
    label: "Documents",
    href: "/documents",
    icon: FileText,
    roles: ["TENANT", "LANDLORD"],
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
    roles: ["USER", "ADMIN", "LANDLORD", "TENANT"],
  },
];

export const getNavigationByRole = (role?: UserRole): NavigationItem[] => {
  if (!role) return [];
  return navigationItems.filter((item) => item.roles.includes(role));
};
