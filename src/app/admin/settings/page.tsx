"use client";

import { useRouter } from "next/navigation";
import AdminAuthWrapper from "../../../components/admin/AdminAuthWrapper";
import AdminLayout from "../../../components/admin/AdminLayout";
import SettingsManager from "../components/SettingsManager";

export default function AdminSettingsPage() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin");
  }

  return (
    <AdminAuthWrapper>
      <AdminLayout onLogout={handleLogout}>
        <SettingsManager />
      </AdminLayout>
    </AdminAuthWrapper>
  );
}
