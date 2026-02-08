import { Header } from '@/components/header'
import { AboutSection } from '@/components/about-section'
import { Footer } from '@/components/footer'
import FloatingWhatsApp from '@/components/floating-whatsapp'

export default function AboutPage() {
  return (
    <main className="w-full">
      <Header />
      <AboutSection />
      <Footer />
      <FloatingWhatsApp />
    </main>
  )
}
