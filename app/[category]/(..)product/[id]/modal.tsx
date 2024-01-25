'use client';

import { type ElementRef, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
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

  return createPortal(
      <dialog ref={dialogRef} onClose={onDismiss} className='w-3/4'>
        <button onClick={onDismiss} className="absolute"><CloseIcon/></button>
        {children}
      </dialog>,
    document.getElementById('modal-root')!
  );
}
