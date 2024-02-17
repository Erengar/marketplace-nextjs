import Navbar from "./components/server/Navbar";
import { ThemeProvider } from "./components/context/ThemeProvider";
import Footer from "./components/server/Footer";
import "./globals.css";
import { CurrencyProvider } from "./components/context/CurrencyProvider";
import SessionsProvider from "./components/context/SessionsProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
import DomainProvider from "./components/context/DomainProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default async function RootLayout({
    children,
    modalsign,
}: {
    children: React.ReactNode;
    modalsign: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);
    const domain = process.env.NEXTAUTH_URL;
    return (
        <html lang="en">
            <head></head>
            <SpeedInsights />
            <body className="overflow-scroll bg-slate-50 dark:bg-slate-900">
                <DomainProvider domain={domain!}>
                    <SessionsProvider session={session}>
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="system"
                            enableSystem
                        >
                            <Navbar />
                            <CurrencyProvider>
                                <main>
                                    {children}
                                    {modalsign}
                                </main>
                            </CurrencyProvider>
                        </ThemeProvider>
                    </SessionsProvider>
                </DomainProvider>
            </body>
        </html>
    );
}
