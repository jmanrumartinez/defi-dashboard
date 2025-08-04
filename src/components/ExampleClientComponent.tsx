"use client";

import { useTranslation } from "react-i18next";

export const ExampleClientComponent = () => {
  const { t } = useTranslation();

  return <div>Hello World from client {t("app_title")}</div>;
};
