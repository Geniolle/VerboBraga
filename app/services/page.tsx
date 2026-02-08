import { Header } from '@/components/header'
import { ServicesSection } from '@/components/services-section'
import { Footer } from '@/components/footer'
import FloatingWhatsApp from '@/components/floating-whatsapp'

export default function ServicesPage() {
  return (
    <main className="w-full">
      <Header />
      <ServicesSection />
      <Footer />
      <FloatingWhatsApp />
    </main>
  )
}
