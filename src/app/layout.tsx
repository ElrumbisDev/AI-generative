import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chapter AI - Créez des vidéos magiques avec l'IA",
  description: "Transformez vos plus beaux souvenirs de mariage ou de naissance en vidéos magiques grâce à l'intelligence artificielle. Upload jusqu'à 10 photos et laissez l'IA créer votre vidéo personnalisée.",
  keywords: "vidéo IA, mariage, naissance, souvenirs, intelligence artificielle, montage vidéo automatique",
  authors: [{ name: "Chapter AI" }],
  creator: "Chapter AI",
  openGraph: {
    title: "Chapter AI - Créez des vidéos magiques avec l'IA",
    description: "Transformez vos plus beaux souvenirs en vidéos magiques avec l'intelligence artificielle",
    url: "https://memorymagic-ai.vercel.app",
    siteName: "Chapter AI",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Chapter AI - Créez des vidéos magiques",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chapter AI - Créez des vidéos magiques avec l'IA",
    description: "Transformez vos plus beaux souvenirs en vidéos magiques avec l'intelligence artificielle",
    images: ["/og-image.jpg"],
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
    <html lang="fr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
