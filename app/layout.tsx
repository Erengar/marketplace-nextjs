import Navbar from './components/Navbar';
import {ThemeProvider}   from "./ThemeProvider";
import {ThemeSwitcher} from "./components/ThemeSwitcher";

export default function RootLayout({children,} : {children: React.ReactNode}): JSX.Element {

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
            </main>
        </body>
    </html>
    )
}