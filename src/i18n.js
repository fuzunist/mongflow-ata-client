import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector'

import tr from './locales/tr.json'
import en from './locales/en.json'

const resources = {
    tr: {
        translation: tr
    },
    en: {
        translation: en
    }
}

i18n.use(initReactI18next).use(I18nextBrowserLanguageDetector).init({
    fallbackLng: 'tr',
    resources
})

export default i18n
