"use client";

import { useRouter } from "next/navigation";
import AdminAuthWrapper from "../../../components/admin/AdminAuthWrapper";
import AdminLayout from "../../../components/admin/AdminLayout";
import TeamManager from "../components/TeamManager";

export default function AdminTeamPage() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin");
  }

  return (
    <AdminAuthWrapper>
      <AdminLayout onLogout={handleLogout}>
        <TeamManager />
      </AdminLayout>
    </AdminAuthWrapper>
  );
}
