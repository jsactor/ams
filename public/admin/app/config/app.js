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

mm.options.provnice = [
	{value: '', text : 'Select', selected: true},
	{value: 'AB', text : 'Alberta'},
	{value: 'BC', text : 'British Columbia'},
	{value: 'MB', text : 'Manitoba'},
	{value: 'NB', text : 'New Brunswick'},
	{value: 'NL', text : 'Newfoundland'},
	{value: 'NT', text : 'Northwest Territories'},
	{value: 'NS', text : 'Nova Scotia'},
	{value: 'NU', text : 'Nunavut'},
	{value: 'ON', text : 'Ontario'},
	{value: 'PE', text : 'Prince Edward Island'},
	{value: 'QC', text : 'Quebec'},
	{value: 'SK', text : 'Saskatchewan'},
	{value: 'YT', text : 'Yukon'}];

mm.options.state = [
	{value: '', text: 'Select','selected':true},
	{value: 'AL', text: 'Alabama'},
	{value: 'AK', text: 'Alaska'},
	{value: 'AZ', text: 'Arizona'},
	{value: 'AR', text: 'Arkansas'},
	{value: 'CA', text: 'California'},
	{value: 'CO', text: 'Colorado'},
	{value: 'CT', text: 'Connecticut'},
	{value: 'DE', text: 'Delaware'},
	{value: 'DC', text: 'District Of Columbia'},
	{value: 'FL', text: 'Florida'},
	{value: 'GA', text: 'Georgia'},
	{value: 'HI', text: 'Hawaii'},
	{value: 'ID', text: 'Idaho'},
	{value: 'IL', text: 'Illinois'},
	{value: 'IN', text: 'Indiana'},
	{value: 'IA', text: 'Iowa'},
	{value: 'KS', text: 'Kansas'},
	{value: 'KY', text: 'Kentucky'},
	{value: 'LA', text: 'Louisiana'},
	{value: 'ME', text: 'Maine'},
	{value: 'MD', text: 'Maryland'},
	{value: 'MA', text: 'Massachusetts'},
	{value: 'MI', text: 'Michigan'},
	{value: 'MN', text: 'Minnesota'},
	{value: 'MS', text: 'Mississippi'},
	{value: 'MO', text: 'Missouri'},
	{value: 'MT', text: 'Montana'},
	{value: 'NE', text: 'Nebraska'},
	{value: 'NV', text: 'Nevada'},
	{value: 'NH', text: 'New Hampshire'},
	{value: 'NJ', text: 'New Jersey'},
	{value: 'NM', text: 'New Mexico'},
	{value: 'NY', text: 'New York'},
	{value: 'NC', text: 'North Carolina'},
	{value: 'ND', text: 'North Dakota'},
	{value: 'OH', text: 'Ohio'},
	{value: 'OK', text: 'Oklahoma'},
	{value: 'OR', text: 'Oregon'},
	{value: 'PA', text: 'Pennsylvania'},
	{value: 'RI', text: 'Rhode Island'},
	{value: 'SC', text: 'South Carolina'},
	{value: 'SD', text: 'South Dakota'},
	{value: 'TN', text: 'Tennessee'},
	{value: 'TX', text: 'Texas'},
	{value: 'UT', text: 'Utah'},
	{value: 'VT', text: 'Vermont'},
	{value: 'VA', text: 'Virginia'},
	{value: 'WA', text: 'Washington'},
	{value: 'WV', text: 'West Virginia'},
	{value: 'WI', text: 'Wisconsin'},
	{value: 'WY', text: 'Wyoming'}];

mm.options.countries_can = [
	{value: 'CAN', text: 'Canada', selected: true},
	{value: 'USA', text: 'United States'}];

