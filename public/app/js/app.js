// The MIT License
// Copyright (c) 2019, 2020 Elena Shurpo http://js.actor/license
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and 
// associated documentation files (the "Software"), to deal in the Software without restriction, 
// including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
// and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, 
// subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or 
// substantial portions of the Software.	
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
// INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES 
// OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR 
// IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

;(function(mm, $, appn) {	

mm.t0 = performance.now();

  mm.play = new Play(); 
  const app_roles = appn.role;

  // ROLES - mm.role - list roles and respective actions
  for (let [key, data] of Object.entries(app_roles)) {	  	
    mm.role[key] = new Role(key, data); 
	//console.log( "mm.role." + key+ " : " + mm.role[key] );
  }
		
  // TYPES - mm.type - list of all component types
  for (let [key, data] of Object.entries(appn.type)) {
    mm.type[key] = {};		
	mm.type[key] = new Type(data); 		
	if(!data.hasOwnProperty('method')) {
	  mm.type[key].method = {};			
	}		
	Object.assign(mm.type[key].method, appn.methods.actor);
	if(appn.methods.hasOwnProperty(key)) {
	  Object.assign(mm.type[key].method, appn.methods[key]);
	}
  }	
		
  // ACTORS - mm.json.actor => mm.actor - list of all app components
  for (let [id, data] of Object.entries(appn.actor)) {
	const dt = data.type;		
    let ao = [];
	for (let key in mm.type[dt]) {
	  if(data.hasOwnProperty(key)) {
		throw new TypeError ('Property mm.type.' + key + ' alredy exists in Fancy Tree\'s data object.');
      }
	}
	ao[id] = new ac[dt](data, mm.type[dt], mm.role);
	Object.assign(mm.actor, ao);
  }
	
  // MAP - mm.map - map each actor to respective role array
  $.each(mm.role, function(role, data) {
	mm.map[role] 	= [];
    $.each(mm.actor, function(id, actor) {		
	  if(!actor.role) return;
	  //let rs = actor.role.split(mm.delimiter.space);
      let rs = cm.split_array(actor.role, mm.delimiter.space);
	  $.each(rs, function(index, r) {
	    if(role !== r) return;
		mm.map[role].push(id);
	  });								
	});
  });
  // HANDLERS - create list of all handlers for each actor	
  for (let [a_id, a] of Object.entries(mm.actor)) {
    Actor.handler(a);
  }

  // LOAD - 'load' event can be aplied to root actor only
  $(document).ready(function(event){ 	
    // first role should 'app'
	const actor = mm.actor[mm.map.app[0]];   	
	const actions = mm.role.app.actions;  	
	let ac = $.each(actions, function(index, action) {
      const events = cm.split_array(action.evnt, mm.delimiter.space);
   	  if( cm.in_array(mm.event_load, events) && action.actn === 'send') {
   	    return action;
   	  }
   	});
   	// first onload app action should be 'send'
   	actor.action = ac[0]; 
   	action = new appn.action[actor.action.actn](actor);
   	action.queue(mm.event_load);
  });
  
  mm.t1 = performance.now();
  console.log('mm.t0 = ' + mm.t0);
  console.log('mm.t1 = ' + mm.t1);
  console.log((mm.t1 - mm.t0) + " milliseconds.");
	
})(this[SCENE] = this[SCENE] || {}, jQuery, appn);


// service worker
// turn on when needed in /app/config/config.js

if(PWA) {
  if ('serviceWorker' in navigator) { 
    window.addEventListener('load', function() { 
      navigator.serviceWorker.register('sw.js') 
	  .then(reg => { 
	    console.log('Service worker registered.', reg); 
	  }) 
	  .catch(err => { 
	    console.log('Service worker registration failed: ', err); 
	  }); 
	}); 
  }	
}