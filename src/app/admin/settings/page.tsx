"use client";

import AdminAuthWrapper from "../../../components/admin/AdminAuthWrapper";
import AdminLayout from "../../../components/admin/AdminLayout";
import SettingsManager from "../components/SettingsManager";

export default function AdminSettingsPage() {
  return (
    <AdminAuthWrapper>
      <AdminLayout>
        <SettingsManager />
      </AdminLayout>
    </AdminAuthWrapper>
  );
}
