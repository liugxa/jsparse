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
	this.init = function(_xmlFileName , _schemaFileName){
		
		var sXmlDoc = XmlDocument.create();
		sXmlDoc.async = false;
		sXmlDoc.load(_schemaFileName);
		
		var xmlDoc = XmlDocument.create();
		xmlDoc.async = false;
		xmlDoc.load(_xmlFileName);

		//Of cource, Now, you can use the parse & dom to lay out your page!!
		//But the base way is to use the decorated dom object! It not only contains
		//the avaliable attributes, but also contains the rules of element & attributes too.
		this.parse = new NomralSchemaParse(sXmlDoc , "xs");
		this.dom = xmlDoc;
	}

	//Public methods
	//***************************************************************************
	this.getParse = function(){
		return this.parse;
	}

	this.getDom = function(){
		return this.dom;
	}
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

	//Private propertys
	//***************************************************************************
	this.father = null;
	this.childrens = new Array();

	this.attributes = new Array();
	this.rule = new DefaultRule();

	this.layer = -1;
	this.state = "old"; // "new"|"old"

	//Public methods
	//***************************************************************************
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
		return "(id:" + this.getId() + ",name:" + this.getName() + 
			",father:" + fn + ",childrens.length:" + this.childrens.length + 
			",attributes.length:" + this.attributes.length + ")";
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

	this.express = "";
	this.validate = function(_value){};
}


function DefaultRule(_dvalue , _use){
	this.name = "default";
	this.defaultValue = _dvalue;
	this.use = _use;

	this.express = "";
	this.validate = function(_value){};

	this.toString = function(){
		return "DefaultRule()";
	}

}

/**
* The Rules class - StringRule 
**/
function StringRule(_dvalue , _use){
	this.name = "string";
	this.defaultValue = _dvalue;
	this.use = _use;

	this.express = this.name + ":" + this.use;
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

	this.express = "";
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
}

/**
* The Rules class - BooleanRule 
**/
function DecimalRule(_dvalue , _use){

	this.name = "decimal";
	this.defaultValue = _dvalue;
	this.use = _use;

	this.express = "";
	this.validate = function(_value){
		return _validate.isDecimal(_value);
	}

}

function IntegerRule(_dvalue , _use){

	this.name = "integer";
	this.defaultValue = _dvalue;
	this.use = _use;
	
	this.express = "";
	this.validate = function(_value){
		return _validate.isDecimal(this.value);
	}

	this.toString = function(){
		return "Interger(defaultValue:" + this.defaultValue + ",use:" + this.use + ")"; 
	}
}

function OccursRule(_dValue , _use , _min , _max){

	this.name = "occurs";

	this.defaultValue = _dValue;
	this.use = _use;

	this.min = _min ;
	this.max = _max ;
	
	this.express = "";
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

	this.express = this.name + ":" + this.use;
	this.validate = function(_value){

		//TODO:

	}
}

function EnumNormalizedStringRule(_dvalue , _use , _enumArray){

	this.name = "enumNormalizedString";
	this.defaultValue = _dvalue;
	this.use = _use;
	this.enumArray = _enumArray;

	this.express = this.name + ":" + this.use;
	this.validate = function(_value){

		//TODO:

	}
}

function RuleFactory(_nameSpace){

	var nameSpace = _nameSpace;
	this.getAttributeRule = function(_attribute){
			//examine the node's type
			var type = _attribute.getAttribute(_SCHEMA_ATTR_TYPE);
			var use = _attribute.getAttribute(_SCHEMA_ATTR_USE);
			var dvalue = _attribute.getAttribute("default");
			
			if(type != null){
				switch(type){
					case nameSpace + _SCHEMA_ATTR_STRING : 
						return new StringRule(dvalue , use);
					case nameSpace + _SCHEMA_ATTR_NORMALIZED_STRING :
						return new NormalizedStringRule(dvalue , use);	
					case nameSpace + _SCHEMA_ATTR_POSITIVE_INTEGER : 
						return new IntegerRule(dvalue , use);
					case nameSpace + "boolean" : 
						return new BooleanRule(dvalue , use);
				}
			}else{
				var restriction = _findRestrictionNodeOfAttribute(_attribute);
				var base = restriction.getAttribute("base");
				
				switch(base){
					case nameSpace + "nonNegativeInteger" : 
					case nameSpace + "positiveInteger":
						var min = 1;//defalut value in w3c
						var max = 1;//defalut value in w3c
						for(var i=0;i<restriction.childNodes.length;i++){
							var cn = restriction.childNodes[i];
							if(cn.nodeType != 3){
								if(cn.nodeName == (nameSpace + "minInclusive")){
									min = cn.getAttribute("value");
								}else{
									max = cn.getAttribute("value");
								}
							}
						}
						var s = use + ":" + min + "-" + max;
						return new OccursRule(dvalue , use , min , max);
				
					case nameSpace + "normalizedString" :
						var enumArray = new Array();
						var enums = restriction.childNodes;
						for(var i=0;i<enums.length;i++){
							if(enums[i].nodeType != 3){
								var enumValue = enums[i].getAttribute("value");
								enumArray.push(enumValue);
							}
						}
						return new EnumNormalizedStringRule(dvalue , use , enumArray);
				
					case nameSpace + "decimal" : 
						return new DecimalRule(dvalue , use);	
					
					//TODO:add other rules
				}
			}//end if
			
			
			//if system find another rule that can not implements , it will 
			//return a default rule object.
			return new DefaultRule(dvalue , use);
	}

	_findRestrictionNodeOfAttribute  = function(_attribute){
		try{
			var acNodes = _attribute.childNodes;
			for(var i=0;i<acNodes.length;i++){
				if(acNodes.nodeType != 3){
					//find the <xs:simpleType> node
					var cNodes = acNodes[i].childNodes;
					for(var j=0;j<cNodes.length;j++){
						if(cNodes[j].nodeType != 3){
							//find <xs:restriction> node
							return cNodes[j];
						}
					}
				}
			}
		}catch (e){
			alert(e.message);
			throw e;
		}

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
			return "[key=" + this.key + "|value=" + this.value + "]\n\r";
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

function throwException(_message, e){
	if(e instanceof Error){
		alert(e.message);
		throw _message + e.message;
	}else{
		alert(e);
		throw _message + e;
	}
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