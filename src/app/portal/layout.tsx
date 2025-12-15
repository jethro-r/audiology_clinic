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

const navigation = [
  { name: "Dashboard", href: "/portal/dashboard", icon: LayoutDashboard },
  { name: "Appointments", href: "/portal/appointments", icon: Calendar },
  { name: "Profile", href: "/portal/profile", icon: User },
  { name: "Documents", href: "/portal/documents", icon: FileText },
  { name: "Billing", href: "/portal/billing", icon: CreditCard },
  { name: "Messages", href: "/portal/messages", icon: MessageSquare },
];

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/portal/dashboard");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--primary)]" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen flex bg-[var(--card)]">
      {/* Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white border-r border-[var(--border)] overflow-y-auto">
        <div className="flex flex-col h-full">
            {/* Logo/Title */}
            <div className="p-4 border-b border-[var(--border)]">
              <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center">
                  <Ear className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="font-semibold text-[var(--foreground)]">Veritas Hearing</span>
                  <span className="text-xs text-[var(--muted)] block">
                    Patient Portal
                  </span>
                </div>
              </Link>
            </div>

            {/* User Info */}
            <div className="p-4 border-b border-[var(--border)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-[var(--primary)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--foreground)] truncate">
                    {session.user?.name}
                  </p>
                  <p className="text-xs text-[var(--muted)] truncate">
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
                        ? "bg-[var(--primary)] text-white"
                        : "text-[var(--foreground)] hover:bg-[var(--card)]"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Sign Out */}
            <div className="p-4 border-t border-[var(--border)] space-y-1">
              <Link
                href="/"
                className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm font-medium text-[var(--muted)] hover:bg-[var(--card)] transition-colors"
              >
                <Home className="h-5 w-5" />
                Back to Website
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm font-medium text-[var(--muted)] hover:bg-[var(--card)] transition-colors"
              >
                <LogOut className="h-5 w-5" />
                Sign Out
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile Navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--border)] z-40">
          <nav className="flex justify-around py-2">
            {navigation.slice(0, 5).map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex flex-col items-center gap-1 px-3 py-1 ${
                    isActive ? "text-[var(--primary)]" : "text-[var(--muted)]"
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
      <main className="flex-1 lg:ml-64 overflow-y-auto bg-[var(--card)]">
        <div className="p-4 lg:p-8 pb-20 lg:pb-8">{children}</div>
      </main>
    </div>
  );
}
