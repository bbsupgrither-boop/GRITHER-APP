// src/pages/Home.tsx
import React, { useState } from "react";
import AppShell from "../layout/AppShell";
import { Modal } from "../components/Modal";

export default function Home() {
  const [open, setOpen] = useState(false);
  return (
    <AppShell>
      <section className="card" style={{ marginTop: 16 }}>
        <h2 style={{ margin: 0 }}>Достижения</h2>
        <p>Длинный текст для проверки переноса. {Array.from({ length: 50 }).map((_, i) => "текст ").join("")}</p>
        <button onClick={() => setOpen(true)}>Открыть модалку</button>
      </section>
      <Modal open={open} onClose={() => setOpen(false)} title="Модалка">
        Контент модалки. Прокрутка внутри не влияет на страницу.
      </Modal>
    </AppShell>
  );
}
