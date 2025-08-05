import { PortfolioBalance } from "@/components/dashboard/PortfolioBalance";
import initTranslations from "@/i18n/initTranslations";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { t } = await initTranslations(locale, ["common"]);

  return (
    <div>
      <p>Hello to {t("app_title")}</p>
      <PortfolioBalance />
    </div>
  );
}
