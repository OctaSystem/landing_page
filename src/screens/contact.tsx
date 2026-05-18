import {Link} from 'react-router-dom';
import Dropdown, {type DropdownOption} from "../components/Dropdown.tsx";
import {useRemoteContent} from "../content";
import {useTranslation} from "react-i18next";
import {type FormEvent, useEffect, useRef, useState} from "react";
import type {toBoolean} from "../types/toBooleans.ts";
import {useToast} from "../toast";
import axios from "axios";

type AlternativeContactType = 'email';

type ContactContent = {
    interest: DropdownOption[];
    alternative_contact: {
        type: AlternativeContactType;
        icon: string;
        name: string;
        email: string;
    }[];
};

interface ContactForm {
    name: string;
    email: string;
    interest: any;
    demand: string;
    cnpj: string;
    age: number; // Honeypot field
}

const EMPTY_ERRORS: Partial<toBoolean<ContactForm>> = {
    name: false,
    email: false,
    interest: false,
};

export default function Contact() {
    const {t} = useTranslation();
    const {error: toastError, success: toastSuccess} = useToast();
    const {data} = useRemoteContent<Partial<ContactContent>>('contact_us', {interest: [], alternative_contact: []});

    const [form, setForm] = useState<Partial<ContactForm>>({age: 0});
    const [errors, setErrors] = useState<Partial<toBoolean<ContactForm>>>(EMPTY_ERRORS);
    const clearErrorsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (clearErrorsTimeoutRef.current) {
                clearTimeout(clearErrorsTimeoutRef.current);
            }
        };
    }, []);

    const validateForm = (): boolean => {
        const newErrors: Partial<toBoolean<ContactForm>> = {};

        if (!form.name?.trim())
            newErrors.name = true;

        if (!form.email?.trim())
            newErrors.email = true;
        else if (!/\S+@\S+\.\S+/.test(form.email))
            newErrors.email = true;

        if (!form.interest?.trim())
            newErrors.interest = true;

        setErrors({...EMPTY_ERRORS, ...newErrors});

        if (clearErrorsTimeoutRef.current)
            clearTimeout(clearErrorsTimeoutRef.current);

        clearErrorsTimeoutRef.current = setTimeout(() => {
            setErrors(EMPTY_ERRORS);
        }, 5000);

        if (Object.keys(newErrors).length > 0)
            toastError(
                t('contact_us.toast.validation_error.title'),
                t('contact_us.toast.validation_error.description'),
            );


        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if ((form.age ?? 0) > 0) return;

        if (!validateForm()) return;

        const descripition = `
## 👤 Informações do Cliente
**_Nome:_**
${form.name}
**_Email:_**
${form.email}
**_CNPJ:_**
${form.cnpj || "_Não informado_"}

## 🛠️ Detalhamento da Demanda
${form.demand}

# 🐙 Solicitação via LP`;

        //
        // setForm({age: 0});
        // setErrors(EMPTY_ERRORS);
        axios.post(process.env.CLICKUP_URL,
            {
                list_id: process.env.CLICKUP_LIST_ID,
                task: {
                    name: form.name?.trim(),
                    description: descripition,
                    age: form.age ?? 0,
                    tags: [form.interest]
                }
            }, {
                auth: {
                    username: process.env.CLICKUP_USER,
                    password: process.env.CLICKUP_PASS
                }
            }
        ).then(() => {
            toastSuccess(
                t('contact_us.toast.success.title'),
                t('contact_us.toast.success.description'),
            );
        }).catch(() => {
            toastError(
                t('contact_us.toast.error.title'),
                t('contact_us.toast.error.description'),
            );
        })

    }

    return (
        <div className="min-h-screen bg-surface-lowest pt-32 pb-20 px-6">
            <div className="max-w-5xl mx-auto">
                <Link to="/"
                      className="inline-flex items-center gap-2 text-slate hover:text-white transition-colors mb-12 text-sm font-mono uppercase tracking-widest group">
                    <i className='bx bx-left-arrow-alt text-base group-hover:-translate-x-1 transition-transform'></i>
                    {t("contact_us.go_back")}
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-10">
                    <div className="lg:col-span-7">
                        <div className="mb-12">
                            <h1 className="h-14 lg:h-16 text-4xl md:text-5xl font-display font-bold content-end pb-3">
                                {t("contact_us.form.title")}
                            </h1>
                            <div className="h-px w-full bg-white/10"/>
                        </div>

                        <form className="space-y-6 lg:space-y-8" onSubmit={handleSubmit}>
                            <input className="hidden" type="text" name="age" max="70"
                                   onChange={(e) => setForm({...form, age: parseInt(e.target.value)})}/>

                            <div className="space-y-4">
                                <label
                                    className="text-[14px] lg:text-[12px] mb-2 font-mono text-slate uppercase tracking-[0.2em] block">
                                    {t("contact_us.form.your_name.label")}
                                    <span className="text-red-700/70">
                                        {errors.name ? (
                                            <>
                                                <br/>
                                                {t("contact_us.form.your_name.error")}
                                            </>
                                        ) : "*"}
                                    </span>
                                </label>
                                <input type="text" onChange={(e) => setForm({...form, name: e.target.value})}
                                       placeholder={t("contact_us.form.your_name.placeholder")} name="name"
                                       className={`w-full bg-white/3 border-b-2 border-white/10 p-4 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-white/20 font-mono ${errors.name ? "!border-red-700/50 !bg-red-700/5" : ""}`}/>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-8 gap-6 lg:gap-10">
                                <div className="space-y-4 md:col-span-3">
                                    <label
                                        className={`text-[14px] lg:text-[12px] mb-2 font-mono text-slate uppercase tracking-[0.2em] block ${errors.email ? "md:mb-6" : ""}`}>
                                        {t("contact_us.form.your_cnpj.label")}
                                    </label>
                                    <input type="text" onChange={(e) => setForm({...form, cnpj: e.target.value})}
                                           placeholder={t("contact_us.form.your_cnpj.placeholder")} name="cnpj"
                                           className="w-full bg-white/3 border-b-2 border-white/10 p-4 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-white/20 font-mono"/>
                                </div>

                                <div className="space-y-4 md:col-span-5">
                                    <label
                                        className="text-[14px] lg:text-[12px] mb-2 font-mono text-slate uppercase tracking-[0.2em] block">
                                        {t("contact_us.form.your_email.label")}
                                        <span className="text-red-700/70">
                                            {errors.email ? (
                                                <>
                                                    <br/>
                                                    {t("contact_us.form.your_email.error")}
                                                </>
                                            ) : "*"}
                                        </span>
                                    </label>
                                    <input type="email" onChange={(e) => setForm({...form, email: e.target.value})}
                                           placeholder={t("contact_us.form.your_email.placeholder")} name="email"
                                           className={`w-full bg-white/3 border-b-2 border-white/10 p-4 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-white/20 font-mono ${errors.email ? "!border-red-700/50 !bg-red-700/5" : ""}`}/>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label
                                    className="text-[14px] lg:text-[12px] mb-2 font-mono text-slate uppercase tracking-[0.2em] block">
                                    {t("contact_us.form.your_interest.label")}
                                    <span className="text-red-700/70">
                                        {errors.interest ? (
                                            <>
                                                <br/>
                                                {t("contact_us.form.your_interest.error")}
                                            </>
                                        ) : "*"}
                                    </span>
                                </label>
                                <Dropdown placeholder={t("contact_us.form.your_interest.placeholder")}
                                          invalid={Boolean(errors.interest)} options={data.interest}
                                          onSelect={(option) => setForm({...form, interest: String(option.id)})}
                                          className="w-full bg-white/3 border-b-2 border-white/10 p-4 text-sm focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer text-white/50 font-mono"/>
                            </div>

                            <div className="space-y-4">
                                <label
                                    className="text-[14px] lg:text-[12px] mb-2 font-mono text-slate uppercase tracking-[0.2em] block">
                                    {t("contact_us.form.your_demand.label")}
                                </label>
                                <textarea rows={4} onChange={(e) => setForm({...form, demand: e.target.value})}
                                          placeholder={t("contact_us.form.your_demand.placeholder")} name="demand"
                                          className="w-full bg-white/3 border-b-2 border-white/10 p-4 text-sm focus:outline-none focus:border-primary transition-colors resize-none placeholder:text-white/20 font-mono"/>
                            </div>

                            <div className="flex justify-end pt-6">
                                <button
                                    className="px-10 py-4 bg-primary hover:bg-primary-dim text-white rounded-md font-mono font-bold uppercase tracking-widest transition-all duration-300 glow-azure flex items-center gap-3">
                                    {t("contact_us.form.submit_button")} <i className='bx bx-send text-xl'></i>
                                </button>
                            </div>
                        </form>
                    </div>

                    <aside className="lg:col-span-5">
                        <div className="mb-12">
                            <h2 className="h-12 lg:h-16 text-3xl font-display font-bold text-white/90 content-end pb-3">
                                {t("contact_us.alternative_contact.title")}
                            </h2>
                            <div className="h-px w-full bg-white/10"/>
                        </div>

                        {(data.alternative_contact ?? []).map((contact, index) => (
                            <div className="flex gap-4" key={index}>
                                <div className="p-2 flex content-center bg-primary/10 rounded-md text-primary">
                                    <i className={`bx ${contact.icon} text-2xl flex content-center`}></i>
                                </div>
                                <div className="space-y-1">
                                    <span
                                        className="text-[14px] lg:text-[10px] font-mono text-slate uppercase tracking-[0.2em] block opacity-60">
                                        {contact.name}
                                    </span>

                                    {contact.type === 'email' && (
                                        <a href={`mailto:${contact.email}`}
                                           className="text-[18px] lg:text-[16px] font-mono text-primary font-medium hover:text-primary-dim transition-colors block">
                                            {contact.email}
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </aside>
                </div>
            </div>
        </div>
    );
}
