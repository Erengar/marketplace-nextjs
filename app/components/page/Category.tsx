'use client'
import { Suspense } from 'react'
import Loading from '../errors/Loading'
import Link from 'next/link'


export default function Category(props: {category: any}) {
    return (
        <Link href={`${props.category.name.toLowerCase()}`}>
            <li className="dark:bg-slate-950 dark:hover:bg-slate-900 dark:hover:scale-110
            dark:active:outline-1 dark:active:outline-slate-700 dark:active:scale-110
            bg-slate-200 hover:bg-slate-400 hover:scale-110 active:outline-1 active:outline-neutral-400 active:scale-110
            duration-200 border border-solid rounded-lg min-w-fit min-h-fit max-w-sm max-h-sm h-40 w-40 flex justify-center items-center"
            >
                <Suspense fallback={<Loading />}>
                    <span className="mx-5">
                        {props.category.name}
                    </span>
                </Suspense>
            </li>
        </Link>
    )
}