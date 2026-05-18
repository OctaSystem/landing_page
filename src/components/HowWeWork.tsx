import {motion} from 'motion/react';
import {useRemoteContent} from "../content";
import {useTranslation} from "react-i18next";

type HowWeWorkContent = {
    title: string;
    description: string;
    items: {
        title: string;
        description: string;
    }[];
};

export default function HowWeWork() {
    const {data} = useRemoteContent<Partial<HowWeWorkContent>>('how_we_work', {});
    const {t} = useTranslation();

    return (
        <section id="how_we_work" className="py-24 bg-surface-lowest">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-8 lg:mb-16">
                    <span
                        className="text-[18px] lg:text-[12px] font-mono tracking-widest text-primary uppercase mb-4 block">{t("how_we_work.section_title")}</span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-2">
                        {data.title}</h2>
                    <p className="text-slate max-w-xl">
                        {data.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {data.items?.map((card, index) => (
                        <motion.div
                            key={card.title}
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            transition={{delay: index * 0.1}}
                            viewport={{once: true}}
                            className="glass-card p-6 lg:p-10 rounded-lg group hover:border-primary/50 transition-all duration-500"
                        >
                            <h3 className="text-2xl font-display font-semibold mb-6">{card.title}</h3>
                            <p className="text-slate text-sm leading-relaxed mb-0 min-h-35 text-justify">
                                {card.description}
                            </p>
                            {/*<a href="#"*/}
                            {/*   className="inline-flex items-center gap-2 text-xs font-mono font-medium hover:text-primary transition-colors">*/}
                            {/*    Saber mais <i className='bx bx-right-arrow-alt text-base'></i>*/}
                            {/*</a>*/}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
