import { ClientFooter } from '@/components/client-footer'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {children}
      </main>
      <ClientFooter />
    </div>
  )
}
