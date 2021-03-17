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

// actions

appn.action = {};

appn.action.send = Action_Send = class extends Action {
  constructor(actor, event) {
  	super(actor, event);
  }
  
  queue(event_type, event_object) {
    const actor = this.actor;    
    let queue = [];
    if(!actor.role) return;
    const rs = actor.role.split(mm.delimiter.space);
    
    rs.forEach(function(role, i) {
      const acs = mm.role[role].actions;
      if(!acs) return; 
      acs.forEach(function(action, i) {
        const actn_evnt = action.evnt.split(mm.delimiter.space);   	
        if(cm.in_array(event_type, actn_evnt)) {
          console.log(`%cEVNT %c[[ ${event_type} ]], %cACTN %c[[ ${action.actn} ]], %cROLE %c[[ ${role ? role : ''} ]], %cID %c[[ ${actor.id} ]]`,
	  	    mm.console_css.evnt,
	  	    mm.console_css.evnt_v,
	  	    mm.console_css.actn,
	  	    mm.console_css.actn_v,
	  	    mm.console_css.role,
	  	    mm.console_css.role_v,
	  	    mm.console_css.id,
	  	    mm.console_css.id_v);
          if(action.mssg) {
            console.log(`Event Message = [[ ${action.mssg} ]]`);
          }
          // role which tirggered this action, for console otput
          action.role = role;
          let a = {};
          a.actor = actor;
          a.action = action;
          if(event_object) a.event = event_object;
          queue.push(a);
        }
      });		
    });
        
    if(!queue.length) return;  
    console.log('Action Queue Length :: ' + queue.length);    
	for (let item of queue) {
      console.log( '%cACTN = %c' +  item.action.actn + 
    	', %cEVNT = %c' + item.action.evnt  + 
    	', %cMSSG = %c' + (item.action.mssg ? item.action.mssg : ' ') + 
    	', %cTRGT = %c' + item.action.trgt + 
    	', %cROLE = %c' + item.action.role,
    	mm.console_css.actn,
    	mm.console_css.actn_v,
    	mm.console_css.evnt,
    	mm.console_css.evnt_v,
    	mm.console_css.mssg,
    	mm.console_css.mssg_v,
    	mm.console_css.id,
    	mm.console_css.id_v,
    	mm.console_css.role,
    	mm.console_css.role_v
      );     
	}
    mm.director = new Director(queue);    
    mm.director.run(true);
  }

  static traverse(actor_id, event_mssg, actor_array, array) {
    const actor = actor_array[actor_id];
    if(!actor) return;    
    if(!actor.children.length) {    
      array.push(actor_id);
    } else {
      for (let id of actor.children) {
        Action_Send.traverse(id, event_mssg, actor_array, array);
      }
      array.push(actor_id);
    }
    return array;
  }

  perform() {
    let action = this;
    const event_object = action.event ? action.event : null;
    const event_source = event_object ? event_object.target.parentNode.id : null;
    const event_message = action.mssg;
    let actor = action.actor;
  	if(event_source) {
  	  if(event_source !== actor.id && mm.actor[event_source]) {
  		if(mm.actor[event_source].is_clone()) {
  	      // if the event triggered by a cloned actor replace 
  	  	  // the original actor with the cloned one
  	  	  actor = mm.actor[event_source];
  	  	  action.actor = actor;
  		}
  	  }	
  	}
    if(!action.trgt) return;
    const ta = actor.target(action);
    let actor_queue = [];
    let action_queue = [];    
    ta.forEach(function(id) {
      actor_queue = Action_Send.traverse(id, event_message, mm.actor, actor_queue);
    });
      
	actor_queue.forEach(function(id, index) {
      const roles = mm.actor[id].role;
        if(!roles) return;
	    const rs = cm.split_array(roles, mm.delimiter.space);
	    
	    rs.forEach(function(role, index) {
		  const actions = mm.role[role].actions;
		  if(!actions || actions.length <= 0) return;
		  
		  actions.forEach(function(action, index) {
		    const events = cm.split_array(action.evnt, mm.delimiter.space);
		    if(cm.in_array(event_message, events)) {
		      // role which tirggered this action, for console otput
		      action.role = role;
		      let a = {};
		      a.actor = mm.actor[id];
		      a.action = action;
		      if(event_object) a.event = event_object;
		      action_queue.push(a);
		    }
		  });		  
		});	    
	});
    if(!action_queue.length) return;
    // add action_queue to the beginning of the array
    // keep the previous queue of 'send' actions
    mm.director.queue = action_queue.concat(mm.director.queue);
    mm.director.run(true);
  }
};

