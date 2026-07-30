/* Frida Service Worker
   Strategie gegen den Klassiker "App hängt für immer in alter Version":
   - HTML (Navigationen) immer network-first, Cache nur als Offline-Fallback
   - statische Assets cache-first mit Hintergrund-Aktualisierung
   - Cache-Name trägt die Version; activate räumt alte Caches weg */
const CACHE = 'frida-2.1.1';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './favicon.ico',
  './icon-180.png',
  './icon-192.png',
  './icon-512.png',
];

self.addEventListener('install', ev => {
  ev.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', ev => {
  ev.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', ev => {
  const req = ev.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  // App-Shell: frisch vom Netz, Cache nur wenn offline
  if (req.mode === 'navigate' || url.pathname.endsWith('/index.html')) {
    ev.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put('./index.html', copy));
          return res;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Assets: aus dem Cache, im Hintergrund erneuern
  ev.respondWith(
    caches.match(req).then(hit => {
      const refresh = fetch(req)
        .then(res => {
          if (res.ok) caches.open(CACHE).then(c => c.put(req, res.clone()));
          return res;
        })
        .catch(() => hit);
      return hit || refresh;
    })
  );
});
