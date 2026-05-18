import {motion} from 'motion/react';
import {useState} from 'react';
import {Link} from 'react-router-dom';

import logo from '../assets/logo.svg';
import LanguageSwitcher from "./LanguageSwitcher.tsx";
import {useTranslation} from "react-i18next";

export default function Navbar() {
    const {t} = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-surface-low/80 backdrop-blur-xl border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3">
                    <img src={logo} alt="OctaSystem Logo" className="w-10 h-10 object-contain"/>
                    <span className="font-display font-bold text-xl tracking-tight">
                        Octa<span className="text-primary truncate">System</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-10">
                    <a href="/#services"
                       className="text-sm font-medium text-slate hover:text-white transition-colors">{t('navbar.services')}</a>
                    <a href="/#how_we_work"
                       className="text-sm font-medium text-slate hover:text-white transition-colors">{t('navbar.how_we_work')}</a>
                    <Link to="/contact"
                          className="text-sm font-medium text-slate hover:text-white transition-colors">{t('navbar.contact')}</Link>

                    <div className="border-l-3 border-white/10 pl-10">
                        <LanguageSwitcher icon={true}/>
                    </div>
                </div>

                {/* Mobile menu button */}
                <button
                    className="md:hidden text-white text-2xl flex items-center"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <i className='bx bx-x'></i> : <i className='bx bx-menu'></i>}
                </button>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <motion.div
                    initial={{opacity: 0, y: -20}}
                    animate={{opacity: 1, y: 0}}
                    className="md:hidden absolute top-20 left-0 right-0 bg-surface border-b border-white/10 p-6 flex flex-col gap-6"
                >
                    <a href="/#services" className="text-lg font-medium"
                       onClick={() => setIsOpen(false)}>{t('navbar.services')}</a>
                    <a href="/#how_we_work" className="text-lg font-medium"
                       onClick={() => setIsOpen(false)}>{t('navbar.how_we_work')}</a>
                    <Link to="/contact" className="text-lg font-medium"
                          onClick={() => setIsOpen(false)}>{t('navbar.contact')}</Link>

                    <LanguageSwitcher/>
                </motion.div>
            )}
        </nav>
    );
}
