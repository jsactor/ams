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

// template

mm.template = {};

mm.template.anchor = 
	'<div id="{{id}}" class="{{type}} {{css}}">' +
	'<a id="{{id}}_a" href="{{href}}" {{#target}}target="{{target}}"{{/target}}></a>' +
	'</div>';

mm.template.button = 
	'<div id="{{id}}" class="{{type}} {{css}} {{#disabled}}disabled{{/disabled}}">' +
	'<button id="{{id}}_button" ' +
	'{{#disabled}}disabled{{/disabled}}></button>' +
	'</div>';

mm.template.chart = 
	'<div id="{{id}}" class="{{type}} {{css}}" ></div>;'

mm.template.checkbox = 
	'<div id="{{id}}" class="{{type}} {{css}} {{#disabled}}disabled{{/disabled}}">' +
	'<label for="{{id}}_checkbox"></label>' +
	'<input type="checkbox" id="{{id}}_checkbox" name="{{name}}" {{#disabled}}disabled{{/disabled}}>' +
	'<p class="error"></p>' +
	'</div>';

mm.template.datatable =
	'<div id="{{id}}" class="{{type}} {{css}} ">' +
	'<div>' +
	 '<p></p>' +
	 '<table id="{{id}}_datatable" class="dataTable row-border order-column hover">' +
	   '<thead>' +
	     '<tr>' +
	'{{{child}}}' +
	     '</tr>' +
	   '</thead>' +
	 '</table>' +
	'</div>' +
	'</div>';

mm.template.fieldset =
	'<fieldset id="{{id}}" class="{{type}} {{css}}">' +
	'{{#label}}<h4></h4>{{/label}}' +
	'{{{child}}}' +
	'</fieldset>';

mm.template.group =
	'<div id="{{id}}" class="{{type}} {{css}}">' +
	'{{#label}}<h2></h2>{{/label}}' +
	'{{{child}}}' +
	'</div>';

mm.template.header =
	'<header id="{{id}}" class="{{type}} {{css}}">' +
	'{{{child}}}' +
	'</header>';

mm.template.img =
	'<div id="{{id}}" class="{{type}} {{css}}"> ' +
	'<img id="{{id}}_a" src="{{href}}" width="{{width}}" height="{{height}}" alt="{{alt}}" > ' +
	'</div>';

mm.template.input =
	'<div id="{{id}}" class="{{type}} {{css}} {{#disabled}}disabled{{/disabled}}"> ' +
	'<label for="{{id}}_input"></label> ' +
	'<input type="{{#input_type}}{{input_type}}{{/input_type}}{{^input_type}}text{{/input_type}}" ' + 
	'name="{{name}}" ' +
	'{{#disabled}}disabled{{/disabled}} ' +
	'{{#value}}value="{{value}}"{{/value}} ' +
	'{{#placeholder}}placeholder="{{placeholder}}"{{/placeholder}} ' +
	'{{#accept}}accept="{{accept}}"{{/accept}}> ' +
	'<p class="error"></p></div>';

mm.template.panel =
	'<div id="{{id}}" class="{{type}} {{css}}">' +
	'{{{child}}}' +
	'</div>';

mm.template.plugin =
	'<div id="{{id}}" class="{{type}} {{css}}" {{#datatype}}data-type="{{datatype}}"{{/datatype}}>' +
	'{{{child}}}' +
	'</div>';

mm.template.radio =
	'<div id="{{id}}" class="{{type}} {{css}} {{#disabled}}disabled{{/disabled}}">' +
    '<label for="{{id}}_radio"></label>' +
    '<input type="radio" id="{{id}}_radio" name="{{group}}" role="radio" value="{{value}}" {{#checked}}checked{{/checked}} />' +
    '<p class="error"></p>' +
    '</div>';

mm.template.search =
	'<div id="{{id}}" class="{{type}} {{css}} {{#disabled}}disabled{{/disabled}}">' +
	'<label for="{{id}}_input"></label>' +
	'<input type="search" id="{{id}}_input" ' + 
       'name="{{name}}" ' +
       '{{#disabled}}disabled{{/disabled}} ' +
       '{{#value}}value="{{value}}"{{/value}} ' +
       '{{#placeholder}}placeholder="{{placeholder}}"{{/placeholder}} ' +
       '{{#accept}}accept="{{accept}}"{{/accept}} ' +
       '{{#maxlength}}maxlength="{{maxlength}}"{{/maxlength}} ' +
       'list="{{id}}_datalist"> ' +
       '<datalist id="{{id}}_datalist"></datalist>' +
		'<p class="error"></p></div>';

mm.template.section =
	'<section id="{{id}}" class="{{type}} {{css}}">' +
	'{{{child}}}' +
	'</section>';

