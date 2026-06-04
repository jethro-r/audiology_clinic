"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Stats {
  services: number;
  team: number;
  articles: number;
  faqs: number;
  media: number;
}

const quickLinks = [
  {
    label: "Manage Services",
    href: "/admin/services",
    description: "Add, edit, or remove clinic services",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    color: "bg-emerald-50 text-emerald-700",
    addHref: "/admin/services/new",
  },
  {
    label: "Manage Team",
    href: "/admin/team",
    description: "Update team member profiles",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    color: "bg-blue-50 text-blue-700",
    addHref: "/admin/team/new",
  },
  {
    label: "Manage Articles",
    href: "/admin/articles",
    description: "Publish and edit resource articles",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
      </svg>
    ),
    color: "bg-amber-50 text-amber-700",
    addHref: "/admin/articles/new",
  },
  {
    label: "Manage FAQs",
    href: "/admin/faqs",
    description: "Update frequently asked questions",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
      </svg>
    ),
    color: "bg-purple-50 text-purple-700",
    addHref: "/admin/faqs/new",
  },
  {
    label: "Media Library",
    href: "/admin/media",
    description: "Upload and manage images",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21zM8.25 8.625a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" />
      </svg>
    ),
    color: "bg-pink-50 text-pink-700",
    addHref: "/admin/media",
  },
];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCount(
      url: string,
      extract: (data: unknown) => number,
    ): Promise<number> {
      try {
        const res = await fetch(url, { credentials: "include" });
        if (!res.ok) return 0;
        const data = await res.json();
        return extract(data);
      } catch {
        return 0;
      }
    }

    async function fetchStats() {
      const [services, team, articles, faqs, media] = await Promise.all([
        fetchCount("/api/admin/services?limit=1", (d) => ((d as Record<string, unknown>).total as number) ?? 0),
        fetchCount("/api/admin/team?limit=1", (d) => ((d as Record<string, unknown>).total as number) ?? 0),
        fetchCount("/api/admin/articles?limit=1", (d) => ((d as Record<string, unknown>).total as number) ?? 0),
        fetchCount("/api/admin/faqs?limit=1", (d) => ((d as Record<string, unknown>).total as number) ?? 0),
        fetchCount("/api/admin/media", (d) => Array.isArray(d) ? d.length : 0),
      ]);
      setStats({ services, team, articles, faqs, media });
      setLoading(false);
    }
    fetchStats();
  }, []);

  const statCards = [
    { label: "Services", value: stats?.services, href: "/admin/services" },
    { label: "Team Members", value: stats?.team, href: "/admin/team" },
    { label: "Articles", value: stats?.articles, href: "/admin/articles" },
    { label: "FAQs", value: stats?.faqs, href: "/admin/faqs" },
    { label: "Media", value: stats?.media, href: "/admin/media" },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-foreground/60">
          Welcome back. Here&apos;s an overview of your content.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-white rounded-xl border border-border p-5 flex flex-col gap-2 hover:border-primary/30 hover:shadow-sm transition-all"
          >
            <span className="text-xs font-medium text-foreground/50 uppercase tracking-wide">
              {card.label}
            </span>
            <span className="text-3xl font-bold text-primary">
              {loading ? (
                <span className="inline-block w-8 h-8 rounded bg-border animate-pulse" />
              ) : (
                card.value
              )}
            </span>
          </Link>
        ))}
      </div>

      {/* Divider */}
      <div className="mb-6">
        <h2 className="text-base font-semibold text-foreground">Quick Actions</h2>
      </div>

      {/* Quick action cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quickLinks.map((link) => (
          <div
            key={link.label}
            className="bg-white rounded-xl border border-border p-5 flex items-start gap-4"
          >
            <div className={`shrink-0 w-11 h-11 rounded-lg flex items-center justify-center ${link.color}`}>
              {link.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-foreground text-sm">{link.label}</div>
              <div className="text-xs text-foreground/50 mt-0.5">{link.description}</div>
              <div className="flex items-center gap-3 mt-3">
                <Link
                  href={link.href}
                  className="text-xs font-medium text-primary hover:underline"
                >
                  View all
                </Link>
                <Link
                  href={link.addHref}
                  className="text-xs font-medium px-2.5 py-1 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors"
                >
                  + Add new
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Site links */}
      <div className="mt-10 bg-white rounded-xl border border-border p-5">
        <h2 className="text-sm font-semibold text-foreground mb-4">View Website</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Team", href: "/team" },
            { label: "Resources", href: "/resources" },
            { label: "Contact", href: "/contact" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground/60 hover:text-primary border border-border rounded-lg px-3 py-1.5 hover:border-primary/30 transition-colors"
            >
              {link.label}
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
