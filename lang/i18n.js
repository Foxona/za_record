import i18next from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {
            "Welcome to React": "Welcome to React and react-i18next"
        }
    },
    ru: {
        translation: {
            "Добро пожаловать в реакт": "Bienvenue à React et react-i18next"
        }
    }
};

i18next
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "en",
        fallbackLng: ["en", "ru"], // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
        // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
        // if you're using a language detector, do not define the lng option

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

i18next.on('languageChanged', (lng) => {
    // E.g. set the moment locale with the current language
    moment.locale(lng);

    // then re-render your app
    app.render();
});

export default i18next;
