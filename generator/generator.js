
const fs = require('fs');
const Mustache = require('mustache');

//generator
const url_gen 			= 'generator/';
var url_views 			= 'views/';
const file_ext 			= '.html';

var template_rendered = "";
var buffer, path;
var es = {};

const print = () => {
  console.log('PRINT');
};

//flatten tree data json
var fjt = {};
var fji = {};
var temp_id = 0;
var flatten_json = {};

var traverse = (json) => {
	// json is from fancy_tree is from es.fancy_tree	
	if (typeof json === 'object' && json !== null) {
		flatten_json = traverse_object(json);
	}	
	return flatten_json ? flatten_json : {};
};

var traverse_object = (obj) => {
//json is from fancy_tree is from es.fancy_tree	

	//set object id which will be a key in flat tree
	obj.id = '_' + temp_id;
		
	if(!obj.id) {
		throw new TypeError ('ERROR - no object id created.');
	} 

	var parent = fjt[obj.id] = {};
	parent.id = obj.id;
	parent.children = [];
	
	var id = '_' + temp_id++;
	for (var key in obj) {
		
		if (obj.hasOwnProperty(key)) {		
			var obj_key = obj[key];	
			// set ID and create new flat tree item
			if(key === 'title') {		
			// TITLE key				
				fjt[id] = fji;	
				fjt[id].id = id;			
				fji = {};
			} else if(key === 'data') {			
			// DATA key
				for (var k in obj_key) {						
					if (obj_key.hasOwnProperty(k)) {	
						// do not overwrite the ID						
						if( k != 'id' ) {
							if( fjt[parent.id][k] ) {
								console.log('K :: ' + k);
								throw new TypeError ('ERROR: ' + k + ' - Duplicated key in data object.');
							}
							fjt[parent.id][k] = obj_key[k];								
						}
					}					
				}				
			} else if (key === 'children') {
			// CHILDREN key				
				if(obj_key.length !== 0) {
				// make an array of children
					for (var i in obj_key) {					
						var item = obj_key[i];					
						
						if(typeof item === 'object') {
							if (item.title) {
								item.id = '_' + temp_id;
								parent[key].push(item.id);
								fjt[parent.id][key] = parent[key];								
							}							
							traverse(item);
						}	
					}
				}
			}
		}
	}
	return fjt;
};

var get_root_widget = (flat_json) => {
	var response = {};
	var tree_widget = flat_json;
	var obj = {};
	for (var key in tree_widget) {	
		if (tree_widget.hasOwnProperty(key)) {			
			obj = tree_widget[key];
			if(!obj.parent) {
				response = obj;
			}
		}
	}
	return response;
};

