import "./globals.css";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "jaejudo - Malware Analysis Platform",
  description: "Advanced malware analysis platform for cybersecurity professionals",
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value;

  return (
    <html lang="en" data-theme={theme} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function(){
  try {
    var stored = localStorage.getItem('theme');
    var cookie = ${JSON.stringify(theme || "")};
    var preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    var t = stored || cookie || preferred;
    document.documentElement.dataset.theme = t;
    document.cookie = 'theme=' + t + '; Path=/; Max-Age=31536000; SameSite=Lax';
  } catch (e) {}
})();`,
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
