"use server"

export default async function Footer(){
    return (
    <footer className="relative w-screen h-32 bottom-0 flex flex-row justify-center content-center
    dark:bg-gray-800 dark:text-white
    bg-slate-300">
        <div className='mt-10'>
            Made by Adam Kubik
        </div>
    </footer>
    )
}