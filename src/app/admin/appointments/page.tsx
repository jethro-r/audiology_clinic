"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Calendar,
  Search,
  Filter,
  Plus,
  Clock,
  User,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import Button from "@/components/Button";

interface Appointment {
  id: string;
  startTime: string;
  endTime: string;
  status: string;
  notes: string | null;
  patient: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
  };
  audiologist: {
    id: string;
    firstName: string;
    lastName: string;
  };
  appointmentType: {
    id: string;
    name: string;
    durationMinutes: number;
  };
}

const statusConfig = {
  SCHEDULED: { icon: Clock, color: "text-gray-500", bg: "bg-gray-100", label: "Scheduled" },
  CONFIRMED: { icon: CheckCircle, color: "text-blue-500", bg: "bg-blue-100", label: "Confirmed" },
  COMPLETED: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-100", label: "Completed" },
  CANCELLED: { icon: XCircle, color: "text-red-500", bg: "bg-red-100", label: "Cancelled" },
  NO_SHOW: { icon: AlertCircle, color: "text-orange-500", bg: "bg-orange-100", label: "No Show" },
};

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch("/api/appointments");
      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateAppointmentStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        fetchAppointments();
      }
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      searchQuery === "" ||
      `${apt.patient.firstName} ${apt.patient.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      apt.patient.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || apt.status === statusFilter;

    const aptDate = new Date(apt.startTime);
    const matchesDate =
      aptDate.toDateString() === selectedDate.toDateString();

    return matchesSearch && matchesStatus && matchesDate;
  });

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const navigateDate = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--primary)]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-[var(--foreground)]">
            Appointments
          </h1>
          <p className="text-[var(--muted)] mt-1">
            Manage and view all appointments
          </p>
        </div>
        <Link href="/admin/appointments/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Appointment
          </Button>
        </Link>
      </motion.div>

      {/* Date Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex items-center justify-center gap-4 bg-white rounded-xl border border-[var(--border)] p-4"
      >
        <button
          onClick={() => navigateDate(-1)}
          className="p-2 hover:bg-[var(--card)] rounded-lg transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-[var(--primary)]" />
          <span className="text-lg font-semibold">
            {selectedDate.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        <button
          onClick={() => navigateDate(1)}
          className="p-2 hover:bg-[var(--card)] rounded-lg transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <button
          onClick={() => setSelectedDate(new Date())}
          className="ml-4 text-sm text-[var(--primary)] hover:underline"
        >
          Today
        </button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[var(--muted)]" />
          <input
            type="text"
            placeholder="Search by patient name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-[var(--muted)]" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          >
            <option value="all">All Status</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="NO_SHOW">No Show</option>
          </select>
        </div>
      </motion.div>

      {/* Appointments List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-xl border border-[var(--border)] overflow-hidden"
      >
        {filteredAppointments.length === 0 ? (
          <div className="p-8 text-center">
            <Calendar className="h-12 w-12 text-[var(--muted)] mx-auto mb-4" />
            <p className="text-[var(--muted)]">
              No appointments found for this date
            </p>
          </div>
        ) : (
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
                {filteredAppointments.map((appointment) => {
                  const status =
                    statusConfig[appointment.status as keyof typeof statusConfig];
                  const StatusIcon = status?.icon || Clock;

                  return (
                    <tr key={appointment.id} className="hover:bg-[var(--card)]">
                      <td className="py-3 px-4">
                        <div className="text-sm font-medium text-[var(--foreground)]">
                          {formatTime(appointment.startTime)}
                        </div>
                        <div className="text-xs text-[var(--muted)]">
                          {appointment.appointmentType.durationMinutes} min
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center text-white text-sm font-medium">
                            {appointment.patient.firstName[0]}
                            {appointment.patient.lastName[0]}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-[var(--foreground)]">
                              {appointment.patient.firstName}{" "}
                              {appointment.patient.lastName}
                            </div>
                            <div className="text-xs text-[var(--muted)]">
                              {appointment.patient.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-[var(--muted)]">
                        {appointment.appointmentType.name}
                      </td>
                      <td className="py-3 px-4 text-sm text-[var(--muted)]">
                        Dr. {appointment.audiologist.firstName}{" "}
                        {appointment.audiologist.lastName}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${status?.bg} ${status?.color}`}
                        >
                          <StatusIcon className="h-3 w-3" />
                          {status?.label || appointment.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-2">
                          {appointment.status === "SCHEDULED" && (
                            <button
                              onClick={() =>
                                updateAppointmentStatus(appointment.id, "CONFIRMED")
                              }
                              className="text-xs text-blue-500 hover:underline"
                            >
                              Confirm
                            </button>
                          )}
                          {["SCHEDULED", "CONFIRMED"].includes(
                            appointment.status
                          ) && (
                            <>
                              <button
                                onClick={() =>
                                  updateAppointmentStatus(
                                    appointment.id,
                                    "COMPLETED"
                                  )
                                }
                                className="text-xs text-green-500 hover:underline"
                              >
                                Complete
                              </button>
                              <button
                                onClick={() =>
                                  updateAppointmentStatus(
                                    appointment.id,
                                    "NO_SHOW"
                                  )
                                }
                                className="text-xs text-orange-500 hover:underline"
                              >
                                No Show
                              </button>
                            </>
                          )}
                          <Link
                            href={`/admin/appointments/${appointment.id}`}
                            className="text-xs text-[var(--primary)] hover:underline"
                          >
                            View
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}
