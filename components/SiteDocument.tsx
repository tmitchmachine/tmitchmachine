import type { Metadata } from "next";
import SiteScripts from "./SiteScripts";
import { SiteBorders, SiteHeader } from "./SiteHeader";

export const siteMetadata: Metadata = {
  title: "T Mitch Machine",
  description: "description",
  authors: [{ name: "Mashup templates have been developped by Orson.io team" }],
  other: { google: "notranslate", "msapplication-tap-highlight": "no" },
  icons: {
    shortcut: "/static/assets/images/verified.png",
    apple: { url: "/static/assets/apple-icon-180x180.png", sizes: "180x180" },
  },
};

// The <html>/<body> shell every page shared in the Flask templates. The site
// has two variants (home vs. everything else), each used by its own root layout.
export default function SiteDocument({
  bodyClass,
  navVariant,
  init,
  children,
}: {
  bodyClass: string;
  navVariant: "default" | "inverse";
  init: ("type" | "movingBackgroundImage" | "navActivePage")[];
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link href="/static/main.3f6952e4.css" rel="stylesheet" />
      </head>
      <body className={bodyClass}>
        <SiteBorders />
        <SiteHeader variant={navVariant} />
        {children}
        <SiteScripts init={init} />
      </body>
    </html>
  );
}
