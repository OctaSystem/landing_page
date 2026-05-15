import {useTranslation} from 'react-i18next';

function LanguageSpan({name, active, onClick}: {
    name: string;
    active: boolean,
    onClick: () => void
}) {
    return (
        <span
            onClick={onClick}
            className={
                active
                    ? 'text-white'
                    : 'hover:text-white cursor-pointer transition-colors'}>{name}</span>
    );
}

export default function LanguageSwitcher({icon}: { icon?: boolean }) {
    const {i18n} = useTranslation();

    return (
        <div className="flex gap-2">
            <div className="flex items-center gap-2 text-xs font-mono font-medium text-slate">
                <LanguageSpan name="PT" active={i18n.language === 'pt-BR'}
                              onClick={() => i18n.changeLanguage('pt-BR')}/>
              
                <span className="opacity-30">/</span>

                <LanguageSpan name="EN" active={i18n.language === 'en-US'}
                              onClick={() => i18n.changeLanguage('en-US')}/>

                {icon && <i className='bx bx-globe text-base ml-1'></i>}
            </div>
        </div>
    );
}

