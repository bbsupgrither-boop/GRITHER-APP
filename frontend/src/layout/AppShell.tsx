// src/layout/AppShell.tsx
import React, { PropsWithChildren, useEffect } from "react";
import { initViewport } from "./viewport";

export default function AppShell({ children }: PropsWithChildren) {
  useEffect(() => initViewport(), []);

  return (
    <div className="app">
      <header className="container" style={{ paddingTop: "12px" }}>
        <div className="card">Иван Иванов · WORKER</div>
      </header>

      <main className="container" style={{ width: "min(100%, var(--container-max))" }}>
        {children}
      </main>

      <footer className="bottom-nav">
        <nav style={{ display: "flex", gap: 14, justifyContent: "space-between" }}>
          <button>Дом</button><button>Кейсы</button><button>Чат</button><button>Задачи</button><button>Магазин</button>
        </nav>
      </footer>
    </div>
  );
}
