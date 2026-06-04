"use client";

import AdminAuthWrapper from "../../../components/admin/AdminAuthWrapper";
import AdminLayout from "../../../components/admin/AdminLayout";
import MediaManager from "../components/MediaManager";

export default function AdminMediaPage() {
  return (
    <AdminAuthWrapper>
      <AdminLayout>
        <MediaManager />
      </AdminLayout>
    </AdminAuthWrapper>
  );
}