appn.action.show = Action_Show = class extends Action {
  constructor(actor, event) {
  	super(actor, event);
  }
  
  perform() {
	const action = this;
	let actor = action.actor;
	let v;
	if(typeof action.valu === 'boolean') {
	  v = action.valu;
	}
	if(action.rule) {
	  v = actor[action.rule](action);
	  if(v === undefined || typeof v !== 'boolean') return;
	}	
	v = action.rvrs ? !v : v;
  	actor.show(v);	
  }
};

appn.action.assign = Action_Assign = class extends Action {
  constructor(actor, event) {
  	super(actor, event);
  	this.reset = false;
  }
  
  perform() {  	
  	const action = this;
  	const actor = action.actor;
  	
  	if(action.rule) {
      let r = actor[action.rule]();
      r = action.rvrs ? !r : r;
      if(!r) return;
  	}
  	
  	if(action.reset) {
  		//reset
  		//read the value from mm.json._default.form
  	}
  	
  	if(actor._set_value) {
  	  	actor._set_value(action.valu);
  	}	
  }
};

appn.action.anchor = Action_Anchor = class extends Action {
  constructor(actor, event) {
  	super(actor, event);
  	this.reset = false;
  }
  
  perform() {  	
  	const action = this;
  	const actor = action.actor; 
  	const data = action.data;
  	const filename = action.flnm;
  	if(!filename || !data || !data.length) return;
  	const text = mm.storage[data];  	
  	const file = new Blob([ text ], {
  	  type : action.type
  	});
  	const href = file ? URL.createObjectURL(file) : '';   	
  	actor._set_href(href);
  	actor._set_prop('download', filename);	
  }
};

appn.action.prevent_default = Action_Prevent_Default = class extends Action {
  constructor(actor, event) {
  	super(actor, event);
  	this.reset = false;
  }
  
  perform() {  	
	const action = this;
	const actor = action.actor;
	const event = action.event;
  	event.preventDefault();
  }
};

appn.action.store = Action_Store = class extends Action {
  constructor(actor, event) {
  	super(actor, event);
  }
  
  perform() {  	
	const action = this;
	const actor = action.actor; 
	const storage = action.strg;
    // clear all Local Storage data 
    if(!storage) {
      window.localStorage.clear();
      return;
    }  
    const v = mm.storage[storage];
    if(!v) {
      console.log('No data found in mm.storage');
      return;
    }
    cm.local_store_set(storage, v);
  }
};

appn.action.render = Action_Data = class extends Action {
  constructor(actor, event) {
  	super(actor, event);
  }
  
  perform() {  	
	const action = this;
	const actor = action.actor; 
	const storage = action.strg;
	const request = action.rqst;
    let v;
    if(storage && request && actor[request]) {
      v = actor[request](action);
  	  if(v) mm.storage[storage] = v;
  	}
  }
};

appn.action.app_data = Action_App_Data = class extends Action {
  constructor(actor, event) {
    super(actor, event);
    // assign all action properties to "this"
	this.wait = true;
  }
  
  perform() {
	const action = this;
	const actor = action.actor;
	if(!mm.path.roles || !mm.json._app_actor || !mm.json._app_role) {
	  mm.director.proceed();
	}
	mm._app_map = {}; 	
	// 'eval' is safe to use in local environment with trusted data
	mm._app_actor = eval(mm.json._app_actor);
	mm._app_role = eval(mm.json._app_role);	
	for (let role in mm._app_role) {
	  if (!mm.role.hasOwnProperty(role)) return; 
	  console.log('role = ' + role );
   	  mm._app_map[role] = [];
   	  
   	  for (let id in mm._app_actor) {  		     		  
   		if (!mm._app_actor.hasOwnProperty(id)) return; 
   		let a = mm._app_actor[id];
   		if(a.role) {
   	      let rs = cm.split_array(a.role, mm.delimiter.space);
   		  for (let r of rs) {
   		    if(role == r) mm._app_map[role].push(a.id);
   	      }	
   		}
   	  }	  
	}
	mm.director.proceed();
  }
};

