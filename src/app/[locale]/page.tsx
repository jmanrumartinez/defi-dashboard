import { ExampleClientComponent } from "@/components/ExampleClientComponent";
import initTranslations from "@/i18n/initTranslations";
import TranslationsProvider from "@/i18n/TranslationsProvider";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
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
