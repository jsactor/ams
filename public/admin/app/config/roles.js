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

// roles and scenarios

appn.role = {
  
  // general

  hidden : {
    actions : 
    [ 
      {
        actn : 'show',
        evnt : 'ja_app',
        rule : '',
        rvrs : true,
        pass : false,
        from : '',
        valu : ''
      } 
    ]
  },
  
  // default role, should be applied before all other roles to all
  // input, select, radios, chechboxes, textarea, etc. actors
  control : {
    actions : 
    [ 
      {
        actn : 'send',
        evnt : 'change',
        wait : true,
        trgt : 'ams',
        mssg : 'ja_ctrl'
      } 
    ]
  },
  
  // tags
  ams : {},
  bootbox : {},
  button : {},
  header : {},
  id : {},
  map : {},
  role : {},
  save : {},
  title : {},
  tree : {},
  view : {},
  
  // roles
  app : {
    actions : 
    [ 
      // the app should start with this 'send' action
      {
        actn : 'send',
        // evnt: 'load' can be triggered for app root only
        evnt : 'load',
        wait : true,
        trgt : 'app',
        mssg : 'ja_app'
      },
      
//ES APP TODO this is to pull view html files via ajax call
// to render files in a browser for 'Download ...' buttons  
//    {
//	    actn : 'ajax',
//	    evnt : 'ja_app',
//	    type : 'get',
//	    wait : true,
//	    path : 'views',
//	    json : 'views'
//	  },
	  
//ES APP TODO apply labels from an uploaded locale file, upload templates and tree.json
// https://stackoverflow.com/questions/23344776/access-data-of-uploaded-json-file-using-javascript	  

//	  (function(){
//		    
//		    function onChange(event) {
//		        var reader = new FileReader();
//		        reader.onload = onReaderLoad;
//		        reader.readAsText(event.target.files[0]);
//		    }
//
//		    function onReaderLoad(event){
//		        console.log(event.target.result);
//		        var obj = JSON.parse(event.target.result);
//		        alert_data(obj.name, obj.family);
//		    }
//		    
//		    function alert_data(name, family){
//		        alert('Name : ' + name + ', Family : ' + family);
//		    }
//		 
//		    document.getElementById('file').addEventListener('change', onChange);
//
//		}());
//		<input id="file" type="file" />
//
//		<p>Select a file with the following format.</p>
//		<pre>
//		{
//		  "name": "testName",
//		  "family": "testFamily"
//		}    
//		</pre>

	  {
  	    actn : 'localization',
  	    evnt : 'ja_app'
  	  },
    ]
  },

  a2hs : {
	actions : 
	[
	  {
	    actn : 'show',
		evnt : 'ja_app',
		valu : false
	  },
//	  {
//		actn : 'a2hs',
//		evnt : 'ja_app'
//	  }
	]
  },
 
  add : {
    actions :
    [
      {
        actn : 'show',
        evnt : 'ja_app',
        valu: true
      },
      {
  		actn : 'send',
  		evnt : 'click',
  		trgt : 'app',
  		mssg : 'ja_add'
      }
	]
  },

  alt : {
	actions : 
	[
	  {
	    actn : 'show',
	    evnt : 'ja_ctrl ja_f',
	    trgt : 'type',
	    rule : 'is_value',
	    valu : mm.type_alt
	  }
	]
  },

  chart : {
	actions : 
	[
	  {
	    actn : 'plugin',
	    evnt : 'ja_app',
	    data : 'app_stats'
	  }
	]
  },
  
  css : {
    actions :
    [
      {
        actn : 'show',
        evnt : 'ja_app',
        valu : true
      },
	]
  },

  datatable : {
    actions : 
    [
      // three actions below fetch and set data from the app under construction for the admin panel
      {
        actn : 'ajax',
        evnt : 'ja_app',
        type : 'get',
        wait : true,
        path : 'actors',
        json : '_app_actor',
        datatype : 'script'
      },	
      {
        actn : 'ajax',
        evnt : 'ja_app',
        type : 'get',
        wait : true,
        path : 'roles',
        json : '_app_role',
        datatype : 'script'
      },
      {
        actn: 'app_data',
        evnt : 'ja_app'
      },
      // three actions above fetch and set data from the app under construction for the admin panel
      {
        actn : 'plugin',
        evnt : 'ja_app',
        clms : mm.table.columns,
        data : 'app_map'
      }
    ]
  },

  date : {
    autotab : mm.autotab.date_slash,
    actions : 
    [ 
      {
        actn : 'show',
        evnt : 'click',
        rule : '',
        rvrs : true,
        valu : '',
        from : ''
      } 
    ]
  },
  
  disabled : {
    actions : 
    [
      {
      	actn : 'show',
        evnt : 'ja_app',
        valu: false
      },
      {
        actn : 'options',
        evnt : 'ja_app',
        json : 'boolean'
      }, 
      {
        actn : 'show',
        evnt : 'ja_ctrl ja_f',
        trgt : 'type',
        rule : 'is_value',
        valu : mm.type_disabled
      }
    ]
  },

  download : {
	actions : 
	[ 
	  {
	    actn : 'show',
	    evnt : 'ja_f_t_r',
	    valu : true
	  },
//	  {
//	    actn : 'prevent_default',
//	    evnt : 'click'
//	  }, 
	  {
	    actn : 'show',
	    evnt : 'click',
	    valu : false
	  }
	]
  },

  download_actors : {
    actions : 
    [ 
      {
        actn : 'anchor',
        evnt : 'ja_f_t_r',
        flnm : mm.render_actors,
        type : 'application/javascript',
        data : 'actors'
      }
    ]
  },

  download_tree : {
    actions : 
    [ 
      {
        actn : 'anchor',
        evnt : 'ja_f_t_r',
        flnm : mm.render_tree,
        type : 'application/json',
        data : 'fancytree'
      }
    ]
  },

  download_html : {
	actions : 
    [ 
      {
        actn : 'anchor',
        evnt : 'ja_f_t_r',
        flnm : mm.render_html,
        type : 'text/html',
        data : 'html'
      }
    ]
  },

  fancytree : {
    actions : 
    [ 
      {
        actn : 'ajax',
        evnt : 'ja_s_r',
        type : 'post',
        wait : true,
        path : 'json_save',
        rqst : 'get_tree',
        key  : 'tree'
      }, 
      {
        actn : 'ajax',
        evnt : 'ja_app',
        type : 'get',
        wait : true,
        path : 'json_tree',
        json : 'fancytree'
      }, 
      {
        actn : 'tree_init',
        evnt : 'ja_app',
        srce : 'fancytree'
      }, 
      {
        actn : 'activate_node',
        evnt : 'ja_app'
      }, 
      {
        actn : 'update_data',
        evnt : 'ja_ctrl',
        trgt : 'form'
      }, 
      {
	    actn : 'store',
	    evnt : 'ja_t_r ja_s_r'
      },
      {
        actn : 'render',
        evnt : 'ja_t_r',
        strg : 'fancytree',
        rqst : 'get_tree'
      }, 
      {
        actn : 'render',
        evnt : 'ja_t_r', 
        strg : 'actors',
        rqst : 'get_actors'
      }, 
      {
	    actn : 'render',
	    evnt : 'ja_t_r', 
	    strg : 'html',
	    rqst : 'get_html'
	  }, 
      {
  	    actn : 'store',
  	    evnt : 'ja_t_r',
  	    strg : 'actors',
      }, 
      {
	    actn : 'store',
	    evnt : 'ja_t_r',
	    strg : 'fancytree',
      }, 
      {
  	    actn : 'store',
  	    evnt : 'ja_t_r',
  	    strg : 'html',
      }, 
      {
        actn : 'send',
        evnt : 'click',
        trgt : 'form',
        mssg : 'ja_f_t'
      },
      {
        actn : 'send',
        evnt : 'ja_t_r',
        trgt : 'tree',
        mssg : 'ja_f_t_r'
      }
    ]
  },
  
  field1 : {
    actions : 
    [ 
      {
        actn : 'clone',
        evnt : 'ja_app ja_add'
      },
      {
        actn : 'remove_clone',
        evnt : 'ja_rmv'
      }
    ]
  },

  field3 : {
    actions : 
    [ 
      {
        actn : 'clone',
        evnt : 'ja_app'
      },
      {
        actn : 'remove_clone',
        evnt : 'ja_rmv'
      }
    ]
  },

  fieldset : {
    actions : 
    [ 
      {
        actn : 'map_data',
        evnt : 'ja_f_t',
        trgt : 'fancytree',
        rule : 'active_node'
      } 
    ]
  },
  
  file : {
    actions : 
    [ 
      {
    	actn : 'show',
        evnt : 'ja_app',
        valu : false
      },
      {
        actn : 'show',
        evnt : 'ja_ctrl ja_f',
        trgt : 'type',
        rule : 'is_value',
        valu : mm.type_file
      } 
    ]
  },
  
  folder : {
    actions : 
    [ 
      {
        actn : 'options',
        evnt : 'ja_app',
        json : 'boolean'
      } 
    ]
  },

  // json_app
  // show form on app load but enable only for active node
  form : {
    actions : 
    [ 
  	  {
  	    actn : 'map_data',
  	    evnt : 'ja_f_t',
  	    json : mm.json._default
  	  },
      {
	    actn : 'show',
	    evnt : 'ja_app ja_f_t',
	    valu : true
	  }, 
      {
        actn : 'map_data',
        evnt : 'ja_app ja_f_t',
        trgt : 'fancytree',
        rule : 'active_node'
      }, 
      {
        actn : 'send',
        evnt : 'ja_f_t',
        trgt : 'form',
        mssg : 'ja_f'
      }
    ]
  },
  heading : {
	actions : 
	[
      {
        actn : 'options',
        evnt : 'ja_app',
        json : 'heading'
      },
      {
	    actn : 'show',
	    evnt : 'ja_ctrl ja_f',
	    trgt : 'type',
	    rule : 'is_value',
	    valu : mm.type_heading
	  },
	]	
  },
  
  height : {
	actions : 
	[
	  {
	    actn : 'show',
	    evnt : 'ja_ctrl ja_f',
	    trgt : 'type',
	    rule : 'is_value',
	    valu : mm.type_height
	  }
	]
  },

  href : {
	actions : 
	[
	  {
	    actn : 'show',
	    evnt : 'ja_ctrl ja_f',
	    trgt : 'type',
	    rule : 'is_value',
	    valu : mm.type_href
	  }
	]
  },
  
  input_type : {
	actions : 
	[
	  {
	      actn : 'options',
	      evnt : 'ja_app',
	      json : 'input_type'
	  },
	  {
	    actn : 'show',
		evnt : 'ja_ctrl ja_f',
		trgt : 'type',
		rule : 'is_value',
		valu : mm.type_input_type
	  }
    ]
  },
  
  locale : {
    actions : 
    [ 
      {
    	actn : 'show',
        evnt : 'ja_app',
        valu : true
      },
      {
        actn : 'show',
        evnt : 'ja_ctrl ja_f',
        trgt : 'type',
        rule : 'is_value',
        valu : mm.type_locale
      }
    ]
  },
    
  label : {
    actions : 
    [
      {
        actn : 'show',
        evnt : 'ja_ctrl ja_f',
        trgt : 'type',
        rule : 'is_value',
        valu : mm.type_label
      }
    ]
  },

  maxlength : {
    actions : 
    [ 
      {
      	actn : 'show',
        evnt : 'ja_app',
        valu: false
      },
      {
        actn : 'show',
        evnt : 'ja_ctrl ja_f',
        trgt : 'type',
        rule : 'is_value',
        valu : mm.type_maxlength
      } 
    ]
  },

  model : {
	actions :
	[
	  {
	    actn : 'show',
	    evnt : 'ja_app',
	    valu : false
	  },
      {
	    actn : 'options',
	    evnt : 'ja_app',
	    json : 'boolean'
	  },
      {
	    actn : 'show',
	    evnt : 'ja_ctrl ja_f',
	    trgt : 'type',
	    rule : 'is_value',
	    valu : mm.type_model
	  }
    ]
  },

  name : {
	actions : 
	[ 
	  {
	    actn : 'validate',
	    evnt : 'focusout ja_f',
	    rule : 'v_required',
	    errr : '__er_field_reqiured'
	  },
	  {
	    actn : 'validate',
	    evnt : 'focusout',
	    rule : 'v_name_unique',
	    errr : '__er_name_taken'
	  } 
	]
  },

  node : {
	actions :
	[
	  {
	    actn : 'export_data',
	    evnt : 'ja_add',
	    wait : true,
	    strg : 'export_node'
	  },
  	  {
  	    actn : 'store',
  	    evnt : 'ja_add',
  	    wait : true,
  	    strg : 'export_node',
  	  }, 
  	  {
	    actn : 'map_data',
	    evnt : 'ja_app',
	    json : mm.test
	  }
    ]
  },

  placeholder : {
    actions : 
    [ 
      {
        actn : 'show',
        evnt : 'ja_app',
        valu: false
      },
      {
        actn : 'show',
        evnt : 'ja_ctrl ja_f',
        trgt : 'type',
        rule : 'is_value',
        valu : mm.type_placeholder
      } 
    ]
  },
  
  radiogroup : {
    actions : 
    [
	  {
	    actn: 'assign',
	    evnt: 'ja_ctrl',
	    rule: 'is_visible',
	    valu: '',
	    rvrs: true
	  },
      {
        actn : 'show',
        evnt : 'ja_ctrl ja_f',
        trgt : 'type',
        rule : 'is_value',
        valu : mm.type_radio
      },
	  {
  	    actn : 'validate',
  	    evnt : 'focusout ja_f',
  	    rule : 'v_required',
  	    errr : '__er_field_reqiured'
  	  }
    ]
  },

  remove : {
    actions :
    [
      {
  	    actn : 'send',
	    evnt : 'click',
	    trgt : 'parent_actor',
	    mssg : 'ja_rmv'
      },
	]
  },
  
  required_1 : {
    actions : 
    [ 
      {
        actn : 'options',
        evnt : 'ja_app',
        json : 'boolean'
      }, 
    ]
  },
  
  required : {
    actions : 
    [ 
      {
        actn : 'options',
        evnt : 'ja_app',
        json : 'boolean'
      }, 
      {
        actn : 'show',
        evnt : 'ja_app',
        valu: false
      },
      {
        actn : 'show',
        evnt : 'ja_ctrl ja_f',
        trgt : 'type',
        rule : 'is_value',
        valu : mm.type_required
      } 
    ]
  },
  
  search : {    
	actions : 
	[ 
	  {
	    actn : 'options',
	    evnt : 'ja_app',
	    json : 'type'
	   }
	 ]     
  },
  
  server_render : {
    actions : 
    [   	
      {
	    actn : 'show',
	    evnt : 'ja_t_r',
        rule : 'is_app_version_online',
        rvrs : true
      },
      {
        actn : 'send',
        evnt : 'click',
        wait : true,
        trgt : 'fancytree',
        mssg : 'ja_s_r'
      }
    ]
  },
  
  target : {
	actions : 
	[
	  {
	    actn : 'options',
	    evnt : 'ja_app',
	    json : 'anchor_target'
	  },	
	  {
	    actn : 'show',
		evnt : 'ja_ctrl ja_f',
		trgt : 'type',
		rule : 'is_value',
		valu : mm.type_a
	  }
    ]
  },

  tree_render : {
    actions : 
    [
      {
        actn : 'send',
        evnt : 'click',
        trgt : 'tree',
        mssg : 'ja_t_r'
      }
    ]
  },

  type : {
    actions : 
    [ 
      {
        actn : 'options',
        evnt : 'ja_app',
        json : 'type'
      } ,
	  {
  	    actn : 'validate',
  	    evnt : 'focusout ja_f',
  	    rule : 'v_required',
  	    errr : '__er_field_reqiured'
  	  }
    ]
  },
  
  width : {
	actions : 
	[
	  {
	    actn : 'show',
	    evnt : 'ja_ctrl ja_f',
	    trgt : 'type',
	    rule : 'is_value',
	    valu : mm.type_width
	  }
	]
  },


  // ROLES for cloneable fieldset
  input_label: {},

};
