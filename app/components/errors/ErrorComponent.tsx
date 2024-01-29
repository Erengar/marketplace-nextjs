'use client' // Error components must be Client Components
 
import { useEffect, useState } from 'react'
import ReplayIcon from '@mui/icons-material/Replay';
import { TailSpin } from 'react-loading-icons'
 
export default function Error({error,reset,}: {error: Error & { digest?: string }
reset: () => void}) {
    const [retry, setRetry] = useState(false)
    useEffect(() => {
        console.error(error)
    }, [error])
 
  return (
    <div className='w-screen md:w-[99vw] h-[80vh] flex justify-center'>
        <div className='flex flex-col place-content-center gap-2'>

            <h2
            className='md:text-2xl flex justify-center'>
                Something went wrong!
            </h2>
            <div className='flex justify-center md:text-xl'>
                <button
                onClick={() => {
                    setRetry(true)
                    reset()
                }}
                className='flex flex-col items-center'>
                    {retry
                    ?<TailSpin stroke='blue'/>
                    :<ReplayIcon className='scale-150'/>
                }
                    Try again
                </button>
            </div>
        </div>
    </div>
  )
}