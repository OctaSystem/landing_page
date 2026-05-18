import {useState} from 'react';
import {useTranslation} from 'react-i18next';

export type DropdownOption = {
    id: string | number;
    label: string;
};

type DropdownProps = {
    className?: string;
    options?: DropdownOption[];
    placeholder?: string;
    onSelect?: (option: DropdownOption) => void;
    invalid?: boolean;
};

export default function Dropdown({options, className = '', placeholder, onSelect, invalid}: DropdownProps) {
    const {t} = useTranslation();

    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<DropdownOption | null>(null);

    const triggerLabel = selected?.label ??
        <span className="text-white/20">{placeholder ?? t('system.dropdown_default_text')}</span>;

    function handleSelect(option: DropdownOption) {
        setSelected(option);
        setIsOpen(false);
        onSelect?.(option);
    }

    return (
        <div className="relative">
            <div className={`${className} cursor-pointer mb-0 ${invalid && "border-red-700/50! bg-red-700/5!"}`}
                 onClick={() => setIsOpen((current) => !current)}>
                {triggerLabel}
            </div>

            {isOpen && (
                <div
                    className="absolute left-0 top-full z-10 w-full overflow-hidden rounded-0 border-white/10 bg-surface-low shadow-lg">
                    {options?.map((item) => {
                        const currentSeleted = selected?.id === item.id;

                        return (
                            <div key={item.id}
                                 onClick={() => handleSelect(item)}
                                 className={`cursor-pointer p-4 text-sm text-white/80 transition-colors hover:text-white ${currentSeleted ? " bg-primary/10" : "hover:bg-white/5"}`}>
                                {item.label}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
