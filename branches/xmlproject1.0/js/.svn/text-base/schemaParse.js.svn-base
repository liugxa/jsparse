


/**
* @ interface - ISchemaParse
* The schema parse interface
* @ See Also
* NomralSchemaParse DomTreeShemaParse	 
**/
function ISchemaParse(){
	
	/*
	//actions
	this.enableCreateElement = function(_eName , _cName){}
	this.enableDeleteElement = function(_eName , _dName){}
	*/

	//find element
	this.findRootElement = function(){}
	this.findElementByName = function(_elementName){}
	
	//find element's chidlrens
	this.findElementChildrens = function(_elementName){}
	
	//find element's attributes
	this.findElementAttribute  = function(_elementName , _attributeName){}
	this.findElementAttributes = function(_elementName){}
	
	//find element & attribute's rule
	this.findElementRule = function(_elementName){}
	this.findElementAttributeRule = function(_elementName , _attributeName){}

}

/**
* The NomralSchemaParse implements ISchemaParse by use the DOM object's method.
**/
function NomralSchemaParse(_sXmlDoc){

	this.sXmlDoc = _sXmlDoc;

	//Public functions
	//*********************************************************************
	this.findRootElement = function(){
		return this.findElementByName("")[0];
	}

	this.findAllElements = function(){
		return this.findElementByName("");
	}

	//Find element
	//@ elementName		- the name of the element
	//return			- if find it,return this element otherwise return null object
	this.findElementByName = function(_elementName){
		
		var r = null;
		var elements = this.sXmlDoc.getElementsByTagName(_SCHEMA_XSD + _SCHEMA_ELEMENT);
		//alert("elements.length=" + elements.length);

		if(_elementName != ""){
			//alert("find node" + _SCHEMA_ELEMENT + " | elements.length->"+ elements.length);
			for(var i=0;i<elements.length;i++){
				var name = elements[i].getAttribute(_SCHEMA_ELEMENT_ATTR_NAME);
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

	//Find element's childrens
	//@ elementName		- the element object
	//return			- if find it return this element's childrens otherwise return empty Array object	
	this.findElementChildrens = function(_elementName){

		var r = new Array();
		var element = this.findElementByName(_elementName);
		if(element != null){	
			var sNode = _findSequenceNodeOfElement(element);
			for(var i=0;i<sNode.childNodes.length;i++){
				if(sNode.childNodes[i].nodeName == (_SCHEMA_NS + _SCHEMA_ELEMENT)){
					r.push(sNode.childNodes[i]);
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
			if(_attributeName == attributeNodes[i].getAttribute(_SCHEMA_ELEMENT_ATTR_NAME)){
				r = attributeNodes[i];
				break;
			}
		}
		return r;
	}

	this.findElementRule = function(_elementName){
		var element = this.findElementByName(_elementName);
		if(element != null){
			var minOccurs = element.getAttribute(_SCHEMA_ELEMENT_MINOCCURS);
			var maxOccurs = element.getAttribute(_SCHEMA_ELEMENT_MAXOCCURS);
			return new OccursRule(minOccurs ,maxOccurs);
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
	//
	/*
	this.removeTextNodes = function(_element){
		var cNodes = _element.childNodes;
		if(cNodes != _UNDEFINED){
			alert("cNodes.length=" + cNodes.length);
			for(var i=0;i<cNodes.length;i++){
				alert("cNodes[" + i + "].nodeType = " + cNodes[i].nodeType);
				
				if(cNodes[i].nodeType == 3){
					try
					{
						cNodes.splice(i , 1);
						alert(cNodes.length);	
					}catch (e)
					{
						alert(e.message);
					}
				}else{
					alert("continue remove text nodes!");
					this.removeTextNodes(cNodes[i]);
				}
			}
		}
	}*/

	_findSequenceNodeOfElement = function(_element){
		
		//In firefox browser , the blank is considered a node which name is "#text";
		//So we should eliminate this text nodes.
		var ecNodes = _element.childNodes;
		for(var i=0;i<ecNodes.length;i++){
			if(ecNodes[i].nodeType != 3){
				//find the <xs:complexType> node
				var cNodes = ecNodes[i].childNodes;
				for(var j=0;j<cNodes.length;j++){
					if(cNodes[j].nodeType != 3){
						//find the <xs:sequence> node
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
			if(ecNodes[i].nodeType != 3){
				//find the <xs:complexType> node
				var cNodes = ecNodes[i].childNodes;
				for(var j=0;j<cNodes.length;j++){
					//alert(cNodes[j].nodeType + "|" + cNodes[j].nodeName + "|" + _SCHEMA_NS + _SCHEMA_ATTRIBUTE);
					if(cNodes[j].nodeType != 3 && cNodes[j].nodeName == (_SCHEMA_NS + _SCHEMA_ATTRIBUTE)){
						r.push(cNodes[j]);
					}
				}
			}
		}
		return r;
	}
}




//*******************************************************************************
//Test cases
//*******************************************************************************
var parse = null;
function _Test(){
	
	this.init = function(){
		sXmlDoc = XmlDocument.create();
		sXmlDoc.async = false;
		sXmlDoc.load("../xml/ApplicationProfile.xsd");
		parse = new NomralSchemaParse(sXmlDoc);
	}

	this.testFindRootElement = function(){
		
		var fname = "testFindRootElement";
		var element = parse.findRootElement();

		if(element.getAttribute("name") == "Profile"){
			_alertSuccess(fname);
		}else{
			_alertFailure(fname);
		}
	}

	this.testFindElementByName = function(){
		var fname = "testFindElementByName";
		var element = parse.findElementByName("Service");
		if(element != null){
			_alertSuccess(fname);
		}else{
			_alertFailure(fname);
		}
			
	}

	this.testFindElementChildrens = function(){
		var fname = "testFindElementChildrens";

		var childs = parse.findElementChildrens("Service");
		if(childs.length == 2 ){
			_alertSuccess(fname);
		}else{
			_alertFailure(fname);
		}
	}
	this.testFindElementAttributes = function(){
		var fname = "testFindElementAttributes";
		var attris = parse.findElementAttributes("Consumer");
			
		if(attris.length == 15 && 
			attris[0].getAttribute("name") == "applicationName" && 
			attris[14].getAttribute("name") == "flushDataAsap" ){
			_alertSuccess(fname);
		}else{
			_alertFailure(fname);
		}	
	}


	this.testFindElementAttributeRules = function(){
		var fname = "testFindElementAttributeRules";
		var element = parse.findElementByName("Service");

		if(element != null){

			var aNodes = parse.findElementAttributeRules(element , "");
			
			if(aNodes.length == 3 && aNodes[0].getAttribute("name") == "name" && aNodes[1].getAttribute("name") == "description" && aNodes[2].getAttribute("name") == "deploymentTimeout"){
				_alertSuccess(fname);
			}else{
				_alertFailure(fname);
			}			
		}
		else{
			_alertRetest(fname);
		}

	}
	this.testFindElementAttribute = function(){
		var fname = "testFindElementAttribute";

		var attribute = parse.findElementAttribute("Consumer" , "applicationLingerTime");
		if(attribute != null){
			_alertSuccess(fname);
		}else{
			_alertFailure(fname);
		}

	}

	this.testFindElementAttributeRule = function(){

		var fname = "testFindElementAttributeRule";
		var rule = parse.findElementAttributeRule("Consumer" , "applicationLingerTime");
		
		//alert(rule.name + "|" + rule.min + "|" + rule.max);
		if(rule.name == "occurs" && rule.min == 0 && rule.max == 2147483647){
			_alertSuccess(fname);
		}else{
			_alertFailure(fname);
		}
	}

	this.testFindElementRule = function(){
		var fname = "testFindElementRule";
		try{
			var rule = parse.findElementRule("Service");

			if(rule.name == "occurs"){
				_alertSuccess(fname);
			}else{
				_alertFailure(fname);
			}
		}catch(e){
			_alertException(fname , e);			
		}			
	}

	this.tearDown = function(){
		var fname = "tearDown";
		sXmlDoc = null;
		parse = null;
		_alertSuccess(fname);
	}
}


//*******************************************************************************
//Test:
//*******************************************************************************
if(_DEBUG_PARSE) autoTest();
function autoTest(){
	var test = new _Test();
	for (var property in test) {
		if(test[property] instanceof Function){
			test[property]();
		}
	}
}