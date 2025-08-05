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
      <PortfolioBalance />
    </div>
  );
}
