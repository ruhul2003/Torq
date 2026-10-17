import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata = {
  title: "TORQ — Curated Luxury & Exotic Car Showroom",
  description:
    "Acquire the world's most exclusive luxury electric and exotic hypercars. Private showroom, instant bespoke configuration, and white-glove global delivery.",
  keywords: [
    "Luxury Cars",
    "Buy Hypercar",
    "Exotic Cars For Sale",
    "TORQ Motors",
    "Luxury Electric Vehicles",
    "Concierge Car Buying",
  ],
  authors: [{ name: "TORQ Luxury Motors" }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('torq-theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (stored === 'dark' || (!stored && prefersDark)) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.setAttribute('data-theme', 'dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.setAttribute('data-theme', 'light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-[#F8FAFC] text-[#090A0F] dark:bg-[#060709] dark:text-[#F8FAFC] antialiased selection:bg-neutral-900 selection:text-white dark:selection:bg-sky-400 dark:selection:text-black transition-colors duration-300">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
