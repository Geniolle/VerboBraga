import { Header } from '@/components/header'
import { LocationSection } from '@/components/location-section'
import { TestimonialsSection } from '@/components/testimonials-section'
import { Footer } from '@/components/footer'
import FloatingWhatsApp from '@/components/floating-whatsapp'

export default function LocationPage() {
  return (
    <main className="w-full">
      <Header />
      <LocationSection />
      <TestimonialsSection />
      <Footer />
      <FloatingWhatsApp />
    </main>
  )
}
