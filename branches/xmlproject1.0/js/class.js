
//*******************************************************************************
// Copyright
//*******************************************************************************



//*******************************************************************************
//Base classes & interfaces
//*******************************************************************************
function DomTreeFactory(_xmlDoc , _parse ){

	this.xmlDoc = _xmlDoc;
	this.parse = _parse;

	this.createDomTree = function(){

		if(this.xmlDoc == null) throwException("Excepton:The xml doc is not exist!!");
		if(this.parse == null) throwException("Excepton:The parse is not exist!!");

		var domTree = new DefaultDomTree(this.xmlDoc , this.parse);
		domTree.initTree();
		return domTree;
	}
	

	this.setXmlDoc = function(_xmlDoc){
		this.xmlDoc = _xmlDoc;
	}

	this.getXmlDoc = function(){
		return this.xmlDoc;
	}

	this.setParse = function(_parse){
		this.parse = _parse;
	}
	this.getParse = function(){
		return this.parse;
	}
}

//DomTree is a interface between HtmlForm and schema's parse & dom object
//1> It is represented a tree with the information came from two parts , 
//on is the content which came from the xml file,
//the other is the metadata of the xml which came from the scheml file.
//
//2> The coder just need to know how to use this tree! Enough!

function IDomTree(){
	this.getRoot = function(){};
	this.initTree = function(){};
}

//DomTree implements
function DefaultDomTree(_dom , _parse){

	this.dom = _dom;
	this.parse = _parse;

	this.root = null;
	this.map = new Map();

	//public methods
	//*****************************************************************
	this.getRoot = function(){
		return this.root;
	}

	//Attach a new Element node with the his branch.
	this.addElement = function(_ftreeCode , _elementName){
		
		//find the _felement
		var element =  this.map.get(_ftreeCode);

		//
		var number = element.childrens.length;	
		var e = new Element(number , _elementName , _ftreeCode + number , "new");
		
		element.addChildren(e);
		e.setFather(element);
		//add the element's rule
		e.setRule(this.parse.findElementRule(_elementName));	
		this.map.put("rowConsumer" + e.treeCode , e);

		//
		var attributes = this.parse.findElementAttributes(_elementName);
		for(var i=0;i<attributes.length;i++){
			var attr = attributes[i];
			var attrName = attr.getAttribute("name");

			var rule = this.parse.findElementAttributeRule(_elementName , attrName);
			var a = new Attribute(i , attrName , "" , "new");
			e.addAttribute(a);
			a.setElement(e);
			
			//add the attribute's rule
			a.setRule(this.parse.findElementAttributeRule(_elementName ,attrName));
		}

		return e;
	}

	/*
	* remove this element from dom tree;
	* @param element object
	*/
	this.removeElement = function(_element){


	}

	/*
	* remove this element from dom tree;
	* @param element object
	*/	
	this.findElement = function(_treeCode){
		return this.map.get(_treeCode);
	}

	/*
	* todo:find all elements by recursive method
	* initilize the dom tree . User must execute this method before he use it.
	* @param element object
	*/
	this.initTree = function(){
		
		var root =  this.dom.getElementsByTagName("Profile")[0];
		
		var r = new Element(0 , root.nodeName , "-0");
		this.map.put("rowConsumer-0" , r);
		r.setRule(this.parse.findElementRule(root.nodeName));	
		
		//
		var childrens = root.childNodes;
		this.addChildrensToElement(r , childrens);
		
		//set root
		this.root = r;
	}


	this.addChildrensToElement = function(_element , _childrens){

		for(var i=0;i<_childrens.length;i++){
			var children = _childrens[i];

			if(children.nodeType != 3){	
				
				//alert("children.nodeName=" + children.nodeName + "|element.treeCode=" + _element.treeCode);
				var e = new Element(i , children.nodeName , _element.treeCode + "-" + i , "old");
				e.setRule(this.parse.findElementRule(children.nodeName));	//add the element's rule
				this.map.put("rowConsumer" + _element.treeCode + "-" + i , e);
				
				//recursion!!
				//alert(children.nodeName + " has child nodes?result=" + children.hasChildNodes);
				if(children.hasChildNodes){
					this.addChildrensToElement(e , children.childNodes);	
				}


				//add it's attributes
				var attributes = children.attributes;
				//alert("add the " + children.nodeName + " element's attributes[" + attributes.length + "]!");
				for(var j=0;j<attributes.length;j++){
					
					var attr = attributes[j];
					if(attr.nodeType != 3){
						var a = new Attribute(j, attr.name , attr.value , "old");
						e.addAttribute(a);
						a.setElement(e);
						//add the attribute's rule
						a.setRule(this.parse.findElementAttributeRule(children.nodeName ,attr.name));
					}
				}
				
				//add other attribute which came from schema file
				var length = attributes.length;
				var otherAttrs = _findOtherAttributes(this.parse , children.nodeName , attributes);
				for(var j=0 ; j < otherAttrs.length ; j++){
					var attr = otherAttrs[j];
					var attrName = attr.getAttribute("name");
					
					//XAttribute(_id , _name)
					var a = new Attribute(length + j, attrName , "" , "new");
					e.addAttribute(a);
					a.setElement(e);
					//add the attribute's rule
					a.setRule(this.parse.findElementAttributeRule(children.nodeName , attrName));
				}

				//alert("add the element[" + e + "] to father[" + _element + "]");
				e.setFather(_element);
				_element.addChildren(e);
			}
		}
	}

	//private methods
	//*****************************************************************
	_findOtherAttributes = function(_parse , _elementName , _attrs){
		var sAttributes = _parse.findElementAttributes(_elementName);
		//alert("sAttributs.length=" + sAttributes.length + "|attrs.length=" +_attrs.length);
		for(var i=0;i<_attrs.length;i++){
			var attr = _attrs[i];
			if(attr.nodeType != 3){
				for(var j=0;j<sAttributes.length;j++){
	
					var sAttr = sAttributes[j];
					//alert(attr.name + "|" + sAttr.getAttribute("name"));
					if(attr.name == sAttr.getAttribute("name")){
						//remove this attribute from sAttributes!
						//alert("remove attribute : " + attr.name + "|length before=" + sAttributes.length);
						sAttributes.splice(j ,1);
						//alert("remove attribute : " + attr.name + "|length before=" + sAttributes.length);
						break;
					}
				}
			}
		}
		return sAttributes;
	}
	
}






/**
* DOMTree: The Element class 
**/
function Element(_id , _name , _treeCode , _state){

	this.id = _id;
	this.name = _name;
	this.treeCode = _treeCode;
	this.state = _state;// new element or old one
	
	this.isOpen = true;//mybe it should be deleted?!
	
	this.father = null;
	this.childrens = new Array();
	this.attributes = new Array();
	this.rule = new DefaultRule();
	
	this.toString = function(){
		return "name:" + this.name + "|treeCode:" + this.treeCode + "|state:" + this.state;
	}

	this.setRule = function(_rule){
		this.rule = _rule;
	}
	this.getRule = function(){
		return this.rule;
	}

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
* DOMTree: The Attribute class extends Element
**/
function Attribute(_id , _name , _value , _state){

	this.id = _id;
	this.name = _name;
	this.value = _value;
	this.state = _state;// new element or old one

	this.element = null;
	this.rule = new DefaultRule();
	
	this.setRule = function(_rule){
		this.rule = _rule;
	}
	this.getRule = function(){
		return this.rule;
	}
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

function OccursRule(_dValue , _use , _min , _max){

	this.name = "occurs";

	this.defaultValue = _dValue;
	this.use = _use;

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
					return new OccursRule(dvalue , use , min , max);
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
