'use client'
 import ErrorComponent from '@/app/components/errors/ErrorComponent';

 
export default function Error({error,reset,}: {error: Error & { digest?: string }
reset: () => void}) {
    return <ErrorComponent error={error} reset={reset}/>
}