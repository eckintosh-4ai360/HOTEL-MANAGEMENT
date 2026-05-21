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
      <main className="lg:ml-64 pt-16 p-6 min-h-screen bg-background">
        {children}
      </main>
    </>
  )
}
