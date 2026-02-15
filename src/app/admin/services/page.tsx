"use client";

import { useRouter } from "next/navigation";
import AdminAuthWrapper from "../../../components/admin/AdminAuthWrapper";
import AdminLayout from "../../../components/admin/AdminLayout";
import ServicesManager from "../components/ServicesManager";

export default function AdminServicesPage() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin");
  }

  return (
    <AdminAuthWrapper>
      <AdminLayout onLogout={handleLogout}>
        <ServicesManager />
      </AdminLayout>
    </AdminAuthWrapper>
  );
}
