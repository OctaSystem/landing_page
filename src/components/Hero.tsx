import {motion} from 'motion/react';
import {Trans, useTranslation} from "react-i18next";

export default function Hero() {
    const {t} = useTranslation();
    return (
        <section className="relative pt-40 pb-20 overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 -z-10 w-full h-full">
                <div
                    className="absolute top-1/4 right-[10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]"/>
                <div
                    className="absolute bottom-1/4 left-[5%] w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px]"/>
            </div>

            <div className="max-w-4xl mx-auto px-6 text-center">
                <motion.h1
                    initial={{opacity: 0, y: 30}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.8, ease: "easeOut"}}
                    className="text-4xl md:text-6xl font-display font-bold leading-[1.1] mb-8"
                >
                    <Trans t={t} i18nKey="hero.title" components={{
                        muted: <span className="text-white/50"/>,
                        primary: <span className="text-primary"/>
                    }}/>
                </motion.h1>

                <motion.p
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.8, delay: 0.2, ease: "easeOut"}}
                    className="text-lg md:text-xl text-slate max-w-1xl mx-auto mb-12 leading-relaxed"
                >
                    {t('hero.description')}
                </motion.p>

                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.8, delay: 0.4}}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <a href={'/contact'}
                       className="uppercase w-full sm:w-auto px-10 py-4 bg-primary hover:bg-primary-dim text-white rounded-md font-medium transition-all duration-300 glow-azure flex items-center justify-center gap-2 group">
                        {t('hero.contact_button')}
                    </a>
                    <a href={'/#services'}
                       className="uppercase w-full sm:w-auto px-10 py-4 bg-white/5 hover:bg-white/10 text-white rounded-md font-medium border border-white/10 transition-all duration-300">
                        {t('hero.services_button')}
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
