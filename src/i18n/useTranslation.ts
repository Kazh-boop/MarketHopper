import { useSettings } from '@/context/SettingsContext';

import { translations, type Translation } from './translations';

export function useTranslation(): Translation {
    const { settings } = useSettings();
    return translations[settings.language];
}
