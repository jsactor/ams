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

;var appn 	= {};
 var admin 	= {};

// CSS class

CSS_HIDDEN	=	'hidden';
CSS_ERROR	=	'error';

// actor classes
;var ac = {};

ac.document = class Actor_Document extends Actor {
  constructor(data, type, role) {
  	super(data, type, role);  
  }
};

ac.anchor = class Actor_Anchor extends Actor {
  constructor(data, type, role) {
  	super(data, type, role);  
  }
};

ac.button = class Actor_Button extends Actor {
  constructor(data, type, role) {
  	super(data, type, role);  
  }
};

ac.chart = class Actor_Chart extends Actor {
  constructor(data, type, role) {
	super(data, type, role);  
  } 
};

ac.checkbox = class Actor_Checkbox extends Actor {
  constructor(data, type, role) {
    super(data, type, role);  
  } 
};

ac.datatable = class Actor_Datatable extends Actor {
  constructor(data, type, role) {
    super(data, type, role);  
  } 
};

ac.fieldset = class Actor_Fieldset extends Actor {
  constructor(data, type, role) {
  	super(data, type, role);  
  }
};

ac.group = class Actor_Group extends Actor {
  constructor(data, type, role) {
  	super(data, type, role);  
  }
};

ac.header = class Actor_Header extends Actor {
  constructor(data, type, role) {
    super(data, type, role);  
  } 
};

ac.html = class Actor_Html extends Actor {
  constructor(data, type, role) {
  	super(data, type, role);  
  } 
};

ac.img = class Actor_Img extends Actor {
  constructor(data, type, role) {
  	super(data, type, role);
  }
}
;
ac.input = class Actor_Input extends Actor {
  constructor(data, type, role) {
    super(data, type, role);
  }
};

ac.panel = class Actor_Panel extends Actor {
  constructor(data, type, role) {
	super(data, type, role);  
  } 
};

ac.plugin = class Actor_Plugin extends Actor {
  constructor(data, type, role) {
	super(data, type, role);  
  } 
};

ac.radio = class Actor_Radio extends Actor {
  constructor(data, type, role) {
  	super(data, type, role);  
  } 
};

ac.search = class Actor_Search extends Actor {
  constructor(data, type, role) {
	super(data, type, role);
  }
};

ac.section = class Actor_Section extends Actor {
  constructor(data, type, role) {
	super(data, type, role);  
  }
};

ac.select = class Actor_Select extends Actor {
  constructor(data, type, role) {
  	super(data, type, role);  
  }
};

ac.string = class Actor_String extends Actor {
  constructor(data, type, role) {
  	super(data, type, role);  
  }
};

ac.textarea = class Actor_Textarea extends Actor {
  constructor(data, type, role) {
    super(data, type, role);  
  }
};

ac.th = class Actor_Th extends Actor {
  constructor(data, type, role) {
  	super(data, type, role);  
  }
};

ac.tree = class Actor_Tree extends Actor {
  constructor(data, type, role) {
	super(data, type, role);  
  }
};
