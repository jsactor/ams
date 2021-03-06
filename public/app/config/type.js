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

// actor types

appn.type = {
	anchor: {
		selector: {
			event: {
				click : '>a'
			},
			label: '>a'			
		},
		method: {
			_control: function() {
				return document.querySelector('#' + this.id + ' ' + this.selector.event.click);
			},
			_set_href: function(url) {
				const item = document.querySelector('#' + this.id + ' ' + this.selector.event.click);
				item.href = url;
			},			
			_set_label: function(text) {
				if(text === '' || null) return;
				const item = document.querySelector('#' + this.id + ' ' + this.selector.label);
				item.textContent = text;
				item.style.display = '';
			},
			_set_prop: function(name, value) {
				const item = document.querySelector('#' + this.id + ' ' + this.selector.event.click);
				item.setAttribute(name, value);
			}
		}		
	},
	button: {
		selector: {
			event: {
				click: '>button'
			},
			label: '>button'			
		},		
		method: {
			_set_label: function(text) {
				if(text === '' || null) return;
				const item = document.querySelector('#' + this.id + ' ' + this.selector.label);
				item.textContent = text;
			}
		}
	},
	chart: {
		selector: {
			event: {
				click: '',
				focusout: ''
			}
		},		
		method: {}
	},
	checkbox: {		
		selector: {
			event: {
				change: 	'>input'
			},
			label: '>label',
			error: '>p.error'	
		},
		method: {
			_control: function() {
				return document.querySelector('#' + this.id + ' ' + this.selector.event.change);
			},
			_get_value: function() {
				return this._control().value;
			},
			_set_value: function(value) {
				this._control().value = String(value);
			},
			_set_label: function(text) {
				if(text === '' || null) return;
				const item = document.querySelector('#' + this.id + ' ' + this.selector.label);
				item.textContent = text;
			},
			_get_error: function() {
				return document.querySelector('#' + this.id + ' ' + this.selector.error).textContent;
			},
			_set_error: function(error_message) {
				document.querySelector('#' + this.id + ' ' + this.selector.error).textContent = error_message;
				if(error_message) {
					document.querySelector('#' + this.id).classList.add("error");
				} else {
					document.querySelector('#' + this.id).classList.remove("error");					
				}
			},
			_show_error: function(rule) {
				const item = document.querySelector('#' + this.id + ' ' + this.selector.error);
				if(rule){
					item.style.display = 'block';
				} else {
					item.style.display = '';
				}
			}
		}
	},
	// jquery plugin
	datatable: {
		selector: {
			event: {
				click: '>tbody tr',
				change: ''
			}
		},		
		method: {
			_get_table: function() {
				const a = document.querySelector("#" + this.id + ' table');
				return a.DataTable();
			},
			_get_datatable: function() {
				const a = document.querySelector("#" + this.id + '_dataTable');
				return a;
			},
			_get_value: function() {
				const d = this._get_table.data();
				let a = [];
				for(let [k, v] in d) {
				  a.push(v);
				}
				return a;
			},
			_set_value: function(v) {
				if(!v) return;
//				let d = this._get_table.data();
//				let v = [];
			}
		}
	},
	fieldset: {
		selector: {
			label: '>h4'			
		},
		method: {
			_set_label: function(text) {
				if(text === '' || null) return;
				const item = document.querySelector('#' + this.id + ' ' + this.selector.label);
				item.textContent = text;
				item.style.display = '';
			}
		}
	},
	group: {
		selector: {
			label: '>h2'			
		},
		method: {
			_set_label: function(text) {
				if(text === '' || null) return;
				const item = document.querySelector('#' + this.id + ' ' + this.selector.label);
				item.textContent = text;
				item.style.display = '';
			}
		}
	},
	header: {},
	html: {
		
		selector: {
			event: {
				load: '>body'
			},
			label: '>head>title'			
		},		
		method: {
			_set_label: function(text) {
				if(text === '' || null) return;
				const item = document.querySelector('#' + this.id + ' ' + this.selector.label);
				item.textContent = text;
				item.style.display = '';
			},
			_get_locale: function() {
				return document.getElementById(this.id).getAttribute("lang");
			}
		}
	},
	img: {
		selector: {
			event: {
			}
		},		
		method: {}
	},
	input: {		
		selector: {
			event: {
				change: 	'>input',
				focusout: 	'>input',
				copy: 		'>input',
				paste: 		'>input',
				keyup: 		'>input',
			},
			label: '>label',
			error: '>p.error'	
		},
		method: {
			_control: function() {
				return document.querySelector('#' + this.id + ' ' + this.selector.event.change);
			},
			_get_value: function() {
				return this._control().value;
			},
			_set_value: function(value) {
				this._control().value = String(value);
			},
			_set_label: function(text) {
				if(text === '' || null) return;
				const item = document.querySelector('#' + this.id + ' ' + this.selector.label);
				item.textContent = text;
				item.style.display = '';
			},
			_get_error: function() {
				return document.querySelector('#' + this.id + ' ' + this.selector.error).textContent;
			},
			_set_error: function(error_message) {
				document.querySelector('#' + this.id + ' ' + this.selector.error).textContent = error_message;
				if(error_message) {
					document.querySelector('#' + this.id).classList.add("error");
				} else {
					document.querySelector('#' + this.id).classList.remove("error");					
				}
			},
			_show_error: function(rule) {
				const item = document.querySelector('#' + this.id + ' ' + this.selector.error);
				if(rule){
					item.style.display = 'block';
				} else {
					item.style.display = '';
				}
			}
		}
	},
	panel: {},
	plugin: {
		selector: {
			event: {
				click: '',
				focusout: ''
			}
		},		
		method: {}
	},
	radio: {
		selector: {
			event: {
				change: '>input'
			},
			label: '>label',
			error: '>p.error'
		},		
		method: {
			_control: function() {
				return document.querySelector('#' + this.id + ' ' + this.selector.event.change);
			},
			_get_value: function() {
				return this._control().getAttribute('checked');
			},	
			_set_value: function(value) {
				this._control().setAttribute('checked', value);
			},
			_set_label: function(text) {
				if(text === '' || null) return;
				const item = document.querySelector('#' + this.id + ' ' + this.selector.label);
				item.textContent = text;
			},
			_get_error: function() {
				return document.querySelector('#' + this.id + ' ' + this.selector.error).textContent;
			},
			_get_last_radio_id: function() {
				const a = this;
				const p = a.parent_actor();
				let rg = [];
				for(let i in p.children) {
					let ch_a = mm.actor[p.children[i]];
					if(ch_a.group && ch_a.group === a.group) {
						rg.push(ch_a.id);
					}
				}
				return rg.length ? rg[rg.length - 1] : this.id;
			},
			_set_error: function(error_message) {
				document.querySelector('#' + this.id + ' ' + this.selector.error).textContent = error_message;
				if(error_message) {
					document.querySelector('#' + this.id).classList.add("error");
				} else {
					document.querySelector('#' + this.id).classList.remove("error");					
				}
			},
			_show_error: function(rule) {
				const a_id = this._get_last_radio_id();				
				const item = document.querySelector('#' + a_id + ' ' + this.selector.error);
				if(rule){
					item.style.display = 'block';
				} else {
					item.style.display = '';
				}
			}
		}
	},	
	search: {
		selector: {
			event: {
				change: 	'>input',
				input: 		'>input'
			},
			label: '>label',
			datalist: '>datalist',
			error: '>p.error'
		},
		method: {
			_control: function() {
				return document.querySelector('#' + this.id + ' ' + this.selector.event.change);
			},
			_datalist: function() {
				return document.querySelector('#' + this.id + ' ' + this.selector.datalist);
			},
			_get_value: function() {
				const v = this._control().value;
				if(v === 'false') {
					return false;
				}
				if(v === 'true') {
					return true;
				}
				return v;
			},
			_set_value: function(value) {
				this._control().value = String(value);
			},
			_set_label: function(text) {
				if(text === '' || null) return;
				const item = document.querySelector('#' + this.id + ' ' + this.selector.label);
				item.textContent = text;
				item.style.display = '';
			},
			_get_error: function() {
				return document.querySelector('#' + this.id + ' ' + this.selector.error).textContent;
			},
			_set_error: function(error_message) {
				document.querySelector('#' + this.id + ' ' + this.selector.error).textContent = error_message;
				if(error_message) {
					document.querySelector('#' + this.id).classList.add("error");
				} else {
					document.querySelector('#' + this.id).classList.remove("error");					
				}
			},
			_show_error: function(rule) {
				const item = document.querySelector('#' + this.id + ' ' + this.selector.error);
				if(rule){
					item.style.display = 'block';
				} else {
					item.style.display = '';
				}
			},
			_add_options: function(json) {
				const c = this._datalist();
				const list = json;
				for(let i in list) {
				  let option = document.createElement("option");
				  option.value = list[i].value;
				  c.appendChild(option);
				}
			}
		}
	},
	section: {},
	select: {
		selector: {
			event: {
				change: 	'>select',
				focusout: 	'>select',
				keypress: 	'>select',
				keydown: 	'>select'
			},
			label: '>label',
			error: '>p.error'
		},
		method: {
			_control: function() {
				return document.querySelector('#' + this.id + ' ' + this.selector.event.change);
			},
			_get_value: function() {
				const v = this._control().value;
				if(v === 'false') {
					return false;
				}
				if(v === 'true') {
					return true;
				}
				return v;
			},
			_set_value: function(value) {
				this._control().value = String(value);
			},
			_set_label: function(text) {
				if(text === '' || null) return;
				const item = document.querySelector('#' + this.id + ' ' + this.selector.label);
				item.textContent = text;
				item.style.display = '';
			},
			_get_error: function() {
				return document.querySelector('#' + this.id + ' ' + this.selector.error).textContent;
			},
			_set_error: function(error_message) {
				document.querySelector('#' + this.id + ' ' + this.selector.error).textContent = error_message;
				if(error_message) {
					document.querySelector('#' + this.id).classList.add("error");
				} else {
					document.querySelector('#' + this.id).classList.remove("error");					
				}
			},
			_show_error: function(rule) {
				const item = document.querySelector('#' + this.id + ' ' + this.selector.error);
				if(rule){
					item.style.display = 'block';
				} else {
					item.style.display = '';
				}
			},
			_add_options: function(json) {
				const c = this._control();
				const list = json;
				for(let i in list) {
				  let option = document.createElement("option");
				  option.text = list[i].text;
				  option.selected = list[i].selected;
				  option.value = list[i].value;
				  c.add(option);	
				}
			}
		}
	},
	string: {
		
//ES REMINDER display=none may be needed for all string tags onload
		
		selector: {
			label: '>*',
		},		
		method: {
			_get_label: function() {
				const item = document.querySelector('#' + this.id + ' ' + this.selector.label);
				return item.textContent;
			},
			_set_label: function(text) {
				if(text === '' || null) return;
				const item = document.querySelector('#' + this.id + ' ' + this.selector.label);
				item.textContent = text;
				item.style.display = '';
			}
		}	
	},
	textarea: {		
		selector: {
			event: {
				change: 	'>textarea',
				focusout: 	'>textarea',
				copy: 		'>textarea',
				paste: 		'>textarea',
				keyup: 		'>textarea',
			},
			label: '>label',
			error: '>p.error'	
		},
		method: {
			_control: function() {
				return document.querySelector('#' + this.id + ' ' + this.selector.event.change);
			},
			_get_value: function() {
				return this._control().value;
			},
			_set_value: function(value) {
				this._control().value = String(value);
			},
			_set_label: function(text) {
				if(text === '' || null) return;
				const item = document.querySelector('#' + this.id + ' ' + this.selector.label);
				item.textContent = text;
			},
			_get_error: function() {
				return document.querySelector('#' + this.id + ' ' + this.selector.error).textContent;
			},
			_set_error: function(error_message) {
				document.querySelector('#' + this.id + ' ' + this.selector.error).textContent = error_message;
				if(error_message) {
					document.querySelector('#' + this.id).classList.add("error");
				} else {
					document.querySelector('#' + this.id).classList.remove("error");					
				}
			},
			_show_error: function(rule) {
				const item = document.querySelector('#' + this.id + ' ' + this.selector.error);
				if(rule){
					item.style.display = 'block';
				} else {
					item.style.display = '';
				}
			}
		}
	},
	th: {		
		method: {
			_set_label: function(text) {
				if(text === '' || null) return;
				const item = document.querySelector('#' + this.id);
				item.textContent = text;
				item.style.display = '';
			}
		}
	},
	// jquery plugin
	tree: {
		selector: {
			event: {
				click: ''
			}
		},		
		method: {
			_get_tree: function() {
				const a = $("#" + this.id);
				return a.fancytree('getTree');
			},			
			_get_value: function() {
				const a = $("#" + this.id);
				const t = a.fancytree('getTree');
				const d = t.toDict(true);
				return JSON.stringify(d);
				
			},
			_get_data: function() {
				const a = $("#" + this.id);
				const t = a.fancytree('getTree');
				const active_node = t.getActiveNode();
		 		if(!active_node || !active_node.data) return;
		 		return active_node.data;
			},
		}
	},
};
	