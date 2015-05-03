
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
var _HTML_ELEMENT_IMG_HELP_SRC = "icon-hel.gif";

var _HTML_IMG_DEFAULT_WIDTH = 11;
var _HTML_IMG_DEFAULT_HEIGHT = 11;

var _HTML_TR = "tr";
var _HTML_TD = "td";
var _HTML_IMG = "img";
var _HTML_INPUT = "input";
var _HTML_IMG_ALT = "Collapse This";

var _HTML_CLASS_CONTROL_ROW = "controlRow";
var _HTML_CLASS_PARAMNAME  = "paramName";
var _HTML_CLASS_PARAM_REQUIRED = "paramValueRequired";
var _HMTL_CLASS_PARAM_VALUE_DEFAULT = "paramValueDefault";
var _HTML_CLASS_PARAM_REQUIREMENTS = "paramRequirements";
var _HTML_CLASS_PARAM_SOURCE = "paramSource";
var _HTML_CLASS_PARAM_ACTIONS = "paramActions";


var _HTML_CLASS_CONTAINER_ROW_XMLL = "containerRowXmlL";
var _HTML_CLASS_PARAM_ROW_XMLL = "paramRowXmlL";
var _HTML_CLASS_PARAM_ROW_DEFAULTL = "paramRowDefaultL";
var _HTML_CLASS_PARAM_VALUE_REQUIRED = "paramValueRequired";


//*******************************************************************************
// Global Variables
//*******************************************************************************
var _validate = new Validate();
var Browser = new Browser();

//*******************************************************************************
//
//*******************************************************************************
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



//*******************************************************************************
// Copyright
//*******************************************************************************

/*
function Layer(_id){
	this.id = _id;
	this.elements = new Array();
	
	this.setId = function(_i){
		this.id = _i;
	}
	this.getId = function(){
		return this.id;
	}
	this.getElements = function(){
		return this.elements;
	}

	this.addElement = function(_e){
		this.elements.push(_e);
	}

	//about layer's element operations
	this.removeElement = function(_e){		
		for(var i=0;i<this.elements.length;i++){
			if(this.elements[i].getId() == _e.getId()){
				this.elements.splice(i ,1);
				return;
			}
		}
	}
	this.getElement = function(_id){
		var r = null;
		for(var i=0;i<this.elements.length;i++){
			if(this.elements[i].getId() == _id){
				r = this.elements[i];
				break;
			}
		}
		return r;
	}
	this.toString = function(){
		var s = "";
		for(var i=0;i<this.elements.length;i++){
			s = s + this.elements[i];
		}
		return "(" + this.id + "," + s + ")";
	}
}
*/

//*******************************************************************************
//Base classes
//*******************************************************************************

function DomTreeElement(_name){

	//Public propertys
	//***************************************************************************
	this.id = -1;
	this.name = _name;

	//Private propertys
	//***************************************************************************
	this.father = null;
	this.childrens = new Array();
	this.attributes = new Array();

	this.layer = -1;
	this.state = "old"; // "new"|"old"

	this.doc = "";
	this.ns = ""; //ns meaning "nams space"
	
	this.isLeaf = false;
	this.rule = new OccursRule(-1 , -1);//struct rule
	
	//these properties will be moveed into TextElement class.
	this.value = "";
	this.crule = new DefaultRule(-1 , -1);//content rule
	
	//Public methods
	//***************************************************************************
	this.setContentRule = function(_cr){
		this.crule = _cr;
	}
	this.getContentRule = function(){
		return this.crule;
	}
	this.setDocument = function(_doc){
		this.doc = _doc;
	}
	this.getDocument = function(){
		return this.doc;
	}
	this.setValue = function(_value){
		this.value = _value;	
	}
	this.getValue = function(){
		return this.value;
	}

	this.getId = function(){
		return this.id;
	}
	this.setId = function(_i){
		this.id = _i;
	}
	this.setState = function(_s){
		this.state = _s;
	}
	this.getState = function(){
		return this.state;
	}
	this.setName = function(_n){
		this.name = _n;
	}
	this.getName = function(){
		return this.name;
	}
	
	//property father
	this.setFather = function(_f){
		this.father = _f;
	}
	this.getFather = function(){
		return this.father;
	}

	//property childrens
	this.hasChildrens = function(){
		var r = false;
		if(this.childrens.length >0) r = true;
		return r;
	}
	this.getChildrens = function(){
		return this.childrens;
	}
	this.addChildren = function(_c){
		this.childrens.push(_c);
	}
	this.removeChildren = function(_c){		
		//alert("remove " + _eid + " from " + this.id);
		for(var i=0;i<this.childrens.length;i++){
			if(this.childrens[i].id == _c.id){
				this.childrens.splice(i ,1);
				return;
			}
		}
	}

	//property attributes
	this.setAttributes = function(_attrs){
		this.attributes = _attrs
	}
	this.getAttributes = function(){
		return this.attributes;
	}

	this.addAttribute = function(_a){
		this.attributes.push(_a);
	}

	this.removeAttribute = function(_aName){
		for(var i=0;i<this.attributes.length;i++){
			var attribute = this.attributes[i];
			if(attribute.name == _aName){
				this.attributes.splice(i ,1);
				break;
			}
		}
	}

	this.setLayer = function(_layer){
		this.layer = _layer;
	}
	this.getLayer = function(){
		return this.layer;
	}

	this.setRule = function(_r){
		this.rule = _r;
	}

	this.getRule = function(){
		return this.rule;
	}

	this.toString = function(){
		var fn = this.father == null?"":this.father.getName();
		return "(" + this.getId() + " , " + this.getName() + 
			" , f:" + fn + " , c.length:" + this.childrens.length + 
			" , a.length:" + this.attributes.length +
			" , sr:" + this.rule + ", cr:" + this.crule + " , v:" + this.value + ")";
	}
}


/**
* IDomTree: The Attribute class extends Element
**/
function DomTreeAttribute(_id , _name , _value){

	//Public propertys
	//***************************************************************************
	this.id = _id;
	this.name = _name;
	this.value = _value;

	this.doc = "";
	this.display = true;

	//Private propertys
	//***************************************************************************
	this.state = "new";// new element or old one
	this.element = null;
	this.rule = new DefaultRule();

	this.setDocument = function(_doc){
		this.doc = _doc;
	}
	this.getDocument = function(){
		return this.doc;
	}
	this.setState = function(_s){
		this.state = _s;
	}
	this.getState = function(){
		return this.state;
	}
	this.setElement = function(_e){
		this.element = _e;
	}
	this.getElement = function(){
		return this.element;
	}
	
	this.setRule = function(_r){
		this.rule = _r
	}
	this.getRule = function(){
		return this.rule;
	}

	this.toString = function(){
		return "(id:" + this.id + ", name:" + this.name + ", value:" + this.value 
			+ ", state:" + this.state + ", rule:" + this.rule + ")";
	}
}


//*******************************************************************************
//Utils classes
//*******************************************************************************
/**
* @title: java-like Map
* @author: lizhantao
* @date: 2004-11-22
* @email: lazett@gmail.com gliu@platform.com
* @warning: only support simple type key,String best!;
*/
function ActiveRecord(){
	this.map = new Map();
	this.sequence = -1;//synchronization?my god! it not db!! forgot it!

	this.save = function(object){
		this.sequence ++;
		this.map.put(this.sequence , object);
		object.setId(this.sequence);
		
		return object;
	}
	
	this.remove = function(i){
		this.map.remove(i);
	}

	this.load = function(i){
		return this.map.get(i);
	}
	
	this.toString = function(){
		return this.map.toString();
	}
}

