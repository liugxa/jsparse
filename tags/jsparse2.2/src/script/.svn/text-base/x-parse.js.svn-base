

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


