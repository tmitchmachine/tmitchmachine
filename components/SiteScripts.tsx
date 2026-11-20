"use client";

import Script from "next/script";

// Globals the legacy bundle assigns to window (see public/static/main.*.js).
type LegacyInit = "type" | "movingBackgroundImage" | "navActivePage";

// Loads the original compiled jQuery/Bootstrap bundle after hydration, then
// runs the same init calls the Flask templates ran on DOMContentLoaded.
export default function SiteScripts({ init }: { init: LegacyInit[] }) {
  return (
    <Script
      src="/static/main.70a66962.js"
      strategy="afterInteractive"
      onReady={() => {
        const w = window as unknown as Record<LegacyInit, (() => void) | undefined>;
        init.forEach((fn) => w[fn]?.());
      }}
    />
  );
}