/**
* @title: java-like Map
* @author: lizhantao
* @date: 2004-11-22
* @email: lazett@gmail.com gliu@platform.com
* @warning: only support simple type key,String best!;
*/
function Map() { 
	this.pairs = new List();
	this.get = get;
	this.put = put;
	this.remove = remove;
	this.size = size;
	this.isEmpty = isEmpty;
	this.keySet = keySet;
	this.containsKey = containsKey;
	this.toString = toString;

	function Item(key, value){
		this.key = key;
		this.value = value;
		this.toString = function(){
			return "<li>[key=" + this.key + " | value=" + this.value + "]</li> \n\r";
		}	
	}

	function put(key, value){
		for(var iter = this.pairs.iterator();iter.hasNext();){
			var item = iter.next();
			if(item.key === key){
				item.value = value;
				return;
			}
		}

		this.pairs.add(new Item(key,value));
	}

	function get(key){
		for(var iter = this.pairs.iterator();iter.hasNext();){
			var item = iter.next();
			if(item.key === key){
				return item.value;
			}
		}
		return null;
	}

	function remove(key){
		for(var iter = this.pairs.iterator();iter.hasNext();){
			var item = iter.next();
			if(item.key === key){
				iter.remove();
			}
		}
	}

	function size(){
		return this.pairs.size();
	}

	function isEmpty(){
		return this.pairs.size() <= 0;
	}
	function keySet(){
		var keys = new List();
		for(var iter = this.pairs.iterator();iter.hasNext();){
			var item = iter.next();
			keys.add(item.key);
		}
		return keys;
	}
	function containsKey(key){
		for(var iter = this.pairs.iterator();iter.hasNext();){
			var item = iter.next();
			if(item.key === key){
				return true;
			}
		}
		return false;
	}
	function toString(){
		var str = "";
		for(var iter = this.pairs.iterator();iter.hasNext();){
			str = str + iter.next().toString();
		}
		return str;
	}
}
/**
* @title: java-like List
* @author: lizhantao
* @date: 2004-11-22
* @email: lazett@gmail.com gliu@platform.com
*/
function List(){
	this.innerArray = new Array();
	this.add = add;
	this.get = get;
	this.remove = remove;
	this.size = size;
	this.isEmpty = isEmpty;
	this.iterator = iterator;
	this.contains = contains;

	function add(value){
		this.innerArray[this.innerArray.length] = value;
	}
	function get(i){
		if (i< 0 || i>= this.innerArray.length){
			return;
		}
		return this.innerArray[i];
	}
	function remove(i){
		if (i< 0 || i>= this.innerArray.length){
			return;
		}
		this.innerArray.splice(i,1);
	}
	function size(){
		return this.innerArray.length;
	}
	function isEmpty(){
		return this.innerArray.length <= 0;
	}
	function iterator(){
		return new Iterator(this);
	}
	function contains(object){
		for (var i = 0; i < this.pairs.length; i++){
			if ( this.innerArray[i] === object ){
				return true;
			}
		}
		return false;
	}
}
/**
* @title: java-like Set
* @author: lizhantao
* @date: 2004-11-22
* @email: lazett@gmail.com gliu@platform.com
* @warning: only support simple type value,String best!;
*/
function Set(){
	this.innerArray = new Array();
	this.add = add;
	this.get = get;
	this.remove = remove;
	this.size = size;
	this.isEmpty = isEmpty;
	this.iterator = iterator;
	this.contains = contains;

	function add(value){
		for (var i = 0; i < this.pairs.length; i++){
			if ( this.innerArray[i] === value ){
				return;
			}
		}
		this.innerArray[this.innerArray.length] = value;
	}
	function get(i){
		if (i< 0 || i>= this.innerArray.length){
			return;
		}
		return this.innerArray[i];
	}
	function remove(i){
		if (i< 0 || i>= this.innerArray.length){
			return;
		}
		this.innerArray.splice(i,1);
	}
	function size(){
		return this.innerArray.length;
	}
	function isEmpty(){
		return this.innerArray.length <= 0;
	}
	function iterator(){
		return new Iterator(this);
	}
	function contains(object){
		for (var i = 0; i < this.pairs.length; i++){
			if ( this.innerArray[i] === object ){
				return true;
			}
		}
		return false;
	}
}
/**
* @title: java-like Iterator
* @author: lizhantao
* @date: 2004-11-22
* @email: lazett@gmail.com gliu@platform.com
*/
function Iterator(list){
	this.list = list;
	this.cursor = 0;
	this.hasNext = hasNext;
	this.next = next;
	this.remove = remove;

	function hasNext(){
		return this.cursor != this.list.size();
	}
	function next(){
		var result = this.list.get(this.cursor);
		this.cursor++;
		return result;
	}
	function remove(){
		this.cursor--;
		this.list.remove(this.cursor);
	}
} 

//Others
//*******************************************************************************
function createHtmlElement(_s){
	return document.createElement(_s);
}

function createHtmlTextElement(_s){
	return document.createTextNode(_s);
}

function alertException(e){
	if (e instanceof Error) {
		throw e;
		//alert("Catch system excpetion:" + e.message);
	}else{
		alert(e);
	}
}

function throwException(_message){
	throw _message;
}

function iterator(obj) {
    for (var property in obj) {
        alert(property + " : " + obj[property]);
    }
}


function isUndefined(obj){
	var r = false;
	
	//ie 6 sp2
	if(obj + "" == undefined){
		r = true;
	}
	return r;
}//*******************************************************************************
// Copyright
//*******************************************************************************

var RULE_VALIDATE_NOT_EMPTY = "The value must be NOT empty!";
var RULE_VALIDATE_NOT_INTEGER = "The value must be a integer type!";
var RULE_VALIDATE_NOT_DURATION = "The value mus be a duration type! eg:P12Y03M12D";
var RULE_VALIDATE_NOT_URL = "The value must be a URL! type!";
var RULE_VALIDATE_NOT_DATE = "The value must be a date type!";
var RULE_VALIDATE_NOT_DECIMAL = "The value must be a decimal type!";
var RULE_VALIDATE_NOT_POSITIVEINTEGER = "The value must be a positive integer type!";
var RULE_VALIDATE_NOT_UNSINGEDLONG = "The value must be a unsinged long type!";
var RULE_VALIDATE_NOT_BOOLEAN = "The value must be a boolean type!";

/**
* @ interface - IRule
* And it's implements will use the validate.js to finish his job!
**/
function IRule(){
	this.name = "";
	this.defaultValue = "";
	this.use = "";

	this.validate = function(_s){};
	this.toString = function(){}
}

function IStructRule(_min , _max){
	this.name = "";
	this.min = _min;
	this.max = _max;

	this.validate = function(_oper , _value){};
	this.toString = function(){}
}

function IContentRule(){
	this.name = "";
	this.defaultValue = "";
	this.use = "";

	this.validate = function(_value){};
	this.toString = function(){}
}

//DefaultRule will be deleted in the new build.
function DefaultRule(_dvalue , _use){
	this.name = "default";
	this.defaultValue = _dvalue;
	this.use = _use;
	
	this.message = "";
	this.validate = function(_value){
		var r = true;
		if(!isRequired(this.use , _value)){
			r = false;
			this.message = RULE_VALIDATE_NOT_EMPTY;
		}
		return r;
	}

	this.toString = function(){
		return "DefaultRule(name:" + this.name + ",defaultValue:" + this.defaultValue + ",use:" + this.use + ")";
	}

}

//*******************************************************************************
// StructRule
//*******************************************************************************
function OccursRule(_min , _max){

	this.name = "occurs";
	this.min = _min ;
	this.max = _max ;
	
	this.message = "";
	this.validate = function(_oper , _value){
		var r = true;
		if(_oper == "add"){
			if(this.max != _SCHEMA_ELEMENT_MAXOCCURS_VALUE){
				if((_value + 1) > this.max){
					r = false;
					this.message = "The number of this elements can not > " + this.max;
				}
			}
		}
		else if(_oper == "remove"){
			if((_value - 1) < this.min){
				r = false;
				this.message = "The number of this element can not < " + this.min;
			}
		}
		return r;
	}

	this.toString = function(){
		return "OccursRule(min:" + this.min + ",max:" + this.max + ")";
	}
}



//*******************************************************************************
// ContentRule
//*******************************************************************************
function isRequired(_use , _value){
	var r = true;
	if(_use == "required" || _use == ""){
		if(_validate.isEmpty(_value)){
			r = false;
		}
	}
	return r;
}

/**
* The Rules class - StringRule 
**/
function StringRule(_dvalue , _use){
	this.name = "string";
	this.defaultValue = _dvalue;
	this.use = _use;
	
	this.message = "";
	this.validate = function(_value){
		var r = true;
		if(!isRequired(this.use , _value)){
			r = false;
			this.message = RULE_VALIDATE_NOT_EMPTY;
		}
		return r;
	}

	this.toString = function(){
		return "StringRule(name:" + this.name + ",defaultValue:" + this.defaultValue + ",use:" + this.use + ")"; 
	}

}

/**
* The Rules class - BooleanRule 
**/
function BooleanRule(_dvalue , _use){
	this.name = "boolean";
	this.defaultValue = _dvalue;
	this.use = _use;

	this.message = "";
	this.validate = function(_value){
		var r = true;
		if(!isRequired(this.use , _value)){
			r = false;
			this.message = RULE_VALIDATE_NOT_EMPTY;
		}else{
			if(	_value != "1"	&& _value != "0"	&&
				_value != 1		&& _value != 0		&&
				_value != true	&& _value != false	&& 
				_value != "true"&& _value != "false"){
					r =  false;
					this.message = RULE_VALIDATE_NOT_BOOLEAN;
			}
		}

		return r;
	}
	this.toString = function(){
		return "BooleanRule(defaultValue:" + this.defaultValue + ",use:" + this.use + ")";
	}
}


function IntegerRule(_dvalue , _use){

	this.name = "integer";
	this.defaultValue = _dvalue;
	this.use = _use;
	
	this.message = "";
	this.validate = function(_value){
		var r = true;
		if(!isRequired(this.use , _value)){
			r = false;
			this.message = RULE_VALIDATE_NOT_EMPTY;
		}else{
			if(!_validate.isInteger(_value)){
				r = false;
				this.message = RULE_VALIDATE_NOT_INTEGER;
			}
		}
		return r;
	}

	this.toString = function(){
		return "IntegerRule(defaultValue:" + this.defaultValue + ",use:" + this.use + ")"; 
	}
}
function UnsignedLongRule(_dvalue , _use){

	this.name = "unsignedLong";
	this.defaultValue = _dvalue;
	this.use = _use;
	
	this.message = "";
	this.validate = function(_value){
		var r = true;
		if(!isRequired(this.use , _value)){
			r = false;
			this.message = RULE_VALIDATE_NOT_EMPTY;
		}else{
			if(!_validate.isUnsignedLong(_value)){
				r = false;
				this.message = RULE_VALIDATE_NOT_UNSINGEDLONG;
			}
		}
		return r;
	}

	this.toString = function(){
		return "IntegerRule(defaultValue:" + this.defaultValue + ",use:" + this.use + ")"; 
	}
}

function PositiveIntegerRule(_dvalue , _use){

	this.name = "positiveInteger";
	this.defaultValue = _dvalue;
	this.use = _use;
	
	this.message = "";
	this.validate = function(_value){
		var r = true;
		if(!isRequired(this.use , _value)){
			r = false;
			this.message = RULE_VALIDATE_NOT_EMPTY;
		}else{
			if(!_validate.isPositiveInteger(_value)){
				r = false;
				this.message = RULE_VALIDATE_NOT_POSITIVEINTEGER;
			}
		}
		return r;
	}

	this.toString = function(){
		return "IntegerRule(defaultValue:" + this.defaultValue + ",use:" + this.use + ")"; 
	}
}
function RestrictIntegerRule(_dvalue , _use , _min , _max){
	this.name = "restrictInteger";
	this.defaultValue = _dvalue;
	this.use = _use;
	this.min = _min ;
	this.max = _max ;
	
	this.message = "";
	this.validate = function(_value){
		var r = true;
		if(!isRequired(this.use , _value)){
			r = false;
			this.message = RULE_VALIDATE_NOT_EMPTY;
		}else{
			if(!_validate.isIntegerInRange(_value , min , max)){
				r = false;
				this.message = "The value must be from " + this.min + " to " + this.max ;
			}
		}
		return r;
	}

	this.toString = function(){
		return "RestrictIntegerRule(defaultValue:" + this.defaultValue + ",use:" + this.use
				+ ",min:" + this.min + ",max:" + this.max + ")";
	}
}

