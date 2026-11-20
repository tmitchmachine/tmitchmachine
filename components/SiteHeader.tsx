"use client";

import { usePathname } from "next/navigation";

// Shared site chrome. Links stay plain <a> tags with "./page" hrefs: the
// legacy jQuery bundle's navActivePage() matches on exactly that href format,
// and full page loads let the bundle initialize the same way it always has.

export const NAV_LINKS = [
  { href: "./home", label: "01 : Home" },
  { href: "./highlights", label: "02 : Highlights" },
  { href: "./about", label: "03 : About" },
  { href: "./contact", label: "04 : Contact" },
  { href: "https://ventures.tmitchmachine.com", label: "05 : Ventures" },
  { href: "./projects", label: "06 : Projects" },
  { href: "./media", label: "07 : Media" },
  { href: "https://music.tmitchmachine.com", label: "08 : Music" },
];

type SubNavLink = { href: string; label: string; active?: boolean };

// The small "001 / 002" pager shown in the header of the deal/event detail pages.
const SUB_NAV: Record<string, SubNavLink[]> = {
  "/deals001": [{ href: "./deals001", label: "001", active: true }, { href: "./events001", label: "002" }],
  "/deals002": [{ href: "./deals001", label: "001", active: true }, { href: "./deals002", label: "002" }],
  "/deals003": [{ href: "./deals001", label: "001", active: true }, { href: "./deals002", label: "002" }],
  "/events001": [{ href: "./deals001", label: "001" }, { href: "./events001", label: "002", active: true }],
  "/events002": [{ href: "./events001", label: "001", active: true }, { href: "./events002", label: "002" }],
};

export function SiteBorders() {
  return (
    <>
      <div id="site-border-left"></div>
      <div id="site-border-right"></div>
      <div id="site-border-top"></div>
      <div id="site-border-bottom"></div>
    </>
  );
}

export function SiteHeader({ variant }: { variant: "default" | "inverse" }) {
  const subNav = SUB_NAV[usePathname()];
  return (
    <header>
      <nav className={`navbar  navbar-fixed-top navbar-${variant}`}>
        <div className="container">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#navbar-collapse"
            aria-expanded="false"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbar-collapse">
            <ul className="nav navbar-nav ">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} title="">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            {subNav && (
              <ul className="nav navbar-nav navbar-right navbar-small visible-md visible-lg">
                {subNav.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} title="" className={link.active ? "active" : undefined}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
