import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Blog — Shipping Insights & Cost Optimization Tips",
  description:
    "Expert insights on shipping cost optimization, carrier negotiations, DHL partnership benefits, and logistics strategy from Kadima Logistics.",
  alternates: {
    canonical: "https://kadimalogistics.com/blog",
  },
  openGraph: {
    title: "Blog — Kadima Logistics",
    description:
      "Expert insights on shipping cost optimization, carrier negotiations, and logistics strategy.",
    type: "website",
    url: "https://kadimalogistics.com/blog",
    siteName: "Kadima Logistics",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Kadima Logistics",
    description:
      "Expert insights on shipping cost optimization, carrier negotiations, and logistics strategy.",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link rel="stylesheet" href="/blog.css" />
      <Header />
      <div className="min-h-screen bg-white">{children}</div>
      <Footer />
    </>
  );
}
