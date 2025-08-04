import { ExampleClientComponent } from "@/components/ExampleClientComponent";
import initTranslations from "@/i18n/initTranslations";
import TranslationsProvider from "@/i18n/TranslationsProvider";

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t } = await initTranslations(locale, ["common"]);

  return (
    <TranslationsProvider locale={locale} namespaces={["common"]}>
      <div>
        <p>Hello to {t("app_title")}</p>
        <ExampleClientComponent />
      </div>
    </TranslationsProvider>
  );
}
