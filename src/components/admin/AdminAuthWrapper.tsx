"use client";

import { useAdminAuth } from "@/contexts/AdminAuthContext";
import AdminLogin from "../../app/admin/components/AdminLogin";
import type { ReactNode } from "react";

interface AdminAuthWrapperProps {
  children: ReactNode;
}

export default function AdminAuthWrapper({ children }: AdminAuthWrapperProps) {
  const { isAuthenticated, isLoading, login } = useAdminAuth();

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  // Show login if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin onSuccess={() => {}} loginFn={login} />;
  }

  // User is authenticated, show children
  return <>{children}</>;
}
