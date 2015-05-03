
//*******************************************************************************
// Copyright
//*******************************************************************************



//*******************************************************************************
//Base classes & interfaces
//*******************************************************************************

/**
* abstrace element class
*/
function Element(){}

/**
* Schema element class
*/
function SElement(){}

/**
* DOMTree: The XElement class 
**/
function XElement(_id , _name , _treeCode){

	this.id = _id;
	this.name = _name;
	this.treeCode = _treeCode;
	
	this.father = null;
	this.childrens = new Array();
	this.attributes = new Array();

	this.state = "";// new element or old one
	this.addChildren = function(_children){
		this.childrens.push(_children);
	}

	this.removeChildren = function(_c){
		for(var i=0;i<this.childrens.length;i++){
			var children = this.childrens[i];
			if(children.id == _c.id){
				this.childrens.splice(i ,1);
				break;
			}
		}
	}

	this.setFather = function(_f){
		this.father = _f
	}

	this.getFather = function(){
		return this.father;
	}

	this.addAttribute = function(_a){
		this.attributes.push(_a);
	}

	this.removeAttribute = function(_a){
		for(var i=0;i<this.attributes.length;i++){
			var attribute = this.attributes[i];
			if(attribute.id == _a.id){
				this.attributes.splice(i ,1);
				break;
			}
		}
	}
}
/**
* Schema attribute class
*/
function Attribute(){}


/**
* Schema attribute class
*/
function SAttribute(){}

/**
* DOMTree: The Attribute class extends Element
**/
function XAttribute(_id , _name , _value){

	this.id = _id;
	this.name = _name;
	this.value = _value;

	this.element = null;
	this.state = "";// new element or old one
	this.setElement = function(_e){
		this.element = _e
	}

	this.getElement = function(){
		return this.element;
	}
}


/**
* @ interface - IRule
* And it's implements will use the validate.js to finish his job!
**/
function Rule(_dvalue , _use){
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

}

function OccursRule(_min , _max){

	this.name = "occurs";
	this.min = _min ;
	this.max = _max ;
	
	this.express = "";
	this.validate = function(_number){
		

		var r = false;
		if(this.min == _UNDEFINED || this.min == null) this.min = 1;
		if(this.max == _UNDEFINED || this.max == null) this.max = 1;
		
		//alert("cNubmer=" + this.cNumber + "|min=" + this.min + "|max=" + this.max);
		if(this.max != _SCHEMA_ELEMENT_MAXOCCURS_VALUE){
			
			//just to compare the cNuber and max value;
			if((_number + 1) <= this.max && (_number -1) >= this.min){
				r = true;
			}
		}else{
			
			//just validate the delete operate
			if((_numer - 1) >= this.min){
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

function RuleFactory(){

	this.getAttributeRule = function(_attribute){
			//examine the node's type
			var type = _attribute.getAttribute(_SCHEMA_ELEMENT_ATTR_TYPE);
			var use = _attribute.getAttribute(_SCHEMA_ELEMENT_ATTR_USE);
			var dvalue = _attribute.getAttribute("default");
			//alert("element[" + _elementName + "].attribute[" + _attributeName + "]|type=" + type + "|use=" + use + "|defaultValue=" + dvalue);
			
			if(type != null){
				if(type == _SCHEMA_ELEMENT_ATTR_TYPE_STRING || type == _SCHEMA_ELEMENT_ATTR_TYPE_NORMALIZED_STRING){
					return new StringRule(dvalue , use);
				}

				if(type == _SCHEMA_ELEMENT_ATTR_TYPE_POSITIVE_INTEGER){
					return new IntegerRule(dvalue , use);
				}
			}else{
				var restriction = _findRestrictionNodeOfAttribute(_attribute);
				var base = restriction.getAttribute("base");

				if(base == "xs:nonNegativeInteger" || base == "xs:positiveInteger"){

					var min = 1;//defalut value in w3c
					var max = 1;//defalut value in w3c
					for(var i=0;i<restriction.childNodes.length;i++){
						var cn = restriction.childNodes[i];
						if(cn.nodeType != 3){
							if(cn.nodeName == "xs:minInclusive"){
								min = cn.getAttribute("value");
							}else{
								max = cn.getAttribute("value");
							}
						}
					}
					var s = use + ":" + min + "-" + max;
					return new OccursRule(min , max);
				}
				
				if(base == "xs:normalizedString"){
					
					var enumArray = new Array();

					var enums = restriction.childNodes;
					for(var i=0;i<enums.length;i++){
						if(enums[i].nodeType != 3){
							var enumValue = enums[i].getAttribute("value");
							enumArray.push(enumValue);
						}
					}
					return new EnumNormalizedStringRule(dvalue , use , enumArray);
				}
				
				if(base == "xs:decimal"){
					return new DecimalRule(dvalue , use);	
				}
				
				//TODO:add other rules

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

function throwException(_message){
	throw _message;
}


function iterator(obj) {
    for (var property in obj) {
        alert(property + " : " + obj[property]);
    }
}
