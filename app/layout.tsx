import Navbar from "./components/client/Navbar";
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
            <body className="overflow-scroll bg-slate-100">
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
        </html>
    );
}
