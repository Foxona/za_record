import { makeAutoObservable } from "mobx";
// import { observer } from "mobx-react";

// import enUS from "antd/lib/locale/en_US";
import ruRU from "antd/lib/locale/ru_RU";
import { Button } from "antd";

class Language {
  systemLanguage = ruRU;
  commonLanguage = "ruRU";

  constructor() {
    makeAutoObservable(this);
  }
}

export const myLanguage = new Language();
