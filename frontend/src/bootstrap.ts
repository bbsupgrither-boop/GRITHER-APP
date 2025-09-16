// SPA fallback for routing
if (window.location.pathname !== '/' && !window.location.pathname.includes('#')) {
  window.location.href = '/#' + window.location.pathname;
}
