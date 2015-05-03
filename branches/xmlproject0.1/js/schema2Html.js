

function ISchema2HtmlForm(){
	
	//initialize
	this.initDomTree = function(){};
	
	//layout
	this.printContent = function(){};
	this.printElement = function(_xelement){};
	this.printAttribute = function(_xelement){};

	//operates "xe == XElement"
	this.toXml = function(){};
}

//*********************************************************************
//Schema2HtmlForm
//*********************************************************************
function Schema2HtmlForm( _xmlDoc , _parse , _handle){
	
	this.xmlDoc = _xmlDoc;
	this.parse = _parse;
	this.handle = _handle;

	
	this.xroot = null;

	//------------------------------------------------------------------
	//Public functions
	//------------------------------------------------------------------

	//todo:this method will be implemented in the next version
	
	this.initDomTree = function(){

		var root = this.xmlDoc.getElementsByTagName("Profile")[0];
		this.xroot = new XElement(0 , root.nodeName , "-0");

		//now just only display two layers.
		var childrens = root.childNodes;
		for(var i=0;i<childrens.length;i++){
			var children = childrens[i];

			//alert("children[" + i + "].nodeName=" + children.nodeName);
			if(children.nodeType != 3){
				//XElement(_id , _name)
				
				//alert("children.nodeName=" + children.nodeName);
				var xelement = new XElement(i , children.nodeName , "-0-" + i);
				xelement.state="old";
				xelement.setFather(this.xroot);
				this.xroot.addChildren(xelement);
			
				//todo: add xelement's chidrens by use recursion
				
				
				//add it's attributes
				var attributes = children.attributes;
				for(var j=0;j<attributes.length;j++){
					var attr = attributes[j];
					
					if(attr.nodeType != 3){
						//XAttribute(_id , _name)
						var xattr = new XAttribute(j, attr.name , attr.value);
						xattr.state = "old";
						xelement.addAttribute(xattr);
						xattr.setElement(xelement);
					}
				}

				//add other attributes which defined in schema file
				var length = attributes.length;
				var otherAttrs = this.findOtherAttributes(children.nodeName , attributes);
				for(var j=0;j<otherAttrs.length;j++){
					var attr = otherAttrs[j];
					
					//XAttribute(_id , _name)
					var xattr = new XAttribute(length + j, attr.getAttribute("name") , "");
					xattr.state = "new";
					xelement.addAttribute(xattr);
					xattr.setElement(xelement);
				}
			}
		}
		return true;
	}


	this.findOtherAttributes = function(_elementName , _attrs){
		var sAttributes = this.parse.findElementAttributes(_elementName);
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

	//print all elements
	this.printContent = function(){
		
		var layer = 0;
		//test:just only display two layers
		//layer-0
		this.elementToHtml(this.xroot,layer);

		//layer-1
		layer ++;
		var childrens = this.xroot.childrens;
		for(var i=0;i<childrens.length;i++){
			var children = childrens[i];

			//print element
			this.printElement(children , layer);
		}
	}

	//printElement
	this.printElement = function(_xelement , _layer){

		//print element  
		this.elementToHtml(_xelement , _layer);				
		
		//print element's attribute
		var atts = _xelement.attributes;
		for(var j=0 ; j < atts.length ; j++){
			var attr = atts[j];
			this.attributeToHtml(attr , _layer);
		}
	}

	//elementToHtml
	this.elementToHtml = function(_xelement ,_layer){
		
		//print element information
		var prefix = _xelement.treeCode;
		
		var tr = createHtmlElement(_HTML_ELEMENT_TR);
		if(_xelement.state == "new"){
			tr.className = _HTML_CLASS_CONTAINER_ROW_XMLL + (_layer + 1);
		}else{
			tr.className = _HTML_CLASS_CONTAINER_ROW_DEFAULTL + (_layer + 1);
		}
		tr.id = _HTML_TR_ID + prefix;
		//tr.onclick = function() {closeTr(this);};
	
		//<tr> has seven <td> nodes
		var td = new Array(7);
		for(var i=0;i<td.length;i++){
			td[i] = createHtmlElement(_HTML_ELEMENT_TD);
		}

		//<td>s
		var img = createHtmlElement(_HTML_ELEMENT_IMG);
		img.src = _HTML_ELEMENT_IMG_DEFAULT_SRC;
		img.id = _HTML_IMG_ID + prefix + "-i";
		//bother!!
		//img.alt = _HTML_IMG_ALT;
		img.width = _HTML_ELEMENT_IMG_DEFAULT_WIDTH;
		img.height = _HTML_ELEMENT_IMG_DEFAULT_HEIGHT;
		img.onclick = function(){toggleTreeNode(this);};

		var input = createHtmlElement(_HTML_ELEMENT_INPUT);
		input.id = _HTML_INPUT_ID + prefix + "-f-0";
		input.type = "hidden";
		
		//
		td[0].className = _HTML_CLASS_CONTROL_ROW;
		td[0].appendChild(img);
		td[0].appendChild(input);
		td[1].className = _HTML_CLASS_PARAMNAME;
		
		//element name
		td[1].appendChild(createHtmlTextElement(_xelement.name));
		
		td[3].className = _HMTL_CLASS_PARAM_VALUE_DEFAULT;
		td[4].className = _HMTL_CLASS_PARAM_VALUE_DEFAULT;
		
		//requirements
		td[4].appendChild(createHtmlTextElement("required"));

		//source
		//The element's property ("state") indicate where it came from.
		var source = "Default";
		if(_xelement.state == "new") source="Profile";
		td[5].appendChild(createHtmlTextElement(source));
		
		//actions
		var select = this.getActionOptions(_xelement , prefix);
		td[6].appendChild(select);
		
		//print all tags
		for(var i=0;i<td.length;i++){
			tr.appendChild(td[i]);
		}
		this.handle.appendChild(tr);
	}
	
	//attributeToHtml
	this.attributeToHtml = function(_xattribute , _layer){

		var prefix = _xattribute.getElement().treeCode + "-" + _xattribute.id + "-a";

		var tr = createHtmlElement(_HTML_ELEMENT_TR);
		tr.id = _HTML_TR_ID + prefix;
		if(_xattribute.state == "new"){
			tr.className = _HTML_CLASS_PARAM_ROW_XMLL + (_layer + 2);
		}else{
			tr.className = _HTML_CLASS_PARAM_ROW_DEFAULTL + (_layer + 2);
		}


		//<td> nodes
		var td = new Array(7);
		for(var i=0;i<td.length;i++){
			td[i] = createHtmlElement(_HTML_ELEMENT_TD);
		}

		//
		td[0].className = _HTML_CLASS_CONTROL_ROW;

		td[1].className = _HTML_CLASS_PARAMNAME;
		td[1].appendChild(createHtmlTextElement(_xattribute.name));
		
		td[2].className = _HTML_CLASS_PARAM_VALUE_REQUIRED;

		//<input> node
		var span = createHtmlElement("span");
		span.id = prefix;
		span.appendChild(createHtmlTextElement(""));
		
		//
		var name = _xattribute.getElement().name;
		var rule = this.parse.findElementAttributeRule(name , _xattribute.name);
		var defValue = rule.defaultValue;
		var requirements = rule.use;	
		
		//The attribute's property ("state") indicate where it came from.
		var source = "Default";
		var express = rule.express;

		if(defValue == null) defValue = "";
		if(_xattribute.state == "new") source="Profile";

		//default value
		td[3].className = _HMTL_CLASS_PARAM_VALUE_DEFAULT;		
		td[3].appendChild(createHtmlTextElement(defValue));
		
		//requirements
		td[4].appendChild(createHtmlTextElement(requirements));
		
		//source?
		td[5].appendChild(createHtmlTextElement(source));

		//<input> tags
		//todo: The XML editor will initially be implemented as a read-only screen, \
		//editing function will be considered in next release.	
		
		/*

		var input1 = createHtmlElement("input");
		input1.id = prefix + "-default";
		input1.value = defValue;
		input1.type = "hidden";
		
		var input0 = createHtmlElement("input");
		input0.id = prefix + "-requirements";
		input0.value = name;
		input0.type = "hidden";

		var input2 = createHtmlElement("input");
		input2.id = prefix + "-profile";
		input2.value = _xattribute.name;//
		input2.type = "hidden";
		*/
		
		//if the attribute's rule is enumNormalizedString , system will display a <select> tag
		//which container the enumer value
		if(rule.name == "enumNormalizedString"){
			var select  = this.getEnumActionOptions(rule.enumArray , prefix);
			td[2].appendChild(select);
		}else{
			//todo: The XML editor will initially be implemented as a read-only screen, \
			//editing function will be considered in next release.
			td[2].appendChild(span);
			/*
			td[2].appendChild(input0);
			td[2].appendChild(input1);
			td[2].appendChild(input2);
			td[2].onclick = function(){makeInputText(this);};
			*/
		}

		//print all tags
		for(var i=0;i<td.length;i++){
			tr.appendChild(td[i]);
		}
		this.handle.appendChild(tr);

	}

	this.getEnumActionOptions = function(_enumArray , _prefix){

		// Select object default information.
		/////////////////////////////////////////////////////////////////////////
		var select = createHtmlElement("select");
		select.name = "select" + _prefix;
		select.id = "select" + _prefix;				
		//attach event
		
		for(var i=0;i<_enumArray.length;i++){
			var option = createHtmlElement("option");
			//option.selected = "selected";
			option.value = _enumArray[i];
			option.appendChild(createHtmlTextElement(_enumArray[i]));
			select.appendChild(option);
		}
	
		return select;
		/////////////////////////////////////////////////////////////////////////


	}

	this.getActionOptions = function(_xelement , _prefix){

		// Select object default information.
		/////////////////////////////////////////////////////////////////////////
		var select = createHtmlElement("select");
		select.name = "select" + _prefix;
		select.id = "select" + _prefix;				
		//attach event
		select.onchange = function(){selectActions(this);}


		var option0 = createHtmlElement("option");
		option0.selected = "selected";
		option0.value = "Actions";
		option0.appendChild(createHtmlTextElement("Actions"));
		select.appendChild(option0);

		/////////////////////////////////////////////////////////////////////////




		// Current element operations scope
		/////////////////////////////////////////////////////////////////////////
		var name = _xelement.name;
		
		if(name != "Profile"){		
			var option1 = createHtmlElement("option");
			option1.value = "---";
			option1.appendChild(createHtmlTextElement("---"));
			select.appendChild(option1);
			
			/*
			//Ooop! this feature will be implements in the next version!
			var option2 = createHtmlElement("option");
			option2.value = "before";
			option2.appendChild(createHtmlTextElement("Insert:\"" + name + "\" before"));
			select.appendChild(option2);
			
			var option3 = createHtmlElement("option");
			option3.value = "after";
			option3.appendChild(createHtmlTextElement("Insert:\"" + name + "\" after"));
			select.appendChild(option3);
			*/

			var option4 = createHtmlElement("option");
			option4.value = "remove";
			option4.appendChild(createHtmlTextElement("Remove \"" + name + "\""));
			select.appendChild(option4);
		}
		/////////////////////////////////////////////////////////////////////////
		


		// Current element's childrens operations scope.
		// Such as insert new Children node etc. 
		/////////////////////////////////////////////////////////////////////////
		
		var childElements = _xelement.childrens;
		if(childElements.length >0){

			var option5 = createHtmlElement("option");
			option5.value = "---";
			option5.appendChild(createHtmlTextElement("---"));
			select.appendChild(option5);

			var option = new Array();
			for(var i=0;i<childElements.length;i++){
				var name = childElements[i].name;
				
				option[i] = createHtmlElement("option");
				option[i].value = "insert:" + name;

				option[i].appendChild(createHtmlTextElement("Insert \"" + name + "\""));
				select.appendChild(option[i]);
			}
		}
		/////////////////////////////////////////////////////////////////////////

		return select;	
	}

	this.toXml = function(){
		alert(this.xmlDoc.xml);
		alert("save the dom tree - > <xml></xml>");
	}
}

//*******************************************************************************
//Test cases
//*******************************************************************************

var s2f = null;
function _Test(){

	this.setUp = function(){
		try{
			var fname = "setUp";
			
			sXmlDoc = XmlDocument.create();
			sXmlDoc.async = false;
			sXmlDoc.load("ApplicationProfile.xsd");
			
			xmlDoc = XmlDocument.create();
			xmlDoc.async = false;
			xmlDoc.load("ApplicationProfile.xml");

			var parse = new NomralSchemaParse(sXmlDoc);
			var tbody = null;

			var tbody = document.getElementById("resourcePlanTable").tBodies[0];
			s2f = new Schema2HtmlForm(xmlDoc , parse, tbody);
			var r = s2f.initDomTree();
			
			if(r){
				_alertSuccess(fname);
			}else{
				_alertFailure(fname)
			}
		}
		catch(e){
			_alertException(fname , e);
		}

	}
	
	//todo: this method can be tested in the next version
	initDomTree = function(){
		try{
			var fname = "initDomTree";
			
			if(s2f.nodes.length == 5){
				_alertSuccess(fname);
			}
			else{
				_alertFailure(fname);
			}
		}
		catch(e){
			_alertException(fname , e);
		}
	}

	this.testPrintContent = function(){
		try
		{
			var fname = "testPrintContent";
			s2f.printContent();
		}catch (e){
			alert(e.message);
		}
		
		//alert(tbody.innerHTML);
	}

}



//Test:
//*******************************************************************************
if(_DEBUG_2HTML) autoTest();
function autoTest(){
	var test = new _Test();
	for (var property in test) {
		if(test[property] instanceof Function){
			test[property]();
		}
	}
}