function EnumStringRule(_dvalue , _use){

	this.name = "enumString";
	this.defaultValue = _dvalue;
	this.use = _use;

	this.enumValues = new Array();
	this.addEnumValue = function(_enumValue){
		this.enumValues.push(_enumValue);

	}
	this.getEnumValue = function(_i){
		return this.enumValues[_i];
	}

	this.message = "";
	this.validate = function(_value){
		var r = true;
		if(!isRequired(this.use , _value)){
			r = false;
			this.message = RULE_VALIDATE_NOT_EMPTY;
		}else{
			var isExist = false;
			for(var i=0;i<this.enumValues.length;i++){
				if(this.enumValues[i] == _value){
					isExist = true;
					break;
				}
			}
			if(!isExist){
				r = false;
				this.message = "The value must be in [" + this.enumValues + "]";
			}
		}
		return r;
	}

	this.toString = function(){
		return "EnumStringRule(defaultValue:" + this.defaultValue + ",use=" + this.use + ",enum=" + this.enumValues.length + ")";
	}
}

/**
* The Rules class - BooleanRule 
**/
function DecimalRule(_dvalue , _use){

	this.name = "decimal";
	this.defaultValue = _dvalue;
	this.use = _use;

	this.message = "";
	this.validate = function(_value){
		var r = true;
		if(!isRequired(this.use , _value)){
			r = false;
			this.message = RULE_VALIDATE_NOT_EMPTY;
		}else{
			if(!_validate.isDecimal(_value)){
				r = false;
				this.message = RULE_VALIDATE_NOT_DECIMAL;
			}
		}
		return r;
	}
	this.toString = function(){
		return "DecimalRule(defaultValue:" + this.defaultValue + ",use:" + this.use + ")";
	}
}
function DurationRule(_dvalue , _use){

	this.name = "duration";
	this.defaultValue = _dvalue;
	this.use = _use;

	this.message = "";
	this.validate = function(_value){
		var r = true;
		if(!isRequired(this.use , _value)){
			r = false;
			this.message = RULE_VALIDATE_NOT_EMPTY;
		}else{
			if(!_validate.isDuration(_value)){
				r = false;
				this.message = RULE_VALIDATE_NOT_DURATION;
			}
		}
		return r;
	}
	this.toString = function(){
		return "DurationRule(name:" + this.name + ",defaultValue:" + this.defaultValue + ",use:" + this.use + ")";
	}
}

function AnySimpleTypeRule(_dvalue , _use){

	this.name = "anySimpleType";
	this.defaultValue = _dvalue;
	this.use = _use;
	
	this.message = "";
	this.validate = function(_value){
		var r = true;
		if(!isRequired(this.use , _value)){
			r = false;
			this.message = RULE_VALIDATE_NOT_EMPTY;
		}
		return r;
	}
	this.toString = function(){
		return "AnySimpleTypeRule(name:" + this.name + ",defaultValue:" + this.defaultValue + ",use:" + this.use + ")";
	}
}

function DateTimeRule(_dvalue , _use){

	this.name = "dateTime";
	this.defaultValue = _dvalue;
	this.use = _use;

	this.message = "";
	this.validate = function(_value){
		var r = true;
		if(!isRequired(this.use , _value)){
			r = false;
			this.message = RULE_VALIDATE_NOT_EMPTY;
		}else{
			if(!_validate.isDateTime(_value)){
				r = false;
				this.message = RULE_VALIDATE_NOT_DATE;
			}
		}
		return r;
	}
	this.toString = function(){
		return "DateTimeRule(name:" + this.name + ",defaultValue:" + this.defaultValue + ",use:" + this.use + ")";
	}
}
function AnyURIRule(_dvalue , _use){
	this.name = "anyURI";
	this.defaultValue = _dvalue;
	this.use = _use;
	
	this.message = "";
	this.validate = function(_value){
		var r = true;
		if(!isRequired(this.use , _value)){
			r = false;
			this.message = RULE_VALIDATE_NOT_EMPTY;
		}else{
			if(!_validate.isURL(_value)){
				r = false;
				this.message = RULE_VALIDATE_NOT_URL;
			}
			
		}
		return r;
	}

	this.toString = function(){
		return "anyURI(name:" + this.name + ",defaultValue:" + this.defaultValue + ",use:" + this.use + ")";
	}

}
function NCNameRule(_dvalue , _use){
	this.name = "NCNameRule";
	this.defaultValue = _dvalue;
	this.use = _use;
	
	this.message = "";
	this.validate = function(_value){
		var r = true;
		if(!isRequired(this.use , _value)){
			r = false;
			this.message = RULE_VALIDATE_NOT_EMPTY;
		}
		return r;
	}

	this.toString = function(){
		return "NCNameRule(name:" + this.name + ",defaultValue:" + this.defaultValue + ",use:" + this.use + ")";
	}

}
function RuleFactory(_standNs){

	//Public property
	//*********************************************************************
	this.standNS  = _standNs;
	var standNS = this.standNS + ":";


	//Public functions
	//*********************************************************************
	this.getElementStructRule = function(_element){

		var min = _element.getAttribute(_SCHEMA_ELEMENT_MINOCCURS);
		var max = _element.getAttribute(_SCHEMA_ELEMENT_MAXOCCURS);
		
		if(min == null || min == _UNDEFINED) min = 1;
		if(max == null || max == _UNDEFINED) max = 1;
		
		return new OccursRule(min ,max);

	}


	this.getRuleByType = function(_type ,  _use , _defaultValue){
		if(_type == null || _type == "") throwException("RuleFactoryException:The parameter[type] is null!");
		
		var rule = new DefaultRule(_defaultValue , _use);
		switch(_type){
			case standNS + "anySimpleType":
				rule = new AnySimpleTypeRule(_defaultValue , _use);
				break;
			case standNS + "duration":
				rule = new DurationRule(_defaultValue , _use);
				break;				
			case standNS + "string": 
			case standNS + "normalizedString":
				rule = new StringRule(_defaultValue , _use);
				break;
			case standNS + "int":
			case standNS + "integer":
				rule =  new IntegerRule(_defaultValue , _use);
				break;
			case standNS + "positiveInteger": 
				rule =  new PositiveIntegerRule(_defaultValue , _use);
				break;
			case standNS + "boolean" : 
				rule = new BooleanRule(_defaultValue , _use);
				break;
			case standNS + "base64Binary":
				break;
			case standNS + "dateTime":
				rule = new DateTimeRule(_defaultValue , _use);
				break;
			case standNS + "anyURI":
				rule = new AnyURIRule(_defaultValue , _use);
				break;
			case standNS + "unsignedLong":
				rule = new UnsignedLongRule(_defaultValue , _use);
				break;
			case standNS + "NCName":
				rule = new NCNameRule(_defaultValue , _use);
				break;
		}
		return rule;
	}

	this.getRuleBySimpleType = function(_simpleType , _use , _defaultValue){
		if(_simpleType == null) throwException("RuleFactoryException:The parameter[simpleType] is null!");
		
		var rule = new DefaultRule(_defaultValue , _use);
		var restric = _getFirstNodeOfElement(_simpleType , "restriction");
		if(restric != null){
			var base = restric.getAttribute("base");
			switch(base){
				case standNS + "nonNegativeInteger" :
				case standNS + "positiveInteger":
					var min = 1;//defalut value in w3c
					var max = 1;//defalut value in w3c
					
					var minNodes = null;
					var maxNodes = null;

					if(Browser.isIe()){
						minNodes = restric.getElementsByTagName(standNS + "minInclusive");
						maxNodes = restric.getElementsByTagName(standNS + "maxInclusive");
					}else{
						minNodes = restric.getElementsByTagName("minInclusive");
						maxNodes = restric.getElementsByTagName("maxInclusive");
					}
					//alert(minNodes[0].getAttribute("value") + "|" + maxNodes[0].getAttribute("value"));

					if(minNodes.length >0) min = minNodes[0].getAttribute("value");
					if(maxNodes.length >0) max = maxNodes[0].getAttribute("value");
					
					rule = new RestrictIntegerRule(_defaultValue , _use , min , max);
					break;
				case standNS + "normalizedString" :
				case standNS + "string":
					rule = new EnumStringRule(_defaultValue , _use);
					
					var enums = null;
					if(Browser.isIe()){
						enums = restric.getElementsByTagName(standNS + "enumeration");
					}else{
						enums = restric.getElementsByTagName("enumeration");
					}
					for(var i=0;i<enums.length;i++){
						var enumValue = enums[i].getAttribute("value");
						rule.addEnumValue(enumValue);
					}
					break;
				case standNS + "decimal": 
					var minExclusive = null;
					var fractionDigits = null;
					var totalDigits = null;

					if(Browser.isIe()){
						minExclusive = restric.getElementsByTagName(standNS + "minExclusive");
						fractionDigits = restric.getElementsByTagName(standNS + "minExclusive");
						totalDigits = restric.getElementsByTagName(standNS + "minExclusive");
					}else{
						minExclusive = restric.getElementsByTagName("minExclusive");
						fractionDigits = restric.getElementsByTagName("minExclusive");
						totalDigits = restric.getElementsByTagName("minExclusive");
					}		
					rule = new DecimalRule(_defaultValue , _use);	
					
					break;

				//Todo: add others
				//case xxx:
			}
		}else{
			//TODO: other types
			//<xsd:list> or <xsd:union>


		}

		return rule;
	}

	_getFirstNodeOfElement = function(_element , _nodeName){
		var r = null;
		var nodes = _element.childNodes;
		for(var i=0;i<nodes.length;i++){
			if(nodes[i].nodeType != 8 && nodes[i].nodeType != 3 
				&& nodes[i].nodeName == (standNS + _nodeName)){
				return nodes[i];
			}
		}
		return r;
	}
}

