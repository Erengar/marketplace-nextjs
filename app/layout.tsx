import Navbar from "./components/server/Navbar";
import { ThemeProvider } from "./components/context/ThemeProvider";
import { ThemeSwitcher } from "./components/client/ThemeSwitcher";
import Footer from "./components/server/Footer";
import "./globals.css";
import { CurrencyProvider } from "./components/context/CurrencyProvider";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head></head>
            <main>
                <body className="overflow-scroll bg-slate-50 dark:bg-slate-900">
                    <Navbar />
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                    >
                        <ThemeSwitcher />
                        <CurrencyProvider>{children}</CurrencyProvider>
                    </ThemeProvider>
                </body>
            </main>
        </html>
    );
}
