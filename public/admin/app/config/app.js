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

// content configuraion

var SCENE = 'mm';

;var mm 	= {};

//Mustache : global space of the Mustache plugin

mm.base_url = BASE_URL;
mm.app_version_online = APP_VERSION_ONLINE;
mm.render_actors = RENDER_ACTORS;
mm.render_tree = RENDER_TREE;
mm.render_html = RENDER_HTML;

mm.action		= {};
mm.actor		= {};
mm.ajax			= {};
mm.array 		= {};
mm.collect_data = {};
mm.config		= {};
mm.css 			= {};
mm.data		    = {};
mm.desc		    = {};
mm.delimiter 	= {};
mm.json			= {};
mm.lang 		= {};
mm.map 			= {};
mm.keys			= [];
mm.options 		= {};
mm.params 		= {};
mm.path 		= {};
mm.queue		= [];
mm.role 		= {};
mm.response		= {};
mm.request		= {};
mm.storage		= {};
mm.temp			= {};
mm.type			= {};
mm.views		= {};

// path to app tree json 
mm.path.json_tree 	= TREE_JSON;

//path to public data files
mm.path.json_app 	= "app/data/app.json";
mm.path.json_save	= "/save";
//placeholder for getting templates files by ajax
mm.path.views		= "app/views/html.html";
mm.path.actors 		= APP_ACTORS_JS;
mm.path.roles 		= APP_ROLES_JS;
mm.path.request		= "";

//path for server rendering
mm.render = {};
mm.render.base 		= mm.base_url;
mm.render.html 		= 'public/' + mm.render_html;
mm.render.app 		= 'public/app/data/app.json';
mm.render.actors 	= 'public/app/data/actors.js';
mm.render.tree 		= 'public/app/data/tree.json';

mm.ajax.get = "GET";
mm.ajax.post = "POST";

//TEST ONLY
mm.test = {
	"node": {
		"field1": [{
			"input1": "sdfsdf",
			"input2": "23423",
			"radio": true,
			"test": true
		}, {
			"input1": "ERGER",
			"input2": "grger",
			"radio": false,
			"test": false
		}, {
			"input1": "2324",
			"input2": "34534",
			"radio": true,
			"test": true
		}]
	}
};