/**
* @ interface - ISchemaParse
* The schema parse interface
* @ See Also
* NomralSchemaParse DomTreeShemaParse	 
**/
function ISchemaParse(){

	//find element
	this.findRootElement = function(){}						
	this.findAllElements = function(){}						
	
	//element & element's childrens & element's attributes
	this.findElementByName = function(_elementName){}
	this.findElementChildrens = function(_elementName){}
	this.findElementAttribute  = function(_elementName , _attributeName){}
	this.findElementAttributes = function(_elementName){}
	
	this.findElementDocumentation = function(_elementName){}
	this.findElementAttributeDocumentation = function(_elementName , _attributeName){}

	//find element & attribute's rule
	this.findElementStructRule = function(_elementName){}
	this.findElementContentRule = function(_elementName){}
	this.findElementAttributeRule = function(_elementName , _attributeName){}
	

	//find attribute and rule of the element's children 
	this.findElementChildrenContentRule = function(_elementName , _childName){}
	this.findElementChildrenStructRule = function(_elementName , _childName){}

}

//*******************************************************************************
// MultiNameSpaceSchemaParse implements the ISchemaParse interface.
// It solve the multi-namespace and reciprocal reference problem
//*******************************************************************************
function MultiNSSchemaParse(_sXmlDoc , _nameSpace , _standNS){

	//Public property
	//*********************************************************************
	this.sXmlDoc = _sXmlDoc;
	this.nameSpace = _nameSpace;
	this.standNS  = _standNS;

	this.refParse = null;
	this.ruleFactory = null;
	
	//Private property
	//*********************************************************************
	var nameSpace = this.nameSpace + ":";
	var standNS = this.standNS + ":";

	//Public functions
	//*********************************************************************
	this.findRootElement = function(){
		var r = null;
		var schemaNodes = null;
		if(Browser.isIe()){
			schemaNodes = this.sXmlDoc.getElementsByTagName(standNS + "schema");
		}else{
			schemaNodes = this.sXmlDoc.getElementsByTagName("schema");
		}
		
		if(schemaNodes.length >0){
			var index = 0;
			var n = 0;
			var childs = schemaNodes[0].childNodes;
			for(var i=0;i<childs.length;i++){
				if(childs[i].nodeType != 3){
					if(childs[i].nodeName == (standNS + "element")){
						index = i;
						if(n > 1){ 
							return null;
						}else{
							n = n + 1;
						}
					}
				}
			}
			r = childs[index];
		}
		return r;
	}
	
	this.findAllElements = function(){
		return this.findElementByName("");
	}

	//Find element
	//@ elementName		- the name of the element
	//return			- if find it,return this element otherwise return null object
	this.findElementByName = function(_elementName){	

		var r = null;
		var ns = _getNS(_elementName);
		if(ns == this.nameSpace){
			var eName = _getElementName(_elementName);
			var elements = null;

			if(Browser.isIe()){
				elements = this.sXmlDoc.getElementsByTagName(standNS + _SCHEMA_ELEMENT);
			}else{
				elements = this.sXmlDoc.getElementsByTagName(_SCHEMA_ELEMENT);
			}

			//alert("elements.length=" + elements.length);
			if(_elementName != ""){
				for(var i=0;i<elements.length;i++){
					if(elements[i].nodeType != 3){
						var name = elements[i].getAttribute(_SCHEMA_ATTR_NAME);
						if(name != null && name == eName){
								r = elements[i];
								break;
						}
					}
				}
			}else{
				r = elements;
			}
		}else{
			if(this.refParse != null){
				r = this.refParse.findElementByName(_elementName);
			}else{
				throwException("The element's prefix is error!");
			}
		}
		return r;
	}

	this.findElementDocumentation = function(_elementName){
		var element = this.findElementByName(_elementName);
		if(element == null) throwException("Excepton:The element[" + _elementName + "] is not exist!!");
		
		var r = "";
		var doc = _findDocumentationOfElement(element);
		if(doc != null){
			r = doc.firstChild.nodeValue;
		}
		return r;
	}

	this.findElementAttributeDocumentation = function(_elementName , _attributeName){
		var attribute = this.findElementAttribute(_elementName , _attributeName);
		if(attribute == null) throw "Exception:The element[" + _elementName + "] do NOT have this attribute[" + _attributeName + "]!";
		
		var r = "";
		var doc = _findDocumentationOfAttribute(attribute);
		if(doc != null){
			r = doc.firstChild.nodeValue;
		}
		return r;
	}

	//Find element's childrens
	//@ elementName		- the element object
	//return			- if find it return this element's childrens otherwise return empty Array object	
	this.findElementChildrens = function(_elementName){
		var element = this.findElementByName(_elementName);
		if(element == null) throwException("Excepton:The element[" + _elementName + "] is not exist!!");	
		
		var r = new Array();
		var sNode = _findSequenceNodeOfElement(element);		
		if(sNode != null){
			var childs = sNode.childNodes;
			for(var i=0;i<childs.length;i++){
				var child = childs[i];
				if(child.nodeType != 3 && child.nodeName == (standNS + "element")){
					r.push(child);
					/*
					//if u want to know the rule of the element,
					//please execute findChildrenStructRule method to get it.
					/*
					var ref = child.getAttribute("ref");
					if(ref != null){
						var childName = _getElementName(ref);
						//search again;
						r.push(this.findElementByName(childName));
					}else{
						r.push(element);
					}
					*/
				}
			}
		}
		return r;
	}

	this.findElementAttributes = function(_elementName){
		var element = this.findElementByName(_elementName);
		if(element == null) throwException("Excepton:The element[" + _elementName + "] is not exist!!");	
		
		var r = new Array();
		var complexType = _getFirstNodeOfElement(element , "complexType");
		if(complexType != null){
			var simpleContent = _getFirstNodeOfElement(complexType , "simpleContent");
			if(simpleContent == null){
				var attrs1 = complexType.childNodes;
				//situation 1: 
				//<xsd:complexType>
				//		<xsd:attribute/>
				//</xsd:complexType>
				for(var i=0;i<attrs1.length;i++){
					if(attrs1[i].nodeType != 3 && attrs1[i].nodeName == (standNS + "attribute")){
						r.push(attrs1[i]);
					}
				}
			}else{
				//situation 2:
				//<xsd:complexType>
				//	<xsd:simpleContent>
				//		<xsd:extension base="xsd:string">
				//			<xsd:attribute/>
				//		</xsd:extension base="xsd:string">
				//	</xsd:simpleContent>
				//</xsd:complexType>
				var extension = _getFirstNodeOfElement(simpleContent , "extension");
				var attrs2 = extension.childNodes;
				for(var i=0;i<attrs2.length;i++){
					if(attrs2[i].nodeType != 3 && attrs2[i].nodeName == (standNS + "attribute")){
						r.push(attrs2[i]);
					}
				}
			}
		}
		return r;
	}

	this.findElementAttribute = function(_elementName , _attributeName){
		var r = null;
		var attributeNodes = this.findElementAttributes(_elementName);
		for(var i=0;i<attributeNodes.length;i++){
			var attr = attributeNodes[i];
			if(_attributeName == attr.getAttribute("name")){
				return attributeNodes[i];
			}
		}
		return r;
	}

	
	this.findSimpleType = function(_sName){

		//find root element<xsd:schema>
		var root = null;
		if(Browser.isIe()){
			root = this.sXmlDoc.getElementsByTagName(standNS + "schema");
		}else{
			root = this.sXmlDoc.getElementsByTagName("schema");
		}
		
		//find <xsd:simpleType>
		var name = _getElementName(_sName);			
		var childs = root[0].childNodes;
		for(var i=0;i<childs.length;i++){
			if(childs[i].nodeType != 3 && childs[i].nodeName == (standNS + "simpleType")){
				if(childs[i].getAttribute("name") == _sName){
						return childs[i];
				}
			}
		}
		return null;
	}
	
	this.findElementStructRule = function(_elementName){
		var element = this.findElementByName(_elementName);
		if(element == null) throwException("Excepton:The element[" + _elementName + "] is not exist!!");	

		return this.ruleFactory.getElementStructRule(element);
	}

	this.findElementContentRule = function(_elementName){
		var element = this.findElementByName(_elementName);
		if(element == null) throwException("Excepton:The element[" + _elementName + "] is not exist!!");

		var rule = new DefaultRule("" , "");
		//situation 0:
		//<xsd: element type=""/>
		var type = element.getAttribute("type");
		var use = null;
		var dValue = element.getAttribute("default");

		if(type != null){
			return this.ruleFactory.getRuleByType(type , use , dValue);
		}

		//situation 1:
		//<xsd:element>
		//	<xsd:simpleType>
		//		<xsd:restriction base="xsd:string">
		//			<xsd:enumeration value="TCP"/>
		//		</xsd:restriction base="xsd:string">
		//	</xsd:simpleType>
		//<xsd:element>
		var simpleType = _getFirstNodeOfElement(element , "simpleType");
		if(simpleType != null){
			return this.ruleFactory.getRuleBySimpleType(simpleType , use , dValue);
		}
		
		//situation 2:
		//<xsd:complexType>
        //	<xsd:simpleContent>
        //        <xsd:extension base="xsd:anyURI"/>
		//	</xsd:simpleContent>
		//</xsd:complexType>
		var complex = _getFirstNodeOfElement(element , "complexType");
		if(complex != null){
			var simple = _getFirstNodeOfElement(complex , "simpleContent");
			if(simple != null){
				var extens = _getFirstNodeOfElement(simple , "extension");
				if(extens != null){
					var base = extens.getAttribute("base");
					return this.ruleFactory.getRuleByType(base , null , null);
				}
			}
		}
		return rule;
	}

	this.findElementAttributeRule = function(_elementName , _attributeName){
		var attribute = this.findElementAttribute(_elementName , _attributeName);
		if(attribute == null) throw "Exception:The element[" + _elementName + "] do NOT have this attribute[" + _attributeName + "]!";
		
		var type = attribute.getAttribute("type");
		var use = attribute.getAttribute("use");
		var dvalue = attribute.getAttribute("default");
		
		if(type != null){
			var ns = _getNS(type);				
			if(ns == this.standNS){
				return this.ruleFactory.getRuleByType(type , use , dvalue);
			}else{
				if(ns == this.nameSpace){
					//find this type node in it's own file!
					//ref! search again!
					var attrName = _getAttributeName(type);
					var simpleType = this.findSimpleType(attrName);		
					
					//situation 1:
					//<xsd:simpleType name="proportionType">
					//	<xsd:restriction base="xsd:string">
					return this.ruleFactory.getRuleBySimpleType(simpleType , use , dvalue);

				}else{
					if(this.refParse != null){
						return this.refParse.findElementAttributeRule(_elementName , _attributeName);
					}else{
						throwException("The schema file is error!");
					}
				}
			}
		}else{
			var simpleType = _getFirstNodeOfElement(attribute , "simpleType");
			//situation 1:
			//<xsd:simpleType name="proportionType">
			//	<xsd:restriction base="xsd:string">
			return this.ruleFactory.getRuleBySimpleType(simpleType , use , dvalue);
		}
	}

	//TODO:
	this.findElementChildrenContentRule = function(_elementName , _childName){
		//validate parameters
		var element = this.findElementByName(_elementName);
		if(element == null) throwException("The element[" + _elementName + "] is not exist!!");

		var sNode = _findSequenceNodeOfElement(element);
		if(sNode == null) throwException("The element[" + _elementName + "] has no childrens!");
		
		//find rule
		var rule = new DefaultRule("" , "");
		var childs = null;
		if(Browser.isIe()){
			childs = sNode.getElementsByTagName(standNS + "element");
		}else{
			childs = sNode.getElementsByTagName("element");
		}

		for(var i=0;i<childs.length;i++){
			var child = childs[i];
			if(child.nodeType != 3){	
				var type = child.getAttribute("type");
				var use = child.getAttribute("use");
				var dvalue = child.getAttribute("default");

				var ref = child.getAttribute("ref");
				if(ref != null){
					//situation 1:
					//declare the type by use "ref" property!shit!
					if(ref == _childName){
						var ns = _getNS(ref);
						if(ns == this.nameSpace){
							//ref! search again!
							return this.findElementContentRule(_childName);			
						}else{
							if(this.refParse != null){
								return this.refParse.findElementContentRule(_childName);
							}else{
								throwException("Can not find the rule of the element[" + _elementName + "]'s children[" + _childName + "]! The schema file is error!");
							}
						}
					}
				}else{
					//situation 2:
					//declare the type by use "type" property.
					var name = child.getAttribute("name");
					var dValue = child.getAttribute("default");
					if(_childName == (nameSpace + name)){
						var ns = _getNS(type);
						if(ns == this.standNS){
							//basic types
							return this.ruleFactory.getRuleByType(type , null , dValue);
						}else{
							if(ns == this.nameSpace){
								//ref! search again!
								return this.findElementContentRule(childName);
							}else{
								if(this.refParse != null){
									return this.refParse.findElementContentRule(_childName);
								}else{
									throwException("Can not find the rule of the element[" + _elementName + "]'s children[" + _childName + "]! The schema file is error!");
								}
							}
						}
					}
				}
			}
		}//end for
		return rule;
	}


	this.findElementChildrenStructRule = function(_elementName , _childName){
		//validate parameters
		var element = this.findElementByName(_elementName);
		if(element == null) throwException("The element[" + _elementName + "] is not exist!!");	
		
		var sNode = _findSequenceNodeOfElement(element);
		if(sNode == null) throwException("The element[" + _elementName + "] has no childrens!");
		
		//find rule
		var rule = new DefaultRule("" , "");
		var childs = null;
		if(Browser.isIe()){
			childs = sNode.getElementsByTagName(standNS + "element");
		}else{
			childs = sNode.getElementsByTagName("element");
		}

		for(var i=0;i<childs.length;i++){
			var child = childs[i];
			if(child.nodeType != 3){
				var ref = child.getAttribute("ref");
				if(ref != null){
					if(ref == _childName){
						return  this.ruleFactory.getElementStructRule(child);
					}
				}else{
					var name = child.getAttribute("name");
					if(_childName == (nameSpace + name)){
						return  this.ruleFactory.getElementStructRule(child);				
					}
				}
			}
		}
		return rule;
	}

	//Private functions
	//*********************************************************************


	//Find the documentation of element
	//U should ensure that the <Documentation> element be defined at first!
	//@ element
	//@ return the <Documentation> element
	_findDocumentationOfElement = function(_element){
		var r = null;
		var anno = _getFirstNodeOfElement(_element , "annotation");
		if(anno != null) r = _getFirstNodeOfElement(anno , "documentation");
		return r;
	}

	_findDocumentationOfAttribute = function(_attribute){
		var r = null;
		var anno = _getFirstNodeOfElement(_attribute , "annotation");
		if(anno != null) r = _getFirstNodeOfElement(anno , "documentation");
		return r;
	}

	_findSequenceNodeOfElement = function(_element){
		
		//In firefox browser , the blank is considered a node which name is "#text";
		//So we should eliminate this text nodes.
		var r = null;
		var ctn = _getFirstNodeOfElement(_element , "complexType");
		if(ctn != null) r =  _getFirstNodeOfElement(ctn , "sequence");
		return r;
	}
	
	_getFirstNodeOfElement = function(_element , _nodeName){
		var r = null;
		var nodes = _element.childNodes;
		for(var i=0;i<nodes.length;i++){
			if(nodes[i].nodeType != 3 && nodes[i].nodeName == (standNS + _nodeName)){
				return nodes[i];
			}
		}
		return r;
	}
	
	_getAttributeName = function(_attrRefName){
		return _getRealNameOfRef(_attrRefName);
	}

	_getElementName = function(_elementRefName){
		return _getRealNameOfRef(_elementRefName);
	}

	_getNS = function(_refName){
		var r = "";
		var index = _refName.indexOf(":");
		if(index != -1){
			r  = _refName.substring(0 , index);
		}
		return r;
	}

	_getRealNameOfRef = function(_refName){
		var r = "";
		var index = _refName.indexOf(":");
		if(index != -1){
			r  = _refName.substring(index + 1);
		}
		return r;
	}
	
	_findChildrenContentRule = function(_child){


	}
}



