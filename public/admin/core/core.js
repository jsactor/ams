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

// classes

class Play {
  constructor() { 
  	console.log(`Play initiated`);
  };
};

class Role {
  constructor(key, data) {
  	var th = this;
  	this.name = key;
  	cm.map_data_entries_to_object(this, data);
  };
  get_actions() {
  	return this.actions;
  };
};

class Type {
  constructor(type) {
  	cm.map_data_entries_to_object(this, type);
  };
};

class Action {
  constructor(actor, event) {
    if(this.constructor === Action) {
    	throw new TypeError (`Abstract class Action cannot be instantiated directly`);    	
    }
	  if(!actor || !actor.name || !actor.type) {
	  	throw new TypeError (`Actor id, name, type is missing`);    	
	  }
	  this.actor = actor;
	  this.event = event;
	  this.wait = false;
	  this.next = false;
	  this.actor_type = [];
	  if(actor.action) {
	    cm.map_data_entries_to_object(this, actor.action);
	  }
  };
  type(type) {
	 
  };
  console() {
  	console.log(`E [[ ${this.evnt} ]], A [[ ${this.actn} ]], R [[ ${this.role ? this.role : ''} ]], ID [[ ${this.actor.id} ]]` );
  };
};

class Director {
  constructor(queue) {
	this.queue = queue || [];
	this.current = 0;
  };
	
  proceed() {
	// mm.director
	var d = this;
	if(!d.queue) return;
	if(d.queue.length === d.current + 1 ) {
	  return;
	}
	d.current++;
	var na = d.queue[d.current];
	na.next = true;
	d.run(na.next);
  };
	
  run(next) {
	var d = this;
	if(!next) return;
//console.log('Director :: run next');
	var queue = d.queue;
	var run_action = function(config) {
	  var ac = config;
	  var actor = ac.actor;
	  var event = ac.event;
	  actor.action = ac.action;
	  var action = new appn.action[actor.action.actn](actor, event);
	  action.next = next;			
	  if (!action.wait) {
		action.perform();	
		action.console();
		mm.director.proceed();
	  } else {
		action.perform();
		action.console();
	  }
	}
	run_action(queue[d.current]);	
	mm.t2 = performance.now();
//		console.log((mm.t2 - mm.t0) + " milliseconds.");
  };
};

class Actor {
  constructor(actor, type, role) {
    if(this.constructor === Action) {
    	throw new TypeError (`Abstract class Actor cannot be instantiated directly.`);    	
    }
	if(!actor.id || !actor.name || !actor.type) {
	  throw new TypeError (`Actor id, name or type is missing`);    	
	}
	if(actor.role) {
	  var rs = actor.role.split(mm.delimiter.space);	  
	  for(var ar of rs) {
	    if(!role.hasOwnProperty(ar)) {
		  throw new TypeError (`Role ${ar} does not exist.`);    	
		}			  
	  }		  
	}
    cm.map_data_entries_to_object(this, actor);  
    cm.map_data_entries_to_object(this, type, 'method');
  };

  static handler(actor) {
	var type = mm.type[actor.type];
  	if(!type.selector || !type.selector.event) return;
  	var e = type.selector.event;		
  	var id = '#' + actor.id;
  	for (var event in e) {  		
      $(id).on( event, e[event], actor, function(event) {
    	var a = mm.actor[actor.id];
    	var action = new appn.action.send(a);
    	action.actor = a;
    	action.queue(event.type, event);
      });      
  	}
  };  
};
