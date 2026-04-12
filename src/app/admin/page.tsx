"use client";

import AdminAuthWrapper from "../../components/admin/AdminAuthWrapper";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminDashboardPage from "./components/AdminDashboard";

export default function AdminPage() {
  return (
    <AdminAuthWrapper>
      <AdminLayout>
        <AdminDashboardPage />
      </AdminLayout>
    </AdminAuthWrapper>
  );
}
