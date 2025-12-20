"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Plus,
  Filter,
  Search,
  ChevronRight,
} from "lucide-react";
import Button from "@/components/Button";

type AppointmentStatus = "upcoming" | "completed" | "cancelled";

interface Appointment {
  id: string;
  type: string;
  date: string;
  time: string;
  audiologist: string;
  status: AppointmentStatus;
}

// Mock data - replace with API calls
const mockAppointments: Appointment[] = [
  {
    id: "1",
    type: "Hearing Evaluation",
    date: "December 20, 2024",
    time: "10:00 AM",
    audiologist: "Dr. Sarah Chen",
    status: "upcoming",
  },
  {
    id: "2",
    type: "Hearing Aid Follow-up",
    date: "January 15, 2025",
    time: "2:30 PM",
    audiologist: "Dr. Michael Torres",
    status: "upcoming",
  },
  {
    id: "3",
    type: "Hearing Evaluation",
    date: "November 10, 2024",
    time: "11:00 AM",
    audiologist: "Dr. Sarah Chen",
    status: "completed",
  },
  {
    id: "4",
    type: "Tinnitus Consultation",
    date: "October 5, 2024",
    time: "3:00 PM",
    audiologist: "Dr. James Park",
    status: "cancelled",
  },
];

const statusColors: Record<AppointmentStatus, string> = {
  upcoming: "bg-primary/10 text-primary",
  completed: "bg-[var(--success)]/10 text-[var(--success)]",
  cancelled: "bg-[var(--error)]/10 text-[var(--error)]",
};

export default function AppointmentsPage() {
  const [filter, setFilter] = useState<"all" | AppointmentStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAppointments = mockAppointments.filter((apt) => {
    const matchesFilter = filter === "all" || apt.status === filter;
    const matchesSearch =
      apt.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.audiologist.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
            My Appointments
          </h1>
          <p className="text-muted mt-1">
            View and manage your appointments
          </p>
        </div>
        <Link href="/portal/appointments/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Book Appointment
          </Button>
        </Link>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-xl border border-border p-4"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
            <input
              type="text"
              placeholder="Search appointments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-muted" />
            <div className="flex gap-1">
              {(["all", "upcoming", "completed", "cancelled"] as const).map(
                (status) => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      filter === status
                        ? "bg-primary text-white"
                        : "bg-card text-foreground hover:bg-gray-200"
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Appointments List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-4"
      >
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment) => (
            <Link
              key={appointment.id}
              href={`/portal/appointments/${appointment.id}`}
              className="block bg-white rounded-xl border border-border p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {appointment.type}
                    </h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {appointment.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {appointment.time}
                      </span>
                    </div>
                    <p className="text-sm text-muted mt-1">
                      with {appointment.audiologist}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 text-sm rounded-full capitalize ${
                      statusColors[appointment.status]
                    }`}
                  >
                    {appointment.status}
                  </span>
                  <ChevronRight className="h-5 w-5 text-muted" />
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="bg-white rounded-xl border border-border p-8 text-center">
            <Calendar className="h-12 w-12 text-muted mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">
              No Appointments Found
            </h3>
            <p className="text-muted mb-4">
              {filter === "all"
                ? "You don't have any appointments yet."
                : `You don't have any ${filter} appointments.`}
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
    </div>
  );
}
