'use client'
import { Suspense } from 'react'
import Loading from './errors/Loading'
import Link from 'next/link'
import { CategoryType } from '@/app/schemas'
import { motion } from 'framer-motion'

/**
 * This component is used to display a category in a title.
 * @param props category: CategoryType
 * @returns JSX Element
 */
export default function Category(props: {category: CategoryType}) {
    return (
        <Link href={`${props.category.name.toLowerCase()}`}>
            <motion.li className="dark:bg-slate-950 dark:hover:bg-slate-900 dark:hover:scale-110
            dark:active:outline-1 dark:active:outline-slate-700 dark:active:scale-110
            text-sky-900 bg-slate-200 hover:bg-slate-400 hover:scale-110 active:outline-1 active:outline-neutral-400 active:scale-110
            font-semibold duration-200 border border-solid rounded-lg min-w-fit min-h-fit max-w-sm max-h-sm h-40 w-40 flex justify-center items-center"
            initial={{opacity:0}} animate={{opacity:[0,1]}} transition={{duration:0.5}}>
                <Suspense fallback={<Loading />}>
                    <span className="mx-5">
                        {props.category.name}
                    </span>
                </Suspense>
            </motion.li>
        </Link>
    )
}