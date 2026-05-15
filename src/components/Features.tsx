import { motion } from 'motion/react';

const cards = [
  {
    title: "Análise",
    description: "Identificamos as necessidades reais do seu negócio para transformar ideias em requisitos técnicos precisos. Mergulhamos na sua visão para garantir que cada funcionalidade faça sentido estrategicamente, eliminando incertezas antes do início do desenvolvimento."
  },
  {
    title: "Planejamento",
    description: "Desenhamos a arquitetura ideal, selecionando a stack tecnológica mais eficiente para os seus objetivos. Planejamos a lógica de backend e a infraestrutura necessária para suportar um sistema seguro, performático e resiliente desde a sua fundação."
  },
  {
    title: "Escala",
    description: "Construímos sistemas preparados para o crescimento contínuo e alta disponibilidade que o projeto pede. Implementamos a engenharia necessária para permitir que o software suporte o volume de tráfego adequado sem perder a estabilidade ou exigir reescritas críticas no futuro."
  }
];

export default function Features() {
  return (
    <section id="processo" className="py-24 bg-surface-lowest">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <span className="text-[10px] font-mono tracking-widest text-primary uppercase mb-4 block">COMO TRABALHAMOS</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Analise, planejamento e escala</h2>
          <p className="text-slate max-w-xl">
            O ponto de equilíbrio entre análise crítica, planejamento sólido e engenharia sem limites.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-10 rounded-lg group hover:border-primary/50 transition-all duration-500"
            >
              <h3 className="text-2xl font-display font-semibold mb-6">{card.title}</h3>
              <p className="text-slate text-sm leading-relaxed mb-10 min-h-[140px]">
                {card.description}
              </p>
              <a href="#" className="inline-flex items-center gap-2 text-xs font-mono font-medium hover:text-primary transition-colors">
                Saber mais <i className='bx bx-right-arrow-alt text-base'></i>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
