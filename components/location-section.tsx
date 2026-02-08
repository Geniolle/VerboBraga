'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export function LocationSection() {
  const contactInfo = [
    {
      icon: MapPin,
      label: 'Endereço',
      value: 'Praceta Beato Inácio de Azevedo 4',
    },
    {
      icon: Phone,
      label: 'Telémovel',
      value: '+351 923 945 580',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'contato@verbodavida.com.br',
    },
  ]

  return (
    <section id="location" className="w-full bg-background py-20 md:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Onde Estamos
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Visite-nos e conecte-se com nossa comunidade!
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              {contactInfo.map((info, idx) => {
                const Icon = info.icon
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 rounded-lg bg-primary/10 p-3 text-primary">
                      <Icon size={24} />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {info.label}
                      </p>
                      <p className="mt-1 text-muted-foreground">
                        {info.value}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-12 flex flex-col gap-4 sm:flex-row"
            >
              <a
                href="https://wa.me/+351923945580"
                className="flex items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition-all hover:shadow-lg hover:shadow-green-600/30"
              >
                💬 WhatsApp
              </a>
            </motion.div>
          </motion.div>

          {/* Right - Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-xl bg-muted"
          >
            {/* Google Maps Iframe */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.0462555555555!2d-46.633333!3d-23.550520!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0b12ab%3A0x0!2zMjMuNTUwNTIwLCAtNDYuNjMzMzMz!5e0!3m2!1sen!2sbr!4v1234567890"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="md:h-full"
            />
          </motion.div>
        </div>

        {/* Additional Services */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 rounded-xl bg-secondary/50 p-8"
        >
          <h3 className="text-2xl font-bold text-foreground">
            Serviços Disponíveis
          </h3>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              'Louvor e Adoração',
              'Estudo da Palavra',
              'Café e Comunhão',
              'Departamento Infantil',
            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 + idx * 0.1 }}
                viewport={{ once: true }}
                className="rounded-lg bg-card p-4 text-center"
              >
                <p className="font-semibold text-foreground">{service}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
