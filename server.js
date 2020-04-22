'use strict';

const Path = require('path');
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const g = require('./generator/generator.js');
const str_no_tree = 'No tree.';

const server = new Hapi.Server({
  port: 3000,
  host: 'localhost',
  routes: {
  	files: {
  		relativeTo: Path.join(__dirname, 'public')
  	}
  }
});

var post_handler = (request, h) => {	
  var payload = request.payload;	
  if(payload.tree) {
    var buffer, fancy_tree, urls;
	fancy_tree = payload.tree;	
	urls = payload.urls;
	
	if(!fancy_tree) {
	  console.log("No fancy_tree received.");
	  return;			
	} else {
		console.log("fancy_tree received.");
	}		

	buffer = new Buffer.from(fancy_tree);
	g.generate(JSON.parse(fancy_tree), JSON.parse(urls));
  }
  return payload.tree ? payload.tree : str_no_tree;
};

const provision = async () => {
  await server.register(Inert);
	server.route([
	    {
	      method: 'POST',
	      path: '/save',
	      handler: post_handler
	    },
	    {
	      method: 'GET',
	      path: '/{param*}',
	      handler: {
	        directory: { 
	         	path: '.', 
	          	redirectToSlash: true, 
	          	listing: false, 
	           	index: true 
	          }
	      }
	    },
	    {
		    method: '*',
		    path: '/{any*}',
		    handler: {
		    file: 'error.html'
		  }
		}
	 ]);
	await server.start((err) => {
    if (err) {
        throw err;
    }
	});
	
//	console.dir(server.info, {showHidden: false, depth: null});	 
  console.log('Server running at:', server.info.uri);
};

provision();