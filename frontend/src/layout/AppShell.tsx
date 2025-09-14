// src/layout/AppShell.tsx
import React, { PropsWithChildren, useEffect } from "react";
import { initViewport } from "./viewport";

interface AppShellProps extends PropsWithChildren {
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export default function AppShell({ children, header, footer }: AppShellProps) {
  useEffect(() => initViewport(), []);

  return (
    <div className="app">
      {header && (
        <header className="container" style={{ paddingTop: "12px" }}>
          {header}
        </header>
      )}

      <main className="container" style={{ width: "min(100%, var(--container-max))" }}>
        {children}
      </main>

      {footer && (
        <footer className="bottom-nav">
          {footer}
        </footer>
      )}
    </div>
  );
}
