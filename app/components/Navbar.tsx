import Link from 'next/link'
import Search from './Search'

const navbarItems = ['Home', 'About', 'Contact']

export default function Navbar(): JSX.Element{
    return (
        <nav>
            <ul className="flex flex-row justify-center gap-10 mb-6 mt-4">
                {navbarItems.map((item: string): JSX.Element => (
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