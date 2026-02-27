import type { Metadata } from "next";
import { Archivo, DM_Sans } from "next/font/google";
import { AnimationProvider } from "@/components/animations/AnimationProvider";
import CrispChat from "@/components/CrispChat";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kadimalogistics.com"),
  title: {
    default: "Kadima Logistics — Cut Shipping Costs Without Switching Carriers",
    template: "%s | Kadima Logistics",
  },
  description:
    "Authorized DHL Reseller and multi-carrier shipping optimization partner. Kadima audits your invoices, negotiates across UPS, FedEx, USPS, and DHL, and delivers 20–30% annual savings. Free shipping audit.",
  keywords: [
    "shipping cost reduction",
    "DHL authorized reseller",
    "parcel negotiation",
    "shipping audit",
    "UPS rate negotiation",
    "FedEx rate negotiation",
    "GPO shipping rates",
    "small parcel optimization",
    "e-commerce shipping",
    "Kadima Logistics",
  ],
  authors: [{ name: "Kadima Logistics" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kadimalogistics.com",
    siteName: "Kadima Logistics",
    title: "Kadima Logistics — Cut Shipping Costs Without Switching Carriers",
    description:
      "Authorized DHL Reseller. Free shipping audit reveals 20–30% in annual savings across UPS, FedEx, USPS, and DHL.",
    images: [
      {
        url: "https://res.cloudinary.com/iowitz/image/upload/f_auto,q_auto/kadima-logistics/og-images/og-main",
        width: 1200,
        height: 630,
        alt: "Kadima Logistics — Authorized DHL Reseller & Shipping Cost Optimization",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kadima Logistics — Cut Shipping Costs Without Switching Carriers",
    description:
      "Free shipping audit reveals 20–30% in annual savings. Authorized DHL Reseller.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Kadima Logistics",
              description:
                "Authorized DHL Reseller and multi-carrier shipping optimization partner. We audit, negotiate, and reduce shipping costs for businesses of every size.",
              url: "https://kadimalogistics.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "New York",
                addressRegion: "NY",
                addressCountry: "US",
              },
              sameAs: [],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+1-800-555-0199",
                contactType: "sales",
                email: "info@kadimalogistics.com",
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Shipping Optimization Services",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Free Shipping Audit",
                      description:
                        "Comprehensive analysis of your current carrier agreements and invoices to identify savings opportunities.",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "DHL Authorized Reseller Services",
                      description:
                        "Direct access to DHL Express rates through official authorized reseller partnership.",
                    },
                  },
                ],
              },
            }),
          }}
        />
      </head>
      <body
        className={`${archivo.variable} ${dmSans.variable} antialiased`}
      >
        <CrispChat />
        <AnimationProvider>{children}</AnimationProvider>
      </body>
    </html>
  );
}