appn.action.ajax = Action_Ajax = class extends Action {
  constructor(actor, event) {
  	super(actor, event);
  	// assign all action properties to "this"
  	this.wait = true;
  }
  
  static success(response, action_json) {	  	
    console.log('Ajax Success');	  		
    mm.response = response;
    
//console.log('mm.response =  ' + mm.response);
    
    if(action_json) {
      mm.json[action_json] = response;  			
	} else {
      console.log('No mm.json name provided to save response');
	}
	mm.director.proceed();
  }

  static error(response) {	
   	console.log('Ajax Error');
   	throw new Error(response);
  }
    
  perform() {
  	const action = this;
  	const actor = action.actor;
  	const request = action.rqst ? actor[action.rqst](action) : mm.request;
  	const handler = action.hdlr;
  	const type = mm.ajax[action.type];   	  	  	
  	$.ajax({
	  type : type,
	  url : mm.path[action.path],
	  dataType: action.datatype ? action.datatype : null,
	  data: action.rqst ? request : null,
	  success : function(data, textStatus, jqXHR) {			
		if(jqXHR.responseJSON || jqXHR.responseText) {	
		  Action_Ajax.success(data, action.json);
		} else {
	      Action_Ajax.error(data);
		}
	  },
	  error : function(jqXHR, textStatus, errorThrown) {
	    Action_Ajax.error(data);
	    mm.director.proceed();
	  }
	});	  
  }
};

appn.action.tree_init = Action_Tree_init = class extends Action {
  constructor(actor, event) {
  	super(actor, event);
  }
  
  perform() {
  	const action = this;
  	const actor = action.actor;  	
    actor.init(actor.id, mm.json.fancytree);
    actor.contextmenu(actor.id);    
  }
};

appn.action.options = Action_Options = class extends Action {
  constructor(actor, event) {
  	super(actor, event);
  	this.rule = "";
  }
  
  perform() {
  	const action = this;
  	const actor = action.actor;
  	const json = mm.options[action.json];
    actor._add_options(json);    
  }
};

appn.action.map_data = Action_Map_Data = class extends Action {
  constructor(actor, event) {
  	super(actor, event);
  }
  
  static traverse (actor, json) {
    const  a = actor;
    if(!json.hasOwnProperty(a.name)) return;
    const jn = json[a.name];
    // check if actor can be cloned 
    // to map data from jason array in this node
    if(a.is_model()) {		  
      if(!Array.isArray(jn)) return;
      const sfx = a._last_clone_sfx;
      const acs = a.get_clone_ids();	
      for (let i = 0; i < acs.length; i++) {
    	const atbr = mm.actor[acs[i]];
    	const rc = new appn.action.remove_clone(atbr, event);
		rc.perform();
	  }
      for ( let k = 0; k < jn.length; k++ ) {
    	const action = new appn.action.clone(a, event);
        action.perform();
        const nc = mm.actor[a.id + a._last_clone_sfx];
        let nc_json = {};
        // create json with cloned actor's name as a root node
        // to map data to its children
        nc_json[nc.name] = jn[k];
        Action_Map_Data.traverse(nc, nc_json);
      }
    }
    if(a._set_value && (jn !== null || jn !== undefined) ) {
      a._set_value(jn);
    } else if(Object.entries(jn).length) {	  
        const ac = a.children; 
      if(!ac || !ac.length) return;
      for ( let i = 0; i < ac.length; i++ ) {
    	const c_id = ac[i];
    	const c = mm.actor[c_id];
		if(Object.entries(jn).length) {
	      Action_Map_Data.traverse(c, jn);				  
		}
	  }
	} else {
		console.log("Please check the value in data. It should match the default type.");
	}
  }
		
  perform() {
	const action = this;
	const actor = action.actor;
  	let data_source;  	
  	if(action.json && typeof action.json === 'object') {
  	  data_source = action.json;
  	} else if(action.trgt && action.rule) {
      const ta_id = actor.target(action);
      const ta = mm.actor[ta_id];		
  	  data_source = ta[action.rule](action);
  	}
  	if(!data_source) {
  	  console.log('No data source provided.');
  	  return;
  	}
  	Action_Map_Data.traverse(actor, data_source);
  }
};