mm.options.countries = [
	{value: '', text: 'Select', selected: true},

	{value: 'AFG', text: 'Afghanistan'},
	{value: 'ALA', text: 'Aland Islands'},
	{value: 'ALB', text: 'Albania'},
	{value: 'DZA', text: 'Algeria'},
	{value: 'ASM', text: 'American Samoa'},
	{value: 'AND', text: 'Andorra'},
	{value: 'AGO', text: 'Angola'},
	{value: 'AIA', text: 'Anguilla'},
	{value: 'ATA', text: 'Antarctica'},
	{value: 'ATG', text: 'Antigua And Barbuda'},
	{value: 'ARG', text: 'Argentina'},
	{value: 'ARM', text: 'Armenia'},
	{value: 'ABW', text: 'Aruba'},
	{value: 'AUS', text: 'Australia'},
	{value: 'AUT', text: 'Austria'},
	{value: 'AZE', text: 'Azerbaijan'},
	{value: 'AZO', text: 'Azores'},

	{value: 'BHS', text: 'Bahamas'},
	{value: 'BHR', text: 'Bahrain'},
	{value: 'BGD', text: 'Bangladesh'},
	{value: 'BRB', text: 'Barbados'},
	{value: 'BLR', text: 'Belarus'},
	{value: 'BEL', text: 'Belgium'},
	{value: 'BLZ', text: 'Belize'},
	{value: 'BEN', text: 'Benin'},
	{value: 'BMU', text: 'Bermuda'},
	{value: 'BTN', text: 'Bhutan'},
	{value: 'BOL', text: 'Bolivia'},
	{value: 'BIH', text: 'Bosnia And Herzegovina'},
	{value: 'BWA', text: 'Botswana'},
	{value: 'BVT', text: 'Bouvet Island'},
	{value: 'BRA', text: 'Brazil'},
	{value: 'IOT', text: 'British Indian Ocean Territories'},
	{value: 'BVI', text: 'British Virgin Island'},
	{value: 'VGB', text: 'British Virgin Islands'},
	{value: 'BRN', text: 'Brunei'},
	{value: 'BGR', text: 'Bulgaria'},
	{value: 'BFA', text: 'Burkina Faso'},
	{value: 'BDI', text: 'Burundi'},

	{value: 'KHM', text: 'Cambodia'},
	{value: 'CMR', text: 'Cameroon'},
	{value: 'CAN', text: 'Canada'},
	{value: 'CNP', text: 'Canary Islands'},
	{value: 'CPV', text: 'Cape Verde'},
	{value: 'CYM', text: 'Cayman Islands'},
	{value: 'CAF', text: 'Central African Republic'},
	{value: 'TCD', text: 'Chad'},
	{value: 'CHL', text: 'Chile'},
	{value: 'CHN', text: 'China'},
	{value: 'CXR', text: 'Christmas Island'},
	{value: 'CCK', text: 'Cocos (Keeling Islands)'},
	{value: 'COL', text: 'Columbia'},
	{value: 'COM', text: 'Comoros'},
	{value: 'COK', text: 'Cook Island'},
	{value: 'CRI', text: 'Costa Rica'},
	{value: 'HRV', text: 'Croatia'},
	{value: 'CUB', text: 'Cuba'},
	{value: 'CUW', text: 'Curacao'},
	{value: 'CYP', text: 'Cyprus'},
	{value: 'CZE', text: 'Czech Republic'},

	{value: 'COD', text: 'Democratic Republic of the Congo'},
	{value: 'DNK', text: 'Denmark'},
	{value: 'DJI', text: 'Djibouti'},
	{value: 'DMA', text: 'Dominica'},
	{value: 'DOM', text: 'Dominican Republic'},

	{value: 'TLS', text: 'East Timor'},
	{value: 'ECU', text: 'Ecuador'},
	{value: 'EGY', text: 'Egypt'},
	{value: 'SLV', text: 'El Salvador'},
	{value: 'GNQ', text: 'Equatorial Guinea'},
	{value: 'ERI', text: 'Eritrea'},
	{value: 'EST', text: 'Estonia'},
	{value: 'ETH', text: 'Ethiopia'},

	{value: 'FLK', text: 'Falkland Islands'},
	{value: 'FRO', text: 'Faroe Islands'},
	{value: 'FJI', text: 'Fiji'},
	{value: 'FIN', text: 'Finland'},
	{value: 'FRA', text: 'France'},
	{value: 'GUF', text: 'French Guiana'},
	{value: 'PYF', text: 'French Polynesia'},
	{value: 'ATF', text: 'French Southern Terr.'},

	{value: 'GAB', text: 'Gabon'},
	{value: 'GMB', text: 'Gambia'},
	{value: 'GEO', text: 'Georgia'},
	{value: 'DEU', text: 'Germany'},
	{value: 'GHA', text: 'Ghana'},
	{value: 'GIB', text: 'Gibraltar'},
	{value: 'GRC', text: 'Greece'},
	{value: 'GRL', text: 'Greenland'},
	{value: 'GRD', text: 'Grenada'},
	{value: 'GLP', text: 'Guadeloupe'},
	{value: 'GUM', text: 'Guam'},
	{value: 'GTM', text: 'Guatemala'},
	{value: 'GGY', text: 'Guernsey'},
	{value: 'GIN', text: 'Guinea'},
	{value: 'GNB', text: 'Guinea-Bissau'},
	{value: 'GUY', text: 'Guyana'},

	{value: 'HTI', text: 'Haiti'},
	{value: 'HMD', text: 'Heard Island and McDonald Islands'},
	{value: 'HND', text: 'Honduras'},
	{value: 'HKG', text: 'Hong Kong'},
	{value: 'HUN', text: 'Hungary'},

	{value: 'ISL', text: 'Iceland'},
	{value: 'IND', text: 'India'},
	{value: 'IDN', text: 'Indonesia'},
	{value: 'IRN', text: 'Iran'},
	{value: 'IRQ', text: 'Iraq'},
	{value: 'IRL', text: 'Ireland'},
	{value: 'IMN', text: 'Isle Of Man'},
	{value: 'ISR', text: 'Israel'},
	{value: 'ITA', text: 'Italy'},
	{value: 'CIV', text: 'Ivory Coast'},

	{value: 'JAM', text: 'Jamaica'},
	{value: 'JPN', text: 'Japan'},
	{value: 'JEY', text: 'Jersey'},
	{value: 'JOR', text: 'Jordan'},

	{value: 'KAZ', text: 'Kazakhstan'},
	{value: 'KEN', text: 'Kenya'},
	{value: 'KIR', text: 'Kiribati'},
	{value: 'XKX', text: 'Kosovo'},
	{value: 'KWT', text: 'Kuwait'},
	{value: 'KGZ', text: 'Kyrgyzstan'},

	{value: 'LAO', text: 'Laos'},
	{value: 'LVA', text: 'Latvia'},
	{value: 'LBN', text: 'Lebanon'},
	{value: 'LSO', text: 'Lesotho'},
	{value: 'LBR', text: 'Liberia'},
	{value: 'LBY', text: 'Libya'},
	{value: 'LIE', text: 'Liechtenstein'},
	{value: 'LTU', text: 'Lithuania'},
	{value: 'LUX', text: 'Luxembourg'},

	{value: 'MAC', text: 'Macau'},
	{value: 'MKD', text: 'Macedonia'},
	{value: 'MDG', text: 'Madagascar'},
	{value: 'MWI', text: 'Malawi'},
	{value: 'MYS', text: 'Malaysia'},
	{value: 'MDV', text: 'Maldives'},
	{value: 'MLI', text: 'Mali'},
	{value: 'MLT', text: 'Malta'},
	{value: 'MHL', text: 'Marshall Islands'},
	{value: 'MTQ', text: 'Martinique'},
	{value: 'MRT', text: 'Mauritania'},
	{value: 'MUS', text: 'Mauritius'},
	{value: 'MYT', text: 'Mayotte'},
	{value: 'MEX', text: 'Mexico'},
	{value: 'FSM', text: 'Micronesia'},
	{value: 'MDA', text: 'Moldova'},
	{value: 'MCO', text: 'Monaco'},
	{value: 'MNG', text: 'Mongolia'},
	{value: 'MNE', text: 'Montenegro'},
	{value: 'MSR', text: 'Montserrat'},
	{value: 'MAR', text: 'Morocco'},
	{value: 'MOZ', text: 'Mozambique'},
	{value: 'MMR', text: 'Myanmar'},

	{value: 'NAM', text: 'Namibia'},
	{value: 'NRU', text: 'Nauru'},
	{value: 'NPL', text: 'Nepal'},
	{value: 'NLD', text: 'Netherlands'},
	{value: 'ANT', text: 'Netherlands Antilles'},
	{value: 'NCL', text: 'New Caledonia'},
	{value: 'NZL', text: 'New Zealand'},
	{value: 'NIC', text: 'Nicaragua'},
	{value: 'NER', text: 'Niger'},
	{value: 'NGA', text: 'Nigeria'},
	{value: 'NIU', text: 'Niue'},
	{value: 'PRK', text: 'North Korea'},
	{value: 'NFK', text: 'Norfolk Island'},
	{value: 'MNP', text: 'Northern Mariana Islands'},
	{value: 'NOR', text: 'Norway'},

	{value: 'OMN', text: 'Oman'},

	{value: 'PAK', text: 'Pakistan'},
	{value: 'PLW', text: 'Palau'},
	{value: 'PSE', text: 'Palestine'},
	{value: 'PAN', text: 'Panama'},
	{value: 'PNG', text: 'Papua New Guinea'},
	{value: 'PRY', text: 'Paraguay'},
	{value: 'PER', text: 'Peru'},
	{value: 'PHL', text: 'Philippines'},
	{value: 'PCN', text: 'Pitcairn'},
	{value: 'POL', text: 'Poland'},
	{value: 'PRT', text: 'Portugal'},
	{value: 'PRI', text: 'Puerto Rico'},

	{value: 'QAT', text: 'Qatar'},

	{value: 'COG', text: 'Republic of the Congo'},
	{value: 'REU', text: 'Reunion'},
	{value: 'ROU', text: 'Romania'},
	{value: 'RUS', text: 'Russia'},
	{value: 'RWA', text: 'Rwanda'},

	{value: 'SGS', text: 'South Georgia and the South Sandwich Islands '},
	{value: 'BLM', text: 'Saint Barthelemy'},
	{value: 'SHN', text: 'Saint Helena'},
	{value: 'KNA', text: 'Saint Kitts And Nevis'},
	{value: 'LCA', text: 'Saint Lucia'},
	{value: 'MAF', text: 'Saint Martin'},
	{value: 'SPM', text: 'Saint Pierre and Miquelon'},
	{value: 'VCT', text: 'Saint Vincent and the Grenadines'},
	{value: 'WSM', text: 'Samoa'},
	{value: 'SMR', text: 'San Marino'},
	{value: 'STP', text: 'Sao Tome And Principe'},
	{value: 'SAU', text: 'Saudi Arabia'},
	{value: 'SEN', text: 'Senegal'},
	{value: 'SRB', text: 'Serbia'},
	{value: 'SYC', text: 'Seychelles'},
	{value: 'SLE', text: 'Sierra Leone'},
	{value: 'SGP', text: 'Singapore'},
	{value: 'SXM', text: 'Sint Maarten'},
	{value: 'SVK', text: 'Slovakia'},
	{value: 'SVN', text: 'Slovenia'},
	{value: 'SLB', text: 'Solomon Islands'},
	{value: 'SOM', text: 'Somalia'},
	{value: 'ZAF', text: 'South Africa'},
	{value: 'KOR', text: 'South Korea'},
	{value: 'SSD', text: 'South Sudan'},
	{value: 'ESP', text: 'Spain'},
	{value: 'LKA', text: 'Sri Lanka'},
	{value: 'SDN', text: 'Sudan'},
	{value: 'SUR', text: 'Surinam'},
	{value: 'SJM', text: 'Svalbard and Jan Mayen'},
	{value: 'SWZ', text: 'Swaziland'},
	{value: 'SWE', text: 'Sweden'},
	{value: 'CHE', text: 'Switzerland'},
	{value: 'SYR', text: 'Syria'},

	{value: 'TWN', text: 'Taiwan'},
	{value: 'TJK', text: 'Tajikistan'},
	{value: 'TZA', text: 'Tanzania'},
	{value: 'THA', text: 'Thailand'},
	{value: 'TGO', text: 'Togo'},
	{value: 'TKL', text: 'Tokelau'},
	{value: 'TON', text: 'Tonga'},
	{value: 'TTO', text: 'Trinidad And Tobago'},
	{value: 'TUN', text: 'Tunisia'},
	{value: 'TUR', text: 'Turkey'},
	{value: 'TKM', text: 'Turkmenistan'},
	{value: 'TCA', text: 'Turks and Caicos Islands'},
	{value: 'TUV', text: 'Tuvalu'},

	{value: 'UMI', text: 'United States Minor Outlying Islands'},
	{value: 'VIR', text: 'United States Virgin Islands'},
	{value: 'UGA', text: 'Uganda'},
	{value: 'UKR', text: 'Ukraine'},
	{value: 'ARE', text: 'United Arab Emirates'},
	{value: 'GBR', text: 'United Kingdom'},
	{value: 'USA', text: 'United States'},
	{value: 'URY', text: 'Uruguay'},
	{value: 'UZB', text: 'Uzbekistan'},

	{value: 'VUT', text: 'Vanuatu'},
	{value: 'VAT', text: 'Vatican City'},
	{value: 'VEN', text: 'Venezuela'},
	{value: 'VNM', text: 'Vietnam'},

	{value: 'WLF', text: 'Wallis And Futana Islands'},
	{value: 'ESH', text: 'Western Sahara'},

	{value: 'YEM', text: 'Yemen'},

	{value: 'ZMB', text: 'Zambia'},
	{value: 'ZWE', text: 'Zimbabwe'}];

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


