import {
  CONTACT_EMAIL,
  DEFAULT_DESCRIPTION,
  PRESS_EMAIL,
  PARTNERS_EMAIL,
  PRIVACY_EMAIL,
  SITE_NAME,
  SITE_THEME_COLOR,
  SUPPORT_EMAIL,
  SITE_URL,
} from "@/lib/seo/site";
import { absoluteUrl } from "@/lib/seo/url";
import type { ReactNode } from "react";

export type StructuredDataPage =
  | "home"
  | "about"
  | "contact"
  | "partner"
  | "privacy"
  | "terms"
  | "cookies"
  | "user-agreement";

function buildOrganization() {
  const contactPoints = [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: SUPPORT_EMAIL,
    },
    {
      "@type": "ContactPoint",
      contactType: "partnerships",
      email: PARTNERS_EMAIL,
    },
    {
      "@type": "ContactPoint",
      contactType: "press",
      email: PRESS_EMAIL,
    },
    {
      "@type": "ContactPoint",
      contactType: "privacy",
      email: PRIVACY_EMAIL,
    },
  ];

  return {
    "@type": "Organization",
    "@id": `${SITE_URL}#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/brand/matchtech-wordmark-square.png"),
    email: CONTACT_EMAIL,
    contactPoint: contactPoints,
  };
}

function buildWebSite() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    url: SITE_URL,
    name: SITE_NAME,
  };
}

function buildSoftwareApplication() {
  return {
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}#software`,
    name: SITE_NAME,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    // Brand accent without claiming any runtime features.
    themeColor: SITE_THEME_COLOR,
  };
}

function buildWebPage({
  pageUrl,
  title,
  description,
}: {
  pageUrl: string;
  title: string;
  description: string;
}) {
  return {
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: title,
    description,
  };
}

function buildContactPage({
  pageUrl,
  title,
}: {
  pageUrl: string;
  title: string;
}) {
  return {
    "@type": "ContactPage",
    url: pageUrl,
    name: title,
    inLanguage: "en",
    mainEntity: {
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
    },
  };
}

export function MatchTechStructuredData({
  page,
  path,
  title,
  description,
  children,
}: {
  page: StructuredDataPage;
  path: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  const pageUrl = absoluteUrl(path);

  const graph: unknown[] = [
    buildOrganization(),
    buildWebSite(),
    buildSoftwareApplication(),
    buildWebPage({ pageUrl, title, description }),
  ];

  if (page === "contact") {
    graph.push(buildContactPage({ pageUrl, title }));
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <>
      {children}
      <script
        type="application/ld+json"
        // Script is injected server-side for crawlability.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}

