"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface ModalProps {
  /** Controls visibility of the modal. */
  open: boolean;
  /** Called when the user requests to close (backdrop click or cancel). */
  onClose: () => void;
  /** Modal content. */
  children: ReactNode;
  /** Optional accessible label for the dialog. */
  ariaLabel?: string;
}

/**
 * Semantic modal wrapper using the native <dialog> element.
 * Handles focus trapping, backdrop click, and Escape key natively.
 */
export default function Modal({ open, onClose, children, ariaLabel }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    function handleClose() {
      onClose();
    }

    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  function handleBackdropClick(e: React.MouseEvent<HTMLDialogElement>) {
    const dialog = dialogRef.current;
    if (!dialog) return;
    // Close only when clicking the backdrop (the dialog element itself)
    if (e.target === dialog) {
      onClose();
    }
  }

  return (
    <dialog
      ref={dialogRef}
      aria-label={ariaLabel}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 m-auto max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-0 shadow-xl backdrop:bg-black/50"
    >
      {open && children}
    </dialog>
  );
}
