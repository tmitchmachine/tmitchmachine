import SiteDocument, { siteMetadata } from "@/components/SiteDocument";

export const metadata = siteMetadata;

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <SiteDocument bodyClass="minimal" navVariant="inverse" init={["type", "movingBackgroundImage"]}>
      {children}
    </SiteDocument>
  );
}
