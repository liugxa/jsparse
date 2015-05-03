//*******************************************************************************
// Copyright
//*******************************************************************************



var checkbrowser = new CheckBrowser();
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
var _SCHEMA_XSD			 = checkbrowser.ie?_SCHEMA_NS:"";
//alert(_SCHEMA_XSD);

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
var _HTML_ELEMENT_TR = "tr";
var _HTML_ELEMENT_TD = "td";
var _HTML_ELEMENT_INPUT = "input";
var _HTML_ELEMENT_IMG = "img";

var _HTML_ELEMENT_IMG_CLOSE_SRC = "images/icon-close.gif";
var _HTML_ELEMENT_IMG_OPEN_SRC = "images/icon-open.gif";
var _HTML_ELEMENT_IMG_HELP_SRC = "images/icon-hel.gif";

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
	this.value = "";

	//Private propertys
	//***************************************************************************
	this.father = null;
	this.childrens = new Array();

	this.attributes = new Array();
	this.rule = new DefaultRule();

	this.layer = -1;
	this.state = "old"; // "new"|"old"

	this.doc = "";
	this.ns = ""; //ns meaning "nams space"

	//Public methods
	//***************************************************************************
	this.setDocument = function(_doc){
		this.doc = _doc;
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
			" , " + fn + " , " + this.childrens.length + 
			" , " + this.attributes.length +
			" , " + this.rule.name + " , " + this.value + ")";
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


	//Private propertys
	//***************************************************************************
	this.state = "new";// new element or old one
	this.element = null;
	this.rule = new DefaultRule();

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
		return "(id:" + this.id + ",name:" + this.name + ",value:" + this.value 
			+ ",state:" + this.state + ",element:" + this.element 
			+ ",rule:" + this.rule + ")";
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



function createXMLDoc(){
	var doc = null;
	if (document.implementation && document.implementation.createDocument){
		doc = document.implementation.createDocument("", "", null);
		//xmlDoc.onload = createTable;
	}
	else if (window.ActiveXObject){
		doc = new ActiveXObject("Microsoft.XMLDOM");
		//xmlDoc.onreadystatechange = function () {
		//	if (xmlDoc.readyState == 4) createTable()
		//};
 	}
	else{
		if(_DEBUG) alert('Your browser can\'t handle this script');
	}
	return doc;
}

//@disuse be replaced by createHtmlElement
function HtmlElement(_s){
	return document.createElement(_s);
}

function createHtmlElement(_s){
	return document.createElement(_s);
}
//@disuse be replaced by createHtmlTextElement
function HtmlTextElement(_s){
	return document.createTextNode(_s);
}

function createHtmlTextElement(_s){
	return document.createTextNode(_s);
}

//below methods be often used in text case;
//*******************************************************************************
function Assert(_fName){

	this.fName = _fName;
	this.assertNotNull = function(_name , _object){

		if(_object == null){
			alert("Test " + this.fName + " failure! because the [" + _name + "] is null!");
		}
	}

	
	this.assertTrue = function(_condition){
		if(_condition){
			_alertSuccess(this.fName);
		}else{
			_alertFailure(this.fName);
		}
	}

	this.assertFailure = function(_condition){

	}

}


function _alertRetest(methodName){
	alert("You must retest the " + methodName + " method first!");
}

function _alertSuccess(methodName , message){
	if(message == undefined) message = "";
	alert("Test " + methodName + " result: success! " + message);
}

function _alertFailure(methodName , message){
	if(message == undefined) message = "";
	alert("Test " + methodName  + " result: failure! " + message);
}

function _alertException(methodName , e){
	if (e instanceof Error) {
		throw e;
		//alert("Test " + methodName + " result: failure! catch system excpetion:" + e.message);
	}else{
		alert("Test " + methodName + " result: failure! catch business excpetion:" + e);
	}
}
function assert(){
	alert("here?!");
}

//Others
//*******************************************************************************
function alertException(e){
	if (e instanceof Error) {
		throw e;
		//alert("Catch system excpetion:" + e.message);
	}else{
		alert("Catch business excpetion:" + e);
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


function printAttributes(_arrays){
	var s = "";
	for(var i=0;i<_arrays.length;i++){
		s = s + "[" + _arrays[i].name + "/" + _arrays[i].value + "] | ";
	}
	return s;
}


//*******************************************************************************
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

function DefaultDomTree(_reader){

	this.reader = _reader;

	//Private propertys
	//***************************************************************************
	var elements = new ActiveRecord(); 
	//var layers = new Map(); //Todo:this feature will be implemented 
	
	var parse = this.reader.parse;
	var dom = this.reader.dom;

	//Construction
	//***************************************************************************
	this.init = function(_rootName){

		var root = dom.getElementsByTagName(_rootName)[0];
		var dt_r  = new DomTreeElement(_rootName);

		//add element's rule & attributes!
		dt_r.setRule(parse.findElementStructRule(_rootName));
		dt_r.setAttributes(_findAllAttributes(root , dt_r));
		dt_r.setLayer(0);

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
		var rule = parse.findElementStructRule(_eName);
		if(rule == null) throw "This rule of the element is NOT exist!!";
		
		var es = _findElementsByName(f , _eName);
		//alert("find element[" + _eName + "] rule[ " + rule.name  + "](add," + es.length + ")");
		r = rule.validate("add" , es.length);

		return r;
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
		//alert("rule:" + rule.name + "(remove , " + es.length + ") execute!");
		r = rule.validate("remove" , es.length);

		return r;
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
		var parse = reader.getParse();
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
		var parse = reader.getParse();
		var cs = parse.findElementChildrens(_eName);
		var r = new Array();
		for(var i=0;i<cs.length;i++){
			var c = cs[i];
			var name = c.getAttribute("name");

			var dt_c = new DomTreeElement(name);
			r.push(dt_c);
		}
		return r;
	}
	
	this.toXml = function(){
		//todo
		return this.getElements();
	}

	//private methods
	//*****************************************************************
	_addChildrens = function(_element , _dt_e , _layerId){
		
		var childrens = _element.childNodes;
		for(var i=0 ; i < childrens.length ; i++){
			var child = childrens[i];
			var dt_c = new DomTreeElement(child.nodeName);
			
			if(child.nodeType != 3){
				
				//add element's rule & attributes!
				dt_c.setRule(parse.findElementStructRule(child.nodeName));
				dt_c.setAttributes(_findAllAttributes(child , dt_c));
				dt_c.setLayer(_layerId);

				_dt_e.addChildren(dt_c);
				dt_c.setFather(_dt_e);

				//save element
				elements.save(dt_c);
				
				//continute add childrens;
				_addChildrens(child , dt_c , _layerId + 1);
			}else{
				dt_c.setValue(child.nodeValue);
			}
		}
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
		e.setRule(rule);

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
			
			//attache rule with the attribute
			attr.rule = parse.findElementAttributeRule(_element.nodeName , name);
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
}



function MultiNSDomTree(_reader){

	this.reader = _reader;

	//Private propertys
	//***************************************************************************
	var elements = new ActiveRecord(); 
	//var layers = new Map(); //Todo:this feature will be implemented 
	
	var parse = this.reader.parse;
	var dom = this.reader.dom;

	//Construction
	//***************************************************************************
	this.init = function(_rootName){

		var root = dom.getElementsByTagName(_rootName)[0];		
		var dt_r  = new DomTreeElement(_rootName);

		//add element's rule & attributes!
		dt_r.setRule(parse.findElementStructRule(_rootName));
		dt_r.setAttributes(_findAllAttributes(root , dt_r));
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
		var rule = parse.findElementStructRule(_eName);
		if(rule == null) throw "This rule of the element is NOT exist!!";
		
		var es = _findElementsByName(f , _eName);
		//alert("find element[" + _eName + "] rule[ " + rule.name  + "](add," + es.length + ")");
		r = rule.validate("add" , es.length);

		return r;
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
		//alert("rule:" + rule.name + "(remove , " + es.length + ") execute!");
		r = rule.validate("remove" , es.length);

		return r;
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
		var parse = reader.getParse();
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
		var parse = reader.getParse();
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
	
	this.toXml = function(){
		//todo
		return this.getElements();
	}

	//private methods
	//*****************************************************************
	_addChildrens = function(_element , _dt_e , _layerId){
		
		var childrens = _element.childNodes;
		for(var i=0 ; i < childrens.length ; i++){
			var child = childrens[i];
			var dt_c = new DomTreeElement(child.nodeName);

			if(child.nodeType != 3){
				//add element's rule & attributes!
				//alert("find " + child.nodeName + " attributes!");
				//dt_c.setRule(parse.findChildrenStructRule(child));
				dt_c.setAttributes(_findAllAttributes(child , dt_c));
				dt_c.setLayer(_layerId);
				dt_c.setDocument(parse.findElementDocumentation(child.nodeName));

				_dt_e.addChildren(dt_c);
				dt_c.setFather(_dt_e);

				//save element
				elements.save(dt_c);
				
				//continute add childrens;
				_addChildrens(child , dt_c , _layerId + 1);
			}else{
				//alert("set " + _dt_e.id + "'s value=" + child.nodeValue);
				_dt_e.setValue(child.nodeValue);
			}
		}
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
		e.setRule(rule);

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
			
			//attache rule with the attribute
			//attr.rule = parse.findElementAttributeRule(_element.nodeName , name);
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
	this.findElementDocumentation = function(_elementName){}
	this.findElementChildrens = function(_elementName){}
	this.findElementAttribute  = function(_elementName , _attributeName){}
	this.findElementAttributes = function(_elementName){}
	

	//find element & attribute's rule
	this.findElementStructRule = function(_elementName){}
	this.findElementContentRule = function(_elementName){}
	
	//find attribute and rule of the element's children 
	this.findChildrenAttribute = function(_child , _attributeName){}
	this.findChildrenAttributes = function(_child){}
	this.findChildrenStructRule = function(_child){}
	this.findChildrenContentRule = function(_child){}

	this.findElementChildrenStructRule = function(_elementName , _childName){}
	this.findElementAttributeRule = function(_elementName , _attributeName){}
	
	//others
	this.findElementDocumentation = function(_elementName){}
}

//*******************************************************************************
// MultiNameSpaceSchemaParse implements the ISchemaParse interface.
// It solve the multi-namespace and reciprocal reference problem
//*******************************************************************************
function MultiNSSchemaParse(_sXmlDoc , _nameSpace , _standNS , _ref){

	//Public property
	//*********************************************************************
	this.sXmlDoc = _sXmlDoc;
	this.nameSpace = _nameSpace;
	this.standNS  = _standNS;
	this.refParse = _ref;

	//Private property
	//*********************************************************************
	var nameSpace = this.nameSpace + ":";
	var standNS = this.standNS + ":";

	//Public functions
	//*********************************************************************
	this.findRootElement = function(){
		var r = null;
		var schemaNodes = this.sXmlDoc.getElementsByTagName(standNS + "schema");
		if(schemaNodes.length >0){
			var index = 0;
			var n = 0;
			var childs = schemaNodes[0].childNodes;
			for(var i=0;i<childs.length;i++){
				if(childs[i].nodeName == (standNS + "element")){
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
		var ns = _getNS(_elementName);
		if(ns == this.nameSpace){
			var eName = _getElementName(_elementName);
			var elements = this.sXmlDoc.getElementsByTagName(standNS + _SCHEMA_ELEMENT);
			
			//alert("elements.length=" + elements.length);
			if(_elementName != ""){
				for(var i=0;i<elements.length;i++){
					var name = elements[i].getAttribute(_SCHEMA_ATTR_NAME);
					if(name != null){
						if(name == eName){
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
				if(child.nodeName == (standNS + "element")){
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
					if(attrs1[i].nodeName == (standNS + "attribute")){
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
					if(attrs2[i].nodeName == (standNS + "attribute")){
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
		//alert("findSimpleType=" + _sName);
		var simpleTypes = this.sXmlDoc.getElementsByTagName(standNS + "simpleType");
		for(var i=0;i<simpleTypes.length;i++){
			if(simpleTypes[i].getAttribute("name") == _sName){
				return simpleTypes[i];
			}
		}
		return null;
	}
	
	this.findElementStructRule = function(_elementName){
		var element = this.findElementByName(_elementName);
		if(element == null) throwException("Excepton:The element[" + _elementName + "] is not exist!!");	
		
		var min = element.getAttribute(_SCHEMA_ELEMENT_MINOCCURS);
		var max = element.getAttribute(_SCHEMA_ELEMENT_MAXOCCURS);

		if(min == null || min == _UNDEFINED) min = 1;
		if(max == null || max == _UNDEFINED) max = 1;
		
		return new OccursRule(null , null , min ,max);
	}

	this.findElementContentRule = function(_elementName){
		var element = this.findElementByName(_elementName);
		if(element == null) throwException("Excepton:The element[" + _elementName + "] is not exist!!");

		var rule = null;
		//situation 0:
		//<xsd: element type=""/>
		var type = element.getAttribute("type");
		if(type != null){
			return RuleFactory.getElementContentRuleByType(type);
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
			return RuleFactory.getElementContentRuleBySimpleType(simpleType);
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
					return RuleFactory.getElementContentRuleByType(base);
				}
			}
		}
		return rule;
	}
	/*
	this.findChildrenAttribute = function(_child , _attributeName){
	}
	this.findChildrenAttributes = function(_child){
		var r = new Array();
		var ref = _child.getAttribute("ref");
		if(ref != null){
			var ns = _getNS(ref);
			var elementName = _getElementName(ref);
			if(ns == this.nameSpace){
				return this.findElementAttributes(elementName);
			}else{
				if(ns == this.refParse.nameSpace){
					return this.refParse.findElementAttributes(elementName);
				}
			}
		}

		var elementName = _child.getAttribute("name");
		return this.findElementAttributes(elementName);
	}
	*/

	this.findElementAttributeRule = function(_elementName , _attributeName){
		var attribute = this.findElementAttribute(_elementName , _attributeName);
		if(attribute == null) throw "Exception:The element[" + _elementName + "] do NOT have this attribute[" + _attributeName + "]!";
		
		var type = attribute.getAttribute("type");
		var use = attribute.getAttribute("use");
		var dvalue = attribute.getAttribute("default");
		
		if(type != null){
			var ns = _getNS(type);				
			if(ns == this.standNS){
				return RuleFactory.getAttributeRuleByType(type , use , dvalue);
			}else{
				if(ns == this.nameSpace){
					//find this type node in it's own file!
					//ref! search again!
					var attrName = _getAttributeName(type);
					var simpleType = this.findSimpleType(attrName);		
					
					//situation 1:
					//<xsd:simpleType name="proportionType">
					//	<xsd:restriction base="xsd:string">
					var restric = _getFirstNodeOfElement(simpleType , "restriction");
					return RuleFactory.getAttributeRuleByRestric(restric , use , dvalue);

				}else{
					if(this.refParse != null){
						return this.ref.findElementAttributeRule(_elementName , _attributeName);
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
			var restric = _getFirstNodeOfElement(simpleType , "restriction");
			return RuleFactory.getAttributeRuleByRestric(restric , use , dvalue);
		}
	}

	//TODO:
	this.findElementChildrenContentRule = function(_elementName , _childName){
		var element = this.findElementByName(_elementName);
		if(element == null) throwException("The element[" + _elementName + "] is not exist!!");

		var sNode = _findSequenceNodeOfElement(element);
		if(sNode == null) throwException("The element[" + _elementName + "] has no childrens!");

		var rule = new DefaultRule();
		var childs = sNode.getElementsByTagName(standNS + "element");
		for(var i=0;i<childs.length;i++){

			var child = childs[i];
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
				if(_childName == (nameSpace + name)){
					var ns = _getNS(type);
					if(ns == this.standNS){
						//basic types
						return RuleFactory.getElementContentRuleByType(type);
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
		}//end for
		return rule;
	}


	this.findElementChildrenStructRule = function(_elementName , _childName){
		
		var element = this.findElementByName(_elementName);
		if(element == null) throwException("The element[" + _elementName + "] is not exist!!");	
		
		var sNode = _findSequenceNodeOfElement(element);
		if(sNode == null) throwException("The element[" + _elementName + "] has no childrens!");

		var rule = new DefaultRule();
		var childs = sNode.getElementsByTagName(standNS + "element");
		for(var i=0;i<childs.length;i++){
			var child = childs[i];
			var ref = child.getAttribute("ref");
			if(ref != null){
				if(ref == _childName){
					return  this.findChildrenStructRule(child);
				}
			}else{
				var name = child.getAttribute("name");
				if(_childName == (nameSpace + name)){
					return  this.findChildrenStructRule(child);					
				}
			}
		}
		return rule;
	}
	
	this.findChildrenContentRule = function(_child){


	}

	this.findChildrenStructRule = function(_child){

		var min = _child.getAttribute(_SCHEMA_ELEMENT_MINOCCURS);
		var max = _child.getAttribute(_SCHEMA_ELEMENT_MAXOCCURS);
		
		if(min == null || min == _UNDEFINED) min = 1;
		if(max == null || max == _UNDEFINED) max = 1;

		return  new OccursRule(null , null , min ,max);
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
			if(nodes[i].nodeName == (standNS + _nodeName)){
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
	
	//Private property
	//*********************************************************************
	var nameSpace = this.nameSpace + ":";
	var standNS = this.standNS + ":";

	//Public functions
	//*********************************************************************
	this.findRootElement = function(){
		var r = null;
		var schemaNodes = this.sXmlDoc.getElementsByTagName(standNS + "schema");
		if(schemaNodes.length >0){
			var index = 0;
			var n = 0;
			var childs = schemaNodes[0].childNodes;
			for(var i=0;i<childs.length;i++){
				if(childs[i].nodeName == (standNS + "element")){
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
		var elements = this.sXmlDoc.getElementsByTagName(standNS + _SCHEMA_ELEMENT);
		
		if(elements.length > 0){
			//alert("find node" + _SCHEMA_ELEMENT + " | elements.length->"+ elements.length);
			for(var i=0;i<elements.length;i++){
				var name = elements[i].getAttribute(_SCHEMA_ATTR_NAME);
				if(name != null){
					if(name == _elementName){
						r = elements[i];
						break;
					}
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
				if(child.nodeName == (standNS + "element")){
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
					if(attrs1[i].nodeName == (standNS + "attribute")){
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
					if(attrs2[i].nodeName == (standNS + "attribute")){
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
		//alert("findSimpleType=" + _sName);
		var simpleTypes = this.sXmlDoc.getElementsByTagName(standNS + "simpleType");
		for(var i=0;i<simpleTypes.length;i++){
			if(simpleTypes[i].getAttribute("name") == _sName){
				return simpleTypes[i];
			}
		}
		return null;
	}
	
	this.findElementStructRule = function(_elementName){
		var element = this.findElementByName(_elementName);
		if(element == null) throwException("Excepton:The element[" + _elementName + "] is not exist!!");	

		var min = element.getAttribute(_SCHEMA_ELEMENT_MINOCCURS);
		var max = element.getAttribute(_SCHEMA_ELEMENT_MAXOCCURS);

		if(min == null || min == _UNDEFINED) min = 1;
		if(max == null || max == _UNDEFINED) max = 1;
		
		return new OccursRule(null , null , min ,max);
	}

	this.findElementContentRule = function(_elementName){
		var element = this.findElementByName(_elementName);
		if(element == null) throwException("Excepton:The element[" + _elementName + "] is not exist!!");

		var rule = null;
		//situation 0:
		//<xsd: element type=""/>
		var type = element.getAttribute("type");
		if(type != null){
			return RuleFactory.getElementContentRuleByType(type);
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
			return RuleFactory.getElementContentRuleBySimpleType(simpleType);
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
					return RuleFactory.getElementContentRuleByType(base);
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
				return RuleFactory.getAttributeRuleByType(type , use , dvalue);
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
		var restric = _getFirstNodeOfElement(simpleType , "restriction");
		return RuleFactory.getAttributeRuleByRestric(restric , use , dvalue);
	}

	//TODO:
	this.findChildrenContentRule = function(_child){




	}

	this.findChildrenStructRule = function(_child){

		var min = _child.getAttribute(_SCHEMA_ELEMENT_MINOCCURS);
		var max = _child.getAttribute(_SCHEMA_ELEMENT_MAXOCCURS);
		
		if(min == null || min == _UNDEFINED) min = 1;
		if(max == null || max == _UNDEFINED) max = 1;

		return  new OccursRule(null , null , min ,max);
	}

	this.findElementChildrenStructRule = function(_elementName , _childName){
		
		var element = this.findElementByName(_elementName);
		if(element == null) throwException("Excepton:The element[" + _elementName + "] is not exist!!");	
		
		var rule = null;
		var sNode = _findSequenceNodeOfElement(element);
		if(sNode != null){

			var childs = sNode.getElementsByTagName(standNS + "element");
			for(var i=0;i<childs.length;i++){
				var child = childs[i];
				var ref = child.getAttribute("ref");
				if(ref != null){
					var childName = _getElementName(ref);
					if(childName == _childName){
						return  this.findChildrenStructRule(child)
					}
				}else{
					var name = child.getAttribute("name");
					if(name == _childName){
						return  this.findChildrenStructRule(child)					
					}
				}
			}
		}
		return r;
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
		if(anno != null) r = _getFirstNodeOfElement(ctn , "documentation");
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
			if(nodes[i].nodeName == (standNS + _nodeName)){
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
}
/**
* The NomralSchemaParse implements ISchemaParse by use the DOM object's method.
**/
/*
function NormalSchemaParseFirefox(_sXmlDoc , _nameSpace){

	this.sXmlDoc = _sXmlDoc;
	this.nameSpace = _nameSpace;
	
	//Private functions
	//*********************************************************************
	sXmlDoc = _sXmlDoc;
	nameSpace = _nameSpace;

	//Public functions
	//*********************************************************************
	this.findRootElement = function(){
		return this.findAllElements()[0];
	}

	this.findFileDocumentation = function(){
		//default we will defined the documentation at the fist node.
		var anno = sXmlDoc.getElementsByTagName("annotation")[0];
		var doc = anno.childNodes[1];
		return doc.firstChild.nodeValue;
	}


	this.findAllElements = function(){
		return this.findElementByName("");
	}

	//Find element
	//@ elementName		- the name of the element
	//return			- if find it,return this element otherwise return null object
	this.findElementByName = function(_elementName){
		
		var r = null;
		var elements = sXmlDoc.getElementsByTagName(_SCHEMA_ELEMENT);
		//alert("elements.length=" + elements.length);

		if(_elementName != ""){
			//alert("find node" + _SCHEMA_ELEMENT + " | elements.length->"+ elements.length);
			for(var i=0;i<elements.length;i++){
				var name = elements[i].getAttribute(_SCHEMA_ATTR_NAME);
				if(name != null){
					//alert("_elementName:" + _elementName + "| name:" + name);
					if(_elementName == name){
						r = elements[i];
						break;
					}
				}
			}
		}else{
			r = elements;
		}

		return r;
	}
	
	this.findElementDocumentation = function(_elementName){
		var element = this.findElementByName(_elementName);
		if(element != null){
			var doc = _findDocumentationOfElement(element);
			return doc.nodeValue;
		}else{
			throwException("Excepton:The element[" + _elementName + "] is not exist!!");
		}
	}
	
	//Find the documentation of element
	//U should ensure that the <Documentation> element be defined at first!
	//@ element
	//@ return the <Documentation> element
	_findDocumentationOfElement = function(_element){
		var anno = _element.childNodes[1];
		var doc = anno.childNodes[1];
		//alert(anno.nodeName + "|" + doc.nodeName + "|" + doc.firstChild.nodeValue);
		return doc.firstChild;
	}

	//Find element's childrens
	//@ elementName		- the element object
	//return			- if find it return this element's childrens otherwise return empty Array object	
	this.findElementChildrens = function(_elementName){

		var r = new Array();
		var element = this.findElementByName(_elementName);
		if(element != null){	
			var sequence = _findSequenceNodeOfElement(element);
			var childNodes = sequence.childNodes;
			for(var i=0;i< childNodes.length;i++){
				if(childNodes[i].nodeType != 3 && childNodes[i].nodeName == "xsd:element"){
					r.push(childNodes[i]);
				}
			}
		}else{
			throwException("Excepton:The element[" + _elementName + "] is not exist!!");
		}

		return r;
	}

	this.findElementAttributes = function(_elementName){
		var element = this.findElementByName(_elementName);
		if(element != null){
			var attributeNodes = _findAttributeNodesOfElement(element);
			return attributeNodes;
		}else{
			throwException("Excepton:The element[" + _elementName + "] is not exist!!");
		}
	}

	this.findElementAttribute = function(_elementName , _attributeName){
		var r = null;
		var attributeNodes = this.findElementAttributes(_elementName);
		for(var i=0;i<attributeNodes.length;i++){
			if(_attributeName == attributeNodes[i].getAttribute(_SCHEMA_ATTR_NAME)){
				r = attributeNodes[i];
				break;
			}
		}
		return r;
	}

	this.findElementRule = function(_elementName){
		var element = this.findElementByName(_elementName);
		if(element != null){
			var min = element.getAttribute(_SCHEMA_ELEMENT_MINOCCURS);
			var max = element.getAttribute(_SCHEMA_ELEMENT_MAXOCCURS);
			
			if(min == _UNDEFINED) min = null;
			if(max == _UNDEFINED) max = null;

			return new OccursRule(null , null , min ,max);
		}else{
			throwException("Excepton:The element[" + _elementName + "] is not exist!!");
		}
	}


	this.findElementAttributeRule = function(_elementName , _attributeName){
					
		var attribute = this.findElementAttribute(_elementName , _attributeName);
		if(attribute != null){			
			var ruleFactory = new RuleFactory();
			return ruleFactory.getAttributeRule(attribute);
		}else{		
			//if the element don't have the attribte throw exception!
			throw "Exception:The element[" + _elementName + "] do NOT have this attribute[" + _attributeName + "]!";
		}
	}
		
	//TODO:next version will relize.
	this.findElementAttributeRules = function(_element){

		var attributeNodes = _findAttributeNodesOfElement(_element);
		return attributeNodes;

	}
	


	//Private functions
	//*********************************************************************
	_findSequenceNodeOfElement = function(_element){		
		//In firefox browser , the blank is considered a node which name is "#text";
		//So we should eliminate this text nodes.
		var ecNodes = _element.childNodes;
		for(var i=0;i < ecNodes.length;i++){
			//find the <xs:complexType> node
			if(ecNodes[i].nodeType != 3 & ecNodes[i].nodeName == "xsd:complexType"){
				var cNodes = ecNodes[i].childNodes;
				for(var j=0;j < cNodes.length;j++){
					//find the <xs:sequence> node
					//alert(cNodes[j].nodeType + "|" + cNodes[j].nodeName);
					if(cNodes[j].nodeType != 3 && cNodes[j].nodeName == "xsd:sequence"){
							return cNodes[j];
					}
				}
			}
		}

		//return _element.childNodes[0].childNodes[0];
	}
	
	_findAttributeNodesOfElement = function(_element){
		var r = new Array();
		var ecNodes = _element.childNodes;
		for(var i=0;i<ecNodes.length;i++){
			//find the <xs:complexType> node
			if(ecNodes[i].nodeType != 3 && ecNodes[i].nodeName == "xsd:complexType"){
				var cNodes = ecNodes[i].childNodes;
				for(var j=0;j<cNodes.length;j++){
					if(cNodes[j].nodeType != 3 && cNodes[j].nodeName == "xsd:attribute"){
						r.push(cNodes[j]);
					}
				}
			}
		}
		return r;
	}
}

*/


//*******************************************************************************
//DefaultDomTreeReader
//*******************************************************************************
function DefaultDomTreeReader(){
	//Public propertys
	//***************************************************************************
	this.parse = null;
	this.dom = null;

	//Construction
	//***************************************************************************
	this.getParse = function(){
		return this.parse;
	}

	this.getDom = function(){
		return this.dom;
	}
	
	this.initilize = function(_xmlFileName , _schemaFileName){
				
		var xmlDoc = XmlDocument.create();
		xmlDoc.async = false;
		xmlDoc.load(_xmlFileName);

		//Of cource, Now, you can use the parse & dom to lay out your page!!
		//But the base way is to use the decorated dom object! It not only contains
		//the avaliable attributes, but also contains the rules of element & attributes too.
		this.dom = xmlDoc;
		
		var sXmlDoc = XmlDocument.create();
		sXmlDoc.async = false;
		sXmlDoc.load(_schemaFileName);

		this.parse = new SingleNSSchemaParse(sXmlDoc , "app" , "xs");
		//alert("DefaultDomTreeReader.parse = " + this.parse);
	}


	this.init = function(){

		var xmlDoc = XmlDocument.create();
		xmlDoc.async = false;
		xmlDoc.load("../xml/gui_service.xml");

		//Of cource, Now, you can use the parse & dom to lay out your page!!
		//But the base way is to use the decorated dom object! It not only contains
		//the avaliable attributes, but also contains the rules of element & attributes too.
		this.dom = xmlDoc;

		var ego_sXmlDoc = XmlDocument.create();
		ego_sXmlDoc.async = false;
		ego_sXmlDoc.load("../xml/ego.xsd");
		var egoParse = new MultiNSSchemaParse(ego_sXmlDoc , "ego" , "xsd" , null);

		var sc_sXmlDoc = XmlDocument.create();
		sc_sXmlDoc.async = false;
		sc_sXmlDoc.load("../xml/sc.xsd");
		var scParse = new MultiNSSchemaParse(sc_sXmlDoc , "sc" , "xsd" , egoParse);

		this.parse = scParse;
	}
}

//*******************************************************************************
// Copyright
//*******************************************************************************



/**
* @ interface - IRule
* And it's implements will use the validate.js to finish his job!
**/
function IRule(_dvalue , _use){
	this.name = "";
	this.defaultValue = _dvalue;
	this.use = _use;

	this.validate = function(_value){};
	this.toString = function(){}
}


function DefaultRule(_dvalue , _use){
	this.name = "default";
	this.defaultValue = _dvalue;
	this.use = _use;

	this.validate = function(_value){};
	this.toString = function(){
		return "DefaultRule(name:" + this.name + ",defaultValue:" + this.defaultValue + ",use:" + this.use + ")";
	}

}

/**
* The Rules class - StringRule 
**/
function StringRule(_dvalue , _use){
	this.name = "string";
	this.defaultValue = _dvalue;
	this.use = _use;

	this.validate = function(_value){
		var r = true;
		
		if(this.use == _SCHEMA_ELEMENT_ATTR_USE_REQUIRED && _value == ""){
			r = false;
		}

		//alert("use=" + this.use + "|value=" + _value + "|result=" +r);
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

	this.validate = function(_value){
		var r = false;
		if(	_value == "1"	|| _value == "0"	||
			_value == 1		|| _value == 0		||
			_value == true	|| _value == false	|| 
			_value == "true"|| -value == "false"){
				r = true;
		}
		return r;
	}
	this.toString = function(){
		return "BooleanRule(defaultValue:" + this.defaultValue + ",use=" + this.use + ")";
	}
}

/**
* The Rules class - BooleanRule 
**/
function DecimalRule(_dvalue , _use){

	this.name = "decimal";
	this.defaultValue = _dvalue;
	this.use = _use;

	this.validate = function(_value){
		return _validate.isDecimal(_value);
	}
	this.toString = function(){
		return "DecimalRule(defaultValue:" + this.defaultValue + ",use=" + this.use + ")";
	}
}

function IntegerRule(_dvalue , _use){

	this.name = "integer";
	this.defaultValue = _dvalue;
	this.use = _use;
	
	this.validate = function(_value){
		return _validate.isDecimal(this.value);
	}

	this.toString = function(){
		return "IntegerRule(defaultValue:" + this.defaultValue + ",use:" + this.use + ")"; 
	}
}

function OccursRule(_dValue , _use , _min , _max){

	this.name = "occurs";

	this.defaultValue = _dValue;
	this.use = _use;

	this.min = _min ;
	this.max = _max ;
	
	this.validate = function(_oper , _number){

		var r = true;
		if(this.min == _UNDEFINED || this.min == null) this.min = 1;
		if(this.max == _UNDEFINED || this.max == null) this.max = 1;
		
		//alert("nubmer=" + _number + "|min=" + this.min + "|max=" + this.max + "|oper=" + _oper);
		if(_oper == "add"){
			if(this.max != _SCHEMA_ELEMENT_MAXOCCURS_VALUE){
				//just to compare the cNuber and max value;
				if((_number + 1) > this.max){
					r = false;
				}
			}
		}else{
			if((_number - 1) < this.min){
				r = false;
			}
		}
			
		return r;
	}

	this.toString = function(){
		return "OccursRule(defaultValue:" + this.defaultValue + ",use=" + this.use + ",min=" + this.min + ",max=" + this.max + ")";
	}
}

function NormalizedStringRule(_dvalue , _use){

	this.name = "normalizedString";
	this.defaultValue = _dvalue;
	this.use = _use;

	this.validate = function(_value){
		//TODO:
	}
	this.toString = function(){
		return "NormalizedStringRule(defaultValue:" + this.defaultValue + ",use=" + this.use + ")";
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

	this.validate = function(_value){
		//TODO:
	}

	this.toString = function(){
		return "EnumStringRule(defaultValue:" + this.defaultValue + ",use=" + this.use + ",enum=" + this.enumValues.length + ")";
	}
}

function DurationRule(_dvalue , _use){

	this.name = "duration";
	this.defaultValue = _dvalue;
	this.use = _use;

	this.toString = function(){
		return "DurationRule(name:" + this.name + ",defaultValue:" + this.defaultValue + ",use:" + this.use + ")";
	}
}

function AnySimpleTypeRule(_dvalue , _use){

	this.name = "anySimpleType";
	this.defaultValue = _dvalue;
	this.use = _use;

	this.toString = function(){
		return "AnySimpleTypeRule(name:" + this.name + ",defaultValue:" + this.defaultValue + ",use:" + this.use + ")";
	}
}

function RuleFactory(_standNs){

	//Public property
	//*********************************************************************
	this.standNS  = _standNs;
	
	//Private property
	//*********************************************************************
	var standNS = this.standNS + ":";


	//Public functions
	//*********************************************************************
	this.getElementContentRuleByType = function(_type ){
		var rule = null;
		switch(_type){
			case "xsd:string":
				rule = new StringRule();
				break;
			case "xsd:integer":
			case "xsd:anySimpleType":
				rule = new AnySimpleTypeRule();
				break;
			case "xsd:base64Binary":
			case "xsd:duration":
				rule = new DurationRule();
				break;
			case "xsd:dateTime":
			case "xsd:anyURI":
			default:
				rule = new DefalutRule();
				break;
		}
		return rule;
	}


	
	this.getElementContentRuleBySimpleType = function(_simpleType){
		//alert("getElementContentRuleBySimpleType(" + _simpleType + ")");
		var rule = new EnumStringRule();

		if(_simpleType != null){
			var restris = _simpleType.getElementsByTagName(standNS + "restriction");
			//TODO: if simpleTypes has many restriction elements?forgot it--complex?!
			if(restris.length >0){
				var res = restris[0];
				var res_bas = res.getAttribute("bas");
				
				var enums = res.getElementsByTagName(standNS + "enumeration");
				for(var i=0;i<enums.length;i++){
					var value = enums[i].getAttribute("value");
					rule.addEnumValue(value);
				}
			}
		}
		return rule;
	}

	this.getAttributeRuleByRestric = function(_restriction , _use , _defaultValue){
		var base = _restriction.getAttribute("base");

		switch(base){
			case standNS + "nonNegativeInteger" :
			case standNS + "positiveInteger":
				var min = 1;//defalut value in w3c
				var max = 1;//defalut value in w3c
				var minNodes = _restriction.getElementsByTagName(standNS + "minInclusive");
				if(minNodes.length >0) min = minNodes[0].getAttribute("value");

				var maxNodes = _restriction.getElementsByTagName(standNS + "maxInclusive");
				if(maxNodes.length >0) max = maxNodes[0].getAttribute("value");
				
				rule = new OccursRule(_defaultValue , _use , min , max);
				break;
			case standNS + "normalizedString" :
			case standNS + "string":
				rule = new EnumStringRule(_defaultValue , _use);
				var enums = _restriction.getElementsByTagName(standNS + "enumeration");
				for(var i=0;i<enums.length;i++){
					var enumValue = enums[i].getAttribute("value");
					rule.addEnumValue(enumValue);
				}
				break;
			case standNS + "decimal": 
				rule = new DecimalRule(_defaultValue , _use);	
				break;

			//Todo: add others
			//case xxx:

			default:
				rule = new DefaultRule(_defaultValue , _use);
		}

		//if system find another rule that can not implements , it will 
		//return a default rule object.
		return rule;
	}

	this.getAttributeRuleByType = function(_type , _use , _defaultValue){

		var rule = null;
		switch(_type){
			case standNS + _SCHEMA_ATTR_STRING : 
				rule = new StringRule(_defaultValue , _use);
				break;
			case standNS + _SCHEMA_ATTR_NORMALIZED_STRING :
				rule =  new NormalizedStringRule(_defaultValue , _use);	
				break;
			case standNS + _SCHEMA_ATTR_POSITIVE_INTEGER : 
				rule =  new IntegerRule(_defaultValue , _use);
				break;
			case standNS + "boolean" : 
				rule = new BooleanRule(_defaultValue , _use);
				break;
			default:
				rule = new DefaultRule(_defaultValue , _use);
		}
		//if system find another rule that can not implements , it will 
		//return a default rule object.
		return rule;
	}

}

