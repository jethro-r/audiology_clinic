"use client";

import AdminAuthWrapper from "../../../components/admin/AdminAuthWrapper";
import AdminLayout from "../../../components/admin/AdminLayout";
import ServicesManager from "../components/ServicesManager";

export default function AdminServicesPage() {
  return (
    <AdminAuthWrapper>
      <AdminLayout>
        <ServicesManager />
      </AdminLayout>
    </AdminAuthWrapper>
  );
}
