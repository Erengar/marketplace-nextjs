"use client";
import { motion } from "framer-motion";

type ToggleButtonProps = {
    isOn: boolean;
    setIsOn: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ToggleButton({ isOn, setIsOn }: ToggleButtonProps) {
    const toggleSwitch = () => setIsOn(!isOn);
    return (
        <>
            <span className="text-red-500">Show warning</span>
            <button
                className={`h-5 w-10 rounded-full bg-red-600 p-0.5`}
                onClick={toggleSwitch}
            >
                <div
                    className={`flex ${isOn ? "justify-end bg-red-500" : "justify-start bg-red-400"} rounded-full`}
                >
                    <motion.div
                        className="h-4 w-4 rounded-full bg-sky-100"
                        layout
                    />
                </div>
            </button>
        </>
    );
}
