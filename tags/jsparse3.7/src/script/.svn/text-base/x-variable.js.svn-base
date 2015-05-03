
//*******************************************************************************
// Debug Variables
//*******************************************************************************
var _DEBUG				 = true;

var _DEBUG_NORMAL_PARSE	 = false;
var _DEBUG_FIREFOX_PARSE = false;
var _DEBUG_DOMTREE		 = true;

var _UNDEFINED			 = "undefined";

//*******************************************************************************
// Schema Variables
//*******************************************************************************
var _SCHEMA_NS			 = "xsd:";
var _SCHEMA_ELEMENT		 = "element";
var _SCHEMA_ATTRIBUTE	 = "attribute";

var _SCHEMA_COMPLEX_TYPE = "complexType";
var _SCHEMA_SEQUENCE	 = "sequence";

var _SCHEMA_ATTR_STRING = "string"; 
var _SCHEMA_ATTR_NORMALIZED_STRING = "normalizedString"; 
var _SCHEMA_ATTR_POSITIVE_INTEGER = "positiveInteger"; 

//
var _SCHEMA_ATTR_NAME	= "name";
var _SCHEMA_ATTR_TYPE	= "type";
var _SCHEMA_ATTR_USE	= "use";

var _SCHEMA_ELEMENT_NAME		= "name";
var _SCHEMA_ELEMENT_TYPE		= "type";
var _SCHEMA_ELEMENT_MINOCCURS	= "minOccurs";
var _SCHEMA_ELEMENT_MAXOCCURS	= "maxOccurs";
var _SCHEMA_ELEMENT_MAXOCCURS_VALUE	= "unbounded";

var _SCHEMA_ATTR_USE_REQUIRED = "required";
var _SCHEMA_ATTR_USE_OPTIONAL = "optional";

//*******************************************************************************
// Html Variables
//*******************************************************************************

var _HTML_ELEMENT_IMG_CLOSE_SRC = "icon-close.gif";
var _HTML_ELEMENT_IMG_OPEN_SRC = "icon-open.gif";
//var _HTML_ELEMENT_IMG_HELP_SRC = "icon-hel.gif";
var _HTML_ELEMENT_IMG_HELP_SRC = "icon-help_embedded.gif";

var _HTML_IMG_DEFAULT_WIDTH = 11;
var _HTML_IMG_DEFAULT_HEIGHT = 11;

var _HTML_TR = "tr";
var _HTML_TD = "td";
var _HTML_IMG = "img";
var _HTML_INPUT = "input";
var _HTML_IMG_ALT = "Collapse This";


//TD
var _HTML_CLASS_CONTROL_ROW = "controlRow";

var _HTML_CLASS_PARAMNAME  = "paramName";
var _HTML_CLASS_PARAMNAME_REQUIRED = "paramNameRequired";

var _HMTL_CLASS_PARAM_VALUE = "paramValue";
var _HMTL_CLASS_PARAM_VALUE_REQUIRED = "paramValueRequired";

var _HMTL_CLASS_PARAM_VALUE_DEFAULT = "paramValueDefault";
var _HTML_CLASS_PARAM_REQUIREMENTS = "paramRequirements";
var _HTML_CLASS_PARAM_SOURCE = "paramSource";
var _HTML_CLASS_PARAM_ACTIONS = "paramActions";

//TR
var _HTML_CLASS_ATTRIBUTE_DEFAULT = "paramRowDefaultL"; //Grey
var _HTML_CLASS_ATTRIBUTE_PROFILE = "paramRowXmlL"; //Yello

var _HTML_CLASS_LEAFELEMENT_DEFAULT = "paramRowDefaultL";
var _HTML_CLASS_LEAFELEMENT_PROFILE = "paramRowXmlL";

var _HTML_CLASS_ELEMENT_DEFAULT = "containerRowXmlL";
var _HTML_CLASS_ELEMENT_PROFILE = "containerRowXmlL";


