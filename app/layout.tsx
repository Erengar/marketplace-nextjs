import Navbar from './components/layout/Navbar';
import {ThemeProvider}   from "./components/layout/ThemeProvider";
import {ThemeSwitcher} from "./components/ThemeSwitcher";
import Footer from './components/layout/Footer';


export default function RootLayout({children,} : {children: React.ReactNode}) {
    return (
    <html lang='en'>
        <body>
            <main>
                <Navbar />
                <section>
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                        <ThemeSwitcher />
                        {children}
                    </ThemeProvider>
                </section>
                <Footer />
            </main>
        </body>
    </html>
    )
}