appn.action.export_data = Action_Export_Data = class extends Action {
  constructor(actor, event) {
  	super(actor, event);
  }
  
  perform() {
	const action = this;
	const actor = action.actor;
	const storage = action.strg;
	let data = {};
	data[actor.name] = actor.collect_data();	
	mm.storage[storage] = JSON.stringify(data);
  }
};

appn.action.activate_node = Action_Activate_Node = class extends Action {
  constructor(actor, event) {
  	super(actor, event);
  	this.actor_type = ['tree'];
  }
  
  perform() {
	const action = this;
	const actor = action.actor;
	const tree = actor._get_tree();
	const ch = tree.getFirstChild();
  	ch.setActive();
  	ch.setFocus();
  }
};

appn.action.update_data = Action_Update_Data = class extends Action {
  constructor(actor, event) {
  	super(actor, event);
  }
  
  perform() {
	const action = this;
	const actor = action.actor;
  	actor.update_node_data(action);
  }
};

appn.action.localization = Action_Localization = class extends Action {
  constructor(actor, event) {
  	super(actor, event);
  }
  
  perform() {
	const action = this;
	const actor = action.actor;	
	const actors = mm.actor;
	const locale = actor._get_locale();
	const lang = mm.lang[locale];
  	for (let id in actors) {	
  	  if (actors.hasOwnProperty(id)) { 	  		  	  		
  		const a = actors[id];
        if(a._set_label) {
  	      let label = a.label;
  	  	  if(label && label.slice(0, 2) !== '__'){
  	  	    console.log('Please provide label in a reqiured format: __your_label for "' + id + '"');
  	  	  } else {
  	  		const lbl = label ? lang[label] : '' ;
  	  	    const required = lbl && a.required ? mm.symbol_required : '';
  	  	    a._set_label(lbl + required);  			
  	  	  }  	  			
  	    }
  	  }
  	}
  }
};

appn.action.fetch = Action_Fetch = class extends Action {
  constructor(actor, event) {
    super(actor, event);
    // default validation value expected as 'true' - for passed and 'false' - for failed
	// if validation logic requires an opposite value to pass, set 'rvrs: true' in respective action in roles.js 
	this.call     = null;
	this.contenttype = null; // 'application/json', text/html;charset=UTF-8
	this.json     = null;
	this.rvrs     = false;
	this.rule 	  = null;
	this.rqst	  = null;
	this.trgt 	  = null;
	this.wait 	  = true;
  }
	  
  perform() {
	const action = this;
	const actor = action.actor;
	const a_id = actor.id;
	console.log('FETCH');
	  	
	if(action.rule && !actor[action.rule](a_id, action)) {
	  mm.director.proceed();
	  return;
	}
	const call = action.call;
	const callback = function(result) {
	  if(result.errors) {
	    console.log('errors');
	  } else {
	    // map result data
	    // mm.views?
	  }
	  mm.director.proceed();
	  return;
    };
    const request = action.rqst ? actor[action.rqst](a_id, action) : {};
    if(request === false) {
      mm.director.proceed();
	  return;
    }
    cm.postmessage(call, action.contenttype, request, callback);
  }
};

