



/**
* The NomralSchemaParse implements ISchemaParse by use the DOM object's method.
**/
function NomralSchemaParse(){


	//Public functions
	//*********************************************************************
	
	this.findRootElementNode = function(){
		return this.findAllElements()[0];
	}

	//Find all elements
	//return	ElementNode - if find it , return all elements otherwise return empty array object
	this.findAllElementNodess = function(){
		
		var r = new Array();
		var elements = _xmlDoc.getElementsByTagName(_SCHEMA_ELEMENT);
		
		//alert("find node" + _SCHEMA_ELEMENT + " | elements.length->"+ elements.length);
		for(var i=0;i<elements.length;i++){
			//function Element(_id , _name , _type , _shadow){
			var element = elements[i];
			var name = element.getAttribute(_SCHEMA_ELEMENT_NAME);
			var type = element.getAttribute(_SCHEMA_ELEMENT_TYPE);
			
			var nodes = new Element(i , name , type , element);
			r.push(nodes);
		}
		return r;
	}

	//Find element
	//@ elementName		- the name of the element
	//return			- if find it,return this element otherwise return null object
	this.findElementNodeByName = function(_elementName){
		
		var r = null;
		var elementNodes = this.findAllElements();
		
		if(_elementName != ""){
			for(var i=0;i<elementNodes.length;i++){
				if(_elementName == elementNodes[i].name){
					return elementNodes[i];
				}
			}
		}
		else{
			r = elementNodes;
		}

		return r;
	}
	this.findElementNodeAttributes = function(_element){
		
		var r = new Array();
		var attributes = _findAttributeNodesOfElement(_node);
		
		for(var i=0;i<attributes.length;i++){
			var attr = attributes[i];
			
			//function Attribute(_id , _name , _type , _shadow){
			var name = attr.getAttribute(_SCHEMA_ELEMENT_ATTR_NAME);
			var type = attr.getAttribute(_SCHEMA_ELEMENT_ATTR_TYPE);
			var a = new Attribute(i , name ,type , attr);
			r.push(a);
		}
		
		return r;
	}
	//Find element's childrens
	//@ elementName		- the element object
	//return			- if find it return this element's childrens otherwise return empty Array object	
	this.findElementChildrens = function(_element){

		var r = new Array();
		if(_element != null){
			
			var sNode = _findSequenceNodeOfElement(_element);
			for(var i=0;i<sNode.childNodes.length;i++){
				if(sNode.childNodes[i].nodeName == _SCHEMA_ELEMENT){
					r.push(sNode.childNodes[i]);
				}
			}
		}
		else{
			throwException("Error:the element is null!!");
		}

		return r;
	}
	
	//do not test this function
	//todo:will be finished in next day 2006.07.23
	this.findElementRule = function(_element){
		
		var minOccurs = _element.getAttribute(_SCHEMA_ELEMENT_MINOCCURS);
		var maxOccurs = _element.getAttribute(_SCHEMA_ELEMENT_MAXOCCURS);

		//but u must supply the chilerens number of the element to rule;
		var cn = this.findElementChildrens(_element).length;
		
		var rule = new OccursRule(cn , minOccurs ,maxOccurs);
		return rule;
	}

	//do not test this function
	//todo:will be finished in next day 2006.07.23
	this.findElementAttributeRule = function(_element , _attributeName){
		var attributeNodes = _findAttributeNodesOfElement(_element);

		//find the attribute which name is equal to the parameter - _attributeName;
		var aNode = null;
		for(var i=0;i<attributeNodes.length;i++){
			if(attributeNodes[i].getAttribute(_SCHEMA_ELEMENT_ATTR_NAME) == _attributeName){
				aNode = attributeNodes[i];
				break;
			}
		}
		//if the element don't have the attribte throw exception!
		if(aNode == null){
			throw "Exception:the element do NOT have this attribute[" + _attributeName + "]";
		}

		//examine the node's type
		var type = aNode.getAttribute(_SCHEMA_ELEMENT_ATTR_TYPE);
		var use = aNode.getAttribute(_SCHEMA_ELEMENT_ATTR_USE);
		if(type == _SCHEMA_ELEMENT_ATTR_TYPE_STRING || type == _SCHEMA_ELEMENT_ATTR_TYPE_NORMALIZED_STRING){
			return new StringRule(use);
		}

		if(type == _SCHEMA_ELEMENT_ATTR_TYPE_POSITIVE_INTEGER){
			return new IntegerRule(use);
		}
		
		//TODO:add other rules


	}

	//do not test this function
	//todo:will be finished in next day 2006.07.23
	this.findElementAttributeRules = function(_element){

		var attributeNodes = _findAttributeNodesOfElement(_element);
		
		//TODO:next version will relize.


		return attributeNodes;

	}


	this.createElement = function(_felement , _celement){
		
		if(_felement != null){
			//find the element's rule
			var rule = this.findElementRule(_felement);
			if(rule != null){
				
				//judge whether or not to execute the create operation by use the rule's validate method.
				var v = rule.validate();

				if(v){
					//TODO:add the element into xml file.
					
				}
				else{
					throwException("Excpetion:can't add the element!");			
				}
			}
			else{
				throwException("Excpetion:can't find the element's rules!");	
			}
		}
		else{
			throwException("Error:the element is null!!");
		}
	}


	this.deleteElement = function(_felement , _celement){

		if(_felement != null){

			//find the element's rule
			var rule = this.findElementRule(_felement);
			if(rule != null){
				
				//judge whether or not to execute the create operation by use the rule's validate method.
				var v = rule.validate();

				if(v){
					//TODO:delete the element into xml file.
					
				}
				else{
					throwException("Excpetion:can't add the element!");			
				}
			}
			else{
				throwException("Excpetion:can't find the element's rules!");	
			}
		}
		else{
			throwException("Error:the element is null!!");
		}

	}

	//TODO: next version will realize
	this.modifyElement = function(_felement , _celement){
		if(_felement != null){

			//find the element's rule
			var rules = this.findElementAttributeRules(_felement);
			
			for(var i=0;i<rules.length;i++){

				//judge whether or not to execute the create operation by use the rule's validate method.
				var v = rules[i].validate();

				if(v){
					//TODO: modify the element in the xml file!
					
				}
				else{
					throwException("Excpetion:can't modify the element with the attribute!");			
				}
			}
		}
		else{
			throwException("Error:the element is null!!");
		}
	}

	this.modifyElementAttribute = function(_element , _attributeName , _value){
		
		if(_element != null){

			//find the element's rule
			var rule = this.findElementAttributeRule(_element , _attributeName);
			
			//judge whether or not to execute the create operation by use the rule's validate method.
			var v = rule.validate(_value);

			if(v){
				//TODO: modify the element in the xml file!
					
			}
			else{
				throwException("Excpetion:can't modify the element with the attribute!");			
			}
		}
		else{
			throwException("Error:the element is null!!");
		}

	}


	//Private functions
	//*********************************************************************
	//
	_findElementByName = function(_elementName){
		
		var r = null;
		var elements = _xmlDoc.getElementsByTagName(_SCHEMA_ELEMENT);
		
		//alert("find node" + _SCHEMA_ELEMENT + " | elements.length->"+ elements.length);
		for(var i=0;i<elements.length;i++){
			//function Element(_id , _name , _type , _shadow){
			if(_elementName == elements[i].getAttribute(_SCHEMA_ELEMENT_NAME)){
				return elements[i];
				break;
			}
		}
		return r;
	}
	_findSequenceNodeOfElement = function(_element){

		//if(_DEBUG) alert("_element.childNodes[0]=" + _element.childNodes[0].nodeName + "|_element.childNodes[0].childNodes[0]=" + _element.childNodes[0].childNodes[0].nodeName);
		return _element.childNodes[0].childNodes[0];
	}
	
	_findAttributeNodesOfElement = function(_node){
		
		var r = new Array();
		var element = _findElementByName(_node.name);
		
		var ctNodes = _element.childNodes[0].childNodes;
		
		for(var i=0;i<ctNodes.length;i++){
			if(ctNodes[i].nodeName == _SCHEMA_ATTRIBUTE){
				r.push(ctNodes[i]);
			}
		}
		return r;
	}
}




