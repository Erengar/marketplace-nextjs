"use server";

export default async function SkeletonFrontPage() {
    const numberOfSkeletons = 14;
    return (
        <ul className="m-auto mx-2 mt-12 flex flex-row flex-wrap gap-2 xl:mx-80">
            {Array.from({ length: numberOfSkeletons }).map((_, i) => {
                return (
                    <li
                        key={i}
                        className="mb-2 flex h-40 h-40 w-40
                    animate-pulse items-center justify-center rounded rounded-lg bg-slate-300 dark:bg-slate-800"
                    />
                );
            })}
        </ul>
    );
}
