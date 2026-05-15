import { Link } from 'react-router-dom';

import logo from '../assets/logo.svg';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-10 bg-surface-lowest border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img src={logo} alt="Octa System Logo" className="w-8 h-8 object-contain" />
              <span className="font-display font-bold text-lg tracking-tight">
                Octa<span className="text-primary">System</span>
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate uppercase tracking-[0.2em] w-[500px]">
              Copyright © {year} CNPJ:00.000.000/0000-00
            </p>
          </div>

          <div className="flex flex-wrap gap-8 md:gap-12 items-center">
            <div className="flex items-center gap-4 ml-4">
              <Link to="/contact" className="px-6 py-2 bg-primary text-white text-[10px] font-mono font-bold uppercase tracking-widest rounded-md hover:bg-primary-dim transition-all duration-300 glow-azure">
                Contate-nos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
