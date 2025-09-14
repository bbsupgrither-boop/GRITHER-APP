// src/layout/viewport.ts
type Unsub = () => void;

function getViewportHeight(): number {
  const tg = (window as any).Telegram?.WebApp;
  if (tg?.viewportHeight) return Math.round(tg.viewportHeight * window.devicePixelRatio) / window.devicePixelRatio;
  if (window.visualViewport?.height) return window.visualViewport.height;
  return window.innerHeight;
}

function getViewportWidth(): number {
  return window.innerWidth;
}

function applyVars() {
  const vh = getViewportHeight();
  const vw = getViewportWidth();
  // оценка высоты клавиатуры
  const inner = window.innerHeight;
  const kb = inner > 0 ? Math.max(0, inner - vh) : 0;

  document.documentElement.style.setProperty("--vh", `${vh}px`);
  document.documentElement.style.setProperty("--vw", `${vw}px`);
  document.documentElement.style.setProperty("--kb-offset", `${kb}px`);
}

export function initViewport(): Unsub {
  try { (window as any).Telegram?.WebApp?.expand?.(); } catch {}
  applyVars();

  const onResize = () => applyVars();
  window.addEventListener("resize", onResize);
  window.visualViewport?.addEventListener("resize", onResize);
  (window as any).Telegram?.WebApp?.onEvent?.("viewportChanged", onResize);

  return () => {
    window.removeEventListener("resize", onResize);
    window.visualViewport?.removeEventListener?.("resize", onResize);
    (window as any).Telegram?.WebApp?.offEvent?.("viewportChanged", onResize);
  };
}

export { getViewportHeight };
