import React from "react"
import type { Metadata } from 'next'
import { AdminSidebar } from '@/components/admin/sidebar'
import { AdminHeader } from '@/components/admin/header'
import { requireAdminUser } from '@/lib/auth-server'

export const metadata: Metadata = {
  title: 'Admin Dashboard - Verbo da Vida',
  description: 'Dashboard administrativo da Igreja Verbo da Vida',
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await requireAdminUser()

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
