import { PortfolioBalance } from "@/components/dashboard/PortfolioBalance";
import { YourAssets } from "@/components/dashboard/YourAssets";
import initTranslations from "@/i18n/initTranslations";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { t } = await initTranslations(locale, ["common"]);

  return (
    <div className="flex flex-col gap-4">
      <PortfolioBalance />
      <YourAssets />
    </div>
  );
}
