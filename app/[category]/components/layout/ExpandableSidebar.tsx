"use client";

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from 'react';

export default function ExpandableSidebar(){
    const [isExpanded, setIsExpanded] = useState(false)

    function unrollSidebar(){
        const sidebar = document.querySelector('#sidebar') as HTMLElement
        sidebar.classList.toggle('hidden')
        setIsExpanded(!isExpanded)
    }

    return (
        <button
        className="md:hidden absolute
        animate-bounce h-8 w-8 border-solid border-2 border-slate-700 rounded-full"
        onClick={unrollSidebar}>
            <ArrowForwardIosIcon className={`text-slate-700 ${isExpanded ? 'rotate-180': ''}`} />
        </button>
    )
}