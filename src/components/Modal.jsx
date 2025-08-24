import React, { useEffect, useRef, useState, useId } from 'react';

const Modal = ({ open, onClose, title, children }) => {
  const [entered, setEntered] = useState(false);
  const closeBtnRef = useRef(null);
  const dialogRef = useRef(null);
  const lastActiveRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.();
      if (e.key === 'Tab') {
        // basic focus trap within dialog
        const root = dialogRef.current;
        if (!root) return;
        const focusables = root.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement;
        if (e.shiftKey) {
          if (active === first || !root.contains(active)) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (active === last || !root.contains(active)) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };
    document.addEventListener('keydown', onKey);
    // lock body scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // remember last active to restore on close
    lastActiveRef.current = document.activeElement;
    // defer to allow transition
    const id = requestAnimationFrame(() => setEntered(true));
    // focus close button
    const t = setTimeout(() => closeBtnRef.current?.focus(), 0);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      cancelAnimationFrame(id);
      clearTimeout(t);
      setEntered(false);
      // restore focus
      if (lastActiveRef.current && typeof lastActiveRef.current.focus === 'function') {
        lastActiveRef.current.focus();
      }
    };
  }, [open, onClose]);

  if (!open) return null;

  const stop = (e) => e.stopPropagation();

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-200 ${entered ? 'opacity-100' : 'opacity-0'}`}
      onClick={onClose}
      aria-hidden={!open}
    >
      <div
        className={`w-full max-w-xl rounded-2xl border border-white/10 bg-neutral-900/80 text-white shadow-2xl ring-1 ring-white/10 transition-all duration-200 ease-out ${entered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={stop}
        ref={dialogRef}
      >
        <div className="flex items-center justify-between border-b border-white/10 p-4 bg-gradient-to-br from-white/5 to-transparent rounded-t-2xl">
          <h3 id={titleId} className="text-lg font-semibold flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            {title}
          </h3>
          <button
            onClick={onClose}
            ref={closeBtnRef}
            className="rounded-lg p-1.5 text-white/80 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
