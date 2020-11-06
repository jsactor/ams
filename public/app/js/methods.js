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

//common methods

;var cm = {};

cm.fetch = async function(file_url, type) {
  const fu = file_url;
  const t = type ? type : 'text'; // 'application/json', text/html;charset=UTF-8
  const response = await fetch(fu);
  const v = await response[t]();
  // if json then JSON.stringify(myJson)
  return v;
};

cm.postmessage = function (call, contenttype, request, callback) {
	let ww = 'app/ww/fetch.js';
	let config = {};
	config.url = '../.' + mm.path.request + '/' + call;
	config.contenttype = contenttype;
	config.request = typeof request === 'string' ? request : JSON.stringify(request);
	let worker = new Worker(ww);
	worker.addEventListener('message', function(e) {
		callback(e.data);
	}, false);
	worker.postMessage(config);
	console.log('WEB WORKER');
};

// returns item if it's a number > 0
cm.filter_number = function(a){
	if(Number(a)) return a;
};

cm.check = function(v1, v2) {
  if(v1 && v2) {
    if(v1 !== v2) {
     throw new TypeError ('Critical error.');				
    } 	
  }
  if(v1 && !v2) {
    if(v1 === null || v1 === undefined ) {
      throw new TypeError ('Critical error.');				
	}
  }
};

cm.in_array = function(item, array) {
  return array.indexOf(item) >= 0;
};

cm.split_array = function(array, delimiter) {
  return array.split(delimiter);
};

cm.remove_from_array = function(item, array) {
  	let index = array.indexOf(item);
  	if (index !== -1) array.splice(index, 1);
};

cm.local_store_set = function(key, value) {
  window.localStorage.setItem(key, value);
};

cm.local_store_get = function(key) {
  window.localStorage.setItem(key);
};

cm.map_data_entries_to_object = function(object, data, enclosed) {
  for (let [key, value] of Object.entries(data)) {	  
  // enclosed parameter can be handled in a different way 
  //  by searching the actor name in the data json 
  if(key === enclosed) {
    if(data[key] !== null || undefined) {
      cm.map_data_entries_to_object(object, data[key]);
     }
    } else {
      object[key] = value === undefined ? null : value;
    }
  }
};

cm.traverse = function(json) {
  // json is from fancy_tree is from es.fancy_tree	
  if (typeof json === 'object' && json !== null) {
    flatten_json = cm.traverse_object(json);
  }	
  return flatten_json ? flatten_json : {};
};

cm.traverse_object = function(obj) {
//json is from fancy_tree is from es.fancy_tree	

  //set object id which will be a key in flat tree
  obj.id = '_' + mm.temp.temp_id;
    
  if(!obj.id) {
    throw new TypeError ('ERROR - no object id created.');
  } 

  let parent = mm.temp.fjt[obj.id] = {};
  parent.id = obj.id;
  parent.children = [];
  
  let id = '_' + mm.temp.temp_id++;
  for (let key in obj) {
    
    if (obj.hasOwnProperty(key)) {
      let obj_key = obj[key];	
      // set ID and create new flat tree item
      if(key === 'title') {
      // TITLE key          
        mm.temp.fjt[id] = mm.temp.fji;	
        mm.temp.fjt[id].id = id;        
        mm.temp.fji = {};
      } else if(key === 'data') {
        // DATA key
        for (let k in obj_key) {
       	if (obj_key.hasOwnProperty(k)) {
          // do not overwrite the ID                
          if( k != 'id' ) {
            if( mm.temp.fjt[parent.id][k] ) {
              console.log('K :: ' + k);
              throw new TypeError ('ERROR: ' + k + ' - Duplicated key in data object.');
            }
            mm.temp.fjt[parent.id][k] = obj_key[k];                  	
          }
        }          	
      }          
    } else if (key === 'children') {
      // CHILDREN key          
      if(obj_key.length !== 0) {
        // make an array of children
        for (let i in obj_key) {
          let item = obj_key[i];
            if(typeof item === 'object') {
              if (item.title) {
              	item.id = '_' + mm.temp.temp_id;
               	parent[key].push(item.id);
               	mm.temp.fjt[parent.id][key] = parent[key];                  	
              }                  
              cm.traverse(item);
           }	
         }
        }
      }
	}
  }
  return mm.temp.fjt;
};

