const cacheName = 'ams-v1';
const precacheResources = [
	
  '/admin/',
  '/admin/index.html',
  
  '/admin/favicon_io/apple-touch-icon.png',
  '/admin/favicon_io/favicon-32x32.png',
  '/admin/favicon_io/favicon-16x16.png',
  '/admin/manifest.json',
  '/admin/lib/jqueryui/jquery-ui.css',
  '/admin/lib/fancytree/src/skin-lion/ui.fancytree.css',
  '/admin/lib/bootstrap/css/bootstrap.min.css',
  '/admin/lib/datatables/datatables-1.10.20/css/jquery.dataTables.css',
  '/admin/css/s.css',	
  
  '/admin/lib/jquery/jquery-3.3.1.js',  
  '/admin/lib/jqueryui/jquery-ui.min.js',
  '/admin/lib/jqueryui/jquery.ui-contextmenu.min.js',

  '/admin/lib/fancytree/src/jquery-ui-dependencies/jquery.fancytree.ui-deps.js',
  '/admin/lib/bootstrap/js/bootstrap.min.js', 
  '/admin/lib/fancytree/src/jquery.fancytree.js',
  '/admin/lib/fancytree/src/jquery.fancytree.dnd5.js',   
  '/admin/lib/fancytree/src/jquery.fancytree.edit.js',
  '/admin/lib/fancytree/src/jquery.fancytree.gridnav.js',
  '/admin/lib/fancytree/src/jquery.fancytree.table.js',
  '/admin/lib/datatables/datatables-1.10.20/js/jquery.dataTables.min.js',
	
  '/admin/core/core.js', 			
  '/admin/app/config/ams.js',
  '/admin/app/js/type.js',
  '/admin/app/config/config.js',
  '/admin/app/config/app.js',
  '/admin/app/lang/locale.js',
  '/admin/app/js/roles.js',
  '/admin/app/data/actors.js',
  '/admin/app/js/methods.js',
  '/admin/app/js/actions.js',
  '/admin/app/js/app.js',
  '/admin/lib/mustache/mustache.min.js',
  '/admin/app/js/template.js'

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