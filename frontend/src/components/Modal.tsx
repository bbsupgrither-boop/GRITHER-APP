// src/components/Modal.tsx
import React, { useEffect, useRef } from "react";

type Props = {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
};

export function Modal({ open, title = "Диалог", onClose, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const body = document.body;
    if (open) {
      lastFocus.current = document.activeElement as HTMLElement;
      body.classList.add("body-lock");
      // фокус-ловушка
      const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
      document.addEventListener("keydown", handler);
      return () => { document.removeEventListener("keydown", handler); body.classList.remove("body-lock"); lastFocus.current?.focus?.(); };
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div className="modal-backdrop open" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="modal"
        ref={ref}
      >
        <div id="modal-title" style={{ fontWeight: 600, marginBottom: "8px" }}>{title}</div>
        <div>{children}</div>
        <div style={{ marginTop: 12, display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button onClick={onClose}>Закрыть</button>
        </div>
      </div>
    </>
  );
}
