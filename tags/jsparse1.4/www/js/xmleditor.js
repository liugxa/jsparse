

//*******************************************************************************
//interfaces
//*******************************************************************************

function ISchema2HtmlForm(_domTree , _handle){

	this.layout = function(){}
	
	this.addElement = function(_fid , _eName){}
	this.addElementAtFirst = function(_id , _eName){}
	this.addElementAtLast = function(_id , _eName){}
	this.removeElement = function(_id){}

	this.toXml = function(){}
}


function DefaultSchema2HtmlForm(_domTree , _handle){

	//Public propertys
	//***************************************************************************
	var domTree = _domTree;
	var handle = _handle;

	//Public methods
	//***************************************************************************
	//print all elements
	this.layout = function(){

		var root = domTree.getRoot();
		
		//layer-0
		_printRoot(root);
		
		//layer-1
		for(var i=0;i<root.childrens.length;i++){
			var child = root.childrens[i];
			_printElement(child , 1);
		}
	}

	this.addElement = function(_fid , _eName){
		//default add new element at the last of the army?
		this.addElementAtLast(_fid , _eName);
	}
	
	this.addElementAtFirst = function(_id , _eName){
		
		/* todo: this feature will be implementd in the next version!
		var e = domTree.getElement(_id);
		if(domTree.enableAdd(_id , _eName)){

			var th = document.getElementById(_HTML_ELEMENT_TR + "-" + (_id + 1));
			if(th != null){
				var e = domTree.addElement(_id , _eName);

				var input = document.getElementById(_HTML_ELEMENT_INPUT + "-" + _id + "-i");
				var flayer = eval(input.value);
				
				//alert("insert element[" + _id  + "] in id = " + (_id + 1));
				_insertBeforeElement(_id + 1 , e , flayer + 1);
			}else{
				this.addElementAtLast(_id , _eName);
			}
		}else{
			throw "validate failure?! can not add these element[" + _eName + "]!!";
		}
		*/
	}
	
	_changeTrOrder = function(_tr1Id , _tr2Id){

		var target0 = document.getElementById(_HTML_ELEMENT_TR + "-" +  _tr1Id + "-end");
		var target1 = document.getElementById(_HTML_ELEMENT_TR + "-" +  _tr2Id + "-end");

		handle.insertBefore(target0 , target1);		
	}

	this.addElementAtLast = function(_id , _eName){
		
		var f = domTree.getElement(_id);
		if(domTree.enableAdd(_id , _eName)){

			//get the next element's id on the layer.
			var childrens = f.getChildrens();
			var length = childrens.length;
			var lastElement = childrens[length-1];

			var e = domTree.addElement(_id , _eName);
			var layerId = e.layer;
			
			//change the order
			var target0 = document.getElementById(_HTML_ELEMENT_TR + "-" +  lastElement.id + "-end");
			var tr = _getLastTrGroup(e);
			var target1 = handle.insertBefore(tr , target0)
			handle.insertBefore(target0 , target1);
			

			//print element 
			var etr = _elementToTr(e , layerId);
			handle.insertBefore(etr , target1);		

			//print element's attribute
			var atts = e.attributes;
			//alert("atts.length=" + atts.length);
			for(var j=0 ; j < atts.length ; j++){
				var attr = atts[j];
				handle.insertBefore(_attributeToTr(attr , layerId) , target1);
			}
			//alert(domTree.getElements());
		}else{
			throw "validate failure?! can not add these element[" + _eName + "]!!";
		}
	}

	this.removeElement = function(_id){

		var e = domTree.getElement(_id);
		if(domTree.enableRemove(_id)){

			//make the element invisibility
			_removeElement(e);

			//remove it!
			domTree.removeElement(_id);
			
		}else{
			throw "validate failure?! can not remove these element[" + e.name + "]!!";
		}
	}

	this.toXml = function(){
		alert(this.xmlDoc.xml);
		alert("save the dom tree - > <xml></xml>");
	}

	//Private methods
	//***************************************************************************
	_printRoot = function(_r){
		_printElementItem(_r , 0);
	}

	_printElement = function(_element , _layerId){

		_printElementItem(_element , _layerId);
		
		//print it's childrens
		var childrens = _element.childrens;
		for(var i=0;i<childrens.length;i++){
			_printElement(childrens[i] , _layerId + 1);
		}
	}

	_printElementItem = function(_element , _layerId){

		var target = _getLastTrGroup(_element);
		handle.appendChild(target);

		//print element 
		var etr = _elementToTr(_element , _layerId);
		handle.insertBefore(etr , target);		

		//print element's attribute
		var atts = _element.attributes;
		//alert("atts.length=" + atts.length);
		for(var j=0 ; j < atts.length ; j++){
			var attr = atts[j];
			handle.insertBefore(_attributeToTr(attr , _layerId) , target);
		}
	}

	_getLastTrGroup = function(_element){
		var tr = createHtmlElement(_HTML_ELEMENT_TR);
		tr.id = _HTML_ELEMENT_TR + "-" +  _element.id + "-end";
		//tr.className = _HTML_CLASS_PARAM_ROW_XMLL + "1";
		
		//<tr> has seven <td> nodes
		var td = new Array(7);
		for(var i=0;i<td.length;i++){
			td[i] = createHtmlElement(_HTML_ELEMENT_TD);
			//td[i].className = _HTML_CLASS_CONTROL_ROW;
			//td[i].appendChild(createHtmlTextElement(tr.id));
			tr.appendChild(td[i]);
		}
		return tr;
	}

	// Set invisibility of the row and it's childrens
	_removeElement = function(_element){

		//remove all the children elements
		var childrens = _element.getChildrens();
		for(var i=0;i<childrens.length;i++){
			var child = childrens[i];
			_removeElement(child);
		}

		//remove all attributes
		var attributes = _element.attributes;
		for(var j=0;j<attributes.length;j++){
			var attr = attributes[j];

			var prefix = "-" + _element.getId() + "-" + attr.id + "-a";
			var ah = document.getElementById(_HTML_ELEMENT_TR + prefix);
			handle.removeChild(ah);
		}

		//remove the last tr
		var lastTr = document.getElementById(_HTML_ELEMENT_TR + "-" +  _element.id + "-end");
		handle.removeChild(lastTr);

		//remove itself
		var ch = document.getElementById(_HTML_ELEMENT_TR + "-" + _element.getId());
		handle.removeChild(ch);

	}

	_elementToTr = function(_element , _layer){
		
		//print element information
		//alert("print element[" + _element.name + "] on the layer [" + _layer + "]");
		var prefix = "-" + _element.id;
		
		var tr = createHtmlElement(_HTML_ELEMENT_TR);
		if(_element.state == "new"){
			tr.className = _HTML_CLASS_CONTAINER_ROW_XMLL + (_layer + 1);
		}else{
			tr.className = _HTML_CLASS_CONTAINER_ROW_DEFAULTL + (_layer + 1);
		}
		tr.id = _HTML_ELEMENT_TR + prefix;
		//tr.onclick = function() {closeTr(this);};
	
		//<tr> has seven <td> nodes
		var td = new Array(7);
		for(var i=0;i<td.length;i++){
			td[i] = createHtmlElement(_HTML_ELEMENT_TD);
		}

		//<td>s
		var img = createHtmlElement(_HTML_ELEMENT_IMG);
		img.src = _HTML_ELEMENT_IMG_OPEN_SRC;
		img.id = _HTML_ELEMENT_IMG + prefix + "-i";
		//bother!!
		//img.alt = _HTML_IMG_ALT;
		img.width = _HTML_ELEMENT_IMG_DEFAULT_WIDTH;
		img.height = _HTML_ELEMENT_IMG_DEFAULT_HEIGHT;
		img.onclick = function(){ec(_element);};

		/*var input = createHtmlElement(_HTML_ELEMENT_INPUT);
		input.id = _HTML_ELEMENT_INPUT + prefix + "-i";
		input.type = "hidden";
		input.value = _layer;*/

		//
		td[0].className = _HTML_CLASS_CONTROL_ROW;
		td[0].appendChild(img);
		//td[0].appendChild(input);
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
		return tr;
	}
	_attributeToTr = function(_attribute , _layer){
		
		var prefix = "-" + _attribute.getElement().id + "-" + _attribute.id + "-a";
		
		//print <tr> nodes
		var tr = createHtmlElement(_HTML_ELEMENT_TR);
		tr.id = _HTML_TR + prefix;
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
		return tr;
	}
	_getActionOptions = function(_element , _prefix){

		// Select object default information.
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

		// Current element operations scope
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
		
		// Current element's childrens operations scope.
		// Such as insert new Children node etc. 
		//alert("element[" + _element.name + "].childrens.length=" + _element.childrens.length);
		var childElements = domTree.getAllAvailChildrens(_element.name);
		//var childElements = _element.childrens;
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
		return select;	
	}

}

/*
//*******************************************************************************
//Test cases
//*******************************************************************************
var s2f = null;
function _Test(){

	//Private propertys
	//***************************************************************************
	var XML_FILE = "../xml/ApplicationProfile.xml";
	var SCHEMA_FILE = "../xml/ApplicationProfile.xsd";

	var reader = null;
	var domTree = null;

	//Construction
	//***************************************************************************
	this.init = function(){
		try{
			var fname = "setUp";
			reader = new DefaultDomTreeReader();
			reader.init(XML_FILE , SCHEMA_FILE);

			domTree = new DefaultDomTree(reader);
			domTree.init("Profile");

			var tbody = document.getElementById("resourcePlanTable").tBodies[0];			
			s2f = new DefaultSchema2HtmlForm(domTree , tbody);
			//alert(s2f.domTree.record);

			if(s2f == null && s2f.domTree == null){
				_alertFailure(fname);
			}else{
				_alertSuccess(fname);
			}
		}catch(e){
			_alertException(fname , e);
		}
	}

	this.testLayout = function(){
		try{
			var fname = "testLayout";
			s2f.layout();
		}catch (e){
			_alertException(fname , e);
		}
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
*/