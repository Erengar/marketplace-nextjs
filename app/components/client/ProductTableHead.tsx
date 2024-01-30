"use client";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

type ProductTableHeadProps = {
    sortSignal: string;
    setSortSignal: React.Dispatch<React.SetStateAction<string>>;
}

export default function ProductTableHead({sortSignal, setSortSignal}: ProductTableHeadProps){
    const maxWidthForIcon = 450;
    //This function is changing sort from ascending to descending and vice versa
    function setSort(signal: string) {
        if (signal === sortSignal) {
            setSortSignal('-' + signal)
        } else {
            setSortSignal(signal)
        }
    }
    //This function is setting icon depending on the sort signal
    function icon(signal: string) {
        if (sortSignal.includes(signal)) {
            if (sortSignal[0] === '-') {
                return <ArrowDropDownIcon/>
            } else {
                return <ArrowDropUpIcon/>
            }
        } else {
            return null
        }
    }
    return (
        <div className="mt-2 ml-4 md:ml-20 grid grid-cols-6 font-bold text-xs md:text-base">
            <span className="mr-4">Image</span>
            <span className="mr-4"><span className=" cursor-pointer" onClick={() => setSort('name')}>Name{typeof window !== 'undefined' && window.innerWidth > maxWidthForIcon && icon('name')}</span></span>
            <span className="mr-4"><span className=" cursor-pointer" onClick={() => setSort('price')}>Price{typeof window !== 'undefined' && window.innerWidth > maxWidthForIcon && icon('name')}</span></span>
            <span className="mr-4"><span className=" cursor-pointer" onClick={() => setSort('stock')}>Stock{typeof window !== 'undefined' && window.innerWidth > maxWidthForIcon && icon('name')}</span></span>
            <span className="mr-4"><span className=" cursor-pointer" onClick={() => setSort('category')}>Category{typeof window !== 'undefined' && window.innerWidth > maxWidthForIcon && icon('name')}</span></span>
        </div>
    )
}