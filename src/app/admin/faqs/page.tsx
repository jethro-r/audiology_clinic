"use client";

import { useRouter } from "next/navigation";
import AdminAuthWrapper from "../../../components/admin/AdminAuthWrapper";
import AdminLayout from "../../../components/admin/AdminLayout";
import FAQManager from "../components/FAQManager";

export default function AdminFAQsPage() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin");
  }

  return (
    <AdminAuthWrapper>
      <AdminLayout onLogout={handleLogout}>
        <FAQManager />
      </AdminLayout>
    </AdminAuthWrapper>
  );
}
