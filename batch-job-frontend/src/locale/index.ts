import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enUS from './en-US/translation.json';
import zhCN from './zh-CN/translation.json';
import ja from './ja-JP/translation.json';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    'en-US': {
        translation: enUS,
    },
    'zh-CN': {
        translation: zhCN,
    },
    'ja-JP': {
        translation: ja,
    },
};

i18n.use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources,
        debug: true,
        lng: 'en-US',
        fallbackLng: 'en-US',
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: [
                'querystring',
                'cookie',
                'localStorage',
                'navigator',
                'htmlTag',
            ],
            caches: ['localStorage', 'cookie'],
        },
    })
    .then(() => {});

export default i18n;
