"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import AdminLogin from "./components/AdminLogin";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  const isMounted = useRef(true);

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/auth", {
        cache: "no-store",
      });
      
      if (!isMounted.current) return;

      if (res.ok) {
        setAuthenticated(true);
        // Redirect to services page when authenticated
        router.push("/admin/services");
      } else {
        setAuthenticated(false);
      }
    } catch {
      if (isMounted.current) {
        setAuthenticated(false);
      }
    }
  }, [router]);

  useEffect(() => {
    checkAuth();

    return () => {
      isMounted.current = false;
    };
  }, [checkAuth]);

  if (authenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!authenticated) {
    return <AdminLogin onSuccess={() => setAuthenticated(true)} />;
  }

  // This should not be reached due to redirect
  return null;
}
