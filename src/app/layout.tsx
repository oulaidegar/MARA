import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MARA – Middle East & North Africa Research Archive",
  description: "Mapping compute resources, intelligence pipelines, and algorithmic sovereignty loops across the MENA region.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div id="app">
          {children}
        </div>
      </body>
    </html>
  );
}
