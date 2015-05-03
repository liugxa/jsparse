

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


