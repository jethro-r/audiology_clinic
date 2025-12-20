"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  User,
  FileText,
  CreditCard,
  MessageSquare,
  LogOut,
  Loader2,
  Home,
  Ear,
} from "lucide-react";
import { signOut } from "next-auth/react";

const allNavigation = [
  { name: "Dashboard", href: "/portal/dashboard", icon: LayoutDashboard },
  { name: "Appointments", href: "/portal/appointments", icon: Calendar },
  { name: "Profile", href: "/portal/profile", icon: User },
  { name: "Documents", href: "/portal/documents", icon: FileText },
  { name: "Billing", href: "/portal/billing", icon: CreditCard, adminOnly: true },
  { name: "Messages", href: "/portal/messages", icon: MessageSquare, adminOnly: true },
];

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  // Filter navigation based on user role
  const navigation = allNavigation.filter(
    (item) => !item.adminOnly || session?.user?.role === "ADMIN"
  );

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/portal/dashboard");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen flex bg-card">
      {/* Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white border-r border-border overflow-y-auto">
        <div className="flex flex-col h-full">
            {/* Logo/Title */}
            <div className="p-4 border-b border-border">
              <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Ear className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="font-semibold text-foreground">Veritas Hearing</span>
                  <span className="text-xs text-muted block">
                    Patient Portal
                  </span>
                </div>
              </Link>
            </div>

            {/* User Info */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {session.user?.name}
                  </p>
                  <p className="text-xs text-muted truncate">
                    {session.user?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-foreground hover:bg-card"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Sign Out */}
            <div className="p-4 border-t border-border space-y-1">
              <Link
                href="/"
                className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm font-medium text-muted hover:bg-card transition-colors"
              >
                <Home className="h-5 w-5" />
                Back to Website
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm font-medium text-muted hover:bg-card transition-colors"
              >
                <LogOut className="h-5 w-5" />
                Sign Out
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile Navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border z-40">
          <nav className="flex justify-around py-2">
            {navigation.slice(0, 5).map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex flex-col items-center gap-1 px-3 py-1 ${
                    isActive ? "text-primary" : "text-muted"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-xs">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 overflow-y-auto bg-card">
        <div className="p-4 lg:p-8 pb-20 lg:pb-8">{children}</div>
      </main>
    </div>
  );
}
