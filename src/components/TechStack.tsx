import {motion} from 'motion/react';

import alpine from '../assets/tools/alpine.svg';
import bootstrap from '../assets/tools/bootstrap.svg';
import docker from '../assets/tools/docker.svg';
import node from '../assets/tools/node-js.svg';
import python from '../assets/tools/python.svg';
import react from '../assets/tools/react.svg';
import tailwind from '../assets/tools/tailwind.svg';
import typescript from '../assets/tools/typescript.svg';
import {Trans, useTranslation} from "react-i18next";

const technologies = [
    {id: "alpine", name: "ALPINE.JS", icon: alpine},
    {id: "bootstrap", name: "BOOTSTRAP", icon: bootstrap},
    {id: "docker", name: "DOCKER", icon: docker},
    {id: "node", name: "NODE.JS", icon: node},
    {id: "python", name: "PYTHON", icon: python},
    {id: "react", name: "REACT", icon: react},
    {id: "tailwind", name: "TAILWIND", icon: tailwind},
    {id: "typescript", name: "TYPESCRIPT", icon: typescript}
];

export default function TechStack() {
    const {t} = useTranslation();
    return (
        <section className="py-20 bg-surface-lowest border-y border-white/5">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <motion.div
                    initial={{opacity: 0}}
                    whileInView={{opacity: 1}}
                    transition={{duration: 1, delay: 0.2}}
                    viewport={{once: true}}
                >
                    <p className="text-[18px] font-mono tracking-widest text-slate mb-12 uppercase">
                        <Trans t={t} i18nKey="tech_stack.section_title" components={{
                            primary: <span className="text-primary"/>,
                        }}/>
                    </p>
                    <div className="flex flex-wrap justify-center gap-8 lg:gap-4">
                        {technologies.map((tech, i) => (
                            <motion.div
                                key={i}
                                whileHover={{y: -5}}
                                className="flex flex-col items-center justify-center w-32 h-32 lg:w-24 lg:h-24 glass-card rounded-md border border-white/5 hover:border-primary/40 transition-all duration-300"
                            >
                                <div
                                    className="w-14 h-14 lg:w-10 lg:h-10 mb-3 opacity-80 flex items-center justify-center">
                                    <img src={tech.icon} alt="OctaSystem Logo"
                                         className=" object-contain"/>
                                </div>
                                <span
                                    className="text-[14px] lg:text-[10px] font-mono font-bold tracking-tighter opacity-40">{tech.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
