import Link from 'next/link'
import Search from './Search'

const navbarItems = ['Home', 'About', 'Contact']

export default function Navbar(): JSX.Element{
    return (
        <nav className="h-14 w-screen mb-4 md:mb-10 pt-3
        dark:bg-slate-700
        bg-slate-100">
            <ul className="flex flex-row justify-center gap-10">
                {navbarItems.map((item: string): JSX.Element => (
                    item === 'Home' ? 
                    <li key={item}>
                        <Link href="/">
                            {item}
                        </Link>
                    </li>:
                    <li key={item}>
                        <Link href={`/${item.toLowerCase()}`}>
                            {item}
                        </Link>
                    </li>
                ))}
                <li>
                    <Search />
                </li>
            </ul>
        </nav>
    )
}