"use client";

import { useState, useEffect, useRef, useCallback, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminLogin from "../../app/admin/components/AdminLogin";

interface AdminAuthWrapperProps {
  children: ReactNode;
}

export default function AdminAuthWrapper({ children }: AdminAuthWrapperProps) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const isMounted = useRef(true);

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/auth", {
        cache: "no-store",
      });
      
      if (!isMounted.current) return;

      if (res.ok) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
        // Redirect to admin root if not on the login page
        if (pathname !== "/admin") {
          router.push("/admin");
        }
      }
    } catch {
      if (isMounted.current) {
        setAuthenticated(false);
        if (pathname !== "/admin") {
          router.push("/admin");
        }
      }
    } finally {
      if (isMounted.current) {
        setIsChecking(false);
      }
    }
  }, [pathname, router]);

  useEffect(() => {
    checkAuth();

    return () => {
      isMounted.current = false;
    };
  }, [checkAuth]);

  function handleLoginSuccess() {
    setAuthenticated(true);
  }

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!authenticated) {
    return <AdminLogin onSuccess={handleLoginSuccess} />;
  }

  return <>{children}</>;
}
