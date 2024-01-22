"use client"
import { motion } from 'framer-motion'
import { LoremIpsum } from 'react-lorem-ipsum';


export default function CategoryDescription() {
    return (
        <motion.div
        id="category-description"
        className="h-40 w-40 bg-slate-200 line-clamp-6 absolute cursor-default"
        onClick={event => event.preventDefault()}
        initial={{left:75, width:0}}
        animate={{left:144, width:160}}
        exit={{left:75, width:0, transition:{duration:0.2, ease:'backOut'}}}
        transition={{duration:0.2, delay:0.3}}>
            <div className='pl-8'>
                <LoremIpsum p={1} avgSentencesPerParagraph={3}/>
            </div>
        </motion.div>
    )
}