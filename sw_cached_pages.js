const cacheName = "v1";
const cacheAssets = ["index.html", "transparent_logo.png"];

self.addEventListener("install", (e) => {
  console.log("ServiceWorker installed");

  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log("ServiceWorker caching files");
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  console.log("ServiceWorker activated");

  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log("ServiceWorker Clearing old cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (e) => {
  console.log("ServiceWorker fetching");
  e.respondWith(
    fetch(e.request).catch(() => {
      caches.match(e.request);
    })
  );
});
