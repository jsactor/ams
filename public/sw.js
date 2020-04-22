const cacheName = 'ams-v1';
const precacheResources = [
	
  '/',
  '/app.html',
  
  '/favicon_io/apple-touch-icon.png',
  '/favicon_io/favicon-32x32.png',
  '/favicon_io/favicon-16x16.png',
  '/manifest.json',
  '/lib/jqueryui/jquery-ui.css',
  '/lib/fancytree/src/skin-lion/ui.fancytree.css',
  '/lib/bootstrap/css/bootstrap.min.css',
  '/lib/datatables/datatables-1.10.20/css/jquery.dataTables.css',
  '/css/s.css',	
  
  '/lib/jquery/jquery-3.3.1.js',  
  '/lib/jqueryui/jquery-ui.min.js',
  '/lib/jqueryui/jquery.ui-contextmenu.min.js',

  '/lib/fancytree/src/jquery-ui-dependencies/jquery.fancytree.ui-deps.js',
  '/lib/bootstrap/js/bootstrap.min.js', 
  '/lib/fancytree/src/jquery.fancytree.js',
  '/lib/fancytree/src/jquery.fancytree.dnd5.js',   
  '/lib/fancytree/src/jquery.fancytree.edit.js',
  '/lib/fancytree/src/jquery.fancytree.gridnav.js',
  '/lib/fancytree/src/jquery.fancytree.table.js',
  '/lib/datatables/datatables-1.10.20/js/jquery.dataTables.min.js',
	
  '/core/core.js', 			
  '/app/config/ams.js',
  '/app/js/type.js',
  '/app/config/config.js',
  '/app/config/app.js',
  '/app/lang/locale.js',
  '/app/js/roles.js',
  '/app/data/actors.js',
  '/app/js/methods.js',
  '/app/js/actions.js',
  '/app/js/app.js',
  '/lib/mustache/mustache.min.js',
  '/app/js/template.js'

];

self.addEventListener('install', event => {
  console.log('Service worker install event!');
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(precacheResources);
      })
  );
});

self.addEventListener('activate', event => {
  console.log('Service worker activate event!');
});

self.addEventListener('fetch', event => {
  console.log('Fetch intercepted for:', event.request.url);
  event.respondWith(caches.match(event.request)
    .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request);
      })
    );
});