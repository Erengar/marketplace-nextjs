import Link from 'next/link'
import Search from './Search'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const navbarItems = ['Home']

export default function Navbar() {
    return (
        <nav className="h-14 w-screen pt-3
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
                <li>
                    <Link href="/shoppingcart">
                        <ShoppingCartIcon/>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}