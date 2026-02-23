"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import AdminLogin from "./components/AdminLogin";

export default function AdminPage() {
  const { isAuthenticated, isLoading, login } = useAdminAuth();
  const router = useRouter();

  // Redirect to services when authenticated
  useEffect(() => {
    if (isAuthenticated === true) {
      router.push("/admin/services");
    }
  }, [isAuthenticated, router]);

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

  // This should not be reached due to redirect
  return null;
}
