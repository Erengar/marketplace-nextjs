"use client";

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ExpandableSidebar(){
    const [isExpanded, setIsExpanded] = useState(false)

    function unrollSidebar(){
        const sidebar = document.querySelector('#sidebar') as HTMLElement
        sidebar.classList.toggle('-left-32')
        if (isExpanded) {
            sidebar.classList.remove('sidebar-slide-in')
            sidebar.classList.add('sidebar-slide-out')
        } else {
            sidebar.classList.remove('sidebar-slide-out')
            sidebar.classList.add('sidebar-slide-in')
        }
        setIsExpanded(!isExpanded)
    }


    return (
        <motion.button
        initial={{opacity: 1}}
        animate={isExpanded ? {opacity: 1} : {opacity: [0, 1, 0]}}
        transition={isExpanded ? {duration: 2} : {repeat: Infinity, duration: 2}}
        className="md:hidden self-center
        h-8 w-8 border-solid border-2 border-slate-700 rounded-full
        bg-slate-200 hover:bg-slate-400"
        onClick={unrollSidebar}>
            <ArrowForwardIosIcon className={`text-slate-700 ${isExpanded ? 'rotate-180': ''}`} />
        </motion.button>
    )
}