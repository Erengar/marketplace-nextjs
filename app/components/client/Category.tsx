'use client'
import Link from 'next/link'
import { type CategoryType } from '@/db/schema'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import CategoryDescription from './CategoryDescription'


export default function Category({category}: {category: CategoryType}) {
    const [showDescription, setShowDescription] = useState(false)
    //This is a hacky way to make sure the description is on top of the other categories
    const startHover = () => {
        setShowDescription(true)
        setTimeout(() => {document.getElementById("category-description")?.classList.add('z-20')}, 400)
    }
    const endHover = () => {
        document.getElementById("category-description")?.classList.remove('z-20')
        setShowDescription(false)
    }
    return (
        <Link
        href={`${category.name.toLowerCase()}`} className='flex relative'
        onMouseEnter={startHover}
        onMouseLeave={endHover}>
            <motion.li
            className={`dark:bg-slate-950 dark:hover:bg-slate-900 dark:hover:scale-110 rotate-45
            dark:active:outline-1 dark:active:outline-slate-700 dark:active:scale-110
            text-sky-900 bg-slate-200 ${showDescription && "bg-slate-400"} active:outline-1 active:outline-neutral-400 active:scale-110
            font-semibold border border-solid rounded-lg min-w-fit min-h-fit max-w-sm max-h-sm h-40 w-40 flex justify-center items-center z-10`}
            key={category.name}
            initial={false}
            animate={showDescription? {rotate:[45,0]} : {rotate:[0, 45]}}
            transition={{duration: 0.3, ease:'easeInOut'}}
            >
                <motion.span className="mx-5"
                initial={{rotate:-45}}
                animate={showDescription? {rotate:[-45,0]} : {rotate:[0,-45]}}
                transition={{duration: 0.3, ease:'easeInOut'}}
                >
                    {category.name}
                </motion.span>
            </motion.li>
            <AnimatePresence>
            {showDescription && <CategoryDescription />}
            </AnimatePresence>
        </Link>
    )
}