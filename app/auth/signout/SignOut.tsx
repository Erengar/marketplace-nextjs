"use client";
import { signOut } from "next-auth/react";

export default function SignOut({modal} : {modal?: boolean}) {
    return (
        <div className="flex place-content-center">
            <div className={`${modal ? null : "mt-20"} flex h-56 w-96 flex-col items-center justify-evenly rounded-full bg-sky-500`}>
                <h1 className="text-xl font-semibold text-gray-100">
                    Are you sure you want to sign out?
                </h1>
                <button
                    className="text-xl font-bold text-gray-100 hover:text-gray-200 transition duration-300 ease-in-out bg-sky-400 hover:bg-sky-600 rounded-full px-4 py-2"
                    onClick={() => signOut({ callbackUrl: "/" })}
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
}
