"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  MapPin,
  Phone,
  Mail,
  FileText,
  XCircle,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import Button from "@/components/Button";

interface Appointment {
  id: string;
  type: string;
  date: string;
  time: string;
  endTime: string;
  audiologist: string;
  audiologistEmail: string;
  status: "upcoming" | "completed" | "cancelled";
  location: string;
  notes: string;
  instructions: string;
}

// Mock data - replace with API calls
const mockAppointments: Record<string, Appointment> = {
  "1": {
    id: "1",
    type: "Hearing Evaluation",
    date: "December 20, 2024",
    time: "10:00 AM",
    endTime: "11:30 AM",
    audiologist: "Dr. Sarah Chen",
    audiologistEmail: "sarah.chen@veritashearing.co.nz",
    status: "upcoming",
    location: "123 Medical Center Drive, Suite 200, San Francisco, CA 94102",
    notes: "Please bring your current hearing aids if you have any.",
    instructions:
      "Please arrive 15 minutes early to complete paperwork. Avoid exposure to loud noises 24 hours before your appointment for accurate test results.",
  },
  "2": {
    id: "2",
    type: "Hearing Aid Follow-up",
    date: "January 15, 2025",
    time: "2:30 PM",
    endTime: "3:00 PM",
    audiologist: "Dr. Michael Torres",
    audiologistEmail: "michael.torres@veritashearing.co.nz",
    status: "upcoming",
    location: "123 Medical Center Drive, Suite 200, San Francisco, CA 94102",
    notes: "Bring your hearing aids and any notes about issues you've experienced.",
    instructions:
      "This follow-up appointment will assess how well you are adjusting to your hearing aids.",
  },
  "3": {
    id: "3",
    type: "Hearing Evaluation",
    date: "November 10, 2024",
    time: "11:00 AM",
    endTime: "12:30 PM",
    audiologist: "Dr. Sarah Chen",
    audiologistEmail: "sarah.chen@veritashearing.co.nz",
    status: "completed",
    location: "123 Medical Center Drive, Suite 200, San Francisco, CA 94102",
    notes: "Results showed mild hearing loss in high frequencies.",
    instructions: "",
  },
  "4": {
    id: "4",
    type: "Tinnitus Consultation",
    date: "October 5, 2024",
    time: "3:00 PM",
    endTime: "4:00 PM",
    audiologist: "Dr. James Park",
    audiologistEmail: "james.park@veritashearing.co.nz",
    status: "cancelled",
    location: "123 Medical Center Drive, Suite 200, San Francisco, CA 94102",
    notes: "Cancelled by patient.",
    instructions: "",
  },
};

const statusConfig = {
  upcoming: {
    icon: Clock,
    color: "text-primary",
    bg: "bg-primary/10",
    label: "Upcoming",
  },
  completed: {
    icon: CheckCircle,
    color: "text-[var(--success)]",
    bg: "bg-[var(--success)]/10",
    label: "Completed",
  },
  cancelled: {
    icon: XCircle,
    color: "text-[var(--error)]",
    bg: "bg-[var(--error)]/10",
    label: "Cancelled",
  },
};

export default function AppointmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  useEffect(() => {
    // Simulate API fetch
    const fetchAppointment = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const id = params.id as string;
      const data = mockAppointments[id];
      setAppointment(data || null);
      setLoading(false);
    };

    fetchAppointment();
  }, [params.id]);

  const handleCancelAppointment = async () => {
    setCancelling(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (appointment) {
      setAppointment({ ...appointment, status: "cancelled" });
    }
    setCancelling(false);
    setShowCancelConfirm(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-[var(--error)] mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Appointment Not Found
        </h2>
        <p className="text-muted mb-6">
          The appointment you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link href="/portal/appointments">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Appointments
          </Button>
        </Link>
      </div>
    );
  }

  const StatusIcon = statusConfig[appointment.status].icon;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          href="/portal/appointments"
          className="inline-flex items-center text-muted hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Appointments
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
              {appointment.type}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 text-sm rounded-full ${
                  statusConfig[appointment.status].bg
                } ${statusConfig[appointment.status].color}`}
              >
                <StatusIcon className="h-4 w-4" />
                {statusConfig[appointment.status].label}
              </span>
            </div>
          </div>

          {appointment.status === "upcoming" && (
            <div className="flex gap-3">
              <Link href="/portal/appointments/new">
                <Button variant="outline">Reschedule</Button>
              </Link>
              <Button
                variant="outline"
                className="text-[var(--error)] border-[var(--error)] hover:bg-[var(--error)]/10"
                onClick={() => setShowCancelConfirm(true)}
              >
                Cancel Appointment
              </Button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Appointment Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Date & Time Card */}
          <div className="bg-white rounded-xl border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Date & Time
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted">Date</p>
                  <p className="font-medium text-foreground">
                    {appointment.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted">Time</p>
                  <p className="font-medium text-foreground">
                    {appointment.time} - {appointment.endTime}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Location Card */}
          <div className="bg-white rounded-xl border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Location
            </h2>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[var(--secondary)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="h-5 w-5 text-[var(--secondary)]" />
              </div>
              <div>
                <p className="font-medium text-foreground">
                  Veritas Hearing Clinic
                </p>
                <p className="text-muted">{appointment.location}</p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(
                    appointment.location
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm mt-2 inline-block"
                >
                  Get Directions →
                </a>
              </div>
            </div>
          </div>

          {/* Instructions Card */}
          {appointment.instructions && (
            <div className="bg-white rounded-xl border border-border p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Preparation Instructions
              </h2>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="h-5 w-5 text-amber-600" />
                </div>
                <p className="text-muted">{appointment.instructions}</p>
              </div>
            </div>
          )}

          {/* Notes Card */}
          {appointment.notes && (
            <div className="bg-white rounded-xl border border-border p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Notes
              </h2>
              <p className="text-muted">{appointment.notes}</p>
            </div>
          )}
        </motion.div>

        {/* Provider Info Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white rounded-xl border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Your Provider
            </h2>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  {appointment.audiologist}
                </p>
                <p className="text-sm text-muted">Audiologist</p>
              </div>
            </div>
            <div className="space-y-3 pt-4 border-t border-border">
              <a
                href={`mailto:${appointment.audiologistEmail}`}
                className="flex items-center gap-2 text-muted hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span className="text-sm">{appointment.audiologistEmail}</span>
              </a>
              <a
                href="tel:+14155551234"
                className="flex items-center gap-2 text-muted hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span className="text-sm">(415) 555-1234</span>
              </a>
            </div>
          </div>

          {/* Quick Actions */}
          {appointment.status === "upcoming" && (
            <div className="bg-white rounded-xl border border-border p-6 mt-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Need Help?
              </h2>
              <div className="space-y-3">
                <Link href="/contact" className="block">
                  <Button variant="outline" className="w-full">
                    Contact Us
                  </Button>
                </Link>
                <Link href="/portal/messages" className="block">
                  <Button variant="outline" className="w-full">
                    Send Message
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-[var(--error)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="h-6 w-6 text-[var(--error)]" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Cancel Appointment?
              </h3>
              <p className="text-muted mb-6">
                Are you sure you want to cancel your {appointment.type} appointment
                on {appointment.date}? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowCancelConfirm(false)}
                  disabled={cancelling}
                >
                  Keep Appointment
                </Button>
                <Button
                  className="flex-1 bg-[var(--error)] hover:bg-[var(--error)]/90"
                  onClick={handleCancelAppointment}
                  disabled={cancelling}
                >
                  {cancelling ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Cancelling...
                    </>
                  ) : (
                    "Cancel Appointment"
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
