import SiteDocument, { siteMetadata } from "@/components/SiteDocument";

export const metadata = siteMetadata;

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <SiteDocument bodyClass="" navVariant="default" init={["navActivePage"]}>
      {children}
    </SiteDocument>
  );
}
