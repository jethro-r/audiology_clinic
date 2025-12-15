"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Plus,
  ArrowRight,
  Bell,
  FileText,
  CreditCard,
} from "lucide-react";
import Button from "@/components/Button";

export default function DashboardPage() {
  const { data: session } = useSession();

  // Mock data - in production, this would come from the API
  const upcomingAppointments = [
    {
      id: "1",
      type: "Hearing Evaluation",
      date: "December 20, 2024",
      time: "10:00 AM",
      audiologist: "Dr. Sarah Chen",
      status: "confirmed",
    },
  ];

  const quickActions = [
    {
      title: "Book Appointment",
      description: "Schedule a new appointment",
      href: "/portal/appointments/new",
      icon: Plus,
      color: "bg-[var(--primary)]",
    },
    {
      title: "View Documents",
      description: "Access your medical records",
      href: "/portal/documents",
      icon: FileText,
      color: "bg-[var(--secondary)]",
    },
    {
      title: "Pay Bill",
      description: "View and pay invoices",
      href: "/portal/billing",
      icon: CreditCard,
      color: "bg-emerald-500",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl lg:text-3xl font-bold text-[var(--foreground)]">
          Welcome back, {session?.user?.name?.split(" ")[0]}!
        </h1>
        <p className="text-[var(--muted)] mt-1">
          Manage your appointments and health records from your patient portal.
        </p>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
          Quick Actions
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={action.title}
              href={action.href}
              className="bg-white rounded-xl border border-[var(--border)] p-4 hover:shadow-md transition-shadow"
            >
              <div
                className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mb-3`}
              >
                <action.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-semibold text-[var(--foreground)]">
                {action.title}
              </h3>
              <p className="text-sm text-[var(--muted)]">{action.description}</p>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Upcoming Appointments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">
            Upcoming Appointments
          </h2>
          <Link
            href="/portal/appointments"
            className="text-sm text-[var(--primary)] hover:underline flex items-center gap-1"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {upcomingAppointments.length > 0 ? (
          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="bg-white rounded-xl border border-[var(--border)] p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-[var(--primary)]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--foreground)]">
                        {appointment.type}
                      </h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-[var(--muted)]">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {appointment.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {appointment.time}
                        </span>
                      </div>
                      <p className="text-sm text-[var(--muted)] mt-1">
                        with {appointment.audiologist}
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-[var(--success)]/10 text-[var(--success)] text-sm rounded-full capitalize">
                    {appointment.status}
                  </span>
                </div>
                <div className="mt-4 pt-4 border-t border-[var(--border)] flex gap-3">
                  <Link href={`/portal/appointments/${appointment.id}`}>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm">
                    Reschedule
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-[var(--border)] p-8 text-center">
            <Calendar className="h-12 w-12 text-[var(--muted)] mx-auto mb-4" />
            <h3 className="font-semibold text-[var(--foreground)] mb-2">
              No Upcoming Appointments
            </h3>
            <p className="text-[var(--muted)] mb-4">
              You don&apos;t have any scheduled appointments.
            </p>
            <Link href="/portal/appointments/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Book Appointment
              </Button>
            </Link>
          </div>
        )}
      </motion.div>

      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
          Notifications
        </h2>
        <div className="bg-white rounded-xl border border-[var(--border)] p-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-[var(--secondary)]/10 rounded-lg flex items-center justify-center">
              <Bell className="h-5 w-5 text-[var(--secondary)]" />
            </div>
            <div>
              <h3 className="font-medium text-[var(--foreground)]">
                Complete Your Profile
              </h3>
              <p className="text-sm text-[var(--muted)] mt-1">
                Add your medical history and insurance information to help us
                serve you better.
              </p>
              <Link
                href="/portal/profile"
                className="text-sm text-[var(--primary)] hover:underline mt-2 inline-block"
              >
                Update Profile →
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