var update_ids = (flat_tree) => {
	//generate unique numeric index
	for (var key in flat_tree) {
		var w = flat_tree[key];
		var parent_prefix = w.id !== '_0' ? w.id : '';			
		var children = w.children;		
		if(children && children.length > 0) {
			for (var k in children) {			 
				var child = flat_tree[children[k]];			
				var index = (k++ < 9) ? ('_0' + k++) : ('_' + k++) ;
				child['id'] = parent_prefix + index;
			}				
		}
	}
	
	// generate unique index with object name
	var index = flat_tree;
	flat_tree = {};
	
	for (var key in index) {
		var item = index[key];
		if(item.id || item.name) {
			var new_id = item.id + '_' + item.name;		
			if(key === 'root') new_id = key;
			item.id = new_id;
			flat_tree[new_id] = item;			
		}
	}
	
	// set parent property
	for (var key in flat_tree) {			
		var w = flat_tree[key];
		var children = w.children;	
		for (var k in children) {			
			var child = index[children[k]];
			child['parent'] = key;			
		}
	}
	
	// set children property
	for (var key in flat_tree) {			
		var w = flat_tree[key];
		var children = w.children;	
		var new_children = [];
		for (var k in children) {			
			var child = index[children[k]];		
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

var build_json = (fancy_tree) => {
	// 'fjt' and 'temp_id' should be reset from the previous generator run
	fjt = {};
	temp_id = 0;
	var flat_tree = traverse(fancy_tree);	
	return update_ids(flat_tree);
}

const save_to_file =  (buffer, path) => {
	console.log('/// PATH /// ' +  path);
	if (!buffer || !path) return;
	const b = buffer;
	const p = path;
	console.log('/// PATH /// ' +  p);
	fs.open(p, 'w+', function(err, fd) {
	 	if (err) {
	     	throw 'error opening file: ' + err;
	 	}
	 	fs.write(fd, b, 0, buffer.length, null, function(err) {
	     	if (err) throw 'error writing file: ' + err;
	     	fs.close(fd, function() {
	         	console.log('/// FILE WRITTEN ///');
	     	})
	 	});
	});
};

const read_template = (path_to_template) => {
  return fs.readFileSync(path_to_template, 'utf8');
};

var render_template = (object, url_base) => {
	const obj = object;
	var m;
	var url_base = url_base;
	var views = url_base + url_gen + url_views;
	const template_file = views + obj.type + file_ext;
	const template = read_template(template_file);
	Mustache.parse(template);
	m = Mustache.render(template, obj);	
	return m;
};

var has_number = (string) => {
	return /\d/.test(string);
};

var update_keys = (fancytree_json, app_json) => {	
  var raw_json = fancytree_json;
	
  var updated_json = [];
  var key_index = 0;
  var id = 'id';
	
  var app_array = [];
  for (var key in app_json) {		
    app_array.push(key);	
  };
		
  var traverse_json = (obj) => {
    for (var key in obj) {
	  if (obj.hasOwnProperty(key)) {			
	    var obj_key = obj[key];
		  if(typeof obj_key === 'object') {
		  traverse_json(obj_key);		
	    } else {		
	      if(key === 'key') {					
		    obj.key = '_' + key_index;				
		    if(obj['title'] !== 'root') {				
		      obj.data['id'] = app_array[key_index - 1];
		      // remove id from fancy tree node
		      delete obj.id; 
		     }
		     // update 'folder' flag if children
	        if( obj.hasOwnProperty('children')) {
		      if(obj['children'].length) {
		        obj['folder'] = true;
		      } else {
		        obj['folder'] = false;
		      }							
		    } 
		    key_index++;
	      }
	  	}	
	  }
    }
    return obj;		
  };
  
  if (typeof raw_json === 'object' && raw_json !== null) {		
    updated_json.push(traverse_json(raw_json));
  }
  return updated_json[0].children[0];
};

var tree = (root_widget, url_base) => {
  const json_tree = es.flat_json;
  const root = root_widget;
  var template_rendered = "";
  const render_children = root.children;
  var obj = {};
  if(render_children.length) {
    for( var i = 0,length = render_children.length; i < length; i++ ) {
	  var item = render_children[i];	
	  obj = json_tree[render_children[i]];		
	  if(obj.children && obj.children.length > 0 ) {
	    obj.child = tree(obj, url_base);
	  }	
	  template_rendered = template_rendered + render_template(obj, url_base);
    }		
  } else {
	console.log("No children to render");
  }
  return template_rendered;
};

var update_json = function(fancytree_json, app_json) {
  var uk = update_keys(fancytree_json, app_json);
  return uk;
};

var build_html = (flat_json, url_base) => {	
  const root_widget = get_root_widget(flat_json);	
  root_widget.child = tree(root_widget, url_base);
  return render_template(root_widget, url_base);	
};

var build_js = (json) => {
  return "appn.actor = " + json + ";";
};

const generate = (fancy_tree, urls) => {

//DEBUGGER			
//console.log("FANCY_TREE : ");
//console.dir(fancy_tree, {showHidden: false, depth: null});
//console.dir(urls, {showHidden: false, depth: null});
	
	es.fancy_tree = {};
	es.flat_json = {};
	es.fancy_tree = fancy_tree;
	var buffer, 
		output_json, 
		fancytree_json, 
		output_html, 
		output_js;
	
	output_json = build_json(es.fancy_tree);	
	//update global es.flat_json
	es.flat_json = output_json;
	
	output_json_str = JSON.stringify(output_json);
	buffer = new Buffer.from(output_json_str);
	save_to_file(buffer, urls.app);
		
	fancytree_json = update_json(es.fancy_tree, output_json);	
	// update global es.fancy_tree
	es.fancy_tree = fancytree_json;
	let fancytree_array = [];
	fancytree_array.push(fancytree_json);
	buffer = new Buffer.from(JSON.stringify(fancytree_array));
	save_to_file(buffer, urls.tree);
	
	output_html = build_html(es.flat_json, urls.base);
	buffer = new Buffer.from(output_html);
	save_to_file(buffer, urls.html);
	
	output_js = build_js(output_json_str);	
	buffer = new Buffer.from(output_js);
	save_to_file(buffer, urls.actors);

};

module.exports = {
  print,
  generate,
  save_to_file
};