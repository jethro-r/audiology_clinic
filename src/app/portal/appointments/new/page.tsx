"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Calendar,
  Clock,
  User,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Button from "@/components/Button";

interface AppointmentType {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  price: number | null;
}

interface Audiologist {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

const steps = [
  { id: 1, name: "Service" },
  { id: 2, name: "Provider" },
  { id: 3, name: "Date & Time" },
  { id: 4, name: "Confirm" },
];

export default function NewAppointmentPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Data from APIs
  const [appointmentTypes, setAppointmentTypes] = useState<AppointmentType[]>([]);
  const [audiologists, setAudiologists] = useState<Audiologist[]>([]);
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const [bookingData, setBookingData] = useState({
    serviceId: "",
    audiologistId: "",
    date: null as Date | null,
    time: "",
    notes: "",
  });

  // Fetch appointment types and audiologists on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [typesRes, audioRes] = await Promise.all([
          fetch("/api/appointment-types"),
          fetch("/api/audiologists"),
        ]);

        if (typesRes.ok) {
          const types = await typesRes.json();
          setAppointmentTypes(types);
        }

        if (audioRes.ok) {
          const audios = await audioRes.json();
          setAudiologists(audios);
        }

        // Generate available dates (next 14 days, excluding Sundays)
        const dates = [];
        const today = new Date();
        for (let i = 1; i <= 14; i++) {
          const date = new Date(today);
          date.setDate(today.getDate() + i);
          if (date.getDay() !== 0) {
            dates.push(date);
          }
        }
        setAvailableDates(dates);
      } catch (err) {
        console.error("Failed to load data:", err);
        setError("Failed to load booking options");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch available time slots when audiologist and date are selected
  useEffect(() => {
    const fetchTimeSlots = async () => {
      if (!bookingData.audiologistId || !bookingData.date || !bookingData.serviceId) {
        return;
      }

      try {
        setLoadingSlots(true);
        const dateStr = bookingData.date.toISOString().split("T")[0];
        const response = await fetch(
          `/api/availability?audiologistId=${bookingData.audiologistId}&date=${dateStr}&appointmentTypeId=${bookingData.serviceId}`
        );

        if (response.ok) {
          const data = await response.json();
          if (data.slots && data.slots.length > 0) {
            setTimeSlots(data.slots);
          } else {
            // If no slots returned, provide default slots
            setTimeSlots([
              { time: "09:00", available: true },
              { time: "09:30", available: true },
              { time: "10:00", available: true },
              { time: "10:30", available: true },
              { time: "11:00", available: true },
              { time: "11:30", available: true },
              { time: "13:00", available: true },
              { time: "13:30", available: true },
              { time: "14:00", available: true },
              { time: "14:30", available: true },
              { time: "15:00", available: true },
              { time: "15:30", available: true },
              { time: "16:00", available: true },
            ]);
          }
        }
      } catch (err) {
        console.error("Failed to fetch time slots:", err);
        // Provide default slots on error
        setTimeSlots([
          { time: "09:00", available: true },
          { time: "09:30", available: true },
          { time: "10:00", available: true },
          { time: "10:30", available: true },
          { time: "11:00", available: true },
          { time: "11:30", available: true },
          { time: "13:00", available: true },
          { time: "13:30", available: true },
          { time: "14:00", available: true },
          { time: "14:30", available: true },
          { time: "15:00", available: true },
          { time: "15:30", available: true },
          { time: "16:00", available: true },
        ]);
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchTimeSlots();
  }, [bookingData.audiologistId, bookingData.date, bookingData.serviceId]);

  const selectedService = appointmentTypes.find(
    (t) => t.id === bookingData.serviceId
  );
  const selectedAudiologist = audiologists.find(
    (a) => a.id === bookingData.audiologistId
  );

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return !!bookingData.serviceId;
      case 2:
        return !!bookingData.audiologistId;
      case 3:
        return !!bookingData.date && !!bookingData.time;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const handleSubmit = async () => {
    if (!bookingData.date || !bookingData.time) return;

    setIsSubmitting(true);
    setError(null);

    try {
      // Construct the start time
      const [hours, minutes] = bookingData.time.split(":");
      const startTime = new Date(bookingData.date);
      startTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appointmentTypeId: bookingData.serviceId,
          audiologistId: bookingData.audiologistId,
          startTime: startTime.toISOString(),
          notes: bookingData.notes || null,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to book appointment");
      }

      setIsComplete(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to book appointment");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--primary)]" />
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl border border-[var(--border)] p-8 text-center"
        >
          <div className="w-16 h-16 bg-[var(--success)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-[var(--success)]" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">
            Appointment Booked!
          </h2>
          <p className="text-[var(--muted)] mb-6">
            Your appointment has been successfully scheduled. We&apos;ve sent a
            confirmation email to your registered email address.
          </p>

          <div className="bg-[var(--card)] rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-[var(--foreground)] mb-2">
              Appointment Details
            </h3>
            <div className="space-y-1 text-sm">
              <p>
                <span className="text-[var(--muted)]">Service:</span>{" "}
                {selectedService?.name}
              </p>
              <p>
                <span className="text-[var(--muted)]">Provider:</span>{" "}
                {selectedAudiologist
                  ? `${selectedAudiologist.firstName} ${selectedAudiologist.lastName}`
                  : ""}
              </p>
              <p>
                <span className="text-[var(--muted)]">Date:</span>{" "}
                {bookingData.date?.toLocaleDateString("en-NZ", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p>
                <span className="text-[var(--muted)]">Time:</span>{" "}
                {bookingData.time ? formatTime(bookingData.time) : ""}
              </p>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <Button
              variant="outline"
              onClick={() => router.push("/portal/appointments")}
            >
              View Appointments
            </Button>
            <Button onClick={() => router.push("/portal/dashboard")}>
              Go to Dashboard
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[var(--muted)] hover:text-[var(--foreground)] mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <h1 className="text-2xl lg:text-3xl font-bold text-[var(--foreground)]">
          Book an Appointment
        </h1>
        <p className="text-[var(--muted)] mt-1">
          Schedule your visit in just a few steps
        </p>
      </motion.div>

      {/* Error message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3 mb-6">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Progress Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  currentStep > step.id
                    ? "bg-[var(--success)] text-white"
                    : currentStep === step.id
                    ? "bg-[var(--primary)] text-white"
                    : "bg-[var(--card)] text-[var(--muted)]"
                }`}
              >
                {currentStep > step.id ? (
                  <Check className="h-4 w-4" />
                ) : (
                  step.id
                )}
              </div>
              <span
                className={`ml-2 text-sm hidden sm:block ${
                  currentStep >= step.id
                    ? "text-[var(--foreground)]"
                    : "text-[var(--muted)]"
                }`}
              >
                {step.name}
              </span>
              {index < steps.length - 1 && (
                <div
                  className={`w-12 sm:w-20 h-0.5 mx-2 ${
                    currentStep > step.id
                      ? "bg-[var(--success)]"
                      : "bg-[var(--border)]"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl border border-[var(--border)] p-6"
        >
          {/* Step 1: Select Service */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
                Select a Service
              </h2>
              <div className="space-y-3">
                {appointmentTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() =>
                      setBookingData({ ...bookingData, serviceId: type.id })
                    }
                    className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                      bookingData.serviceId === type.id
                        ? "border-[var(--primary)] bg-[var(--primary)]/5"
                        : "border-[var(--border)] hover:border-[var(--primary)]/50"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-[var(--foreground)]">
                          {type.name}
                        </h3>
                        <p className="text-sm text-[var(--muted)] mt-1">
                          {type.description}
                        </p>
                        <p className="text-sm text-[var(--muted)] mt-1">
                          Duration: {type.durationMinutes} minutes
                        </p>
                      </div>
                      {type.price && (
                        <span className="text-lg font-semibold text-[var(--primary)]">
                          ${Number(type.price).toFixed(0)}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Select Audiologist */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
                Choose a Provider
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {audiologists.map((audiologist) => (
                  <button
                    key={audiologist.id}
                    onClick={() =>
                      setBookingData({
                        ...bookingData,
                        audiologistId: audiologist.id,
                      })
                    }
                    className={`text-left p-4 rounded-lg border-2 transition-colors ${
                      bookingData.audiologistId === audiologist.id
                        ? "border-[var(--primary)] bg-[var(--primary)]/5"
                        : "border-[var(--border)] hover:border-[var(--primary)]/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
                        <User className="h-6 w-6 text-[var(--primary)]" />
                      </div>
                      <div>
                        <h3 className="font-medium text-[var(--foreground)]">
                          {audiologist.firstName} {audiologist.lastName}
                        </h3>
                        <p className="text-sm text-[var(--muted)]">
                          {audiologist.role === "AUDIOLOGIST"
                            ? "Audiologist"
                            : audiologist.role}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Select Date & Time */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
                Select Date & Time
              </h2>

              {/* Date Selection */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-[var(--foreground)] mb-3 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Available Dates
                </h3>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {availableDates.map((date) => (
                    <button
                      key={date.toISOString()}
                      onClick={() =>
                        setBookingData({ ...bookingData, date, time: "" })
                      }
                      className={`p-2 rounded-lg text-center transition-colors ${
                        bookingData.date?.toDateString() === date.toDateString()
                          ? "bg-[var(--primary)] text-white"
                          : "bg-[var(--card)] hover:bg-gray-200"
                      }`}
                    >
                      <div className={`text-xs ${
                        bookingData.date?.toDateString() === date.toDateString()
                          ? "text-white/80"
                          : "text-[var(--muted)]"
                      }`}>
                        {date.toLocaleDateString("en-NZ", { weekday: "short" })}
                      </div>
                      <div className="text-lg font-semibold">
                        {date.getDate()}
                      </div>
                      <div className={`text-xs ${
                        bookingData.date?.toDateString() === date.toDateString()
                          ? "text-white/80"
                          : ""
                      }`}>
                        {date.toLocaleDateString("en-NZ", { month: "short" })}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              {bookingData.date && (
                <div>
                  <h3 className="text-sm font-medium text-[var(--foreground)] mb-3 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Available Times
                  </h3>
                  {loadingSlots ? (
                    <div className="flex items-center justify-center h-20">
                      <Loader2 className="h-6 w-6 animate-spin text-[var(--primary)]" />
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot.time}
                          onClick={() =>
                            slot.available &&
                            setBookingData({ ...bookingData, time: slot.time })
                          }
                          disabled={!slot.available}
                          className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                            bookingData.time === slot.time
                              ? "bg-[var(--primary)] text-white"
                              : slot.available
                              ? "bg-[var(--card)] hover:bg-gray-200"
                              : "bg-gray-100 text-gray-400 cursor-not-allowed"
                          }`}
                        >
                          {formatTime(slot.time)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
                Confirm Your Appointment
              </h2>

              <div className="space-y-4">
                <div className="bg-[var(--card)] rounded-lg p-4">
                  <h3 className="font-medium text-[var(--foreground)] mb-3">
                    Appointment Summary
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[var(--muted)]">Service:</span>
                      <span className="font-medium">
                        {selectedService?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--muted)]">Provider:</span>
                      <span className="font-medium">
                        {selectedAudiologist
                          ? `${selectedAudiologist.firstName} ${selectedAudiologist.lastName}`
                          : ""}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--muted)]">Date:</span>
                      <span className="font-medium">
                        {bookingData.date?.toLocaleDateString("en-NZ", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--muted)]">Time:</span>
                      <span className="font-medium">
                        {bookingData.time ? formatTime(bookingData.time) : ""}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--muted)]">Duration:</span>
                      <span className="font-medium">
                        {selectedService?.durationMinutes} minutes
                      </span>
                    </div>
                    {selectedService?.price && (
                      <div className="flex justify-between pt-2 border-t border-[var(--border)]">
                        <span className="text-[var(--muted)]">Estimated Cost:</span>
                        <span className="font-semibold text-[var(--primary)]">
                          ${Number(selectedService.price).toFixed(0)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                    Additional Notes (optional)
                  </label>
                  <textarea
                    value={bookingData.notes}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, notes: e.target.value })
                    }
                    placeholder="Any concerns or questions you'd like to discuss..."
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] resize-none"
                  />
                </div>

                <p className="text-sm text-[var(--muted)]">
                  By booking this appointment, you agree to our cancellation
                  policy. Please arrive 15 minutes before your scheduled time.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex justify-between mt-6"
      >
        <Button
          variant="outline"
          onClick={() => setCurrentStep((prev) => prev - 1)}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        {currentStep < 4 ? (
          <Button
            onClick={() => setCurrentStep((prev) => prev + 1)}
            disabled={!canProceed()}
          >
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Booking...
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Confirm Booking
              </>
            )}
          </Button>
        )}
      </motion.div>
    </div>
  );
}