mm.autotab = {
	number_integer: {
		format: 'custom',
		pattern: "[^0-9]"
	},
	number_decimal: {
		format: 'custom',
		pattern: "[^0-9\.]"
	},
	date_slash: {
		format: 'custom',
		pattern: "[^0-9\/]"
	},
	text_no_code: {
		format: 'custom', 
		pattern: /[^-a-zA-Z0-9 .,'®&()#$:\/*;_@?ÀÂÄÈÉÊËÎÏÔÙÛÜàâäèéêîëïôùûüÿÇç€–]/
	},
	text_alpha_only: {
		format: 'custom',
		pattern: "[^-a-zA-Z]*$"
	},
	text_alpha_number_space: {
		format: 'custom',
		pattern: /[^a-zA-Z0-9 ]/
	}
};

mm.delimiter.space = ' ';
mm.delimiter.comma = ',';
mm.delimiter.id = '_';
mm.delimiter.role = '_';
mm.role_root = 'app';
mm.event_load = 'load';
mm.prefix_label = 'lbl';
mm.symbol_required = '*';

mm.type_disabled 	= ['button', 'input', 'search', 'select', 'radio', 'checkbox'];
mm.type_error 		= ['input', 'search', 'select', 'radio', 'checkbox'];
mm.type_file 		= ['fieldset', 'group', 'header', 'panel', 'plugin', 'section', 'tree'];
mm.type_a 			= ['anchor'];
mm.type_href 		= ['anchor'];
mm.type_label 		= ['anchor', 'button', 'chart', 'checkbox', 'group', 'html', 'input', 'search', 'select', 'string', 'textarea', 'th', 'radio'];
mm.type_locale 		= ['html'];
mm.type_maxlength 	= ['input', 'search', 'textarea'];
mm.type_placeholder = ['input', 'search'];
mm.type_required 	= ['input', 'search', 'select', 'radio', 'checkbox'];
mm.type_model 		= ['fieldset', 'group', 'panel', 'section'];
mm.type_radio 		= ['radio'];
mm.type_heading 	= ['string'];

mm.options.type = [
	{value: '', text: 'Select', selected: true},
	{value: 'anchor', text: 'a'},
	{value: 'button', text: 'button'},
	{value: 'chart', text: 'chart'},
	{value: 'checkbox', text: 'checkbox'},
	{value: 'datatable', text: 'datatable'},
	{value: 'fieldset', text: 'fieldset'},
	{value: 'group', text: 'group'},
	{value: 'header', text: 'header'},
	{value: 'html', text: 'html'},
	{value: 'input', text: 'input'},
	{value: 'panel', text: 'panel'},
	{value: 'plugin', text: 'plugin'},
	{value: 'radio', text: 'radio'},
	{value: 'search', text: 'search'},
	{value: 'section', text: 'section'},
	{value: 'select', text: 'select'},
	{value: 'string', text: 'string'},
	{value: 'th', text: 'th'},
	{value: 'tree', text: 'tree'}
];

mm.options.boolean = [
	{value: false, text: 'no', selected: true},
	{value: true, text: 'yes'}];

mm.options.heading = [
	{value: '', text: 'Select', selected: true},
	{value: 1, text: '1'},
	{value: 2, text: '2'},
	{value: 3, text: '3'},
	{value: 4, text: '4'},
	{value: 5, text: '5'},
	{value: 6, text: '6'}];

mm.options.anchor_target = [
	{value: '', text: 'Select', selected: true},
	{value: '_self', text: '_self'},
	{value: '_blank', text: '_blank'},
	{value: '_parent', text: '_parent'},
	{value: '_top', text: '_top'}];

mm.json._app_map = null;
mm.json._default = {};
mm.json._default.form = {
	name: '',
	id: '',
	type: '',
	role: '',
	label: '',
	placeholder: '',
	required: false,
	disabled: false,
	maxlength: '',
	css: '',
	file: '',
	locale: '',
	model: false,
	group: '',
	href: '#'
};

mm.table = {};
mm.table.columns = [
	{ "data": null },
    { "data": "roles" },
    { "data": "actions" },
    { "data": "actors" }
];


// Descriptions for actions and methods
mm.desc.action = {};
mm.desc.action.send 			= 'Broadcast a unique custom event name to a specified target to syncronize actions of the target and all its children.'
mm.desc.action.show 			= 'Show or hide an actor based on a boolean value or rule method returning true or false.';
mm.desc.action.assign 			= 'Assign action.valu. Additional condition can be applied in action.rule method.';
mm.desc.action.anchor 			= 'Create a file from local storage by name in "data" and an anchor to download it. Provide filename as "flnm", file "type".';
mm.desc.action.prevent_default 	= 'Cancel default beheviour of the DOM element like an anchor on click';
mm.desc.action.store 			= 'Store data in local storage. Provide name in "strg" key. If no value provided in "strg" a local storage will be cleared.';
mm.desc.action.render 			= 'Retrieve data from local storgage by "strg" name and render a file using "rqst" request method';
mm.desc.action.ajax 			= 'Ajax call. For asynchronized option "wait: true". Key is for method rqst.';
mm.desc.action.options 			= 'Assign list of optiond from action.json to a select field. Rule method can be added for additional condition.';
mm.desc.action.map_data 		= 'Map/bind data from action.json to actors in DOM/HTML';
mm.desc.action.export_data		= 'Collect data from app/branch, strigify and add it to the specified local storage.';
mm.desc.action.activate_node 	= '! Read comment for "activate" method. Activate Fancy tree node.';
mm.desc.action.update_data 		= 'Update data of a selected node with vlaues from a target object with a role provided in "trgt" key.';
mm.desc.action.localization 	= 'Apply locale specific lables and texts from mm.lang to all actors.';
mm.desc.action.fetch			= 'Fetch data from server.';
mm.desc.action.validate 		= 'Validate actor using provided "rule" method which returns true or false value. Provide an error message key from app/lang/locale.js file.';
mm.desc.action.clone 			= 'Clone the actor to create new DOM element or elements.';
mm.desc.action.remove_clone 	= 'Remove previously cloned actors and DOM elements.';
mm.desc.action.plugin 			= 'Initiate third party plugin based on its type and template.';


