import "../styles/globals.scss";
import type { AppProps } from "next/app";
import "antd/dist/antd.css";
import { ConfigProvider } from "antd";
import enUS from "antd/lib/locale/en_US";
import ruRU from "antd/lib/locale/ru_RU";
import eng from "../lang/eng.json";
import ru from "../lang/ru.json";
import { myLanguage } from "../stores/langStore";
import "../lang/i18n";
import { Trans } from "react-i18next";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider locale={myLanguage.systemLanguage}>
      <Trans>
        <Component {...pageProps} />
      </Trans>
    </ConfigProvider>
  );
}

export default MyApp;
