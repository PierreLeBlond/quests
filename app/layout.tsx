import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Menu from "@/components/menu/Menu";
import { StateProvider } from "@/state/StateProvider";
import { LocalQuestsProvider } from "@/components/LocalQuestsProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "quests",
  applicationName: "quests",
  description: "todo app to bring with you on your adventures",
  manifest: "./manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <LocalQuestsProvider>
          <StateProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Menu />
              <main className="relative flex h-screen w-screen justify-center overflow-hidden">
                {children}
              </main>
            </ThemeProvider>
          </StateProvider>
        </LocalQuestsProvider>
      </body>
    </html>
  );
}
