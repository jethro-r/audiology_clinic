"use client";

import AdminAuthWrapper from "../../../components/admin/AdminAuthWrapper";
import AdminLayout from "../../../components/admin/AdminLayout";
import ArticlesManager from "../components/ArticlesManager";

export default function AdminArticlesPage() {
  return (
    <AdminAuthWrapper>
      <AdminLayout>
        <ArticlesManager />
      </AdminLayout>
    </AdminAuthWrapper>
  );
}
