import {createContext, type ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState,} from 'react';
import {createPortal} from 'react-dom';

export type ToastVariant = 'success' | 'error' | 'info' | 'warning';

export type ToastInput = {
    title: string;
    description?: string;
    variant?: ToastVariant;
    duration?: number;
};

type ToastRecord = {
    id: string;
    title: string;
    description?: string;
    variant: ToastVariant;
    duration: number;
};

type ToastContextValue = {
    showToast: (toast: ToastInput) => string;
    success: (title: string, description?: string, duration?: number) => string;
    error: (title: string, description?: string, duration?: number) => string;
    info: (title: string, description?: string, duration?: number) => string;
    warning: (title: string, description?: string, duration?: number) => string;
    dismissToast: (id: string) => void;
    dismissAllToasts: () => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);
const DEFAULT_TOAST_DURATION = 5000;

const VARIANT_STYLES: Record<ToastVariant, string> = {
    success: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-50 shadow-emerald-900/20',
    error: 'border-red-400/30 bg-red-400/10 text-red-50 shadow-red-900/20',
    info: 'border-blue-400/30 bg-blue-400/10 text-blue-50 shadow-blue-900/20',
    warning: 'border-amber-400/30 bg-amber-400/10 text-amber-50 shadow-amber-900/20',
};

const VARIANT_ICONS: Record<ToastVariant, string> = {
    success: 'bx-check-circle',
    error: 'bx-error-circle',
    info: 'bx-info-circle',
    warning: 'bx-error-alt',
};

function createToastId(): string {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
        return crypto.randomUUID();
    }

    return `toast-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function ToastCard({toast, onDismiss}: { toast: ToastRecord; onDismiss: (id: string) => void }) {
    return (
        <article
            role={toast.variant === 'error' ? 'alert' : 'status'}
            aria-live={toast.variant === 'error' ? 'assertive' : 'polite'}
            className={`pointer-events-auto rounded-md border px-4 py-2 shadow-2xl backdrop-blur-xl transition-transform duration-200 hover:-translate-y-0.5 ${VARIANT_STYLES[toast.variant]}`}
        >
            <div className="flex items-start gap-3">
                <div
                    className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-xl">
                    <i className={`bx ${VARIANT_ICONS[toast.variant]}`}></i>
                </div>

                <div className="min-w-0 flex-1 space-y-1">
                    <p className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white/90">
                        {toast.title}
                    </p>
                    {toast.description ? (
                        <p className="text-sm leading-5 text-white/80">
                            {toast.description}
                        </p>
                    ) : null}
                </div>

                <button
                    type="button"
                    onClick={() => onDismiss(toast.id)}
                    className="rounded-full p-1 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                    aria-label="Dismiss notification"
                >
                    <i className="bx bx-x text-lg"></i>
                </button>
            </div>
        </article>
    );
}

export function ToastProvider({children}: { children: ReactNode }) {
    const [toasts, setToasts] = useState<ToastRecord[]>([]);
    const timersRef = useRef(new Map<string, ReturnType<typeof setTimeout>>());

    const dismissToast = useCallback((id: string) => {
        const timer = timersRef.current.get(id);

        if (timer) {
            clearTimeout(timer);
            timersRef.current.delete(id);
        }

        setToasts((current) => current.filter((toast) => toast.id !== id));
    }, []);

    const dismissAllToasts = useCallback(() => {
        timersRef.current.forEach((timer) => clearTimeout(timer));
        timersRef.current.clear();
        setToasts([]);
    }, []);

    const showToast = useCallback((toast: ToastInput) => {
        const id = createToastId();
        const variant = toast.variant ?? 'info';
        const duration = toast.duration ?? DEFAULT_TOAST_DURATION;

        setToasts((current) => [...current, {
            id,
            title: toast.title,
            description: toast.description,
            variant,
            duration
        }]);

        if (duration > 0) {
            const timer = setTimeout(() => {
                dismissToast(id);
            }, duration);

            timersRef.current.set(id, timer);
        }

        return id;
    }, [dismissToast]);

    const api = useMemo<ToastContextValue>(() => ({
        showToast,
        success: (title, description, duration) => showToast({title, description, variant: 'success', duration}),
        error: (title, description, duration) => showToast({title, description, variant: 'error', duration}),
        info: (title, description, duration) => showToast({title, description, variant: 'info', duration}),
        warning: (title, description, duration) => showToast({title, description, variant: 'warning', duration}),
        dismissToast,
        dismissAllToasts,
    }), [dismissAllToasts, dismissToast, showToast]);

    useEffect(() => {
        return () => {
            timersRef.current.forEach((timer) => clearTimeout(timer));
            timersRef.current.clear();
        };
    }, []);

    const viewport = typeof document !== 'undefined'
        ? createPortal(
            <div
                className="pointer-events-none fixed right-4 top-24 z-[100] flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-3 sm:right-6 sm:top-6">
                {toasts.map((toast) => (
                    <ToastCard key={toast.id} toast={toast} onDismiss={dismissToast}/>
                ))}
            </div>,
            document.body,
        )
        : null;

    return (
        <ToastContext.Provider value={api}>
            {children}
            {viewport}
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }

    return context;
}


