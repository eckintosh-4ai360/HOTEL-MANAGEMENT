import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Sidebar />
      <Header />
      <main className="min-h-screen bg-[#f8f8f5] px-4 pb-8 pt-24 sm:px-6 lg:ml-64 lg:px-8 lg:pt-28">
        {children}
      </main>
    </>
  )
}