//*******************************************************************************
//Error message
//If these parameters can not be defined, editor will use the default value.
//*******************************************************************************
var RULE_VALIDATE_ERROR = "Error:";
var RULE_VALIDATE_NOT_EMPTY = RULE_VALIDATE_ERROR + "The value must be NOT empty!";
var RULE_VALIDATE_NOT_INTEGER = RULE_VALIDATE_ERROR + "The value must be an integer type!";
var RULE_VALIDATE_NOT_DURATION = RULE_VALIDATE_ERROR + "The value must be a duration type! eg:P12Y03M12D";
var RULE_VALIDATE_NOT_RESTRICT_DURATION = RULE_VALIDATE_ERROR + "The value must be a duration type! eg:PT1S";
var RULE_VALIDATE_NOT_URL = RULE_VALIDATE_ERROR + "The value must be a URL type!";
var RULE_VALIDATE_NOT_DATE = RULE_VALIDATE_ERROR + "The value must be a date type!";
var RULE_VALIDATE_NOT_DECIMAL = RULE_VALIDATE_ERROR + "The value must be a decimal type!";
var RULE_VALIDATE_NOT_POSITIVEINTEGER = RULE_VALIDATE_ERROR + "The value must be a positive integer type!";
var RULE_VALIDATE_NON_NEGATIVEINTEGER = RULE_VALIDATE_ERROR + "The value must be a nonNegative integer type!";
var RULE_VALIDATE_NOT_UNSINGEDLONG = RULE_VALIDATE_ERROR + "The value must be a unsigned long type!";
var RULE_VALIDATE_NOT_BOOLEAN = RULE_VALIDATE_ERROR + "The value must be a Boolean type!";
var RULE_VALIDATE_NOT_REMOVE = "Can not delete the element! The number of the element is less than the minimum.";
var RULE_VALIDATE_NOT_ADDNEW = "Can not add the element! The number of the element has exceeded the maximum.";

var RULE_VALIDATE_NOT_PATTERN = "The value shoule accrod with the pattern:";
var RULE_VALIDATE_NOT_PATTERN_0 = "The value can only contain four numbers from zero to seven, and the first number must be zero.";
var RULE_VALIDATE_NOT_PATTERN_1 = "The value can only contain the following characters: letters , numbers, _ ,and its length must less than 40 letter,but the first letter can not be digit.";
var RULE_VALIDATE_NOT_PATTERN_2 = "The value can only contain the printable letters, space character, including space, tab, form feed, line feed and its length must less than 60 letter.";

//*******************************************************************************
// Global Variables
//*******************************************************************************
var _validate = new Validate();

//*******************************************************************************
//Browser class
//*******************************************************************************
var Browser = new Browser();
function Browser(){
	var agent = navigator.userAgent;
	var MSIE = agent.indexOf("MSIE");
	var NETS = agent.indexOf("Netscape");
	var OPER = agent.indexOf("Opera");

	this.isIe = function(){
		if(MSIE == 25) {
			return true;
		}else{
			return false;
		}
	}
}

//add by Jin Chen 2006.07.25
function CheckBrowser(){

	this.n = navigator.userAgent.toLowerCase();
	this.db = (document.compatMode && document.compatMode.toLowerCase() != "backcompat")?document.documentElement : (document.body || null);
	this.op = !!(window.opera && document.getElementById);
	if(this.op) document.onmousedown = new Function('e','if(((e = e || window.event).target || e.srcElement).tagName == "IMAGE") return false;');
	this.ie = !!(this.n.indexOf("msie") >= 0 && document.all && this.db && !this.op);
	this.iemac = !!(this.ie && this.n.indexOf("mac") >= 0);
	this.ie4 = !!(this.ie && !document.getElementById);
	this.n4 = !!(document.layers && typeof document.classes != _UNDEFINED );
	this.n6 = !!(typeof window.getComputedStyle != _UNDEFINED  && typeof document.createRange != _UNDEFINED );
	this.w3c = !!(!this.op && !this.ie && !this.n6 && document.getElementById);
	this.ce = !!(document.captureEvents && document.releaseEvents);
	this.px = this.n4? '' : 'px';
	this.tiv = this.w3c? 40 : 10;
}



