


var checkbrowser = new CheckBrowser();
//*******************************************************************************
// Debug Variables
//*******************************************************************************
var _DEBUG				 = true;
var _DEBUG_PARSE		 = false;
var _DEBUG_DOMTREE		 = false;
var _DEBUG_2HTML		 = true;

var _CONTEXT = _DEBUG_2HTML?"../":"";
var _UNDEFINED			 = "undefined";

//*******************************************************************************
// Schema Variables
//*******************************************************************************
var _SCHEMA_NS			 = "xs:";
var _SCHEMA_XSD			 = checkbrowser.ie?_SCHEMA_NS:"";
//alert(_SCHEMA_XSD);

var _SCHEMA_ELEMENT		 = "element";
var _SCHEMA_ATTRIBUTE	 = "attribute";

var _SCHEMA_COMPLEX_TYPE = "complexType";
var _SCHEMA_SEQUENCE	 = "sequence";

var _SCHEMA_ELEMENT_ATTR_TYPE_STRING = _SCHEMA_NS + "string"; 
var _SCHEMA_ELEMENT_ATTR_TYPE_NORMALIZED_STRING =  _SCHEMA_NS + "normalizedString"; 
var _SCHEMA_ELEMENT_ATTR_TYPE_POSITIVE_INTEGER = _SCHEMA_NS + "positiveInteger"; 

//
var _SCHEMA_ELEMENT_ATTR_NAME	= "name";
var _SCHEMA_ELEMENT_ATTR_TYPE	= "type";
var _SCHEMA_ELEMENT_ATTR_USE	= "use";

var _SCHEMA_ELEMENT_NAME		= "name";
var _SCHEMA_ELEMENT_TYPE		= "type";
var _SCHEMA_ELEMENT_MINOCCURS	= "minOccurs";
var _SCHEMA_ELEMENT_MAXOCCURS	= "maxOccurs";

var _SCHEMA_ELEMENT_MAXOCCURS_VALUE	= "unbounded";
var _SCHEMA_ELEMENT_ATTR_USE_REQUIRED = "required";
var _SCHEMA_ELEMENT_ATTR_USE_OPTIONAL = "optional";

//*******************************************************************************
// Html Variables
//*******************************************************************************
var _HTML_ELEMENT_TR = "tr";
var _HTML_ELEMENT_TD = "td";
var _HTML_ELEMENT_INPUT = "input";
var _HTML_ELEMENT_IMG = "img";

//var _HTML_ELEMENT_IMG_CONTRACT_SRC = _CONTEXT + "images/icon-link-ec-contract.gif";
//var _HTML_ELEMENT_IMG_EXPAND_SRC = _CONTEXT + "images/icon-link-ec-expand.gif";

var _HTML_ELEMENT_IMG_CLOSE_SRC = _CONTEXT + "images/icon-close.gif";
var _HTML_ELEMENT_IMG_OPEN_SRC = _CONTEXT + "images/icon-open.gif";

var _HTML_ELEMENT_IMG_DEFAULT_WIDTH = 11;
var _HTML_ELEMENT_IMG_DEFAULT_HEIGHT = 11;

var _HTML_TR = "tr";
var _HTML_IMG = "img";
var _HTML_INPUT = "input";

var _HTML_IMG_ALT = "Collapse This";

var _HTML_CLASS_CONTROL_ROW = "controlRow";
var _HTML_CLASS_PARAMNAME  = "paramName";
var _HMTL_CLASS_PARAM_VALUE_DEFAULT = "paramValueDefault";

var _HTML_CLASS_CONTAINER_ROW_XMLL = "containerRowXmlL";
var _HTML_CLASS_CONTAINER_ROW_DEFAULTL = "containerRowXmlL";

var _HTML_CLASS_PARAM_ROW_XMLL = "paramRowXmlL";
var _HTML_CLASS_PARAM_ROW_DEFAULTL = "paramRowDefaultL";

var _HTML_CLASS_PARAM_VALUE_REQUIRED = "paramValueRequired";


//*******************************************************************************
// Global Variables
//*******************************************************************************
//var sXmlDoc = null;
//var xmlDoc = null;
//var treeFactory = null;
var _validate = new Validate();	//the validate object[Validate object be defined in the validate.js

//*******************************************************************************
//
//*******************************************************************************


//add by Jin Chen 2006.07.25
/*
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
*/

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



