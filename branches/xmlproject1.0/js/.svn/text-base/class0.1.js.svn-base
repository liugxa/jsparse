
//*******************************************************************************
// Copyright
//*******************************************************************************



//*******************************************************************************
//Base classes & interfaces
//*******************************************************************************
/**
* @ interface - ISchemaParse
* The schema parse interface
* @ See Also
* NomralSchemaParse DomTreeShemaParse	 
**/
function ISchemaParse(){

	this.createElement = function(_felement , _celement){}
	this.deleteElement = function(_felement , _celement){}
	this.modifyElement = function(_felement , _celement){}
	this.modifyElementAttribute = function(_element , _attributeName , _value){}
	
	this.findRootElement = function(){}
	this.findElementByName = function(_elementName){}
	this.findElementChildrens = function(_element){}

	this.findElementRule = function(_element){}
	this.findElementAttributes = function(_element){}
	this.findElementAttributeRule = function(_element , _attributeName){}
	this.findElementAttributeRules = function(_element){}

}

/**
* DOMTree: The ElementNode class 
**/
function Node(_id , _name , _type ,_shadow){

	this.id = _id;
	this.name = _name;
	this.type = _type;
	this.shadow = _shadow;

	this.father = null;
	this.rules = new Array();//todo:will be realized in next version
	this.attributes = new Array();
	this.childrens = new Array();

}
/**
* DOMTree: The Attribute class extends Element
**/
function Attribute(_id , _name , _type ,_shadow){

	this.id = _id;
	this.name = _name;
	this.type = _type;
	
	//todo:this.shadow will be deleted when attribute has the ability 
	//to bewrite the attribute object of schema
	this.shadow = _shadow;
	
	this.father = null;
	this.rules = new Array();
	//this.attributes = new Array();

}


/**
* @ interface - IRule
* And it's implements will use the validate.js to finish his job!
**/
function IRule(_dvalue , _use){
	this.name = "";
	this.defaultValue = _dvalue;
	this.use = _use;

	this.validate = function(_value){};
}


function DefaultRule(_dvalue , _use){
	this.name = "";
	this.defaultValue = _dvalue;
	this.use = _use;

	this.validate = function(_value){};
}

/**
* The Rules class - StringRule 
**/
function StringRule(_dvalue , _use){
	this.name = "string";
	this.defaultValue = _dvalue;
	this.use = _use;

	this.validate = function(_value){
		
		this.value = _value;
		var r = true;
		
		//alert("use=" + this.use + "|value=" + this.value);
		if(this.use == _SCHEMA_ELEMENT_ATTR_USE_REQUIRED && this.value == ""){
			r = false;
		}
		
		return r
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
}

/**
* The Rules class - BooleanRule 
**/
function DecimalRule(_dvalue , _use){

	this.name = "boolean";
	this.defaultValue = _dvalue;
	this.use = _use;
	
	this.validate = function(_value){
		return _validate.isDecimal(this.value);
	}

}

function IntegerRule(_dvalue , _use){

	this.name = "integer";
	this.defaultValue = _dvalue;
	this.use = _use;
	
	this.validate = function(_value){
		return _validate.isDecimal(this.value);
	}

}

function OccursRule(_dvalue , _use){

	this.name = "occurs";
	this.defaultValue = _dvalue;
	this.use = _use;

	this.validate = function(_value){
		
		var r = false;
		if(this.min == _UNDEFINED || this.min == null) this.min = 1;
		if(this.max == _UNDEFINED || this.max == null) this.max = 1;
		
		//alert("cNubmer=" + this.cNumber + "|min=" + this.min + "|max=" + this.max);
		if(this.max != _SCHEMA_ELEMENT_MAXOCCURS_VALUE){
			
			//just to compare the cNuber and max value;
			if((this.cNumber + 1) <= this.max && (this.cNumber -1) >= this.min){
				r = true;
			}
		}
		else{
			
			//just validate the delete operate
			if((this.cNumber-1) >= this.min){
				r = true;
			}
		}

		return r;
	}
}

function NormalizedStringRule(_dvalue , _use){

	this.name = "normalizedString";
	this.defaultValue = _dvalue;
	this.use = _use;

	this.validate = function(_value){

		//TODO:

	}
}


//*******************************************************************************
//Utils classes
//*******************************************************************************

function throwException(_message){
	throw _message;
}


function iterator(obj) {
    for (var property in obj) {
        alert(property + " : " + obj[property]);
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

function HtmlElement(_s){
	return document.createElement(_s);
}

function HtmlTextElement(_s){
	return document.createTextNode(_s);
}


function _alertRetest(methodName){
	alert("You must retest the " + methodName + " method first!");
}

function _alertSuccess(methodName , message){
	if(message == undefined) message = "";
	alert("Test " + methodName + " result: success!" + message);
	
}

function _alertFailure(methodName , message){
	if(message == undefined) message = "";
	alert("Test " + methodName  + " result: failure!" + message);
}

function _alertException(methodName , e){
	if (e instanceof Error) {
		 alert("Test " + methodName + " result: failure! catch system excpetion:" + e.message);
	}
	else{
		alert("Test " + methodName + " result: failure! catch business excpetion:" + e);
	}
}