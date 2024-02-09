import Navbar from "./components/server/Navbar";
import { ThemeProvider } from "./components/context/ThemeProvider";
import { ThemeSwitcher } from "./components/client/ThemeSwitcher";
import Footer from "./components/server/Footer";
import "./globals.css";
import { CurrencyProvider } from "./components/context/CurrencyProvider";
import SessionsProvider from "./components/context/SessionsProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";


export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
    session: any;
}) {
    const session = await getServerSession(authOptions)
    return (
        <html lang="en">
            <head></head>
            <body className="overflow-scroll bg-slate-50 dark:bg-slate-900">
                <Navbar />
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    <ThemeSwitcher />
                    <SessionsProvider session={session}>
                    <CurrencyProvider>
                        <main>{children}</main>
                    </CurrencyProvider>
                    </SessionsProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
