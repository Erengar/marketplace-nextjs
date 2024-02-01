'use client';

import { type ElementRef, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import CloseIcon from '@mui/icons-material/Close';

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<'dialog'>>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return(
    <div className="fixed top-0 right-0 left-0 flex justify-center items-center w-full h-full bg-gray-500 bg-opacity-50 z-10">
        <dialog
        ref={dialogRef}
        onClose={onDismiss}
        tabIndex={-1}
        className='md:w-3/4 rounded'
        >
            <button onClick={onDismiss} className="absolute">
              <CloseIcon/>
              <span className='sr-only'>Close Window</span>
            </button>
            {children}
        </dialog>
    </div>
  );
}
