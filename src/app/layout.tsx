import type { Metadata } from "next";
import { Inter } from "next/font/google";
import clsx from "clsx";
import "./globals.css";
import css from './layout.module.css';
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Figma homefinder demo",
  description: "Demo of how figma can be used to configure homefinders",
};

type Props = React.PropsWithChildren;

export default function RootLayout({
  children,
}: Props) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, css.body)}>
        <header>
          <h1>
            <Link href="/">Figma-homefinder</Link>
          </h1>
        </header>
        <main>
          {children}
        </main>
        <footer>
          <h1>Figma-homefinder</h1>
        </footer>
      </body>
    </html>
  );
}
