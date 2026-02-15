"use client";

import { useRouter } from "next/navigation";
import AdminAuthWrapper from "../../../components/admin/AdminAuthWrapper";
import AdminLayout from "../../../components/admin/AdminLayout";
import ArticlesManager from "../components/ArticlesManager";

export default function AdminArticlesPage() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin");
  }

  return (
    <AdminAuthWrapper>
      <AdminLayout onLogout={handleLogout}>
        <ArticlesManager />
      </AdminLayout>
    </AdminAuthWrapper>
  );
}