mm.template.select =
	'<div id="{{id}}" class="{{type}} {{css}} {{#disabled}}disabled{{/disabled}}">' +
	'<label for="{{id}}_select"></label>' +
	'<select id="{{id}}_select" name="{{name}}"' +
	'{{#multiple}}multiple{{/multiple}} {{#disabled}}disabled{{/disabled}}>' +
	'</select>' +
	'</div>';

mm.template.string =
	'<div id="{{id}}" class="{{type}} {{css}}">' +
	'{{#heading}}' +
		'<h{{heading}}></h{{heading}}>' +
		'{{/heading}}' +
	'{{^heading}}' +
		'<p></p>' +
	'{{/heading}}' +		
	'</div>';

mm.template.textarea =
	'<div id="{{id}}" class="{{type}} {{css}} {{#disabled}}disabled{{/disabled}}">' +
	'<label for="{{id}}_textarea"></label>' +
	'<textarea id="{{id}}_textarea" name="{{name}}"></textarea>' +
	'<p class="error"></p>' +
	'</div>';

mm.template.th =
	'<th id="{{id}}" class="{{type}} {{css}} table table-striped table-bordered"></th>';

mm.template.tree =
	'<div id="{{id}}" data-source="ajax" class="{{type}} {{css}}">' +
	'</div>';

mm.template.html =
	'<!-- automatically rendered code --> ' +
	'<!-- manual changes will be overwritten --> ' +
	'<!DOCTYPE html> ' +
	'<html id="{{id}}" class="{{type}} {{css}}"  lang="{{locale}}"> ' +
	'<head> ' +
	'<meta http-equiv="content-type" content="text/html" charset="UTF-8"> ' +
	'<title></title> ' +    
    
	'<link rel="icon" sizes="48x48" href="favicon_io/favicon.ico"> ' +
	'<link rel="apple-touch-icon" sizes="180x180" href="favicon_io/apple-touch-icon.png"> ' +
	'<link rel="icon" type="image/png" sizes="32x32" href="favicon_io/favicon-32x32.png"> ' +
	'<link rel="icon" type="image/png" sizes="16x16" href="favicon_io/favicon-16x16.png"> ' +
	'<link rel="icon" type="image/png" sizes="192x192" href="favicon_io/icon-192x192.png"> ' +
	'<link rel="icon" type="image/png" sizes="512x512" href="favicon_io/icon-512x512.png"> ' +


    '<link rel="manifest" href="manifest.json">' +
    
	'<link rel="stylesheet" href="lib/jqueryui/jquery-ui.css"> ' +
	'<link rel="stylesheet"	href="lib/fancytree/src/skin-lion/ui.fancytree.css"> ' +
	'<link rel="stylesheet" href="lib/bootstrap/css/bootstrap.min.css"> ' +
	  
  
	'<link rel="stylesheet" href="lib/datatables/datatables-1.10.20/css/jquery.dataTables.css"> ' +
	'<link rel="stylesheet" href="css/s.css"> ' +


	'</head> ' +
	'<body> ' +
	
'{{{child}}} ' +

	'<script src="lib/jquery/jquery-3.3.1.js"></script> ' +
	'<script src="lib/jqueryui/jquery-ui.min.js"></script> ' +
	'<script src="lib/jqueryui/jquery.ui-contextmenu.min.js"></script> ' +
	
	'<script src="lib/fancytree/src/jquery-ui-dependencies/jquery.fancytree.ui-deps.js"></script> ' +
	'<script src="lib/bootstrap/js/bootstrap.min.js"></script> ' +
	'<script src="lib/fancytree/src/jquery.fancytree.js"></script> ' +
	'<script src="lib/fancytree/src/jquery.fancytree.dnd5.js"></script> ' +
	'<script src="lib/fancytree/src/jquery.fancytree.edit.js"></script> ' +
	'<script src="lib/fancytree/src/jquery.fancytree.gridnav.js"></script> ' +
	'<script src="lib/fancytree/src/jquery.fancytree.table.js"></script> ' +
	
	'<script src="lib/datatables/datatables-1.10.20/js/jquery.dataTables.min.js"></script> ' +		
	'<script src="https://www.gstatic.com/charts/loader.js"></script>' +

	'<script src="core/core.js"></script> ' +		
	'<script src="app/config/ams.js"></script> ' +
	'<script src="app/js/type.js"></script> ' +
	'<script src="app/config/config.js"></script> ' +
 	'<script src="app/config/app.js"></script> ' +
    '<script src="app/lang/locale.js" charset="UTF-8"></script> ' +
	'<script src="app/js/roles.js"></script> ' +
	'<script src="app/data/actors.js"></script> ' +
	'<script src="app/js/methods.js"></script> ' +
	'<script src="app/js/actions.js"></script> ' +
	'<script src="app/js/app.js"></script> ' +
	'<script src="lib/mustache/mustache.min.js"></script> ' +
	'<script src="app/js/template.js"></script>	 ' +

	'</body> ' +
	'</html>';