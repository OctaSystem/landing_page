import {motion} from 'motion/react';

const services = [
    {
        title: "Sistemas Próprios e ERPs",
        description: "Projetamos plataformas robustas e sistemas de gestão (ERP) customizados para centralizar suas operações. Focamos em fluxos de trabalho eficientes e bancos de dados modelados para suportar o crescimento da sua empresa.",
        icon: "bx-data"
    },
    {
        title: "Landing Pages e Web Apps",
        description: "Criamos interfaces rápidas e Landing Pages de alta conversão. Unimos design moderno com uma arquitetura frontend leve para garantir que sua presença digital seja tão sólida quanto o seu negócio.",
        icon: "bx-layout"
    },
    {
        title: "APIs e Integrações",
        description: "Construímos camadas de integração seguras e APIs que conectam seus serviços com eficiência. Garantimos que a comunicação entre sistemas próprios ou terceiros seja fluida, estável e preparada para a escala do seu projeto.",
        icon: "bx-chip"
    },
    {
        title: "Modernização e Melhorias",
        description: "Evoluímos sistemas legados, otimizando o código e a infraestrutura para eliminar gargalos técnicos. Transformamos plataformas antigas em soluções modernizadas sem interromper a continuidade do seu negócio.",
        icon: "bx-layer"
    },
    {
        title: "Aplicativos Mobile",
        description: "Projetamos soluções Mobile com foco em alta performance e integração total ao seu ecossistema. Desenvolvemos aplicativos mobile que unem usabilidade intuitiva com a robustez necessária para escalar junto ao seu negócio.",
        icon: "bx-mobile-alt"
    }
];

export default function Services() {
    return (
        <section id="services" className="py-24 relative overflow-hidden bg-surface-low">
            {/* Abstract Shape */}
            <div
                className="absolute top-1/2 left-0 -translate-y-1/2 -z-10 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] opacity-10"/>

            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col items-end text-right mb-24">
                    <span className="text-[10px] font-mono tracking-widest text-primary uppercase mb-4 block">O QUE ENTREGAMOS</span>
                    <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Soluções Tech Sob Medida</h2>
                    <p className="text-slate max-w-xl">
                        Desenvolvemos desde ferramentas pontuais até sistemas completos para resolver suas demandas com
                        máxima eficiência. Confira o que podemos fazer por você.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            transition={{delay: index * 0.1}}
                            viewport={{once: true}}
                            className="glass-card p-10 rounded-lg group hover:border-primary/50 transition-all duration-500 flex flex-col"
                        >
                            <div
                                className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform duration-500">
                                <i className={`bx ${service.icon} text-2xl`}></i>
                            </div>
                            <h3 className="text-2xl font-display font-semibold mb-6">{service.title}</h3>
                            <p className="text-slate text-sm leading-relaxed mb-auto">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-slate text-sm font-medium opacity-60">
                        Como cada projeto exige um escopo técnico único, nossos valores são personalizados sob consulta.
                    </p>
                </div>
            </div>
        </section>
    );
}
