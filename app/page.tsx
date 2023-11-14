import Category from './components/Category'
import './globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Home',
}



export default function Page(): JSX.Element {

    return (
    <ul className="flex flex-row flex-wrap gap-6 m-auto xl:mx-80">
    </ul>
    );
}