cm.update_ids = function(flat_tree) {
  // create unique numeric index
  for (let key in flat_tree) {
    let w = flat_tree[key];
    let parent_prefix = w.id !== '_0' ? w.id : '';			
    let children = w.children;		
    if(children && children.length > 0) {
      for (let k in children) { 
        let child = flat_tree[children[k]];			
		let index = (k++ < 9) ? ('_0' + k++) : ('_' + k++) ;
		child['id'] = parent_prefix + index;
      }				
    }
  }
	
  // create unique index with object name
  let index = flat_tree;
  flat_tree = {};
  
  for (let key in index) {
    let item = index[key];
    if(item.id || item.name) {
      let new_id = item.id + '_' + item.name;
      if(key === 'root') new_id = key;
        item['id'] = new_id;
        flat_tree[new_id] = item;
      }
   }
	
  // set parent property
  for (let key in flat_tree) {      
    let w = flat_tree[key];
    let children = w.children;
    for (let k in children) {      
      let child = index[children[k]];
      child['parent'] = key;
    }
  }
  
  // set children property
  for (let key in flat_tree) {
    let w = flat_tree[key];
    let children = w.children;
    let new_children = [];
    for (let k in children) {
      let child = index[children[k]];
      child['parent'] = key;
      new_children.push(child.id);
    }
    w.children = new_children;
  }

  if(flat_tree._01_html && flat_tree._01_html.parent) {
    // remove root/parent property from html node
    delete flat_tree[flat_tree._01_html.parent];
    // remove root node
    delete flat_tree._01_html.parent;
  }
  return flat_tree;
};

cm.tree = function(root_widget, flat_json) {
 let json_tree = flat_json;
  let root = root_widget;
  let template_rendered = "";
  let render_children = root.children;
  let obj = {};
  if(render_children.length) {
    for ( let i = 0, length = render_children.length; i < length; i++ ) {				
  	  let item = render_children[i];
	  obj = json_tree[render_children[i]];		
	  if(obj.children && obj.children.length > 0 ) {
        obj.child = cm.tree(obj, json_tree);
	  }	
	  template_rendered = template_rendered + cm.render_template(obj);
	}		
  } else {
	console.log("No children to render");
  }
  return template_rendered;
};

cm.get_template = function(actor_type) {	
	return mm.template[actor_type];
};

cm.render_template = function(object) {
	const obj = object;
	let m;
	const actor_type = obj.type;
	
	const template = cm.get_template(actor_type);
		
	Mustache.parse(template);
	m = Mustache.render(template, obj);	
	return m;
};

cm.get_root_widget = function(flat_json) {
  let response = {};
  let tree_widget = flat_json;
  let obj = {};
  for (let key in tree_widget) {	
    if (tree_widget.hasOwnProperty(key)) {			
      obj = tree_widget[key];
      if(!obj.parent) {
        response = obj;
      }
    }
  }
  return response;
};

cm.build_js = function(json) {
    return "appn.actor = " + json + ";";
};

cm.build_json = function(fancy_tree) {
  // 'fjt' and 'mm.temp.temp_id' should be reset from the previous render run
  mm.temp.fjt = {};
  mm.temp.fji = {};
  mm.temp.temp_id = 0;
  let flat_tree = cm.traverse(JSON.parse(fancy_tree));	
  return cm.update_ids(flat_tree);
};

cm.build_html = function(flat_json) {
  let actor = this;
  const root_widget = cm.get_root_widget(flat_json);	
  root_widget.child = cm.tree(root_widget, flat_json);
  return cm.render_template(root_widget);
};

// actor methods

appn.methods = {};