//*******************************************************************************
//Test cases
//*******************************************************************************

function _TestSchemaParse(){

	this.init = function(){
		_xmlDoc = createXMLDoc();
		_xmlDoc.load("ApplicationProfile.xsd");
	}

	this.testFindRootElement = function(){
		
		var _fname = "testFindRootElement";
		var parse = new NomralSchemaParse();
		var element = parse.findRootElement();

		if(element.name == "Profile"){
			_alertSuccess(_fname);
		}
		else{
			_alertFailure(_fname);
		}
	}

	this.testFindElementByName = function(){
		var _fname = "testFindElementByName";
		var parse = new NomralSchemaParse();
		var element = parse.findElementByName("Service");
		if(element != null){
			_alertSuccess(_fname);
		}
		else{
			_alertFailure(_fname);
		}
			
	}


	this.testFindElementAttributes = function(){
		var _fname = "testFindElementAttributes";
		var parse = new NomralSchemaParse();
		var element = parse.findElementByName("Consumer");

		if(element != null){

			var attris = parse.findElementAttributes(element);
			
			if(attris.length == 15 && 
				attris[0].getAttribute("name") == "applicationName" && 
				attris[14].getAttribute("name") == "flushDataAsap" ){
				_alertSuccess(_fname);
			}
			else
			{
				_alertFailure(_fname);
			}			
		}
		else{
			_alertRetest(_fname);
		}

	}

	testFindElementChildrens = function(){
		var _fname = "testFindElementChildrens";
		var parse = new NomralSchemaParse();
		var element = parse.findRootElement("Service");

		if(element != null){
			var childs = parse.findElementChildrens(element);
			if(childs.length == 4 ){
				_alertSuccess(_fname);
			}
			else{
				_alertFailure(_fname);
			}
		}
		else{
			_alertRetest(_fname);
		}
	}
	testFindElementAttributeRules = function(){
		var _fname = "testFindElementAttributeRules";
		var parse = new NomralSchemaParse();
		var element = parse.findElementByName("Service");

		if(element != null){

			var aNodes = parse.findElementAttributeRules(element , "");
			
			if(aNodes.length == 3 && aNodes[0].getAttribute("name") == "name" && aNodes[1].getAttribute("name") == "description" && aNodes[2].getAttribute("name") == "deploymentTimeout"){
				_alertSuccess(_fname);
			}
			else
			{
				_alertFailure(_fname);
			}			
		}
		else{
			_alertRetest(_fname);
		}

	}

	testFindElementAttributeRule = function(){

		var _fname = "testFindElementAttributeRule";
		try
		{
			var parse = new NomralSchemaParse();
			var element = parse.findElementByName("Service");

			if(element != null){

				var r = parse.findElementAttributeRule(element , "name" , "newname");
				
				if(r){
					_alertSuccess(_fname);
				}
				else
				{
					_alertFailure(_fname);
				}
							
			}
			else{
				_alertRetest(_fname);
			}
		}
		catch (e)
		{
			_alertException(_fname , e);
		}

	}

	testCreateElement = function(){

		var _fname = "testCreateElement";
		var parse = new NomralSchemaParse();
		var element = parse.findElementByName("Service");

		if(element != null){
			try
			{
				parse.createElement(element , "");

				//TODO:validate wheter the element has be added into the xml file?


				_alertSuccess(_fname);
			}
			catch(e){
				_alertException(_fname , e);			
			}
			
		}
		else{
			_alertRetest(_fname);
		}
	}

	testDeleteElement = function(){

		var _fname = "testDeleteElement";
		var parse = new NomralSchemaParse();
		var element = parse.findElementByName("Service");

		if(element != null){
			try
			{
				parse.deleteElement(element , "");

				//TODO:validate wheter the element has be deleted from the xml file?

				_alertSuccess(_fname);
			}
			catch(e){
				_alertException(_fname , e);
			}			
		}
		else{
			_alertRetest(_fname);
		}
	}

}



//*******************************************************************************
//Test:
//*******************************************************************************
if(_DEBUG_PARSE) autoTest();
function autoTest(){
	var test = new _TestSchemaParse();
	for (var property in test) {
		//alert(property + ":" + test[property]);
		if(test[property] instanceof Function){
			test[property]();
		}
	}
}