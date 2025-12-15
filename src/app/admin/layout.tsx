"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Clock,
  Settings,
  LogOut,
  Loader2,
  Ear,
  FileText,
  CreditCard,
  Home,
  UserCog,
} from "lucide-react";
import { signOut } from "next-auth/react";

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Appointments", href: "/admin/appointments", icon: Calendar },
  { name: "Patients", href: "/admin/patients", icon: Users },
  { name: "User Management", href: "/admin/users", icon: UserCog, adminOnly: true },
  { name: "Availability", href: "/admin/availability", icon: Clock },
  { name: "Billing", href: "/admin/billing", icon: CreditCard },
  { name: "Reports", href: "/admin/reports", icon: FileText },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/admin/dashboard");
    } else if (
      status === "authenticated" &&
      !["ADMIN", "AUDIOLOGIST", "RECEPTIONIST"].includes(session?.user?.role || "")
    ) {
      router.push("/portal/dashboard");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--primary)]" />
      </div>
    );
  }

  if (
    !session ||
    !["ADMIN", "AUDIOLOGIST", "RECEPTIONIST"].includes(session?.user?.role || "")
  ) {
    return null;
  }

  return (
    <div className="min-h-screen flex bg-[var(--card)]">
      {/* Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-gray-900 text-white overflow-y-auto">
        <div className="flex flex-col h-full">
            {/* Logo/Title */}
            <div className="p-4 border-b border-gray-800">
              <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center">
                  <Ear className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="font-semibold">Veritas Hearing</span>
                  <span className="text-xs text-gray-400 block">
                    Admin Portal
                  </span>
                </div>
              </Link>
            </div>

            {/* User Info */}
            <div className="p-4 border-b border-gray-800">
              <p className="text-sm font-medium truncate">{session.user?.name}</p>
              <p className="text-xs text-gray-400 truncate capitalize">
                {session.user?.role?.toLowerCase()}
              </p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
              {navigation
                .filter((item) => !item.adminOnly || session.user?.role === "ADMIN")
                .map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[var(--primary)] text-white"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Sign Out */}
            <div className="p-4 border-t border-gray-800 space-y-1">
              <Link
                href="/"
                className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
              >
                <Home className="h-5 w-5" />
                Back to Website
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
              >
                <LogOut className="h-5 w-5" />
                Sign Out
              </button>
            </div>
          </div>
        </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 overflow-y-auto bg-[var(--card)]">
        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