appn.methods.actor = {

  has_css_class: function(css_class) {
	let el = document.querySelector('#' + this.id);
	let cs = cm.split_array(el.className, mm.delimiter.space);
	return cm.in_array(css_class, cs);
  },
  
  get_locale: function() {
    return document.getElementById('_01_html').getAttribute("lang");
  },
  
  get_type: function() {
    cm.check(this.type);
    return mm.type[this.type];
  },

  parent_id: function() {
    return this.parent;
  },

  parent_actor: function() {
    return mm.actor[this.parent];
  },

  map_data: function() {
  },

  collect_data : function(handler) {
    let actor = this;
    let hdlr = handler ? handler : '_get_value';
    let obj = null;
    // if actor is not visible then value is no longer valid
    if(!actor.is_visible()){
      return null;
    }
    // get value by handler method
    if(actor[hdlr]){
  	  let v = actor[hdlr]();
  	  return v ? v : null;
  	}
	let children = actor.children;
	if(children && children.length > 0) {
	  for (let i in children) {		
		let ch = mm.actor[children[i]];		
		if(!ch) return;
		let ch_obj;
		let obj_to_obj;
        if(!ch.is_model()) {
		  let ch_obj = ch.collect_data();
		  if(ch_obj && (typeof ch_obj === 'object' || typeof ch_obj === 'string' || typeof ch_obj === 'boolean')) {	  
		    obj = obj || {};	   
		    obj_to_obj = ch_obj;
		    if(ch.is_clone()) {
		      let model = mm.actor[ch.model];
		      if(model) {
			    let array = obj[model.name] || [];
			    array.push(ch_obj);  
			    obj_to_obj = array && array.length ? array : null;		    	  
		      }
		    }
		    obj[ch.name] = obj_to_obj;
		  }
	    } 
	  }
	}
	return obj;
  },

  show: function(show) {
	let el = document.getElementById(this.id);
	el.classList.remove(CSS_HIDDEN);
    if(!show) {
    	el.classList.add(CSS_HIDDEN);
    }
  },

  find_panel: function() {
	cm.check(this.type);
  },

  // finds id of the closest actor by role in action.trgt
  get_actor_id_by_role: function(action) {
	const ac = action;
	const actor = ac.actor;
	const role = ac.trgt;
    // check if trgt is the actor itself
	const rs = cm.split_array(actor.role, mm.delimiter.space);
    // if yes return an array with actor id only
    if(cm.in_array(role, rs)) return [actor.id];
    
    const ta_id = mm.map[role];
    if(!ta_id || !ta_id.length) return;
     
    // return target actor id if it's an only actor having this role
    if(ta_id.length == 1) {
      return ta_id;
    }

    // check if the actor is clone:
    // if not, then look for the target without clone suffix
    // if yes then look only for target with clone suffix
    
    // get non-cloned targets 
    const find_non_cloned_targets = function(targets){
      const ts = targets;
      let nca = [];
      for (let id in ts) {
    	const ncta = mm.actor[ts[id]];
    	if (!ncta.is_clone()) {
    	  nca.push(ts[id]);
    	}
      }
      return nca;
    };

    // get non-cloned targets 
    const find_cloned_targets = function(targets){
      const ts = targets;
      let nca = [];
      for (let id in ts) {
    	const ncta = mm.actor[ts[id]];
    	if (ncta.is_clone()) {
    	  nca.push(ts[id]);
    	}
      }
      return nca;
    };

    // return non-cloned target if there is no more 
    // than one non-cloned target actor in the array
    let trgts;
    if(!actor.is_clone()) {
      trgts = find_non_cloned_targets(ta_id);
      if(trgts && trgts.length === 1) {
    	  return trgts;
      } else if(trgts.length > 1) {
    	// replace the targets array with the non-cloned targets only array
    	// actor cannot directly target a particlar clone as its id is dynamic.
    	ta_id = trgts;
      }
    } else {
      // if this actor is cloned:	
      // cloned actor can target only 
      // - the actor which it was not cloned from
      // - the clone within the same cloned piece: fieldset, group, panel
      trgts = find_cloned_targets(ta_id);
      if (trgts && trgts.length) {    	  
    	const actor_sfx_index = actor.id.indexOf(actor.name) + actor.name.length + 1;
     	actor_sfx = actor.id.substring(actor_sfx_index);
     	for (let trgts_id in trgts) {
     	  const tac = mm.actor[trgts[trgts_id]];
		  console.log(tac.name);
		  const tac_sfx_index = tac.id.indexOf(tac.name) + tac.name.length + 1;
		  tac_sfx = tac.id.substring(tac_sfx_index);
		  if(actor_sfx === tac_sfx ) {
  			return [tac.id];
		  }
	    }
      } else {
    	// remove the original actor it was cloned from if it's in the array
    	trgts = find_non_cloned_targets(ta_id);
    	let ncts = [];
    	for (let t in trgts) {
    	  const ncta = mm.actor[ts[id]];
          if (actor.model && actor.model !== ncta.id) {
        	ncts.push(ncta);
          }
    	}    	
    	if(ncts.length) ta_id = ncts;
      }
    }
            
    // if there are more than one target actor with this role look for closest one
    // break down the actor id into 'number' parts and remove its name from the array
    const a_id = actor.id.split(mm.delimiter.role);
     
    const af = a_id.filter(cm.filter_number);
	
    let closest = [];
    
    let tf = {};
    let longest = 0; 

    for (let id in ta_id) {
      const t_id = ta_id[id];
      const p = t_id.split(mm.delimiter.role);
	  tf[t_id] = p.filter(cm.filter_number);	
	  longest = tf[t_id].length > longest ? tf[t_id].length : longest;
	}
	// add '00' to the end of actor id parts array for comparison
	if(longest && (longest > af.length)) {
	  let afl = af.length;
	  for (let l = 0; l < longest - afl; l++) {
		af.push('00');
	  }
	}
		
//ES REMINDER test for ids longer than actor's id
//		_01_html
//		_01_02_02_03_type _01_02_02_07_required
	
	// iterating through actor id parts
	for (let i = 0; i < af.length; i++) {
      // array for closest actors
	  let smallest = 0;

	  for (let id in tf) {
		const tf_id = tf[id];
		if(!tf_id) return;				
		if(tf_id[i]) {
		  // closest actor's id is equal or longer than the current actor's id
		  // part of the path is the same
		  if(af[i] === tf_id[i]) {
			if (!cm.in_array(id, closest)) {
			  closest.push(id);
			}
		    
			if(tf_id.length > af.length) {
			  // compare parts of ids to 0
		    }
		  } else {
		    // part of the path is not the same	
		    // if last item in tf_id array
		    if(i == tf_id.length - 1) {
		      if(closest.length == 1) {
			    return closest;
			  } else {
			      if(smallest <= 0 || (smallest > 0 && Number(tf_id[i]) <= smallest)) {
				  smallest = Number(tf_id[i]);
			    } else {
			      const nc = closest.indexOf(id, 0);
			      closest.splice( nc, 1 );
			    }
			  }
	        } else {
			  // there are more items in tf_id array
			  // check who has smaller index
		    }
		  }			
	    } else {			
	      // closest actor's id is shorter than the current actor's id
		  console.log('NO MORE ID PARTS FOUND');
		  return;
	    }
      }
	  // return closet item
	  if(smallest > 0 && closest.length == 1) {
	    return closest;
	  }	
    }
  },
  
  target: function(action) {
    if(!action.trgt) return;
    const actor = this;
    const t = action.trgt;    
    if(mm.role[t]) {
      // search by role
      return actor.get_actor_id_by_role(action);
    } else if(typeof actor[t] === 'function') {
      // search by method
      return [actor[t](action).id];
    } else {
      throw new TypeError ('No target found.');
    }
  },

  find_value_in_json: function(source_json, title, handler) {
	const actor = this;
    let value;
    const traverse = function(json, title) {
      for (let key in json) {
    	const obj = json[key];
        if(key === title && typeof obj !== 'object') {
          value = obj;
        } else if(typeof obj === 'object') {
          traverse(json[key], title);
        }
        if(value) return value;
      }
    };
    return traverse(source_json, title);
  },
  
  is_model: function() {
    return this.model === true;
  },
  
  is_clone: function() {
	return typeof(this.model) === 'string';
  },
	
  get_clone_ids: function() {
	const actor = this;
	const p = actor.parent_actor();
	const ch = p.children;
	let clones = [];
	for (let ch_id of ch) {
	  if(mm.actor[ch_id].model === actor.id) {
		  clones.push(ch_id);
	  }
	}
	return clones;
  },
  
  calcualte_next_clone_index: function(clone_ids) {
	const cids = clone_ids;
    let max = 0;
    if (cids.length === 0) return max + 1;
    for ( let i = 0; i < cids.length; i++ ) {
    	const cid = cids[i];
    	const dx = cid.lastIndexOf(mm.delimiter.id);
    	const cid_sfx = cid.substring(dx + 1);
    	if( Number(cid_sfx) > max ) max = Number(cid_sfx);
    }
    return max + 1;
  },
	
  is_value: function(action) {
	const actor = this;
	const ac = action;
    if(!ac.trgt) return;
    const ta_id = actor.target(ac);
    const ta = mm.actor[ta_id[0]];
    // v can be an empty string ''
    let v = ta._get_value();
    if(Array.isArray(ac.valu) || typeof ac.valu === 'object') {
      v = cm.in_array(v, ac.valu);
    }
    if(typeof v === typeof ac.valu) {
      v = v === ac.valu;
    }
    return v;
  },

//ES REMINDER is_visible: look for the hidden parents may be needed later
  is_visible: function(action) {
	const actor = this;
	const ac = action;
	const a = actor;
    if(ac) {
      // if 'action' provided then it works as action rule for target
      if(!ac.trgt) return;
      const ta_id = actor.target(ac)[0];
      a = mm.actor[ta_id];
    }   
    return !a.has_css_class(CSS_HIDDEN);
  },

  is_app_version_online: function() {
	  return mm.app_version_online;
  },
  
  /** VALIDATION RULES **/
  
  v_required: function() {
	const actor = this;
    return actor._get_value() ? true : false;
  },
  
  v_email: function() {
	const actor = this;
	const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return actor._get_value().match(re) ? true : false;
  },
  
  v_password: function() {
	const actor = this;
	const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
	return actor._get_value().match(re) ? true : false;
  },
  
  /** // VALIDATION RULES **/
};

