import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://whale-insights.vercel.app"),
  title: "Whale Resilience — They were hunted to the edge. They came back.",
  description:
    "Explore 120 years of whale population data — a story of destruction, protection, and slow, stubborn resilience.",
  openGraph: {
    title: "Whale Resilience",
    description:
      "120 years of whale populations: decline, near-extinction, protection, return.",
    type: "website",
    url: "/",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 1200,
        alt: "Kayakers paddling toward Cape Town's coastline at sunrise.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Whale Resilience",
    description:
      "120 years of whale populations: decline, near-extinction, protection, return.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-ocean-deep text-ink-primary">{children}</body>
    </html>
  );
}
