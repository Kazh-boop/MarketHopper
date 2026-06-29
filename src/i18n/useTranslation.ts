import { useSettings } from '@/context/SettingsContext';
import { translations } from './translations';

export function useTranslation() {
    const { language } = useSettings();
    return translations[language];
}
