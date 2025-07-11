import type { Metadata } from "next";
import { Noto_Sans_Arabic } from "next/font/google";
import { Toaster } from "sonner";
import "../styles/global.scss";

const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-noto-sans-arabic",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={notoSansArabic.variable}>
        <Toaster
          richColors
          dir="rtl"
          toastOptions={{
            classNames: {
              toast: "sonner-desc",
              description: "sonner-desc",
              actionButton: "sonner-desc",
              cancelButton: "sonner-desc",
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
