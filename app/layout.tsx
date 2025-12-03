import type { Metadata } from "next";
import "./globals.css";
import { Jua } from "next/font/google";
import Script from "next/script";

const jua = Jua({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yuna's Todo Garden",
  description: "레몬민트 테마 투두리스트",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        {/* 초기 테마 적용 (Flash 방지) - Tailwind dark class만 사용 */}
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            try {
              const stored = localStorage.getItem('theme');
              const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
              const useDark = stored === 'dark' || (!stored && prefersDark);
              if (useDark) {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            } catch {}
          `}
        </Script>
      </head>
      {/* 폰트 className 여기! */}
      <body className={`${jua.className} bg-white text-gray-900 dark:bg-black dark:text-white`}>{children}</body>
    </html>
  );
}