appn.action.validate = Action_Validate = class extends Action {
  constructor(actor, event) {
  	super(actor, event);
  	// default validation value expected as 'true' - for passed and 'false' - for failed
  	// if validation logic requires an opposite value to pass, set 'rvrs: true' in respective action in roles.js 
  	this.rvrs = false;
  }
  
  perform() {
	const action = this;
	const actor = action.actor;
	const er = actor._get_error();
	const locale = actor.get_locale();
	const lang = mm.lang[locale];
	let er_msg = lang[action.errr];
  	if(!er_msg) {
  		throw new TypeError ('ERROR - no validation error message provided.');
  	}
  	// check if previous validation has not passed yet by comparing unique error messages
  	// if passed or the error message is the same then proceed with the validation
  	if(er !== '' && er !== er_msg) {
  		return;
  	}
  	let rule;
	if(action.rule){
	  if(action.trgt) {
		const ta_id = actor.target(action);
		const ta = mm.actor[ta_id];	
		rule = ta[action.rule](action);	  		
	  } else {
		rule = actor[action.rule](action);
	  }
	}
	// validation rule should always return a boolean value only
	if(typeof rule !== 'boolean') return;
	
	// check if there is a reverse condition for the rule
	rule = action.rvrs ? !rule : rule;
	
	// if validation passed replace the error message with empty string
	er_msg = rule ? '' : er_msg;
	actor._set_error(er_msg);
	actor._show_error(!rule);
  }
};

appn.action.clone = Action_Clone = class extends Action {
  constructor(actor, event) {
  	super(actor, event);
  }
  
  static update_html_clone(html_clone, suffix) {
	const c = html_clone;
	const s = suffix;
  	c.find('[id]').addBack().each(function() {
 	  $(this).attr("id", $(this).attr("id") + s);
  	});
  	c.find('label[for]').each(function() {
  	  $(this).attr("for", $(this).attr("for") + s);
  	});
  	c.find('input[type="radio"][name]', 'input[type="checkbox"][name]').each(function() {
      $(this).attr("name", $(this).attr("name") + s);
  	});
  	return c;
  }

  static add_clones_to_actors(actor, sfx, parent_id) {
	// on enter  	  	
	const a = actor;
	const actor_id = a.id;
	const p_id = parent_id ? parent_id : null;
	// creating new actor  		
    let new_actor_id = actor_id + sfx;  	    
    mm.actor[new_actor_id] = {};
    Object.assign(mm.actor[new_actor_id], a);  	  
    let new_actor = mm.actor[new_actor_id];
    // updating data of the new actor    
    // id  	    
    new_actor.id = new_actor_id;  	
    // clone 
    // new actor clone property can contain the id of the original actor or set to false
  	// cloning clones can be a future task
    new_actor.model = a.is_model() ? actor_id : ''; 
    // no more clones from clones
  	// new_actor.model = false 
    // parent
    const check_parent_id = typeof(p_id) === 'string' && p_id !== '';
    if(check_parent_id) {
      new_actor.parent = p_id;
    }    
    // find parent   	    
  	let p = check_parent_id ? mm.actor[p_id] : new_actor.parent_actor();
	// add new actor id to the list of its parent's children, i.e. siblings
  	p.children.push(new_actor_id);  	
  	if(a.role !== undefined && '') {
  	  // add new actor id to all applicable roles in mm.map
  	  const rs = cm.split_array(a.role, mm.delimiter.space);
      for (let r of rs) {
        mm.map[r].push(new_actor_id);
      }
  	}  
    if(!new_actor.children.length) {
      new_actor_id = null;
      return;
    }  
    const ch = new_actor.children;
    // remove original children from the clone
    // and add new children with updated ids
    new_actor.children = [];
    const new_parent_id = new_actor_id;
    for (let ch_id of ch) {  	  
  	  let child = mm.actor[ch_id];	
  	  Action_Clone.add_clones_to_actors(child, sfx, new_parent_id);
    }
  }

  perform() {
	const action = this;
	const actor = action.actor;  	
  	// ensure the original cloneable actor used for further cloning and not previously created clones
  	if(!actor.is_model()) return;
  	const html_item = $( '#' + actor.id );
  	let html_clone = html_item.clone(true);
  	const actor_id = actor.id;
  	if(!actor.model && actor.is_visible()) return;
  	const clones = actor.get_clone_ids();   	
  	const cn = actor.calcualte_next_clone_index(clones);
  	// if index of the last delimiter is smaller then index of the name part
  	// then no clones have been created yet
  	const d_idx = actor_id.lastIndexOf(mm.delimiter.id);
  	const n_idx = actor_id.lastIndexOf(actor.name);
  	let sfx;
  	let new_actor_id;
  	// check if the id ending with the actor name and no other characters added after
  	if(d_idx < n_idx) {
  	  sfx = mm.delimiter.id + ( cn > 9 ? String(cn) : '0' + cn );
  	  html_clone = Action_Clone.update_html_clone(html_clone, sfx);
  	  Action_Clone.add_clones_to_actors(actor, sfx); 
  	  html_clone.insertBefore(html_item);
  	  let na = mm.actor[actor.id + sfx];
  	  if(!na) return;
  	  actor._last_clone_sfx = sfx;
  	  na.show(true);  	  
  	} else {
  		throw new TypeError ( actor_id + ' : check if this actor_id is correct. Example: 01_01_01_field_name');
  	}
  }
};

