import { Inter } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import StyledJsxRegistry from "./style-regsitry";

import "./globals.css";
import "../styles/code-block-styles.css";
import { cn } from "lib/cn";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index,follow" />
        <meta name="googlebot" content="index,follow" />
        <meta name="twitter:creator" content="@brkalow" />
        <meta name="twitter:site" content="@brkalow" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Bryce Kalow"
          href="https://brycekalow.name/feed.xml"
        ></link>
      </head>
      <body
        className={cn(
          "bg-gray-50 text-black/75 font-sans",
          "dark:bg-stone-900 dark:text-white/75"
        )}
      >
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `(function() {
          let theme;
          try {
            theme = localStorage.getItem('theme');
          } catch (_) {}

          const mql = window.matchMedia('(prefers-color-scheme: dark)');

          function setTheme(e) {
            const oldTheme = window.__theme
            const hasMediaQueryPreference = typeof e.matches === 'boolean';
            theme = e.matches ? 'dark' : 'light';

            window.__theme = theme || 'light';
            try {
              localStorage.setItem('theme', theme)
            } catch(_) {}

            document.documentElement.classList.remove(oldTheme)
            document.documentElement.classList.add(window.__theme); 
          }

          setTheme(mql); 

          mql.addEventListener('change', setTheme)
        })();`,
          }}
        />
        <StyledJsxRegistry>
          <div className="wrapper px-8 py-[4.5rem]">
            <main role="main" className={cn("flex flex-row")}>
              <div className="content lg:min-w-[600px] max-w-[min(700px,100%)] pt-8 pb-16 lg:pb-20 mx-auto">
                {children}
              </div>
            </main>
          </div>
        </StyledJsxRegistry>
      </body>
    </html>
  );
}

export const metadata = {
  title: {
    default: "Bryce Kalow",
    template: "%s | Bryce Kalow",
  },
};
