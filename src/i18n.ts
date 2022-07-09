import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
// config
import { defaultLang } from "./config";
//
import transEN from "./locales/en.json";
import transVN from "./locales/vn.json";

// ----------------------------------------------------------------------
const resources = {
  en: {
    translation: transEN,
  },
  sv: {
    translation: transVN,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem("i18nextLng") || defaultLang.value,
    fallbackLng: defaultLang.value,
    debug: true,
    ns: ["translation"],
    defaultNS: "translation",
    interpolation: {
      escapeValue: false,
    },
    parseMissingKeyHandler: (key) => `Trans>>${key}<<`,
  });

export default i18n;
