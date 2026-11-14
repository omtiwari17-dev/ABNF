import type { Metadata, Viewport } from "next";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import "./components.css";
import { ExperienceShell } from "@/ui/ExperienceShell";
import { SiteHeader } from "@/ui/SiteHeader";

export const metadata: Metadata = {
  metadataBase: new URL("https://afterlight.example"),
  title: { default: "Afterlight: the machines we left behind", template: "%s · Afterlight" },
  description: "An interactive 3D archive of the rovers, landers and instruments left silent on the Moon and Mars, and the last thing each one said.",
  openGraph: { type: "website", siteName: "Afterlight" },
};

export const viewport: Viewport = {
  themeColor: "#050608",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <ExperienceShell />
        <SiteHeader />
        <main id="content" className="overlay">
          {children}
        </main>
      </body>
    </html>
  );
}
