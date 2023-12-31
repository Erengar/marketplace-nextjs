import Navbar from './components/client/Navbar';
import {ThemeProvider}   from "./components/client/ThemeProvider";
import {ThemeSwitcher} from "./components/client/ThemeSwitcher";
import Footer from './components/server/Footer';
import './globals.css'


export default function RootLayout({children,} : {children: React.ReactNode}) {
    return (
    <html lang='en'>
        <body>
            <Navbar />
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            
                {children}
            </ThemeProvider>
        </body>
    </html>
    )
}