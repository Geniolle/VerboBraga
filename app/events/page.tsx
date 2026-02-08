import { Header } from '@/components/header'
import { EventsSection } from '@/components/events-section'
import { Footer } from '@/components/footer'
import FloatingWhatsApp from '@/components/floating-whatsapp'

export default function EventsPage() {
  return (
    <main className="w-full">
      <Header />
      <EventsSection />
      <Footer />
      <FloatingWhatsApp />
    </main>
  )
}
