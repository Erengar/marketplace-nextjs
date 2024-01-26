import { Metadata } from 'next'
import SelectTable from '../components/client/SelectTable'

export const metadata: Metadata = {
    title: 'Products | Admin',
}

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <>
        <SelectTable />
        {children}
        </>
    )
}