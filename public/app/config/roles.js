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
  
  bootbox : {},
  header : {},
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

};
