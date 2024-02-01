"use server";

export default async function Footer() {
    return (
        <footer
            className="relative bottom-0 flex h-32 w-screen flex-row content-center justify-center
    bg-slate-300 dark:bg-gray-800
    dark:text-white"
        >
            <div className="mt-10">Made by Adam Kubik</div>
        </footer>
    );
}
