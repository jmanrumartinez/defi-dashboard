import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { DashboardSidebar } from "@/components/sidebar/DashboardSidebar";

import TranslationsProvider from "@/i18n/TranslationsProvider";
import initTranslations from "@/i18n/initTranslations";
import { Providers } from "@/components/shared/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { t } = await initTranslations(locale, ["common"]);

  return {
    title: t("app_title"),
    description: t("app_description"),
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TranslationsProvider locale={locale} namespaces={["common"]}>
          <Providers>
            <div className="flex h-screen w-full">
              <DashboardSidebar />
              <main className="w-full py-4 px-6">{children}</main>
            </div>
          </Providers>
        </TranslationsProvider>
      </body>
    </html>
  );
}