/**
* The NomralSchemaParse implements ISchemaParse by use the DOM object's method.
**/
function SingleNSSchemaParse(_sXmlDoc , _nameSpace , _standNS){
	
	//Public property
	//*********************************************************************
	this.sXmlDoc = _sXmlDoc;
	this.nameSpace = _nameSpace;
	this.standNS  = _standNS;

	this.ruleFactory = null;

	//Private property
	//*********************************************************************
	var nameSpace = this.nameSpace + ":";
	var standNS = this.standNS + ":";
	
	//Public functions
	//*********************************************************************
	this.findRootElement = function(){
		var r = null;
		var schemaNodes = null;
		if(Browser.isIe()){
			schemaNodes = this.sXmlDoc.getElementsByTagName(standNS + "schema");
		}else{
			schemaNodes = this.sXmlDoc.getElementsByTagName("schema");
		}
		
		if(schemaNodes.length >0){
			var index = 0;
			var n = 0;
			var childs = schemaNodes[0].childNodes;
			for(var i=0;i<childs.length;i++){
				if(childs[i].nodeType != 3 && childs[i].nodeName == (standNS + "element")){
						index = i;
						if(n > 1){ 
							return null;
						}else{
							n = n + 1;
						}
				}
			}
			r = childs[index];
		}
		return r;
	}
	
	this.findAllElements = function(){
		return this.findElementByName("");
	}

	//Find element
	//@ elementName		- the name of the element
	//return			- if find it,return this element otherwise return null object
	this.findElementByName = function(_elementName){
		var r = null;
		
		var elements = null;
		if(Browser.isIe()){
			elements = this.sXmlDoc.getElementsByTagName(standNS + _SCHEMA_ELEMENT);
		}else{
			elements = this.sXmlDoc.getElementsByTagName(_SCHEMA_ELEMENT);
		}
			
		if(_elementName != ""){
			for(var i=0;i<elements.length;i++){
				var name = elements[i].getAttribute(_SCHEMA_ATTR_NAME);
				if(name != null && name == _elementName){
					r = elements[i];
					break;
				}
			}
		}else{
			r = elements;
		}
		return r;
	}

	this.findElementDocumentation = function(_elementName){
		var element = this.findElementByName(_elementName);
		if(element == null) throwException("Excepton:The element[" + _elementName + "] is not exist!!");
		
		var r = "";
		var doc = _findDocumentationOfElement(element);
		if(doc != null){
			r = doc.firstChild.nodeValue;
		}
		return r;
	}

	this.findElementAttributeDocumentation = function(_elementName , _attributeName){
		var attribute = this.findElementAttribute(_elementName , _attributeName);
		if(attribute == null) throw "Exception:The element[" + _elementName + "] do NOT have this attribute[" + _attributeName + "]!";
		
		var r = "";
		var doc = _findDocumentationOfAttribute(attribute);
		if(doc != null){
			r = doc.firstChild.nodeValue;
		}
		return r;
	}

	//Find element's childrens
	//@ elementName		- the element object
	//return			- if find it return this element's childrens otherwise return empty Array object	
	this.findElementChildrens = function(_elementName){

		var element = this.findElementByName(_elementName);
		if(element == null) throwException("Excepton:The element[" + _elementName + "] is not exist!!");	
		
		var r = new Array();
		var sNode = _findSequenceNodeOfElement(element);		
		if(sNode != null){
			var childs = sNode.childNodes;
			for(var i=0;i<childs.length;i++){
				var child = childs[i];
				if(child.nodeType != 3 && child.nodeName == (standNS + "element")){
					r.push(child);
				}
			}

			//<xsd:choice>
			var choice = _getFirstNodeOfElement(sNode , "choice");
			if(choice != null){
				var childs = choice.childNodes;
				for(var i=0;i<childs.length;i++){
					var child = childs[i];
					if(child.nodeType != 3 && child.nodeName == (standNS + "element")){
						r.push(child);
					}
				}
			}
		}
		return r;
	}

	this.findElementAttributes = function(_elementName){
		var element = this.findElementByName(_elementName);
		if(element == null) throwException("Excepton:The element[" + _elementName + "] is not exist!!");	

		var r = new Array();
		var complexType = _getFirstNodeOfElement(element , "complexType");
		if(complexType != null){
			var simpleContent = _getFirstNodeOfElement(complexType , "simpleContent");
			if(simpleContent == null){
				var attrs1 = complexType.childNodes;
				//situation 1: 
				//<xsd:complexType>
				//		<xsd:attribute/>
				//</xsd:complexType>
				for(var i=0;i<attrs1.length;i++){
					if(attrs1[i].nodeType != 3 && attrs1[i].nodeName == (standNS + "attribute")){
						r.push(attrs1[i]);
					}
				}
			}else{
				//situation 2:
				//<xsd:complexType>
				//	<xsd:simpleContent>
				//		<xsd:extension base="xsd:string">
				//			<xsd:attribute/>
				//		</xsd:extension base="xsd:string">
				//	</xsd:simpleContent>
				//</xsd:complexType>
				var extension = _getFirstNodeOfElement(simpleContent , "extension");
				var attrs2 = extension.childNodes;
				for(var i=0;i<attrs2.length;i++){
					if(attrs2[i].nodeType != 3 && attrs2[i].nodeName == (standNS + "attribute")){
						r.push(attrs2[i]);
					}
				}
			}
		}
		return r;
	}

	this.findElementAttribute = function(_elementName , _attributeName){
		var r = null;
		var attributeNodes = this.findElementAttributes(_elementName);
		for(var i=0;i<attributeNodes.length;i++){
			var attr = attributeNodes[i];
			if(_attributeName == attr.getAttribute("name")){
				return attributeNodes[i];
			}
		}
		return r;
	}

	
	this.findSimpleType = function(_sName){

		//find root element<xsd:schema>
		var root = null;
		if(Browser.isIe()){
			root = this.sXmlDoc.getElementsByTagName(standNS + "schema");
		}else{
			root = this.sXmlDoc.getElementsByTagName("schema");
		}
		
		//find <xsd:simpleType>
		var name = _getElementName(_sName);			
		var childs = root[0].childNodes;
		for(var i=0;i<childs.length;i++){
			if(childs[i].nodeType != 3 && childs[i].nodeName == (standNS + "simpleType")){
				if(childs[i].getAttribute("name") == _sName){
						return childs[i];
				}
			}
		}
		return null;
	}
	
	this.findElementStructRule = function(_elementName){
		var element = this.findElementByName(_elementName);
		if(element == null) throwException("Excepton:The element[" + _elementName + "] is not exist!!");	
		
		/*
		var choice = _findChoiceNodeOfElement(element);
		if(choice != null) {
			var min = choice.getAttribute(_SCHEMA_ELEMENT_MINOCCURS);
			var max = choice.getAttribute(_SCHEMA_ELEMENT_MAXOCCURS);

			if(min == null || min == _UNDEFINED) min = 1;
			if(max == null || max == _UNDEFINED) max = 1;
			
			return new ChoiceOccursRule(null , null , min ,max);
		}else{
			var min = element.getAttribute(_SCHEMA_ELEMENT_MINOCCURS);
			var max = element.getAttribute(_SCHEMA_ELEMENT_MAXOCCURS);

			if(min == null || min == _UNDEFINED) min = 1;
			if(max == null || max == _UNDEFINED) max = 1;
			return new OccursRule(null , null , min ,max);
		}
		*/
		return this.ruleFactory.getElementStructRule(element);
	}

	this.findElementContentRule = function(_elementName){
		var element = this.findElementByName(_elementName);
		if(element == null) throwException("Excepton:The element[" + _elementName + "] is not exist!!");

		var rule = new DefaultRule("" , "");
		//situation 0:
		//<xsd: element type=""/>
		var type = element.getAttribute("type");
		var dValue = element.getAttribute("default");
		if(type != null){
			return this.ruleFactory.getRuleByType(type , null , dValue);
		}

		//situation 1:
		//<xsd:element>
		//	<xsd:simpleType>
		//		<xsd:restriction base="xsd:string">
		//			<xsd:enumeration value="TCP"/>
		//		</xsd:restriction base="xsd:string">
		//	</xsd:simpleType>
		//<xsd:element>
		var simpleType = _getFirstNodeOfElement(element , "simpleType");
		if(simpleType != null){
			return this.ruleFactory.getRuleBySimpleType(simpleType , null , dValue);
		}
		
		//situation 2:
		//<xsd:complexType>
        //	<xsd:simpleContent>
        //        <xsd:extension base="xsd:anyURI"/>
		//	</xsd:simpleContent>
		//</xsd:complexType>
		var complex = _getFirstNodeOfElement(element , "complexType");
		if(complex != null){
			var simple = _getFirstNodeOfElement(complex , "simpleContent");
			if(simple != null){
				var extens = _getFirstNodeOfElement(simple , "extension");
				if(extens != null){
					var base = extens.getAttribute("base");
					return this.ruleFactory.getRuleByType(base , null , dValue);
				}
			}
		}
		return rule;
	}


	this.findElementAttributeRule = function(_elementName , _attributeName){
		var attribute = this.findElementAttribute(_elementName , _attributeName);
		if(attribute == null) throw "Exception:The element[" + _elementName + "] do NOT have this attribute[" + _attributeName + "]!";
		
		var type = attribute.getAttribute("type");
		var use = attribute.getAttribute("use");
		var dvalue = attribute.getAttribute("default");
		
		var simpleType = null;
		//alert("findElementAttributeRule:type=" + type + "|type.indexOf(" + standNS + ")=" + type.indexOf(standNS));
		if(type != null){
			var ns1 = _getNS(type);
			if(ns1 == this.standNS){
				return this.ruleFactory.getRuleByType(type , use , dvalue);
			}else{
				if(ns1 == this.nameSpace){
					//find this type node in it's own file!
					//ref! search again!
					var attrName = _getAttributeName(type);
					simpleType = this.findSimpleType(attrName);				
				}
			}
		}else{
			//
			simpleType = _getFirstNodeOfElement(attribute , "simpleType");
		}

		//situation 1:
		//<xsd:simpleType name="proportionType">
		//	<xsd:restriction base="xsd:string">
		return this.ruleFactory.getRuleBySimpleType(simpleType , use , dvalue);
	}


	this.findElementChildrenStructRule = function(_elementName , _childName){

		var element = this.findElementByName(_elementName);
		if(element == null) throwException("Excepton:The element[" + _elementName + "] is not exist!!");	
		
		var sNode = _findSequenceNodeOfElement(element);
		if(sNode == null) throwExcpetion("Exception:The element[" + _elementName + "] has no childrens!");
		
		var rule = new DefaultRule("" , "");
		var childs = null;
		if(Browser.isIe()){
			childs = sNode.getElementsByTagName(standNS + "element");
		}else{
			childs = sNode.getElementsByTagName("element");
		}

		for(var i=0;i<childs.length;i++){
			var child = childs[i];
			var ref = child.getAttribute("ref");
			if(ref != null){
				var childName = _getElementName(ref);
				if(childName == _childName){
					return  this.ruleFactory.getElementStructRule(child);
				}
			}else{
				var name = child.getAttribute("name");
				if(name == _childName){
					return  this.ruleFactory.getElementStructRule(child);				
				}
			}
		}
		
		return rule;
	}
	
	//TODO:
	this.findElementChildrenContentRule = function(_elementName , _childName){
	
	}

	//Private functions
	//*********************************************************************


	//Find the documentation of element
	//U should ensure that the <Documentation> element be defined at first!
	//@ element
	//@ return the <Documentation> element
	_findDocumentationOfElement = function(_element){
		var r = null;
		var anno = _getFirstNodeOfElement(_element , "annotation");
		if(anno != null) r = _getFirstNodeOfElement(anno , "documentation");
		return r;
	}

	_findDocumentationOfAttribute = function(_attribute){
		var r = null;
		var anno = _getFirstNodeOfElement(_attribute , "annotation");
		if(anno != null) r = _getFirstNodeOfElement(anno , "documentation");
		return r;
	}
	
	_findSequenceNodeOfElement = function(_element){
		
		//In firefox browser , the blank is considered a node which name is "#text";
		//So we should eliminate this text nodes.
		var r = null;
		var ctn = _getFirstNodeOfElement(_element , "complexType");
		if(ctn != null) r =  _getFirstNodeOfElement(ctn , "sequence");
		return r;
	}
	_findChoiceNodeOfElement = function(_element){
		var r = null;
		var seq = _findSequenceNodeOfElement(_element);
		if(seq != null) r = _getFirstNodeOfElement(seq , "choice");
		return r
	}
	_getFirstNodeOfElement = function(_element , _nodeName){
		var r = null;
		var nodes = _element.childNodes;
		for(var i=0;i<nodes.length;i++){
			if(nodes[i].nodeType != 3 && nodes[i].nodeName == (standNS + _nodeName)){
				return nodes[i];
			}
		}
		return r;
	}
	
	_getAttributeName = function(_attrRefName){
		return _getRealNameOfRef(_attrRefName);
	}

	_getElementName = function(_elementRefName){
		return _getRealNameOfRef(_elementRefName);
	}
	_getRealNameOfRef = function(_refName){
		var r = "";
		var index = _refName.indexOf(":");
		if(index != -1){
			r  = _refName.substring(index + 1);
		}
		return r;
	}
	_getNS = function(_refName){
		var r = "";
		var index = _refName.indexOf(":");
		if(index != -1){
			r  = _refName.substring(0 , index);
		}
		return r;
	}

	//TODO:
	_findChildrenContentRule = function(_child){




	}
}