appn.action.remove_clone = Action_Remove_Clone = class extends Action {
  constructor(actor, event) {
  	super(actor, event);
  }
  
  static remove_from_actors(actor_id) {
	const a_id = actor_id;
	if(!a_id || !mm.actor[a_id]) return;
	const ch_id = mm.actor[a_id].children;
	let id = '';
	if(ch_id.length > 0) {
	  for (id of ch_id) {
		Action_Remove_Clone.remove_from_actors(id);
	  }
	}
	if(!id) return;
	Action_Remove_Clone.remove_from_map(id);
	delete mm.actor[id];
  }

  static remove_from_map(actor_id) {
	const a_id = actor_id;
	if(!a_id || !mm.actor[a_id]) return;
	const actor = mm.actor[a_id];
	const rs = actor.role.split(mm.delimiter.space);
	for (let role of rs) {
	  cm.remove_from_array(a_id, mm.map[role]);
	}
  }

  perform() {
	const action = this;
	const event = action.event;
	const actor = action.actor;
  	// check if the actor was prevously cloned
  	if(typeof(actor.model) !== 'string' || actor.model === '') return;
  	if(!mm.actor[actor.model]) return;
  	// remove child from parent children array
  	const p = actor.parent_actor();  	
  	cm.remove_from_array(actor.id, p.children);
  	// remove all children from mm.actor and mm.map
  	Action_Remove_Clone.remove_from_actors(actor.id);
  	// remove DOM element
  	$('#' + actor.id).remove();
  }
};

appn.action.plugin = Action_Plugin = class extends Action {
  constructor(actor, event) {
  	super(actor, event);
  }
  
  perform() {
	const action = this;
	const actor = action.actor;  	
    actor.init(action); 
  }
};

appn.action.a2hs = Action_A2HS = class extends Action {
  constructor(actor, event) {
	super(actor, event);
  }
	  
  perform() {
	const action = this;
	const actor = action.actor;  	
	
	let deferredPrompt;
	const addBtn = document.querySelector('#' + actor.id);
	addBtn.style.display = 'none';
	
	window.addEventListener('beforeinstallprompt', (e) => {
	// Prevent Chrome 67 and earlier from automatically showing the prompt
	e.preventDefault();
	// Stash the event so it can be triggered later.
	deferredPrompt = e;
	// Update UI to notify the user they can add to home screen
	addBtn.style.display = 'block';

	addBtn.addEventListener('click', (e) => {
	  // hide our user interface that shows our A2HS button
	  addBtn.style.display = 'none';
	    // Show the prompt
		deferredPrompt.prompt();
		// Wait for the user to respond to the prompt
		deferredPrompt.userChoice.then((choiceResult) => {
		  if (choiceResult.outcome === 'accepted') {
		    console.log('User accepted the A2HS prompt');
		  } else {
		    console.log('User dismissed the A2HS prompt');
		  }
		  deferredPrompt = null;
		});
	  });
	});

  }
};
