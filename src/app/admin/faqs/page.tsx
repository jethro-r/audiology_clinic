"use client";

import AdminAuthWrapper from "../../../components/admin/AdminAuthWrapper";
import AdminLayout from "../../../components/admin/AdminLayout";
import FAQManager from "../components/FAQManager";

export default function AdminFAQsPage() {
  return (
    <AdminAuthWrapper>
      <AdminLayout>
        <FAQManager />
      </AdminLayout>
    </AdminAuthWrapper>
  );
}
