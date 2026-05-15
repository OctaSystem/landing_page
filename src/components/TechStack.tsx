import { motion } from 'motion/react';

const technologies = [
  { name: "REACT", icon: "react" },
  { name: "NODE.JS", icon: "node" },
  { name: "PYTHON", icon: "python" },
  { name: "AWS", icon: "aws" },
  { name: "DOCKER", icon: "docker" },
  { name: "REACT", icon: "react" },
  { name: "NODE.JS", icon: "node" },
  { name: "PYTHON", icon: "python" }
];

export default function TechStack() {
  return (
    <section className="py-20 bg-surface-lowest border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           transition={{ duration: 1, delay: 0.2 }}
           viewport={{ once: true }}
        >
          <p className="text-[18px] font-mono tracking-widest text-slate mb-12 uppercase">Entregamos as <span className="text-primary">melhores ferramentas</span> no seu projeto</p>
          <div className="flex flex-wrap justify-center gap-4">
             {technologies.map((tech, i) => (
               <motion.div 
                 key={i}
                 whileHover={{ y: -5 }}
                 className="flex flex-col items-center justify-center w-24 h-24 glass-card rounded-md border border-white/5 hover:border-primary/40 transition-all duration-300"
               >
                 <div className="w-8 h-8 mb-3 opacity-60 flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full border border-white flex items-center justify-center">
                       <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                 </div>
                 <span className="text-[8px] font-mono font-bold tracking-tighter opacity-40">{tech.name}</span>
               </motion.div>
             ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
