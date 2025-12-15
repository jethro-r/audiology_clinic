"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Calendar,
  Users,
  Clock,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import Button from "@/components/Button";

// Mock data - replace with API calls
const stats = [
  {
    name: "Today's Appointments",
    value: "8",
    change: "+2 from yesterday",
    icon: Calendar,
    color: "bg-blue-500",
  },
  {
    name: "Patients This Week",
    value: "42",
    change: "+12% from last week",
    icon: Users,
    color: "bg-green-500",
  },
  {
    name: "Avg Wait Time",
    value: "12 min",
    change: "-3 min from last week",
    icon: Clock,
    color: "bg-yellow-500",
  },
  {
    name: "Revenue This Month",
    value: "$24,500",
    change: "+8% from last month",
    icon: TrendingUp,
    color: "bg-purple-500",
  },
];

const todayAppointments = [
  {
    id: "1",
    time: "9:00 AM",
    patient: "John Smith",
    type: "Hearing Evaluation",
    status: "confirmed",
    audiologist: "Dr. Sarah Chen",
  },
  {
    id: "2",
    time: "10:30 AM",
    patient: "Mary Johnson",
    type: "Hearing Aid Fitting",
    status: "checked_in",
    audiologist: "Dr. Michael Torres",
  },
  {
    id: "3",
    time: "11:30 AM",
    patient: "Robert Davis",
    type: "Follow-up",
    status: "scheduled",
    audiologist: "Dr. Sarah Chen",
  },
  {
    id: "4",
    time: "1:00 PM",
    patient: "Susan Wilson",
    type: "Tinnitus Consultation",
    status: "confirmed",
    audiologist: "Dr. James Park",
  },
  {
    id: "5",
    time: "2:30 PM",
    patient: "James Brown",
    type: "Hearing Evaluation",
    status: "scheduled",
    audiologist: "Dr. Emily Watson",
  },
];

const statusConfig = {
  scheduled: { icon: Clock, color: "text-gray-500", bg: "bg-gray-100" },
  confirmed: { icon: CheckCircle, color: "text-blue-500", bg: "bg-blue-100" },
  checked_in: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-100" },
  completed: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-100" },
  cancelled: { icon: XCircle, color: "text-red-500", bg: "bg-red-100" },
  no_show: { icon: AlertCircle, color: "text-orange-500", bg: "bg-orange-100" },
};

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl lg:text-3xl font-bold text-[var(--foreground)]">
          Dashboard
        </h1>
        <p className="text-[var(--muted)] mt-1">
          Welcome back! Here&apos;s what&apos;s happening today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat, index) => (
          <div
            key={stat.name}
            className="bg-white rounded-xl border border-[var(--border)] p-6"
          >
            <div className="flex items-center justify-between">
              <div
                className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}
              >
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-[var(--foreground)]">
                {stat.value}
              </p>
              <p className="text-sm text-[var(--muted)]">{stat.name}</p>
              <p className="text-xs text-[var(--success)] mt-1">{stat.change}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Today's Appointments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">
            Today&apos;s Schedule
          </h2>
          <Link href="/admin/appointments">
            <Button variant="outline" size="sm">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-[var(--border)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[var(--card)] border-b border-[var(--border)]">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[var(--muted)]">
                    Time
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[var(--muted)]">
                    Patient
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[var(--muted)]">
                    Service
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[var(--muted)]">
                    Provider
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[var(--muted)]">
                    Status
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-[var(--muted)]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {todayAppointments.map((appointment) => {
                  const status =
                    statusConfig[
                      appointment.status as keyof typeof statusConfig
                    ];
                  const StatusIcon = status.icon;

                  return (
                    <tr key={appointment.id} className="hover:bg-[var(--card)]">
                      <td className="py-3 px-4 text-sm font-medium text-[var(--foreground)]">
                        {appointment.time}
                      </td>
                      <td className="py-3 px-4 text-sm text-[var(--foreground)]">
                        {appointment.patient}
                      </td>
                      <td className="py-3 px-4 text-sm text-[var(--muted)]">
                        {appointment.type}
                      </td>
                      <td className="py-3 px-4 text-sm text-[var(--muted)]">
                        {appointment.audiologist}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${status.bg} ${status.color}`}
                        >
                          <StatusIcon className="h-3 w-3" />
                          {appointment.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Link
                          href={`/admin/appointments/${appointment.id}`}
                          className="text-sm text-[var(--primary)] hover:underline"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid sm:grid-cols-3 gap-4"
      >
        <Link
          href="/admin/appointments?action=new"
          className="bg-white rounded-xl border border-[var(--border)] p-4 hover:shadow-md transition-shadow"
        >
          <Calendar className="h-8 w-8 text-[var(--primary)] mb-2" />
          <h3 className="font-semibold text-[var(--foreground)]">
            New Appointment
          </h3>
          <p className="text-sm text-[var(--muted)]">
            Schedule a patient appointment
          </p>
        </Link>

        <Link
          href="/admin/patients?action=new"
          className="bg-white rounded-xl border border-[var(--border)] p-4 hover:shadow-md transition-shadow"
        >
          <Users className="h-8 w-8 text-green-500 mb-2" />
          <h3 className="font-semibold text-[var(--foreground)]">
            Register Patient
          </h3>
          <p className="text-sm text-[var(--muted)]">Add a new patient record</p>
        </Link>

        <Link
          href="/admin/availability"
          className="bg-white rounded-xl border border-[var(--border)] p-4 hover:shadow-md transition-shadow"
        >
          <Clock className="h-8 w-8 text-yellow-500 mb-2" />
          <h3 className="font-semibold text-[var(--foreground)]">
            Manage Schedule
          </h3>
          <p className="text-sm text-[var(--muted)]">Update provider availability</p>
        </Link>
      </motion.div>
    </div>
  );
}
