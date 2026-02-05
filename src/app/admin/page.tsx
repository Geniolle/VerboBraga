import { SectionHeader } from "@/components/SectionHeader";

export const metadata = {
  title: "Admin | Verbo da Vida Braga",
  description: "Painel administrativo para gestão da igreja."
};

const stats = [
  { label: "Total de agendamentos", value: "128" },
  { label: "Serviços entregues", value: "94" },
  { label: "Total de clientes", value: "67" },
  { label: "Receita média", value: "€54" }
];

const clients = [
  {
    name: "Maria Lopes",
    email: "maria@exemplo.pt",
    phone: "+351 912 000 123",
    services: 12,
    total: "€680",
    lastVisit: "12/05"
  },
  {
    name: "João Silva",
    email: "joao@exemplo.pt",
    phone: "+351 919 123 456",
    services: 7,
    total: "€420",
    lastVisit: "02/06"
  }
];

const services = [
  {
    name: "Aconselhamento Pastoral",
    price: "€35",
    duration: "60 min"
  },
  {
    name: "Mentoria de Liderança",
    price: "€50",
    duration: "90 min"
  }
];

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 dark:bg-slate-950 dark:text-white sm:px-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <SectionHeader title="Dashboard">
            <h1 className="text-3xl font-semibold">Agenda semanal</h1>
          </SectionHeader>
          <p className="text-sm text-slate-500 dark:text-slate-300">
            Visualize compromissos, alterne para visão diária ou mensal e acompanhe os pedidos.
          </p>
          <div className="flex flex-wrap gap-3">
            {"Semanal,Diária,Mensal".split(",").map((label) => (
              <button
                key={label}
                className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-600 transition hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <p className="text-xs uppercase tracking-widest text-slate-500">{item.label}</p>
              <p className="text-2xl font-semibold">{item.value}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <SectionHeader title="Agendamentos">
              <h2 className="text-2xl font-semibold">Pedidos e disponibilidade</h2>
            </SectionHeader>
            <ul className="mt-6 space-y-4 text-sm text-slate-600 dark:text-slate-300">
              <li>Notificação automática quando um agendamento é criado.</li>
              <li>Datas confirmadas ficam indisponíveis para novos pedidos.</li>
              <li>Confirmação por e-mail enviada após aprovação.</li>
              <li>Cancelamento mediante nome e telefone cadastrados.</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <SectionHeader title="Financeiro">
              <h2 className="text-2xl font-semibold">Receita e projeções</h2>
            </SectionHeader>
            <div className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <p>Gráfico de receita mensal e anual integrado.</p>
              <p>Projeções com base em compromissos futuros.</p>
              <p>Indicadores de desempenho por período.</p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <SectionHeader title="Clientes">
            <h2 className="text-2xl font-semibold">Relacionamento e métricas</h2>
          </SectionHeader>
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-xs uppercase tracking-widest text-slate-500">
                <tr>
                  <th className="py-2">Nome</th>
                  <th>Email</th>
                  <th>Telefone</th>
                  <th>Serviços</th>
                  <th>Total</th>
                  <th>Última visita</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.email} className="border-t border-slate-200 dark:border-slate-800">
                    <td className="py-3 font-medium">{client.name}</td>
                    <td>{client.email}</td>
                    <td>{client.phone}</td>
                    <td>{client.services}</td>
                    <td>{client.total}</td>
                    <td>{client.lastVisit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <SectionHeader title="Serviços">
            <h2 className="text-2xl font-semibold">Gestão de serviços e combos</h2>
          </SectionHeader>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {services.map((service) => (
              <div
                key={service.name}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950"
              >
                <p className="text-sm font-semibold">{service.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {service.price} • {service.duration}
                </p>
                <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                  Combos, vouchers e descontos configuráveis.
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
