'use client'
/* Página - História */

import { motion } from 'framer-motion'

export function AboutSection() {
  return (
    <section id="about" className="w-full bg-secondary/20 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              História Verbo da Vida Braga
            </h2>
            <div className="mt-8 space-y-6 text-lg text-muted-foreground">
              <p>
                A Igreja Verbo da Vida nasceu com a visão de criar uma comunidade espiritual acolhedora e inclusiva, onde pessoas de todas as idades e origens pudessem encontrar apoio, cura e crescimento pessoal.
              </p>
              <p>
                Fundada por nossa pastora principal junto com uma família pioneira dedicada, nossa missão é expandir o trabalho espiritual através de conexões genuínas, programas de cura e ministérios que servem às diferentes necessidades de nossa comunidade.
              </p>
              <p>
                Hoje, contamos com departamentos especializados, incluindo o ministério da juventude, o centro de cura e os grupos conectados que trabalham juntos para fortalecer nossa visão espiritual.
              </p>
            </div>

            {/* Key Stats */}
            <div className="mt-12 grid grid-cols-2 gap-6 md:gap-8">
              {[
                { number: '+10', label: 'Anos de Ministério' },
                { number: '+500', label: 'Membros Ativos' },
                { number: '+15', label: 'Líderes e Voluntários' },
                { number: '24/7', label: 'Suporte Disponível' },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-lg bg-card p-6"
                >
                  <p className="text-3xl font-bold text-primary">{stat.number}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Departments */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-8 text-2xl font-bold text-foreground">
              Pastores
            </h3>

            <div className="space-y-4">
              {[
                {
                  title: 'Clayton Lopes',
                  leader: 'Pastor Presidente ',
                  description: 'Foto',
                },
                {
                  title: 'André Luiz',
                  leader: 'Pastor Auxiliar',
                  description: 'Foto',
                },
                {
                  title: 'Caio Lima',
                  leader: 'Pastor Auxiliar',
                  description: 'Foto',
                },
              ].map((dept, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-lg border border-border bg-card p-6 transition-all hover:border-accent hover:shadow-md"
                >
                  <h4 className="font-semibold text-foreground">
                    {dept.title}
                  </h4>
                  <p className="mt-2 text-sm text-accent">{dept.leader}</p>
                  <p className="mt-2 text-muted-foreground">
                    {dept.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Vision Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-8 rounded-lg bg-primary/10 p-6"
            >
              <h4 className="font-semibold text-primary">Nossa Visão</h4>
              <p className="mt-3 text-muted-foreground">
                Ser um farol de luz e esperança na comunidade, expandindo o ministério espiritual através da cura, educação e conexão genuína com a divindade.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
