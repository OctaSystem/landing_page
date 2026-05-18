import {motion} from 'motion/react';
import {useTranslation} from "react-i18next";
import {useRemoteContent} from "../content";

type ServicesContent = {
    title: string;
    description: string;
    items: {
        title: string;
        description: string;
        icon: string;
    }[];
};

export default function Services() {
    const {data} = useRemoteContent<Partial<ServicesContent>>('services', {});
    const {t} = useTranslation();

    return (
        <section id="services" className="py-24 relative overflow-hidden bg-surface-low">
            {/* Abstract Shape */}
            <div
                className="absolute top-1/2 left-0 -translate-y-1/2 -z-10 w-200 h-200 bg-primary/5 rounded-full blur-[150px] opacity-10"/>

            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col items-end text-right mb-24">
                    <span
                        className="text-[18px] lg:text-[12px] font-mono tracking-widest text-primary uppercase mb-4 block">{t("services.section_title")}</span>
                    <h2 className="text-4xl md:text-6xl font-display font-bold mb-2">{data.title}</h2>
                    <p className="text-slate max-w-xl">
                        {data.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.items?.map((service, index) => (
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
                                <i className={`bx ${service.icon} text-3xl`}></i>
                            </div>
                            <h3 className="text-2xl font-display font-semibold mb-6">{service.title}</h3>
                            <p className="text-slate text-sm leading-relaxed mb-auto text-justify">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-slate text-sm font-medium opacity-60">
                        {t("services.alert_message")}
                    </p>
                </div>
            </div>
        </section>
    );
}
