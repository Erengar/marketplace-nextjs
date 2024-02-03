"use client";
import { CategoryType, ProductType } from "../../../db/schema";

type ConfirmationModalProps = {
    needConfirm: React.Dispatch<React.SetStateAction<boolean>>;
    deleteItem: () => void;
    item: CategoryType | ProductType;
    table: string;
};

export default function ConfirmationModal({
    needConfirm,
    deleteItem,
    item,
    table,
}: ConfirmationModalProps) {
    function removeModal() {
        needConfirm(false);
    }
    return (
        <div
            onClick={removeModal}
            className="fixed left-0 right-0 top-0 z-10 flex h-full max-h-full w-full items-center justify-center bg-gray-500 bg-opacity-50 dark:bg-opacity-25"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="z-20 flex min-h-min min-w-[200px] max-w-6xl flex-col gap-y-6 rounded border border-solid border-black bg-white p-2 dark:bg-slate-900"
            >
                <h2 className="text-base font-bold text-sky-950 antialiased dark:text-sky-200">{`Are you sure you want to remove ${item.name} from ${table} table?`}</h2>
                <div className="flex place-content-around">
                    <button
                        onClick={deleteItem}
                        className="h-10 w-20 rounded border border-solid border-black bg-slate-200 text-base font-bold text-red-700 antialiased hover:bg-slate-400"
                    >
                        Yes
                    </button>
                    <button
                        onClick={removeModal}
                        className="h-10 w-20 rounded border border-solid border-black bg-slate-200 text-base font-bold text-sky-950 antialiased hover:bg-slate-400"
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
}
