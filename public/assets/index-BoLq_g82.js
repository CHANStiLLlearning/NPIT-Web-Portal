// Auto-upgrade stale client cache to latest release
console.warn('[NPIT Portal] Stale bundle index-BoLq_g82.js requested. Upgrading to latest bundle...');
if (typeof window !== 'undefined') {
  if ('caches' in window) {
    caches.keys().then(function(keys) {
      return Promise.all(keys.map(function(k) { return caches.delete(k); }));
    }).catch(function() {});
  }
  // Remove hash parameters or reload cleanly
  setTimeout(function() {
    window.location.reload();
  }, 100);
}
