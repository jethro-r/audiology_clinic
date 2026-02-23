"use client";

import AdminAuthWrapper from "../../../components/admin/AdminAuthWrapper";
import AdminLayout from "../../../components/admin/AdminLayout";
import TeamManager from "../components/TeamManager";

export default function AdminTeamPage() {
  return (
    <AdminAuthWrapper>
      <AdminLayout>
        <TeamManager />
      </AdminLayout>
    </AdminAuthWrapper>
  );
}
