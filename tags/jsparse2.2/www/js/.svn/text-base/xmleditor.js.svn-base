


//*******************************************************************************
//interfaces
//*******************************************************************************

function ISchema2HtmlForm(_domTree , _handle){

	this.layout = function(){}
	this.cleanUp = function(){}
	
	this.addElement = function(_fid , _eName){}
	this.addElementAtFirst = function(_id , _eName){}
	this.addElementAtLast = function(_id , _eName){}

	this.removeElement = function(_id){}
	this.closeElement = function(_element){}
	this.openElement = function(_element){}

	this.toXml = function(){}
}

//*******************************************************************************
//DefaultSchema2HtmlForm
//*******************************************************************************
function DefaultSchema2HtmlForm(_domTree , _handle , _imagePrefix){

	//Public propertys
	//***************************************************************************
	var domTree = _domTree;
	var handle = _handle;
	var imagePrefix = _imagePrefix;

	var _this = this;

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

	//remove all emements
	this.cleanUp = function(){
		while(handle.childNodes.length >0){
			var childrens = handle.childNodes;
			for(var i=0;i<childrens.length;i++){
				handle.removeChild(childrens[i]);
			}
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

			var th = document.getElementById(_HTML_TR + "-" + (_id + 1));
			if(th != null){
				var e = domTree.addElement(_id , _eName);

				var input = document.getElementById(_HTML_INPUT + "-" + _id + "-i");
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
			var target0 = document.getElementById(_HTML_TR + "-" +  lastElement.id + "-end");
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

	this.closeElement = function(_element){
		
		var childrens = _element.childrens;
		
		//if child has it's childrens , you should recur invoke this method.
		for(var i=0;i<childrens.length;i++){
			var child = childrens[i];
			this.closeElement(child);

			//close children
			_changeLeafElementStatus(child , "none");
		}
		
		var lastTr = document.getElementById(_HTML_TR + "-" +  _element.id + "-end");
		lastTr.style.display = "none";

		//close the child's attributes
		_changeAttrStatus(_element , "none");
		_changeElementValueStatus(_element , "none");
	}
	
	this.openElement = function(_element){

		var childrens = _element.childrens;
		
		//if child has it's childrens , you should recur invoke this method.
		for(var i=0;i<childrens.length;i++){
			var child = childrens[i];
			
			var imgId = _HTML_IMG + "-" + child.getId() + "-i";
			var imgHandle = document.getElementById(imgId);
			
			if(imgHandle.src.match("open")){
				this.openElement(child);	
			}

			//open children
			_changeLeafElementStatus(child , "");
		}

		var lastTr = document.getElementById(_HTML_TR + "-" +  _element.id + "-end");
		lastTr.style.display = "";

		_changeAttrStatus(_element , "");
		_changeElementValueStatus(_element , "");
	}


	this.toXml = function(){
		return domTree.toXml();
	}

	//Private methods
	//***************************************************************************
	//change leaf element template
	_changeLeafElementStatus = function(_element , _state){
		var prefix = _HTML_TR + "-" + _element.getId();
		var eTr = document.getElementById(prefix);
		
		if(eTr != null){
			eTr.style.display = _state;
		}
	}
	//change attribute template
	_changeAttrStatus = function(_element , _state){
		var attributes = _element.attributes;
		for(var j=0;j<attributes.length;j++){
			var attr = attributes[j];

			var prefix = _HTML_TR + "-" + _element.getId() + "-" + attr.id + "-a";
			//alert("prefix=" + prefix);
			var aTr = document.getElementById(prefix);
			if (aTr != null) aTr.style.display = _state;
		}
	}
	_changeElementValueStatus = function(_element , _state){
		var prefix = _HTML_TR + "-" + _element.getId() + "-v";
		var eTr = document.getElementById(prefix);
		
		if(eTr != null){
			eTr.style.display = _state;
		}
	}

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
			if(attr.display){
				handle.insertBefore(_attributeToTr(attr , _layerId) , target);
			}
		}
	}

	_getLastTrGroup = function(_element){
		var tr = createHtmlElement(_HTML_TR);
		tr.id = _HTML_TR + "-" +  _element.id + "-end";
		//tr.className = _HTML_CLASS_PARAM_ROW_XMLL + "1";
		tr.style.display = "none";

		//<tr> has seven <td> nodes
		var td = new Array(7);
		for(var i=0;i<td.length;i++){
			td[i] = createHtmlElement(_HTML_TD);
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
			var ah = document.getElementById(_HTML_TR + prefix);
			handle.removeChild(ah);
		}

		//remove the last tr
		var lastTr = document.getElementById(_HTML_TR + "-" +  _element.id + "-end");
		handle.removeChild(lastTr);

		//remove itself
		var ch = document.getElementById(_HTML_TR + "-" + _element.getId());
		handle.removeChild(ch);

	}

	_elementToTr = function(_element , _layer){
		
		//print element information
		var prefix = "-" + _element.id;
		
		var tr = createHtmlElement(_HTML_TR);
		tr.className = _HTML_CLASS_CONTAINER_ROW_XMLL + (_layer + 1);
		tr.id = _HTML_TR + prefix;
		//tr.onclick = function() {closeTr(this);};

		//<td>s
		var img = createHtmlElement(_HTML_IMG);
		img.src = imagePrefix + _HTML_ELEMENT_IMG_OPEN_SRC;
		img.id = _HTML_IMG + prefix + "-i";

		//bother!!
		//img.alt = _HTML_IMG_ALT;
		img.width = _HTML_IMG_DEFAULT_WIDTH;
		img.height = _HTML_IMG_DEFAULT_HEIGHT;
		img.onclick = function(){
			if(img.src.match("open")){
				//want to close this element
				_this.closeElement(_element);
				img.src = imagePrefix + _HTML_ELEMENT_IMG_CLOSE_SRC;
			}else{
				//want to open this element
				_this.openElement(_element);
				img.src = imagePrefix + _HTML_ELEMENT_IMG_OPEN_SRC
			}
		};

		//element's help image
		var imgHelp = createHtmlElement(_HTML_IMG);
		imgHelp.src = imagePrefix + _HTML_ELEMENT_IMG_HELP_SRC;
		imgHelp.width = 12;
		imgHelp.height = 12;
		imgHelp.onmouseover = function(){return overlib(_element.doc);};
		imgHelp.onmouseout = function(){return nd();};

		//source
		//The element's property ("state") indicate where it came from.
		var source = "Profile";
		if(_element.state == "new") source="Default";

		//actions
		var select = _getActionOptions(_element , prefix);
	
		//<tr> has seven <td> nodes
		var td = new Array(7);
		for(var i=0;i<td.length;i++){
			td[i] = createHtmlElement(_HTML_TD);
		}

		td[0].className = _HTML_CLASS_CONTROL_ROW;
		td[1].className = _HTML_CLASS_PARAMNAME;
		td[3].className = _HMTL_CLASS_PARAM_VALUE_DEFAULT;
		td[4].className = _HMTL_CLASS_PARAM_VALUE_DEFAULT;
			
		td[0].appendChild(img);
		td[1].appendChild(createHtmlTextElement(_element.name));
		td[1].appendChild(imgHelp);
		td[2].appendChild(createHtmlTextElement("\u00a0"));
		td[3].appendChild(createHtmlTextElement("\u00a0"));
		td[4].appendChild(createHtmlTextElement("required"));
		td[5].appendChild(createHtmlTextElement(source));
		td[6].appendChild(select);


		//print all tags
		for(var i=0;i<td.length-1;i++){
			tr.appendChild(td[i]);
		}
		return tr;
	}

	_attributeToTr = function(_attribute , _layer){
		
		var prefix = "-" + _attribute.getElement().id + "-" + _attribute.id + "-a";
		
		//print <tr> nodes
		var tr = createHtmlElement(_HTML_TR);
		tr.id = _HTML_TR + prefix;
		if(_attribute.state == "new"){
			tr.className = _HTML_CLASS_PARAM_ROW_DEFAULTL + (_layer + 2);
		}else{
			tr.className = _HTML_CLASS_PARAM_ROW_XMLL + (_layer + 2);
		}
		
		//attribute's help image
		var imgHelp = createHtmlElement(_HTML_IMG);
		imgHelp.src = imagePrefix + _HTML_ELEMENT_IMG_HELP_SRC;
		imgHelp.width = 12;
		imgHelp.height = 12;
		imgHelp.onmouseover = function(){return overlib(_attribute.doc);};
		imgHelp.onmouseout = function(){return nd();};

		//get rule's informations
		var rule = _attribute.getRule();
		var aValue = "\u00a0";
		if(_attribute.value != "" && _attribute.value != null && _attribute.value != _UNDEFINED){
			aValue = _attribute.value;
		}

		var defaultValue = "\u00a0";
		if(rule.defaultValue != "" && rule.defaultValue != null && rule.defaultValue != _UNDEFINED){
			defaultValue = rule.defaultValue;
		}
		var required = "required";
		if(rule.use == null) required = "optional";

		//<td> nodes
		var td = new Array(7);
		for(var i=0;i<td.length;i++){
			td[i] = createHtmlElement(_HTML_TD);
		}

		td[0].className = _HTML_CLASS_CONTROL_ROW;
		td[1].className = _HTML_CLASS_PARAMNAME;
		td[2].className = _HTML_CLASS_PARAM_VALUE_REQUIRED;
		td[3].className = _HMTL_CLASS_PARAM_VALUE_DEFAULT;		

		td[1].appendChild(createHtmlTextElement(_attribute.name));
		td[1].appendChild(imgHelp);
		td[2].appendChild(createHtmlTextElement(aValue));
		td[3].appendChild(createHtmlTextElement(defaultValue));
		td[4].appendChild(createHtmlTextElement(required));
		td[5].appendChild(createHtmlTextElement(_attribute.state=="new"?"Default":"Profile"));
		
		//print all tags
		for(var i=0;i<td.length-1;i++){
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

//*******************************************************************************
//ServiceDefinitionS2H
//*******************************************************************************
function ServiceDefinitionS2H(_domTree , _handle , _imagePrefix){

	//Public propertys
	//***************************************************************************
	var domTree = _domTree;
	var handle = _handle;
	var imagePrefix = _imagePrefix;
	

	var _this = this;
	var nextStep = true;
	//Public methods
	//***************************************************************************
	//print all elements
	this.layout = function(){
		
		this.cleanUp();

		//layer-0
		var root = domTree.getRoot();
		_printRoot(root);
		
		//layer-1
		for(var i=0;i<root.childrens.length;i++){
			var child = root.childrens[i];
			_printElement(child , 1);
		}
	}

	//remove all emements
	this.cleanUp = function(){
		while(handle.childNodes.length >0){
			var childrens = handle.childNodes;
			for(var i=0;i<childrens.length;i++){
				handle.removeChild(childrens[i]);
			}
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

			var th = document.getElementById(_HTML_TR + "-" + (_id + 1));
			if(th != null){
				var e = domTree.addElement(_id , _eName);

				var input = document.getElementById(_HTML_INPUT + "-" + _id + "-i");
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

	this.addElementAtLast = function(_id , _eName){
		
		var f = domTree.getElement(_id);
		var message = domTree.enableAdd(_id , _eName);
		if(message == ""){

			//get the next element's id on the layer.
			var childrens = f.getChildrens();
			var length = childrens.length;
			var lastElement = childrens[length-1];

			var e = domTree.addElement(_id , _eName);
			var layerId = e.layer;
			
			//change the order
			var target0 = document.getElementById(_HTML_TR + "-" +  lastElement.id + "-end");
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
			throw "Can not add these element[" + _eName + "]!!" + message;
		}
	}

	this.removeElement = function(_id){

		var e = domTree.getElement(_id);
		var message = domTree.enableRemove(_id);

		if(message == ""){

			//make the element invisibility
			_removeElement(e);

			//remove it!
			domTree.removeElement(_id);
			
		}else{
			throw "Can not remove these element[" + e.name + "]!!" + message;
		}
	}

	this.closeElement = function(_element){
		
		var childrens = _element.childrens;
		
		//if child has it's childrens , you should recur invoke this method.
		for(var i=0;i<childrens.length;i++){
			var child = childrens[i];
			this.closeElement(child);

			//close children
			_changeLeafElementStatus(child , "none");
		}
		
		var lastTr = document.getElementById(_HTML_TR + "-" +  _element.id + "-end");
		lastTr.style.display = "none";

		//close the child's attributes
		_changeAttrStatus(_element , "none");
		_changeElementValueStatus(_element , "none");
	}
	
	this.openElement = function(_element){

		var childrens = _element.childrens;
		
		//if child has it's childrens , you should recur invoke this method.
		for(var i=0;i<childrens.length;i++){
			var child = childrens[i];
			
			var imgId = _HTML_IMG + "-" + child.getId() + "-i";
			var imgHandle = document.getElementById(imgId);
			
			if(imgHandle != null && imgHandle.src.match("open")){
				this.openElement(child);	
			}

			//open children
			_changeLeafElementStatus(child , "");
		}

		var lastTr = document.getElementById(_HTML_TR + "-" +  _element.id + "-end");
		lastTr.style.display = "";

		_changeAttrStatus(_element , "");
		_changeElementValueStatus(_element , "");
	}


	this.toXml = function(){
		return domTree.toXml();
	}


	//Private methods
	//***************************************************************************
	//change leaf element template
	_changeLeafElementStatus = function(_element , _state){
		var prefix = _HTML_TR + "-" + _element.getId();
		var eTr = document.getElementById(prefix);
		
		if(eTr != null){
			eTr.style.display = _state;
		}
	}
	//change attribute template
	_changeAttrStatus = function(_element , _state){
		var attributes = _element.attributes;
		for(var j=0;j<attributes.length;j++){
			var attr = attributes[j];

			var prefix = _HTML_TR + "-" + _element.getId() + "-" + attr.id + "-a";
			//alert("prefix=" + prefix);
			var aTr = document.getElementById(prefix);
			if (aTr != null) aTr.style.display = _state;
		}
	}
	_changeElementValueStatus = function(_element , _state){
		var prefix = _HTML_TR + "-" + _element.getId() + "-v";
		var eTr = document.getElementById(prefix);
		
		if(eTr != null){
			eTr.style.display = _state;
		}
	}

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
		
		//if element is leaf,just display it's value!SHIT!
		if(_element.isLeaf){
			//print elemnt's value
			handle.insertBefore(_leafElementToTr(_element , _layerId) , target);
		}else{
			//print element 
			var etr = _elementToTr(_element , _layerId);
			handle.insertBefore(etr , target);		

			//print elemnt's value
			handle.insertBefore(_elementValueToTr(_element , _layerId) , target);

		}
		//print element's attribute
		var atts = _element.attributes;
		//alert("atts.length=" + atts.length);
		for(var j=0 ; j < atts.length ; j++){
			var attr = atts[j];
			if(attr.display){
				handle.insertBefore(_attributeToTr(attr , _layerId) , target);
			}
		}
	}

	_getLastTrGroup = function(_element){
		var tr = createHtmlElement(_HTML_TR);
		tr.id = _HTML_TR + "-" +  _element.id + "-end";
		//tr.className = _HTML_CLASS_PARAM_ROW_XMLL + "1";
		tr.style.display = "none";

		//<tr> has seven <td> nodes
		var td = new Array(7);
		for(var i=0;i<td.length;i++){
			td[i] = createHtmlElement(_HTML_TD);
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
			var ah = document.getElementById(_HTML_TR + prefix);
			handle.removeChild(ah);
		}

		//remove the value of element
		var valueTr = document.getElementById(_HTML_TR + "-" +  _element.id + "-v");
		handle.removeChild(valueTr);

		//remove the last tr
		var lastTr = document.getElementById(_HTML_TR + "-" +  _element.id + "-end");
		handle.removeChild(lastTr);

		//remove itself
		var ch = document.getElementById(_HTML_TR + "-" + _element.getId());
		handle.removeChild(ch);

	}

	_elementToTr = function(_element , _layer){
		
		//print element information
		//alert("print element[" + _element.name + "] on the layer [" + _layer + "]");
		var prefix = "-" + _element.id;
		
		var tr = createHtmlElement(_HTML_TR);
		tr.className = _HTML_CLASS_CONTAINER_ROW_XMLL + (_layer + 1);
		tr.id = _HTML_TR + prefix;
		//tr.onclick = function() {closeTr(this);};

		//<td>s
		var img = createHtmlElement(_HTML_IMG);
		img.src = imagePrefix + _HTML_ELEMENT_IMG_OPEN_SRC;
		img.id = _HTML_IMG + prefix + "-i";
		//bother!!
		//img.alt = _HTML_IMG_ALT;
		img.width = _HTML_IMG_DEFAULT_WIDTH;
		img.height = _HTML_IMG_DEFAULT_HEIGHT;
		img.onclick = function(){
			if(img.src.match("open")){
				//want to close this element
				_this.closeElement(_element);
				img.src = imagePrefix + _HTML_ELEMENT_IMG_CLOSE_SRC;
			}else{
				//want to open this element
				_this.openElement(_element);
				img.src = imagePrefix + _HTML_ELEMENT_IMG_OPEN_SRC;
			}
		};
		
		//element's help image
		var imgHelp = createHtmlElement(_HTML_IMG);
		imgHelp.src = imagePrefix + _HTML_ELEMENT_IMG_HELP_SRC;
		imgHelp.width = 12;
		imgHelp.height = 12;
		imgHelp.onmouseover = function(){return overlib(_element.doc);};
		imgHelp.onmouseout = function(){return nd();};

		//element's rule
		var rule = _element.rule;
		var crule = _element.crule;

		//requirements
		var required = "required";
		if(rule.min == 0) required = "optional";
			
		//source
		var source = "Profile";
		if(_element.state == "new") source="Default";
	
		//<tr> has seven <td> nodes
		var td = new Array(7);
		for(var i=0;i<td.length;i++){
			td[i] = createHtmlElement(_HTML_TD);
			td[i].name = "column-" + i;
		}

		//
		td[0].appendChild(img);
		td[1].appendChild(createHtmlTextElement(_element.name));
		td[1].appendChild(imgHelp);
		td[2].appendChild(createHtmlTextElement("\u00a0"));
		td[3].appendChild(createHtmlTextElement("\u00a0"));
		td[4].appendChild(createHtmlTextElement(required));
		td[5].appendChild(createHtmlTextElement(source));
		//actions
		//if(_element.hasChildrens()){
			var select = _getActionOptions(_element , prefix);
			td[6].appendChild(select);
		//}else{
		//	td[6].appendChild(createHtmlTextElement("\u00a0"));
		//}

		td[0].className = _HTML_CLASS_CONTROL_ROW;
		td[1].className = _HTML_CLASS_PARAMNAME;
		td[2].className = _HTML_CLASS_PARAM_REQUIRED;		
		td[3].className = _HMTL_CLASS_PARAM_VALUE_DEFAULT;
		td[4].className = _HTML_CLASS_PARAM_REQUIREMENTS;
		td[5].className = _HTML_CLASS_PARAM_SOURCE;
		td[6].className = _HTML_CLASS_PARAM_ACTIONS;

		//print all tags
		for(var i=0;i<td.length;i++){
			tr.appendChild(td[i]);
		}
		return tr;
	}

	_elementValueToTr = function(_element , _layer){

		var prefix = "-" + _element.id + "-v";
		//print <tr> nodes
		var tr = createHtmlElement(_HTML_TR);
		tr.id = _HTML_TR + prefix;
		tr.className = _HTML_CLASS_PARAM_ROW_DEFAULTL + (_layer + 2);

		//element's rule
		var rule = _element.rule;
		var crule = _element.crule;

		//requirements
		var required = "required";
		if(rule.min == 0) required = "optional";
		
		//defaultValue
		var dValue = "\u00a0";
		var df = crule.defaultValue;
		if(df != "" && df != null && df != undefined){
			dValue = df;
		}
		
		//source
		var source = "Profile";
		if(_element.state == "new") source="Default";

		//<td> nodes
		var td = new Array(7);
		for(var i=0;i<td.length;i++){
			td[i] = createHtmlElement(_HTML_TD);
			td[i].name = "column-" + i;
		}	

		//get rule's informations
		td[1].appendChild(createHtmlTextElement("value"));
		//td[2].appendChild(createHtmlTextElement(_element.value));
		var crule = _element.crule;
		if(crule.name == "enumString"){
			var select = document.createElement("select");
			for(var k=0;k<crule.enumValues.length;k++){
				var enumV = crule.enumValues[k];
				
				var option = document.createElement("option");
				option.appendChild(createHtmlTextElement(enumV));
				select.appendChild(option);
			}
			td[2].appendChild(select);
		}else{
			td[2].appendChild(createHtmlTextElement(_element.value));

			//add event
			td[2].onclick = function(){
				//alert("nextStep->" + nextStep);
				if(nextStep){
					this.innerHTML = "";
					var td2 = this;

					var _input = document.createElement("input");
					_input.setAttribute("id", prefix + "-i");
					_input.setAttribute("type","text");
					_input.setAttribute("size","40");
					_input.setAttribute("class","input-text");
					_input.setAttribute("value",_element.value);
					
					_input.onblur = function(){
						var _value = this.value;
						var result = crule.validate(_value);
						if(result){
							nextStep = true;
							this.style.display = "none";
							
							var displayValue = (_value == ""?"\u00a0":_value);
							_element.value = displayValue;
							td2.appendChild(createHtmlTextElement(displayValue));
						}else{
							alert(crule.message);
							this.focus();
							nextStep = false;
						}
					}
					this.appendChild(_input);
					_input.focus();
				}
			}
		}
		td[2].appendChild(createHtmlTextElement("\u00a0"));
		td[3].appendChild(createHtmlTextElement(dValue));
		td[4].appendChild(createHtmlTextElement(required));
		td[5].appendChild(createHtmlTextElement(source));
		td[6].appendChild(createHtmlTextElement("\u00a0"));

		td[0].className = _HTML_CLASS_CONTROL_ROW;
		td[1].className = _HTML_CLASS_PARAMNAME;
		td[2].className = _HTML_CLASS_PARAM_REQUIRED;		
		td[3].className = _HMTL_CLASS_PARAM_VALUE_DEFAULT;
		td[4].className = _HTML_CLASS_PARAM_REQUIREMENTS;
		td[5].className = _HTML_CLASS_PARAM_SOURCE;
		td[6].className = _HTML_CLASS_PARAM_ACTIONS;

		//print all tags
		for(var i=0;i<td.length;i++){
			tr.appendChild(td[i]);
		}
		return tr;
	}

	_leafElementToTr = function(_element , _layer){

		var prefix = "-" + _element.id;
		//print <tr> nodes
		var tr = createHtmlElement(_HTML_TR);
		tr.id = _HTML_TR + prefix;
		tr.className = _HTML_CLASS_PARAM_ROW_DEFAULTL + (_layer + 1);

		//element's rule
		var rule = _element.rule;
		var crule = _element.crule;

		//requirements
		var required = "required";
		if(rule.min == 0) required = "optional";
		
		//defaultValue
		var dValue = "\u00a0";
		var df = crule.defaultValue;
		if(df != "" && df != null && df != undefined){
			dValue = df;
		}
		
		//source
		var source = "Profile";
		if(_element.state == "new") source="Default";

		//<td> nodes
		var td = new Array(7);
		for(var i=0;i<td.length;i++){
			td[i] = createHtmlElement(_HTML_TD);
			td[i].name = "column-" + i;
		}	

		//get rule's informations
		td[1].appendChild(createHtmlTextElement(_element.name));
		//td[2].appendChild(createHtmlTextElement(_element.value));
		var crule = _element.crule;
		if(crule.name == "enumString"){
			var select = document.createElement("select");
			for(var k=0;k<crule.enumValues.length;k++){
				var enumV = crule.enumValues[k];
				
				var option = document.createElement("option");
				option.appendChild(createHtmlTextElement(enumV));
				select.appendChild(option);
			}
			td[2].appendChild(select);
		}else{
			td[2].appendChild(createHtmlTextElement(_element.value));

			//add event
			td[2].onclick = function(){
				//alert("nextStep->" + nextStep);
				if(nextStep){
					this.innerHTML = "";
					var td2 = this;

					var _input = document.createElement("input");
					_input.setAttribute("id", prefix + "-i");
					_input.setAttribute("type","text");
					_input.setAttribute("size","40");
					_input.setAttribute("class","input-text");
					_input.setAttribute("value",_element.value);
					
					_input.onblur = function(){
						var _value = this.value;
						var result = crule.validate(_value);
						if(result){
							nextStep = true;
							this.style.display = "none";
							
							var displayValue = (_value == ""?"\u00a0":_value);
							_element.value = displayValue;
							td2.appendChild(createHtmlTextElement(displayValue));
						}else{
							alert(crule.message);
							this.focus();
							nextStep = false;
						}
					}
					this.appendChild(_input);
					_input.focus();
				}
			}
		}
		td[2].appendChild(createHtmlTextElement("\u00a0"));
		td[3].appendChild(createHtmlTextElement(dValue));
		td[4].appendChild(createHtmlTextElement(required));
		td[5].appendChild(createHtmlTextElement(source));
		td[6].appendChild(createHtmlTextElement("\u00a0"));

		td[0].className = _HTML_CLASS_CONTROL_ROW;
		td[1].className = _HTML_CLASS_PARAMNAME;
		td[2].className = _HTML_CLASS_PARAM_REQUIRED;		
		td[3].className = _HMTL_CLASS_PARAM_VALUE_DEFAULT;
		td[4].className = _HTML_CLASS_PARAM_REQUIREMENTS;
		td[5].className = _HTML_CLASS_PARAM_SOURCE;
		td[6].className = _HTML_CLASS_PARAM_ACTIONS;

		//print all tags
		for(var i=0;i<td.length;i++){
			tr.appendChild(td[i]);
		}
		return tr;
	}

	_attributeToTr = function(_attribute , _layer){
		
		var prefix = "-" + _attribute.getElement().id + "-" + _attribute.id + "-a";
		
		//print <tr> nodes
		var tr = createHtmlElement(_HTML_TR);
		tr.id = _HTML_TR + prefix;
		if(_attribute.state == "new"){
			tr.className = _HTML_CLASS_PARAM_ROW_DEFAULTL + (_layer + 2);
		}else{
			tr.className = _HTML_CLASS_PARAM_ROW_XMLL + (_layer + 2);
		}
		
				
		//get rule's informations
		var rule = _attribute.getRule();
		var aValue = "\u00a0";
		if(_attribute.value != "" && _attribute.value != null && _attribute.value != _UNDEFINED){
			aValue = _attribute.value;
		}

		var defaultValue = "\u00a0";
		if(rule.defaultValue != "" && rule.defaultValue != null && rule.defaultValue != _UNDEFINED){
			defaultValue = rule.defaultValue;
		}

		var required = "required";
		if(rule.use == null) required = "optional";

		//<td> nodes
		var td = new Array(7);
		for(var i=0;i<td.length;i++){
			td[i] = createHtmlElement(_HTML_TD);
			td[i].name = "column-" + i;
		}

		//source?
		td[1].appendChild(createHtmlTextElement(_attribute.name));
		td[2].appendChild(createHtmlTextElement(aValue));
		td[3].appendChild(createHtmlTextElement(defaultValue));
		td[4].appendChild(createHtmlTextElement(required));
		td[5].appendChild(createHtmlTextElement(_attribute.state=="new"?"Default":"Profile"));
		td[6].appendChild(createHtmlTextElement("\u00a0"));

		td[0].className = _HTML_CLASS_CONTROL_ROW;
		td[1].className = _HTML_CLASS_PARAMNAME;
		td[2].className = _HTML_CLASS_PARAM_REQUIRED;		
		td[3].className = _HMTL_CLASS_PARAM_VALUE_DEFAULT;
		td[4].className = _HTML_CLASS_PARAM_REQUIREMENTS;
		td[5].className = _HTML_CLASS_PARAM_SOURCE;
		td[6].className = _HTML_CLASS_PARAM_ACTIONS;
		
		//add event
		td[2].onclick = function(){
			if(nextStep){
				this.innerHTML = "";
				var td2 = this;

				var _input = document.createElement("input");
				_input.setAttribute("type","text");
				_input.setAttribute("size","40");
				_input.setAttribute("class","input-text");
				_input.setAttribute("value",_attribute.value);
				_input.setAttribute("id", prefix + "-i");
				//_input.setAttribute("onblur","makeInputTextReadOnly(this)");
				_input.onblur = function(){
					var _value = this.value;
					var result = rule.validate(_value);
					if(result){
						nextStep = true;
						this.style.display = "none";
						
						var displayValue = (_value == ""?"\u00a0":_value);
						_attribute.value = displayValue;
						td2.appendChild(createHtmlTextElement(displayValue));
					}else{
						nextStep = false;
						alert(rule.message);
						this.focus();
					}
				}
				this.appendChild(_input);
				_input.focus();
			}
		}

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