//*******************************************************************************
//DefaultDomTreeReader
//*******************************************************************************
function DomUtil(){

	this.getDomObject = function(_isLocal , _xmlFile){
		if(_isLocal){
			return _getLocalDomObject(_xmlFile);
		}else{
			return _getRemoteDomObject(_xmlFile);
		}
	}

	this.postXmlObject = function(_url , _xml){
		return _postXml(_url , _xml);
	}

	//Private methods
	//***************************************************************************
	_getRemoteDomObject = function(_xmlFile){
		var xmlHttp = XmlHttp.create();
		xmlHttp.open("GET", _xmlFile, false);
    	xmlHttp.send(null);	
		return xmlHttp.responseXML;
	}
	
	_getLocalDomObject = function(_xmlFile){
		var xmlDoc = XmlDocument.create();
		xmlDoc.async = false;
		xmlDoc.load(_xmlFile);
		return xmlDoc;
	}

	_postXml = function(_url , _xml){
       	var xmlHttp = XmlHttp.create();
        xmlHttp.open("POST" , _url , false);
        xmlHttp.setRequestHeader("context-type","text/xml;charset=utf-8");
        xmlHttp.send(_xml);
        return xmlHttp;
	}
}

function LinkListDomTreeContext(_isLocal){
	//Public propertys
	//***************************************************************************
	this.parse = null;
	this.dom = null;
	this.isLocal = _isLocal;

	var domUtil = new DomUtil();
	//Public methods
	//***************************************************************************
	this.initilize = function(_xmlFile , _schemaFile , _nameSpace , _standNS){
		
		//Of cource, Now, you can use the parse & dom to lay out your page!!
		//But the base way is to use the decorated dom object! It not only contains
		//the avaliable attributes, but also contains the rules of element & attributes too.
		this.dom = domUtil.getDomObject(this.isLocal , _xmlFile);
		var sXmlDoc = domUtil.getDomObject(this.isLocal , _schemaFile);

		var parse = new MultiNSSchemaParse(sXmlDoc ,_nameSpace , _standNS);
		parse.ruleFactory = new RuleFactory(_standNS);
		this.parse = parse;
	}
	
	this.addRefParse = function(_schemaFile , _nameSpace , _standNS){
		var sXmlDoc = domUtil.getDomObject(this.isLocal , _schemaFile);

		var ref = new MultiNSSchemaParse(sXmlDoc , _nameSpace , _standNS);
		ref.ruleFactory = this.parse.ruleFactory;
		this.parse.refParse = ref;
	}
	
	/* these method has be removed into DomUtil class
	this.getDomObject = function(_xmlFile){
		if(this.isLocal){
			return _getLocalDomObject(_xmlFile);
		}else{
			return _getRemoteDomObject(_xmlFile);
		}
	}

	//Private methods
	//***************************************************************************
	_getRemoteDomObject = function(_xmlFile){
		var xmlHttp = XmlHttp.create();
		xmlHttp.open("GET", _xmlFile, false);
    	xmlHttp.send(null);	
		return xmlHttp.responseXML;
	}
	
	_getLocalDomObject = function(_xmlFile){
		var xmlDoc = XmlDocument.create();
		xmlDoc.async = false;
		xmlDoc.load(_xmlFile);
		return xmlDoc;
	}
	*/
}
function DefaultDomTreeContext(_isLocal){
	//Public propertys
	//***************************************************************************
	this.parse = null;
	this.dom = null;
	this.isLocal = _isLocal;

	var domUtil = new DomUtil();
	//Public methods
	//***************************************************************************
	this.initilize = function(_xmlFile , _schemaFile , _nameSpace , _standNS){
		
		//Of cource, Now, you can use the parse & dom to lay out your page!!
		//But the base way is to use the decorated dom object! It not only contains
		//the avaliable attributes, but also contains the rules of element & attributes too.
		this.dom = domUtil.getDomObject(this.isLocal , _xmlFile);
		var sXmlDoc = domUtil.getDomObject(this.isLocal , _schemaFile);

		var parse = new SingleNSSchemaParse(sXmlDoc ,_nameSpace , _standNS);
		parse.ruleFactory = new RuleFactory(_standNS);
		this.parse = parse;
	}
	
	/* these method has be removed into DomUtil class
	this.getDomObject = function(_xmlFile){
		if(this.isLocal){
			return _getLocalDomObject(_xmlFile);
		}else{
			return _getRemoteDomObject(_xmlFile);
		}
	}

	//Private methods
	//***************************************************************************
	_getRemoteDomObject = function(_xmlFile){
		var xmlHttp = XmlHttp.create();
		xmlHttp.open("GET", _xmlFile, false);
    	xmlHttp.send(null);	
		return xmlHttp.responseXML;
	}
	
	_getLocalDomObject = function(_xmlFile){
		var xmlDoc = XmlDocument.create();
		xmlDoc.async = false;
		xmlDoc.load(_xmlFile);
		return xmlDoc;
	}
	*/
}//*******************************************************************************
//interfaces
//*******************************************************************************
function IDomTree(_reader){

	this.init = function(_rootName){}

	this.getRoot = function(){}
	this.getElement = function(_id){}

	this.hasChildrens = function(_id){}
	this.getChildrens = function(_id){}

	this.enableAdd = function(_fid , _eName){}
	this.addElement = function(_fid , _eName){}

	this.enableRemove = function(_id){}
	this.removeElement = function(_id){}
	
	this.modifyAttribute = function(_id ,_attrName , _value){}
	this.addNewAttribute = function(_id , _attr){}
	this.removeAttribute = function(_id , _attrName){}
	
	this.getAllAvailAttributes = function(_eName){}
	this.getAllAvailChildrens = function(_eName){}

	this.toXml = function(){};
}