//button actor methods
appn.methods.button = {

  a2hs: function() {
	const actor = this;  
	  
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

// select actor methods
appn.methods.select = {
};

//input actor methods
appn.methods.input = {

  /** VALIDATION RULES **/

  v_name_unique: function() {
	const actor = this;
	const v = actor._get_value();
	const p_id = actor.parent;
	const p = mm.actor[p_id];
	let unique = true;
    for ( let i = 0,length = p.children.length; i < length; i++ ) {
      const ch_id = p.children[i];
      if(ch_id !== actor.id) {
        if(mm.actor[ch_id].name === v) {
          unique = false;
        }    	  
      }
    }
    return unique;
  }
  /** // VALIDATION RULES **/
};

// charts actor methods
appn.methods.chart = {
		
  app_stats: function() {
	const actor = this;
	const s = mm._app_role || mm.role;
  	let json = [];
  	json.push(['Action', 'Number']);
  	let arr = {};
  	for (let [key, value] of Object.entries(s)) {
  	  const actions = value.actions;
  	  for (let i in actions) {
  		const actn = actions[i].actn;
  		arr[actn] = arr[actn] > 0 ? arr[actn] + 1 : 1;
  	  }	
  	}
  	for (let [key, value] of Object.entries(arr)) {
  	  json.push([key, value]);
  	}
  	json.sort(function(a, b){return b[1] - a[1]});
  	return json;
  },
			
  init: function(action) {
	const actor = this;
	const ac = action;
	const app_data = actor[ac.data]();
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(draw_chart);
    function draw_chart() {
      const data = google.visualization.arrayToDataTable(app_data);
      const options = {
        //title: 'Actions',
        'legend':'left',
    	'is3D':true,
    	'width':900,
    	'height':800
      };
      const chart = new google.visualization.PieChart(document.getElementById(actor.id));
      chart.draw(data, options);
    };
  }		
};

//datatables actor methods
appn.methods.datatable = {
		
  app_map: function() {
	// if it's not admin copy then run mm.map for app only  
    if(mm.path.roles !== null && !mm._app_map) {
       	throw new TypeError ('NO DATA in mm._app_map');
    }
    const s = mm._app_map && Object.entries(mm._app_map).length ? mm._app_map : mm.map;
    let json = [];
    for (let [key, value] of Object.entries(s)) {  		
      let obj = {};
      obj.roles = '<b>' + key + '</b>';
      obj.actions = '';   
      
      // this should read appn.role from dinamically loaded
      // app roles.js file instead of admin's own roles.js
      // to show the list of roles in the app under development
      
      // if it's not admin copy then run mm.role for app only  
      const role = mm._app_role ? mm._app_role[key] : mm.role[key];      
      const actions = role.actions && role.actions.length ? role.actions : null;
      if(actions) {
    	let actn_str = '<ul>';
        for (let i in actions) {
          const aia = actions[i].actn;
          actn_str += '<li title="' + mm.desc.action[aia] + '"><b>' + aia + '</b><ul>';
          let actn_config = '';
          for (let [k, v] of Object.entries(actions[i])) {
        	// 'action.role' is used for console output only
        	if(k !== 'actn' && k !== 'role') {
        	  let vv = v;
        	  if(typeof v === 'object') vv = '[object]';
        	  if(Array.isArray(v)) vv = v;
              actn_config += '<li><i>' + k + '</i> : ' + vv + '</li>'; 
        	}
          }
          actn_str += actn_config + '</ul></li>';
        }
        actn_str += '</ul>';
        obj.actions = actn_str;
      }
      obj.actors = '';
      const ids = value.length ? value : null;
      if(ids) {
        let ids_str = '<ul>';
        for (let id of ids) {
          ids_str += '<li>' + id + '</li>';
        }
        ids_str += '</ul>';
        obj.actors = ids_str;
      }
      json.push(obj);
    }
  	return json;
  },	
		
  init: function(action) {
    const actor = this;
//    const ajax = action.ajax;
    const data = actor[action.data] ? actor[action.data]() : action.data;
    const columns = action.clms;
    let n = 0;
    const dt = $('table#' + actor.id + '_datatable').DataTable({
//	    'ajax': ajax,
		'data': data,
	    'columns': columns,
        'columnDefs': [
          { 'targets': [ 0 ], 'width': '4%' },
          { 'targets': [ 1 ], 'width': '20%' },
          { 'targets': [ 2,3 ], 'width': '38%' },
          { 'targets': [ 0 ],
            'render': function ( data, type, row ) {
             return n++;
            },  
          },
//        { 'targets': [ 3 ], 'visible': false }
        ],
        'pageLength': 50
	});
  }
};

//tree actor methods

appn.methods.tree = {

  get_tree: function(action) {
	const actor = this;
	const ac = action;
    let request = {};
    if(ac.key) {
      let urls = {};
	  urls.base		= mm.render.base;
	  urls.html 		= mm.render.html;
	  urls.app		= mm.render.app;
	  urls.actors 	= mm.render.actors;
	  urls.tree 		= mm.render.tree;
      request.urls = JSON.stringify(urls);
      request[ac.key] = actor._get_value();
    } else {
      request = actor._get_value();
    }
    return request;
  },
  
  get_actors: function(action) {
	const ac = action;
	let request = {};
	const v = mm.storage['fancytree'] ? mm.storage['fancytree'] : null;
    if(v === null) {
      throw new TypeError ('ERROR - no data in "fancytree" storage.');
    }
    const app_json = cm.build_json(v);
    const app_json_str = cm.build_js(JSON.stringify(app_json));
    if(ac.key) {
      request[ac.key] = app_json_str;
    } else {
      request = app_json_str;
  	}
	return request;
  },

  get_html: function(action) {
	const ac = action;
    let request = {};
    const v = mm.storage['fancytree'] ? mm.storage['fancytree'] : null;
    if(v === null) {
      throw new TypeError ('ERROR - no data in "fancytree" storage.');
    }
    
    mm.gh0 = performance.now();
    
    const app_json = cm.build_json(v);
    const app_html = cm.build_html(app_json);
    if(ac.key) {
      request[ac.key] = app_html;
    } else {
      request = app_html;
      mm.gh1 = performance.now();
      console.log('mm.gh0 = ' + mm.gh0);
      console.log('mm.gh1 = ' + mm.gh1);
      console.log((mm.gh0 - mm.gh1) + " milliseconds.");
    }
    return request;
  },
  
  contextmenu: function(actor_id) {
    $("#" + actor_id).contextmenu({
      delegate: "span.fancytree-node",
      menu: [
        {title: "Edit <kbd>[F2]</kbd>", cmd: "rename", uiIcon: "ui-icon-pencil" },
        {title: "Delete <kbd>[Del]</kbd>", cmd: "remove", uiIcon: "ui-icon-trash" },
        {title: "----"},
        {title: "New sibling <kbd>[Ctrl+N]</kbd>", cmd: "addSibling", uiIcon: "ui-icon-plus" },
        {title: "New child <kbd>[Ctrl+Shift+N]</kbd>", cmd: "addChild", uiIcon: "ui-icon-arrowreturn-1-e" },
        {title: "----"},
        {title: "Cut <kbd>Ctrl+X</kbd>", cmd: "cut", uiIcon: "ui-icon-scissors"},
        {title: "Copy <kbd>Ctrl-C</kbd>", cmd: "copy", uiIcon: "ui-icon-copy"},
        {title: "Paste as child<kbd>Ctrl+V</kbd>", cmd: "paste", uiIcon: "ui-icon-clipboard", disabled: true }
      ],
      beforeOpen: function(event, ui) {
    	const node = $.ui.fancytree.getNode(ui.target);
        $("#" + actor_id).contextmenu("enableEntry", "pa43ste", !!CLIPBOARD);
        node.setActive();
      },
      select: function(event, ui) {
    	const that = this;
        // delay the event, so the menu can close and the click event does
        // not interfere with the edit control
        setTimeout(function(){
          $(that).trigger("nodeCommand", {cmd: ui.cmd});
        }, 100);
      }
    });
  },
  
  get_active_node: function() {
	const actor = this;
	const tree = actor._get_tree();
	const active_node = tree.getActiveNode();
    if(!active_node) return;
    return active_node;
  },
  
  update_node_data: function(action) {
	const ac = action;
	const actor = ac.actor;
	const active_node = actor.get_active_node();
    if(!active_node) return;
    const source = actor.target(ac);
    const source_actor_id = source[0];
    let json = {};  
    // collect data from source to json tree
    let sa = mm.actor[source_actor_id];
    json[sa.name] = sa.collect_data();
    if(!Object.entries(json).length) {
      console.log('No data collected from the app.');
      return;
    }		
	// clear off node data before updating it to remove obsolete items
    active_node.data = {};
    // assumptions: 
    // - actor form is a simple list, not a deep tree
    // - active_node.data and json.form  is an array
    cm.map_data_entries_to_object(active_node.data, json, mm.actor[source_actor_id].name);
    
    mm.an = {};
    mm.an.id = actor.find_value_in_json(json, 'id');
    mm.an.name = actor.find_value_in_json(json, 'name');
    
    //node TITLE
    if(mm.an.name) {
      active_node.setTitle(mm.an.name);
    } else console.log('Node name is undefined.');
    
    const np = active_node.getParent();
    if(np) {
      np.data.folder = true;
    }
    
    //node FOLDER flag
    if(active_node.children && active_node.children.length) {
      active_node.folder = true;
    } else if(active_node.hasOwnProperty('folder')) {
      delete active_node.folder;
    }
  },

  active_node: function(action) {
	const ac = action;
	const actor = ac.actor;
	const ft = mm.fancytree;
	let data = ft.data();
	const d = data.uiFancytree;
	const tree = d.tree;
    if(!tree.activeNode) return;
    const n = tree.activeNode;
    const nd = n.data;
    data = {};
    if(!nd || !Object.entries(nd).length) {
      data[actor.name] = mm.json._default.form;
      console.log('No active node data.');
    } else {
      // add active node title to json object
      nd.name = n.title;
      data[actor.name] = nd;
    }
    return data;
   },

  init: function(actor_id, source) {
    mm.fancytree = $("#" + actor_id).fancytree({
      checkbox: true,
      titlesTabbable: true,     // Add all node titles to TAB chain
      quicksearch: true,        // Jump to nodes when pressing first character
      source: source,
       //activate: this.activate,
       extensions: ["edit", "dnd5"],
      dnd5: {
        preventVoidMoves: true,
        preventRecursiveMoves: true,
        autoExpandMS: 400,
        dragStart: function(node, data) {
          return true;
        },
        dragEnter: function(node, data) {
          // return ["before", "after"];
          return true;
        },
        dragDrop: function(node, data) {
          data.otherNode.moveTo(node, data.hitMode);
        }
      },
      
      edit: {
        triggerStart: ["f2", "shift+click", "mac+enter"],
        close: function(event, data) {
          if( data.save && data.isNew ){
            // Quick-enter: add new nodes until we hit [enter] on an empty title
            $("#" + actor_id).trigger("nodeCommand", {cmd: "addSibling"});
          }
        }
      },
      
//      table: {
//        indentation: 20,
//        nodeColumnIdx: 2,
//        checkboxColumnIdx: 0
//      },    
     
      gridnav: {
        autofocusInput: false,
        handleCursorKeys: true
      },

      lazyLoad: function(event, data) {
        data.result = {url: "../demo/ajax-sub2.json"};
      },
      
      createNode: function(event, data) {
    	  let node = data.node,
          $tdList = $(node.tr).find(">td");

        // Span the remaining columns if it's a folder.
        // We can do this in createNode instead of renderColumns, because
        // the `isFolder` status is unlikely to change later
        if( node.isFolder() ) {
          $tdList.eq(2)
            .prop("colspan", 6)
            .nextAll().remove();
        }
      },
   
    }).on("nodeCommand", function(event, data){
      
      // Custom event handler that is triggered by keydown-handler and
      // context menu:
      let refNode, moveMode,
        tree = $(this).fancytree("getTree"),
        node = tree.getActiveNode();

      switch( data.cmd ) {
      case "moveUp":
        refNode = node.getPrevSibling();
        if( refNode ) {
          node.moveTo(refNode, "before");
          node.setActive();
        }
        break;
      case "moveDown":
        refNode = node.getNextSibling();
        if( refNode ) {
          node.moveTo(refNode, "after");
          node.setActive();
        }
        break;
      case "indent":
        refNode = node.getPrevSibling();
        if( refNode ) {
          node.moveTo(refNode, "child");
          refNode.setExpanded();
          node.setActive();
        }
        break;
      case "outdent":
        if( !node.isTopLevel() ) {
          node.moveTo(node.getParent(), "after");
          node.setActive();
        }
        break;
      case "rename":
        node.editStart();
        break;
      case "remove":
        refNode = node.getNextSibling() || node.getPrevSibling() || node.getParent();
        node.remove();
        if( refNode ) {
          refNode.setActive();
        }
        break;
      case "addChild":
        node.editCreateNode("child", "");
        //ES added for app
        node.data.folder = true;
        break;
      case "addSibling":
        node.editCreateNode("after", "");
        break;
      case "cut":
        CLIPBOARD = {mode: data.cmd, data: node};
        break;
      case "copy":
        CLIPBOARD = {
          mode: data.cmd,
          data: node.toDict(function(n){
            delete n.key;
          })
        };
        break;
      case "clear":
        CLIPBOARD = null;
        break;
      case "paste":
        if( CLIPBOARD.mode === "cut" ) {
          // refNode = node.getPrevSibling();
          CLIPBOARD.data.moveTo(node, "child");
          CLIPBOARD.data.setActive();
        } else if( CLIPBOARD.mode === "copy" ) {
          node.addChildren(CLIPBOARD.data).setActive();
        }
        break;
      default:
        alert("Unhandled command: " + data.cmd);
        return;
      }

    // }).on("click dblclick", function(e){
    //   console.log( e, $.ui.fancytree.eventToString(e) );

    }).on("keydown", function(e){
      let cmd = null;

      // console.log(e.type, $.ui.fancytree.eventToString(e));
      switch( $.ui.fancytree.eventToString(e) ) {
      case "ctrl+shift+n":
      case "meta+shift+n": // mac: cmd+shift+n
        cmd = "addChild";
        break;
      case "ctrl+c":
      case "meta+c": // mac
        cmd = "copy";
        break;
      case "ctrl+v":
      case "meta+v": // mac
        cmd = "paste";
        break;
      case "ctrl+x":
      case "meta+x": // mac
        cmd = "cut";
        break;
      case "ctrl+n":
      case "meta+n": // mac
        cmd = "addSibling";
        break;
      case "del":
      case "meta+backspace": // mac
        cmd = "remove";
        break;
      // case "f2":  // already triggered by ext-edit pluging
      //   cmd = "rename";
      //   break;
      case "ctrl+up":
        cmd = "moveUp";
        break;
      case "ctrl+down":
        cmd = "moveDown";
        break;
      case "ctrl+right":
      case "ctrl+shift+right": // mac
        cmd = "indent";
        break;
      case "ctrl+left":
      case "ctrl+shift+left": // mac
        cmd = "outdent";
      }
      if( cmd ){
        $(this).trigger("nodeCommand", {cmd: cmd});
        // e.preventDefault();
        // e.stopPropagation();
        return false;
      }
    });
  }
};
