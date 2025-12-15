"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  Plus,
  Trash2,
  Loader2,
  Calendar,
  User,
  Save,
} from "lucide-react";
import Button from "@/components/Button";

interface Audiologist {
  id: string;
  firstName: string;
  lastName: string;
}

interface AvailabilitySlot {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const TIME_OPTIONS = Array.from({ length: 24 * 2 }, (_, i) => {
  const hour = Math.floor(i / 2);
  const minute = i % 2 === 0 ? "00" : "30";
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return {
    value: `${hour.toString().padStart(2, "0")}:${minute}`,
    label: `${displayHour}:${minute} ${period}`,
  };
});

export default function AdminAvailabilityPage() {
  const [audiologists, setAudiologists] = useState<Audiologist[]>([]);
  const [selectedAudiologist, setSelectedAudiologist] = useState<string>("");
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchAudiologists();
  }, []);

  useEffect(() => {
    if (selectedAudiologist) {
      fetchAvailability(selectedAudiologist);
    }
  }, [selectedAudiologist]);

  const fetchAudiologists = async () => {
    try {
      const response = await fetch("/api/audiologists");
      if (response.ok) {
        const data = await response.json();
        setAudiologists(data);
        if (data.length > 0) {
          setSelectedAudiologist(data[0].id);
        }
      }
    } catch (error) {
      console.error("Error fetching audiologists:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailability = async (audiologistId: string) => {
    try {
      const response = await fetch(
        `/api/admin/availability?audiologistId=${audiologistId}`
      );
      if (response.ok) {
        const data = await response.json();
        setAvailability(data);
      }
    } catch (error) {
      console.error("Error fetching availability:", error);
    }
  };

  const addAvailabilitySlot = (dayOfWeek: number) => {
    const newSlot: AvailabilitySlot = {
      id: `temp-${Date.now()}`,
      dayOfWeek,
      startTime: "09:00",
      endTime: "17:00",
      isAvailable: true,
    };
    setAvailability([...availability, newSlot]);
  };

  const updateAvailabilitySlot = (
    id: string,
    field: keyof AvailabilitySlot,
    value: string | boolean
  ) => {
    setAvailability(
      availability.map((slot) =>
        slot.id === id ? { ...slot, [field]: value } : slot
      )
    );
  };

  const removeAvailabilitySlot = (id: string) => {
    setAvailability(availability.filter((slot) => slot.id !== id));
  };

  const saveAvailability = async () => {
    if (!selectedAudiologist) return;

    setSaving(true);
    try {
      const response = await fetch("/api/admin/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          audiologistId: selectedAudiologist,
          availability: availability.map((slot) => ({
            dayOfWeek: slot.dayOfWeek,
            startTime: slot.startTime,
            endTime: slot.endTime,
            isAvailable: slot.isAvailable,
          })),
        }),
      });

      if (response.ok) {
        fetchAvailability(selectedAudiologist);
      }
    } catch (error) {
      console.error("Error saving availability:", error);
    } finally {
      setSaving(false);
    }
  };

  const getAvailabilityForDay = (dayOfWeek: number) => {
    return availability.filter((slot) => slot.dayOfWeek === dayOfWeek);
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
            Provider Availability
          </h1>
          <p className="text-[var(--muted)] mt-1">
            Manage provider schedules and working hours
          </p>
        </div>
        <Button onClick={saveAvailability} disabled={saving}>
          {saving ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          Save Changes
        </Button>
      </motion.div>

      {/* Provider Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-xl border border-[var(--border)] p-4"
      >
        <div className="flex items-center gap-3">
          <User className="h-5 w-5 text-[var(--muted)]" />
          <select
            value={selectedAudiologist}
            onChange={(e) => setSelectedAudiologist(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          >
            {audiologists.map((audiologist) => (
              <option key={audiologist.id} value={audiologist.id}>
                Dr. {audiologist.firstName} {audiologist.lastName}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Weekly Schedule */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-4"
      >
        {DAYS_OF_WEEK.map((day, dayIndex) => {
          const daySlots = getAvailabilityForDay(dayIndex);
          const isWeekend = dayIndex === 0 || dayIndex === 6;

          return (
            <div
              key={day}
              className={`bg-white rounded-xl border border-[var(--border)] p-4 ${
                isWeekend ? "opacity-75" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-[var(--primary)]" />
                  <h3 className="font-semibold text-[var(--foreground)]">
                    {day}
                  </h3>
                </div>
                <button
                  onClick={() => addAvailabilitySlot(dayIndex)}
                  className="flex items-center gap-1 text-sm text-[var(--primary)] hover:underline"
                >
                  <Plus className="h-4 w-4" />
                  Add Time Slot
                </button>
              </div>

              {daySlots.length === 0 ? (
                <p className="text-sm text-[var(--muted)] py-2">
                  No availability set for this day
                </p>
              ) : (
                <div className="space-y-3">
                  {daySlots.map((slot) => (
                    <div
                      key={slot.id}
                      className="flex items-center gap-4 p-3 bg-[var(--card)] rounded-lg"
                    >
                      <Clock className="h-4 w-4 text-[var(--muted)]" />
                      <div className="flex items-center gap-2">
                        <select
                          value={slot.startTime}
                          onChange={(e) =>
                            updateAvailabilitySlot(
                              slot.id,
                              "startTime",
                              e.target.value
                            )
                          }
                          className="px-3 py-1.5 rounded border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                        >
                          {TIME_OPTIONS.map((time) => (
                            <option key={time.value} value={time.value}>
                              {time.label}
                            </option>
                          ))}
                        </select>
                        <span className="text-[var(--muted)]">to</span>
                        <select
                          value={slot.endTime}
                          onChange={(e) =>
                            updateAvailabilitySlot(
                              slot.id,
                              "endTime",
                              e.target.value
                            )
                          }
                          className="px-3 py-1.5 rounded border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                        >
                          {TIME_OPTIONS.map((time) => (
                            <option key={time.value} value={time.value}>
                              {time.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <label className="flex items-center gap-2 ml-auto">
                        <input
                          type="checkbox"
                          checked={slot.isAvailable}
                          onChange={(e) =>
                            updateAvailabilitySlot(
                              slot.id,
                              "isAvailable",
                              e.target.checked
                            )
                          }
                          className="rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)]"
                        />
                        <span className="text-sm text-[var(--muted)]">
                          Available
                        </span>
                      </label>
                      <button
                        onClick={() => removeAvailabilitySlot(slot.id)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
