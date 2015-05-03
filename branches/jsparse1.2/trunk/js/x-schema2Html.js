

function ISchema2HtmlForm(_handle , _treef){
	
	//initialize
	this.initDomTree = function(){};
	
	//layout
	this.printContent = function(){};
	this.printElement = function(_element , _layer){};
	this.printAttribute = function(_element , _layer){};

	//operates "xe == XElement"
	this.insertElement = function(_fTreeCode , _elementName){}
	this.removeElement = function(_treeCode){}
	this.toXml = function(){};
}

//*********************************************************************
//Schema2HtmlForm
//*********************************************************************
function Schema2HtmlForm(_xmlDoc , _parse , _handle){
	
	this.xmlDoc = _xmlDoc;
	this.parse = _parse;
	this.handle = _handle;

	//------------------------------------------------------------------
	//Public functions
	//------------------------------------------------------------------
	this.domTree = null;
	
	this.initDomTree = function(){
		if(this.xmlDoc == null) throwException("Excepton:The xml doc is not exist!!");
		if(this.parse == null) throwException("Excepton:The parse is not exist!!");

		var domTree = new DefaultDomTree(this.xmlDoc , this.parse);
		domTree.initTree();

		this.domTree = domTree;
	}


	//print all elements
	this.printContent = function(){

		var root = this.domTree.getRoot();
		
		//layer-0
		this.printLeafElement(root , 0);

		//layer-1
		for(var i=0;i<root.childrens.length;i++){
			var child = root.childrens[i];

			this.printElements(child , 1);
		}
	}

	//printElement
	this.printElements = function(_element , _layer){
		
		//alert("print element[" + _element + "] on the layer[" + _layer + "]!");
		this.printLeafElement(_element , _layer);

		//print it's childrens
		var childrens = _element.childrens;
		if(childrens.length >0){
			for(var i=0;i<childrens.length;i++){
				_layer++;
				this.printElements(childrens[i] , _layer);
			}
		}
	}

	//printElement
	this.printLeafElement = function(_element , _layer){

		//print element  
		_elementToHtml(this.handle , _element , _layer);				
		
		//print element's attribute
		var atts = _element.attributes;
		for(var j=0 ; j < atts.length ; j++){
			var attr = atts[j];
			_attributeToHtml(this.handle , attr , _layer);
		}
	}

	//insert new element which name be defined in the xml schema file
	this.insertElement = function(_fTreeCode , _elementName){
		
		var e = this.domTree.addElement(_fTreeCode , _elementName);
		
		//todo: 
		var layer = 1;
		this.printElement(e , layer);
	}


	this.removeElement = function(_treeCode){
		
		var e = this.domTree.findElement(_treeCode);
		//todo:remove the element from the dom tree;




		//make the element invisibility
		_removeElement(this.handle , e);
	}

	this.toXml = function(){
		alert(this.xmlDoc.xml);
		alert("save the dom tree - > <xml></xml>");
	}

	//------------------------------------------------------------------
	//Private functions
	//------------------------------------------------------------------
	//elementToHtml

	// Set invisibility of the row and it's childrens
	_removeElement = function(_handle , _element){
		
		//remove all the children elements
		var childrens = _element.childrens;

		if(childrens.length >0){
			for(var i=0;i<childrens.length;i++){
				var child = childrens[i];
				_removeElement(_handle , child);

				//remove this element;
				var ch = document.getElementById("rowConsumer" + child.treeCode);
				_handle.removeChild(ch);
			}
		}else{

			//remove all attributes
			var attributes = _element.attributes;
			for(var j=0;j<attributes.length;j++){
				var attr = attributes[j];

				var prefix = attr.getElement().treeCode + "-" + attr.id + "-a";
				var ah = document.getElementById("rowConsumer" + prefix);

				_handle.removeChild(ah);
			}
		}

		//remove itself
		var ch = document.getElementById("rowConsumer" + _element.treeCode);
		_handle.removeChild(ch);

	}

	_elementToHtml = function(_handle , _element ,_layer){
		
		//print element information
		var prefix = _element.treeCode;
		
		var tr = createHtmlElement(_HTML_ELEMENT_TR);
		if(_element.state == "new"){
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
		img.src = _HTML_ELEMENT_IMG_OPEN_SRC;
		img.id = _HTML_IMG_ID + prefix + "-i";
		//bother!!
		//img.alt = _HTML_IMG_ALT;
		img.width = _HTML_ELEMENT_IMG_DEFAULT_WIDTH;
		img.height = _HTML_ELEMENT_IMG_DEFAULT_HEIGHT;
		img.onclick = function(){ec(_element , this);};

		var input = createHtmlElement(_HTML_ELEMENT_INPUT);
		input.id = _HTML_INPUT_ID + prefix + "-f-0";
		input.type = "hidden";
		
		//
		td[0].className = _HTML_CLASS_CONTROL_ROW;
		td[0].appendChild(img);
		td[0].appendChild(input);
		td[1].className = _HTML_CLASS_PARAMNAME;
		
		//element name
		td[1].appendChild(createHtmlTextElement(_element.name));
		
		td[3].className = _HMTL_CLASS_PARAM_VALUE_DEFAULT;
		td[4].className = _HMTL_CLASS_PARAM_VALUE_DEFAULT;
		
		//requirements
		td[4].appendChild(createHtmlTextElement("required"));

		//source
		//The element's property ("state") indicate where it came from.
		var source = "Profile";
		if(_element.state == "new") source="Default";
		td[5].appendChild(createHtmlTextElement(source));
		
		//actions
		var select = _getActionOptions(_element , prefix);
		td[6].appendChild(select);
		
		//print all tags
		for(var i=0;i<td.length;i++){
			tr.appendChild(td[i]);
		}
		_handle.appendChild(tr);
	}
	
	//attributeToHtml
	_attributeToHtml = function(_handle , _attribute , _layer){

		var prefix = _attribute.getElement().treeCode + "-" + _attribute.id + "-a";
		
		//print <tr> nodes
		var tr = createHtmlElement(_HTML_ELEMENT_TR);
		tr.id = _HTML_TR_ID + prefix;
		if(_attribute.state == "new"){
			tr.className = _HTML_CLASS_PARAM_ROW_XMLL + (_layer + 2);
		}else{
			tr.className = _HTML_CLASS_PARAM_ROW_DEFAULTL + (_layer + 2);
		}

		//<td> nodes
		var td = new Array(7);
		for(var i=0;i<td.length;i++){
			td[i] = createHtmlElement(_HTML_ELEMENT_TD);
		}

		td[0].className = _HTML_CLASS_CONTROL_ROW;

		td[1].className = _HTML_CLASS_PARAMNAME;
		td[1].appendChild(createHtmlTextElement(_attribute.name));
		
		//<input> node
		var span = createHtmlElement("span");
		span.id = prefix;
		span.appendChild(createHtmlTextElement(_attribute.value));

		td[2].className = _HTML_CLASS_PARAM_VALUE_REQUIRED;
		td[2].appendChild(span);

		//default value
		td[3].className = _HMTL_CLASS_PARAM_VALUE_DEFAULT;		
		
				
		//get rule's informations
		var rule = _attribute.getRule();
				
		td[3].appendChild(createHtmlTextElement(rule.defaultValue==null?"":rule.defaultValue));
		
		//requirements
		td[4].appendChild(createHtmlTextElement(rule.use==null?"":rule.use));
		
		//source?
		td[5].appendChild(createHtmlTextElement(_attribute.state=="new"?"Default":"Profile"));

		//print all tags
		for(var i=0;i<td.length;i++){
			tr.appendChild(td[i]);
		}
		_handle.appendChild(tr);

	}

	_getActionOptions = function(_element , _prefix){

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
		var name = _element.name;
		
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
		
		var childElements = _element.childrens;
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
			sXmlDoc.load("../xml/ApplicationProfile.xsd");
			
			xmlDoc = XmlDocument.create();
			xmlDoc.async = false;
			xmlDoc.load("../xml/ApplicationProfile.xml");

			var parse = new NomralSchemaParse(sXmlDoc);
			//create tree factory
			//treeFactory = new DomTreeFactory(xmlDoc , parse);
			var tbody = document.getElementById("resourcePlanTable").tBodies[0];
			s2f = new Schema2HtmlForm(xmlDoc , parse , tbody);
			s2f.initDomTree();
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