//*******************************************************************************
//DefaultDomTree
//*******************************************************************************
function DefaultDomTree(_reader){

	this.reader = _reader;

	//Private propertys
	//***************************************************************************
	var elements = new ActiveRecord(); 
	//var layers = new Map(); //Todo:this feature will be implemented 

	var reader = this.reader;
	var parse = this.reader.parse;
	var dom = this.reader.dom;
	
	//Construction
	//***************************************************************************
	this.init = function(_rootName){
		
		var root = null;
		if(Browser.isIe()){
			root = dom.getElementsByTagName(_rootName)[0];
		}else{
			var name = _getElementName(_rootName);
			root = dom.getElementsByTagName(name)[0];
		}

		//var ns = _getNS(_rootName);
		//var name = _getElementName(_rootName);
		var dt_r  = new DomTreeElement(_rootName);

		//add element's rule & attributes!
		dt_r.setRule(parse.findElementStructRule(_rootName));
		dt_r.setContentRule(parse.findElementContentRule(_rootName));
		//dt_r.setAttributes(_findAllAttributes(root , dt_r));

		//add attributes which be defined in the xml file
		var alength = dt_r.attributes.length;
		var xattrs = root.attributes;
		for(var i=0;i<xattrs.length;i++){
			var attr = new DomTreeAttribute(alength + i + 1 , xattrs[i].name , xattrs[i].value);
			attr.display = false;
			dt_r.addAttribute(attr);
			attr.setElement(dt_r);
		}
		dt_r.setLayer(0);
		dt_r.setDocument(parse.findElementDocumentation(_rootName));

		//save element & layer
		elements.save(dt_r);

		//add it's childrens
		_addChildrens(root , dt_r , 1);
		
	}

	//Public methods
	//***************************************************************************
	this.getElements = function(){
		return elements;
	}
	this.getLayers = function(){
		return layers;
	}
	this.getRoot = function(){
		return elements.load(0);
	}
	this.getElement = function(_id){
		return elements.load(_id);
	}
	this.getReader = function(){
		return reader;
	}
	
	this.hasChildrens = function(_id){
		var r = false;
		var childrens = this.getChildrens(_id);
		if(childrens.length >0 ){
			r = true;
		}
		return r;
	}

	this.getChildrens = function(_id){
		var element = elements.load(_id);
		return element.getChildrens();
	}
	
	this.enableAdd = function(_fid , _eName){
		
		var r = true;
		var f = elements.load(_fid);
		if(f == null) throw "Can not find the element which id=" + _fid + "!!";

		//estamite these operation by element's rule
		var rule = parse.findElementChildrenStructRule(f.name , _eName);
		if(rule == null) throw "This rule of the element is NOT exist!!";
		
		var es = _findElementsByName(f , _eName);
		r = rule.validate("add" , es.length);

		return rule.message;
	}

	this.addElement = function(_fid , _eName){

		var f = elements.load(_fid);

		//add element
		var e = _createNewElement(parse , _eName);
		e.setLayer(f.layer + 1);
		
		f.addChildren(e);
		e.setFather(f);

		return elements.save(e);
	}

	this.enableRemove = function(_id){
		var r = true;

		var e = elements.load(_id);
		if(e == null) throw "Can not find the element which id=" + _id + "!!";

		//estamite these operation by element's rule
		var rule = e.getRule();
		if(rule == null) throw "This rule of the element is NOT exist!!";
		//alert("e.name=" + e.name + "|rule.name=" + rule.name);
		
		var father = e.father;
		var es = _findElementsByName(father , e.getName());
		r = rule.validate("remove" , es.length);

		return rule.message;
	}

	this.removeElement = function(_id){

		var e = elements.load(_id);
		if(e == null) throw "Can not find the element which id=" + _id + "!!";
		
		_removeDomTreeElement(e);
	}

	
	this.modifyAttribute = function(_id ,_attrName , _value){}
	this.addNewAttribute = function(_id , _attr){}
	this.removeAttribute = function(_id , _attrName){}
		
	this.getAllAvailAttributes = function(_eName){
		var attrs = parse.findElementAttributes(_eName);
		
		var r = new Array();
		//add attributes which be defined in the schema file
		for(var i=0;i<attrs.length;i++){
			var _a = attrs[i];
			var _name = _a.getAttribute("name");
			
			var dt_attr = new DomTreeAttribute(i ,_name , "");
			//attache rule with the attribute
			dt_attr.rule = parse.findElementAttributeRule(_eName , _name);
			r.push(dt_attr);
		}
		return r;
	}

	this.getAllAvailChildrens = function(_eName){
		var cs = parse.findElementChildrens(_eName);
		var r = new Array();
		for(var i=0;i<cs.length;i++){
			var c = cs[i];
			var name = c.getAttribute("name");
			if(name == null) name = c.getAttribute("ref");

			var dt_c = new DomTreeElement(name);
			r.push(dt_c);
		}
		return r;
	}
	this.toHtml = function(){
		var root = elements.load(0);
		return _toHtml(root , 1);
	}

	this.toXml = function(){
		var root = elements.load(0);
		return _toXml(root);
	}

	//private methods
	//*****************************************************************
	_toXml = function(_element){
		
		var s = "<" + _element.name;

		// printe element's attribute
		for(var i=0;i<_element.attributes.length;i++){
			var attr = _element.attributes[i];
			s = s + " " + attr.name + "=\"" + attr.value + "\" ";
		}

		// print element's childrens
		if(_element.hasChildrens()){
			if(_element.value != ""){
				s = s + ">" + _element.value;
			}else{
				s = s + ">";
			}

			//add childrens;
			for(var i=0;i<_element.childrens.length;i++){
				var child = _element.childrens[i];
				s = s + _toXml(child);
			}

			s = s + "</" + _element.name + ">";
		}else{
			//add element's value
			if(_element.value != ""){
				s = s + ">" + _element.value + "<" + "/" + _element.name + ">";
			}else{
				s = s + "/>";
			}
		}
		return s;
	}
	_toHtml = function(_element , _layer){
		
		var s = "";
		for(var i=0;i<_layer;i++){
			s = s + "&nbsp;&nbsp;&nbsp;&nbsp;";
		}
		s = s + "&lt;" + _element.name;

		// printe element's attribute
		for(var i=0;i<_element.attributes.length;i++){
			var attr = _element.attributes[i];
			s = s + " " + attr.name + "=\"" + attr.value + "\" ";
		}

		// print element's childrens
		if(_element.hasChildrens()){
			if(_element.value != ""){
				s = s + "&gt;" + _element.value + "&lt;" + "<br>";
			}else{
				s = s + "&gt;" + "<br>";
			}

			//add childrens;
			for(var i=0;i<_element.childrens.length;i++){
				var child = _element.childrens[i];
				s = s + _toHtml(child , _layer + 1) + "<br>";
			}

			for(var i=0;i<_layer;i++){
				s = s + "&nbsp;&nbsp;&nbsp;&nbsp;";
			}
			s = s + "&lt;" + "/" + _element.name + "&gt;";
		}else{
			//add element's value
			if(_element.value != ""){
				s = s + "&gt;" + _element.value + "&lt;" + "/" + _element.name + "&gt;";
			}else{
				s = s + "/" + "&gt;";
			}
		}
		return s;
	}

	_addChildrens = function(_element , _dt_e , _layerId){
		var childrens = _element.childNodes;
		for(var i=0 ; i < childrens.length ; i++){
			var child = childrens[i];
			var dt_c = new DomTreeElement(child.nodeName);
			
			//8=#comment | 3=#text
			if(child.nodeType != 8){
				if(child.nodeType != 3){

					//set element's rule
					var srule = parse.findElementChildrenStructRule(_element.nodeName , child.nodeName);
					var crule = parse.findElementChildrenContentRule(_element.nodeName , child.nodeName);
					
					dt_c.setRule(srule);
					dt_c.setContentRule(crule);
					
					//set element's attribute
					dt_c.setAttributes(_findAllAttributes(child , dt_c));

					//set element's layer
					dt_c.setLayer(_layerId);

					//set element's document
					dt_c.setDocument(parse.findElementDocumentation(child.nodeName));
					
					//examine whether element is a leaf of the tree.
					var cs = parse.findElementChildrens(child.nodeName);
					if(cs.length == 0 && dt_c.attributes.length == 0 ) dt_c.isLeaf = true;
					
					//set element's relationship
					_dt_e.addChildren(dt_c);
					dt_c.setFather(_dt_e);

					//save element
					elements.save(dt_c);
					
					//continute add childrens;
					_addChildrens(child , dt_c , _layerId + 1);
				}else{
					if(_dt_e.value == ""){
						var data = _data_of(child);
						_dt_e.value=data;
					}
				}
			}
		}
	}

	_data_of = function( txt ){
		var data = txt.data;
		// Use ECMA-262 Edition 3 String and RegExp features
		data = data.replace(/[\t\n\r ]+/g, " ");
		if (data.charAt(0) == " ")
		data = data.substring(1, data.length);
		if (data.charAt(data.length - 1) == " ")
		data = data.substring(0, data.length - 1);
		return data;
	}

	_removeDomTreeElement = function(_dt_e){
		var childrens = _dt_e.getChildrens();
		while(childrens.length > 0 ){
			_removeDomTreeElement(childrens[0]);
		}

		//remove element
		var f = _dt_e.father;
		f.removeChildren(_dt_e);

		elements.remove(_dt_e.id);
	}

	_findElementsByName = function(_f , _eName){ 
		var childrens = _f.getChildrens();
		var r = new Array();
		for(var i=0;i<childrens.length;i++){
			var c = childrens[i];
			if(c.getName() == _eName) r.push(c);
		}
		//alert("result=" + r.length);
		return r;
	}
	_createNewElement = function(_parse, _eName){
		
		//var t = _dom.createElement(_elementName);
		//When u execute "createElement" method , IE browse will attach a "xmlns" attribute
		//with these element! Furthermore , u can not delete the attribute "xmlns"?! fuck!
		//t.removeAttribute("xmlns"); 
		
		//new element
		var e = new DomTreeElement(_eName);
		var rule = _parse.findElementStructRule(_eName);
		var crule = _parse.findElementContentRule(_eName);
		e.setRule(rule);
		e.setContentRule(crule);

		//configura element's attributes
		var attrs = _parse.findElementAttributes(_eName);
		for(var i=0;i<attrs.length;i++){
			var name = attrs[i].getAttribute("name");
			var a = new DomTreeAttribute( i , name , "");

			//attache rule with the attribute
			a.rule = _parse.findElementAttributeRule(_eName , name);
			a.setElement(e);
			e.addAttribute(a);
		}
		return e;
	}


	_findAllAttributes = function(_element , _dt_e){		
		var r = new Array();

		//add attributes which be defined in the schema file
		var aval_attrs = parse.findElementAttributes(_element.nodeName);
		//alert(aval_attrs.length);
		for(var i=0;i<aval_attrs.length;i++){
			var name = aval_attrs[i].getAttribute("name");

			var attr = new DomTreeAttribute(i ,name , "");
			var fa = _findElementAttribute(_element , name);

			if(fa != null){
				attr.value = fa.value;
				attr.setState("old");
			}
			attr.setElement(_dt_e);
			attr.display = true;

			//attache rule with the attribute
			attr.rule = parse.findElementAttributeRule(_element.nodeName , name);
			attr.setDocument(parse.findElementAttributeDocumentation(_element.nodeName , name));
			r.push(attr);
		}
		return r;
	}

	_findElementAttribute = function(_element , _attrName){
		var r = null;
		for(var i=0;i<_element.attributes.length;i++){
			var attr = _element.attributes[i];
			if(attr.name == _attrName){
				r = attr;
				break;
			}
		}
		return r;
	}

	_getAttributeName = function(_attrRefName){
		return _getRealNameOfRef(_attrRefName);
	}

	_getElementName = function(_elementRefName){
		return _getRealNameOfRef(_elementRefName);
	}
	_getNS = function(_refName){
		var r = "";
		var index = _refName.indexOf(":");
		if(index != -1){
			r  = _refName.substring(0 , index);
		}
		return r;
	}
	_getRealNameOfRef = function(_refName){
		var r = "";
		var index = _refName.indexOf(":");
		if(index != -1){
			r  = _refName.substring(index + 1);
		}else{
			r = _refName;
		}
		return r;
	}
}

