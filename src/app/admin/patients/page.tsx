"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Users,
  Search,
  Plus,
  Mail,
  Phone,
  Calendar,
  Loader2,
  ChevronRight,
} from "lucide-react";
import Button from "@/components/Button";

interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  dateOfBirth: string | null;
  createdAt: string;
  _count?: {
    patientAppointments: number;
  };
}

export default function AdminPatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await fetch("/api/admin/patients");
      if (response.ok) {
        const data = await response.json();
        setPatients(data);
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPatients = patients.filter((patient) => {
    if (searchQuery === "") return true;
    const searchLower = searchQuery.toLowerCase();
    return (
      `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchLower) ||
      patient.email.toLowerCase().includes(searchLower) ||
      patient.phone?.includes(searchQuery)
    );
  });

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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
            Patients
          </h1>
          <p className="text-[var(--muted)] mt-1">
            Manage patient records and information
          </p>
        </div>
        <Link href="/admin/patients/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Patient
          </Button>
        </Link>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative"
      >
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[var(--muted)]" />
        <input
          type="text"
          placeholder="Search by name, email, or phone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <div className="bg-white rounded-xl border border-[var(--border)] p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{patients.length}</p>
              <p className="text-sm text-[var(--muted)]">Total Patients</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-[var(--border)] p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Calendar className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {patients.filter((p) => {
                  const createdDate = new Date(p.createdAt);
                  const thirtyDaysAgo = new Date();
                  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                  return createdDate >= thirtyDaysAgo;
                }).length}
              </p>
              <p className="text-sm text-[var(--muted)]">New This Month</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Patients List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-xl border border-[var(--border)] overflow-hidden"
      >
        {filteredPatients.length === 0 ? (
          <div className="p-8 text-center">
            <Users className="h-12 w-12 text-[var(--muted)] mx-auto mb-4" />
            <p className="text-[var(--muted)]">
              {searchQuery ? "No patients found matching your search" : "No patients yet"}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[var(--border)]">
            {filteredPatients.map((patient) => (
              <Link
                key={patient.id}
                href={`/admin/patients/${patient.id}`}
                className="flex items-center justify-between p-4 hover:bg-[var(--card)] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--primary)] flex items-center justify-center text-white font-medium">
                    {patient.firstName[0]}
                    {patient.lastName[0]}
                  </div>
                  <div>
                    <h3 className="font-medium text-[var(--foreground)]">
                      {patient.firstName} {patient.lastName}
                    </h3>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="flex items-center gap-1 text-sm text-[var(--muted)]">
                        <Mail className="h-3 w-3" />
                        {patient.email}
                      </span>
                      {patient.phone && (
                        <span className="flex items-center gap-1 text-sm text-[var(--muted)]">
                          <Phone className="h-3 w-3" />
                          {patient.phone}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm text-[var(--muted)]">
                      {patient._count?.patientAppointments || 0} appointments
                    </p>
                    <p className="text-xs text-[var(--muted)]">
                      Since {formatDate(patient.createdAt)}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-[var(--muted)]" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
