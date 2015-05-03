


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
		//tr.className = _HTML_CLASS_ATTRIBUTE_PROFILE + "1";
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
		tr.className = _HTML_CLASS_ELEMENT_DEFAULT + (_layer + 1);
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
			tr.className = _HTML_CLASS_ATTRIBUTE_DEFAULT + (_layer + 2);
		}else{
			tr.className = _HTML_CLASS_ATTRIBUTE_PROFILE + (_layer + 2);
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
		td[2].className = _HTML_CLASS_PARAM_REQUIRED;
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
		_printElement(domTree.getRoot());
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

	this.addElement = function(_element , _eName){
		//default add new element at the last of the army?
		this.addElementAtFirst(_element , _eName);
	}

	this.addElementAtFirst = function(_element , _eName){
		var message = domTree.enableAdd(_element.id , _eName);
		if(message != "") throw "Can not add these element[" + _eName + "]!!" + message;

		//get the last children's id
		var fTr = document.getElementById(_HTML_TR + "-" + _element.id + "-first");

		//print element 
		var newElement = domTree.addElement(_element.id , _eName);

		//print itself
		if(newElement.isLeaf){
			var _t = handle.insertBefore(_leafElementToTr(newElement) , fTr);
			handle.insertBefore(fTr , _t);
		}else{
			var _t = handle.insertBefore(_elementToTr(newElement) , fTr);	

			//print fist tr
			var fTarget = handle.insertBefore(_createFirstTr(newElement) , fTr);

			//print last tr
			var lTarget = handle.insertBefore(_createLastTr(newElement) , fTr);

			//print elemnt's value
			//if(newElement.value != ""){
			//	handle.insertBefore(_elementValueToTr(newElement) , lTarget);
			//}

			//print element's attribute
			var atts = newElement.attributes;
			for(var j=0 ; j < atts.length ; j++){
				var attr = atts[j];
				if(attr.display) handle.insertBefore(_attributeToTr(attr) , lTarget);
			}
			
			//print element's childrens which is a leaf node.
			//display the leaf node just like it's attribute!(SHIT!)
			var childrens = newElement.childrens;
			for(var i=0;i<childrens.length;i++){
				if(childrens[i].isLeaf){
					handle.insertBefore(_leafElementToTr(childrens[i]) , lTarget);
				}
			}

			handle.insertBefore(fTr , _t);
		}

		//close some columns
		var checkboxs = ["showDefaults" , "showRequirements" , "showSource" , "showActions"]
		for(var i=0;i<checkboxs.length;i++){
			var check = document.getElementById(checkboxs[i]);
			window.hidenOrShowColumn(check , i + 3);
		}
	}

	this.addElementAtLast = function(_element , _eName){
		var message = domTree.enableAdd(_element.id , _eName);
		if(message != "") throw "Can not add these element[" + _eName + "]!!" + message;

		//get the last children's id
		var lTr = document.getElementById(_HTML_TR + "-" + _element.id + "-last");

		//print element 
		var newElement = domTree.addElement(_element.id , _eName);

		//print itself
		if(newElement.isLeaf){
			handle.insertBefore(_leafElementToTr(newElement) , lTr);
		}else{
			handle.insertBefore(_elementToTr(newElement) , lTr);	

			//print fist tr
			var fTarget = handle.insertBefore(_createFirstTr(newElement) , lTr);

			//print last tr
			var lTarget = handle.insertBefore(_createLastTr(newElement) , lTr);

			//print elemnt's value
			//if(newElement.value != ""){
			//	handle.insertBefore(_elementValueToTr(newElement) , lTarget);
			//}

			//print element's attribute
			var atts = newElement.attributes;
			for(var j=0 ; j < atts.length ; j++){
				var attr = atts[j];
				if(attr.display) handle.insertBefore(_attributeToTr(attr) , lTarget);
			}
			
			//print element's childrens which is a leaf node.
			//display the leaf node just like it's attribute!(SHIT!)
			var childrens = newElement.childrens;
			for(var i=0;i<childrens.length;i++){
				if(childrens[i].isLeaf){
					handle.insertBefore(_leafElementToTr(childrens[i]) , lTarget);
				}
			}
		}

		//close some columns
		var checkboxs = ["showDefaults" , "showRequirements" , "showSource" , "showActions"]
		for(var i=0;i<checkboxs.length;i++){
			var check = document.getElementById(checkboxs[i]);
			window.hidenOrShowColumn(check , i + 3);
		}
	}

	this.removeElement = function(_element){

		if(_element.required == "required"){
			throw "You can remove the 'optional' element but not the 'required' element!"
		}

		//var message = domTree.enableRemove(_element.id);
		//if(message != "") throw "Can not remove these element[" + _element.name + "]!!" + message;

		//make the element invisibility
		_removeElement(_element);

		//remove it!
		domTree.removeElement(_element.id);			
	}

	this.closeElement = function(_element){
		
		//close element's childrens!
		//if child has it's childrens , you should recur invoke this method.
		var childrens = _element.childrens;
		for(var i=0;i<childrens.length;i++){
			var child = childrens[i];
			this.closeElement(child);

			//close the children which is a leaf node! 
			_changeElementStatus(child , "none");
		}

		//close element's attributes
		_changeAttrStatus(_element , "none");

		//close element's value
		_changeElementValueStatus(_element , "none");
	}
	
	this.openElement = function(_element){
		
		//open element's childrens!
		//if child has it's childrens , you should recur invoke this method.
		var childrens = _element.childrens;
		for(var i=0;i<childrens.length;i++){
			var child = childrens[i];
			var imgId = _HTML_IMG + "-" + child.getId() + "-i";
			var imgHandle = document.getElementById(imgId);
			
			if(imgHandle != null && imgHandle.src.match("open")){
				this.openElement(child);	
			}
				
			_changeElementStatus(child , "");
		}
		
		//open element's attribute
		_changeAttrStatus(_element , "");

		//open element's value;
		_changeElementValueStatus(_element , "");
	}


	this.toXml = function(){
		return domTree.toXml();
	}

	this.toHtml = function(){
		return domTree.toHtml();
	}

	//Private methods
	//***************************************************************************
	
	//change element status
	_changeElementStatus = function(_element , _state){
		var prefix = _HTML_TR + "-" + _element.getId();
		var eTr = document.getElementById(prefix);
		
		if(eTr != null) eTr.style.display = _state;
	}

	//change element's value status
	_changeElementValueStatus = function(_element , _state){
		var prefix = _HTML_TR + "-" + _element.getId() + "-v";
		var eTr = document.getElementById(prefix);
		
		if(eTr != null) eTr.style.display = _state;
	}

	//change element's attribute status
	_changeAttrStatus = function(_element , _state){
		var attributes = _element.attributes;
		for(var j=0;j<attributes.length;j++){
			var attr = attributes[j];

			var prefix = _HTML_TR + "-" + _element.getId() + "-" + attr.id + "-a";
			var aTr = document.getElementById(prefix);
			if (aTr != null) aTr.style.display = _state;
		}
	}

	_printElement = function(_element){

		_printElementItem(_element);
		
		//print it's childrens which is NOT a leaf node!
		var childrens = _element.childrens;
		for(var i=0;i<childrens.length;i++){
			if(!childrens[i].isLeaf){
				_printElement(childrens[i]);
			}
		}
	}

	_createFirstTr = function(_element){
		var tr = createHtmlElement(_HTML_TR);
		tr.id = _HTML_TR + "-" +  _element.id + "-first";
		//tr.className = _HTML_CLASS_ATTRIBUTE_PROFILE + "1";
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

	_createLastTr = function(_element){
		var tr = createHtmlElement(_HTML_TR);
		tr.id = _HTML_TR + "-" +  _element.id + "-last";
		//tr.className = _HTML_CLASS_ATTRIBUTE_PROFILE + "1";
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

	_printElementItem = function(_element){
		
		//print itself
		handle.appendChild(_elementToTr(_element));	

		//print fist tr
		var fTarget = handle.appendChild(_createFirstTr(_element));

		//print last tr
		var lTarget = handle.appendChild(_createLastTr(_element));

		//print elemnt's value
		//if(_element.value != ""){
		//	handle.insertBefore(_elementValueToTr(_element) , lTarget);
		//}

		//print element's attribute
		var atts = _element.attributes;
		for(var j=0 ; j < atts.length ; j++){
			var attr = atts[j];
			if(attr.display) handle.insertBefore(_attributeToTr(attr) , lTarget);
		}
		
		//print element's childrens which is a leaf node.
		//display the leaf node just like it's attribute!(SHIT!)
		var childrens = _element.childrens;
		for(var i=0;i<childrens.length;i++){
			if(childrens[i].isLeaf){
				handle.insertBefore(_leafElementToTr(childrens[i]) , lTarget);
			}
		}
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
		if(valueTr != null) handle.removeChild(valueTr);
		
		//remove the first tr
		var lastTr = document.getElementById(_HTML_TR + "-" +  _element.id + "-first");
		if(lastTr != null) handle.removeChild(lastTr);

		//remove the last tr
		var lastTr = document.getElementById(_HTML_TR + "-" +  _element.id + "-last");
		if(lastTr != null) handle.removeChild(lastTr);

		//remove itself
		var ch = document.getElementById(_HTML_TR + "-" + _element.getId());
		if(ch != null) handle.removeChild(ch);

	}

	//***************************************************************************
	//***************************************************************************
	_elementToTr = function(_element){
		
		//print element information
		var prefix = "-" + _element.id;

		var tr = createHtmlElement(_HTML_TR);
		tr.className = _HTML_CLASS_ELEMENT_DEFAULT + _element.layer;
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
		
		var required = "required";
		var srule = _element.rule;
		if(srule.min == 0) required = "Optional";

		//element's help image
		var imgHelp = createHtmlElement(_HTML_IMG);
		imgHelp.src = imagePrefix + _HTML_ELEMENT_IMG_HELP_SRC;
		imgHelp.width = 12;
		imgHelp.height = 12;
		imgHelp.onmouseover = function(){return overlib(_element.doc);};
		imgHelp.onmouseout = function(){return nd();};

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
		td[5].appendChild(createHtmlTextElement(_element.source));

		
		//actions
		var select = _getActionOptions(_element , prefix);
		td[6].appendChild(select);

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
	/*
	_elementValueToTr = function(_element){

		var prefix = "-" + _element.id + "-v";

		//print <tr> nodes
		var tr = createHtmlElement(_HTML_TR);
		tr.id = _HTML_TR + prefix;
		tr.className = _HTML_CLASS_ATTRIBUTE_DEFAULT + (_element.layer + 2);

		//element's rule
		var rule = _element.rule;
		var crule = _element.crule;

		//requirements
		var required = "required";
		if(crule.use == null) required = "optional";
		
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
						var result = true;

						//if the parameter "required" value of element is "optional"
						//and the value of the attribute is empty -- DO NOT VALIDATE!
						if(_element.required != "optional"){
							result = crule.validate(_value);
						}
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
	*/

	_leafElementToTr = function(_element){

		var prefix = "-" + _element.id;
		//print <tr> nodes
		var tr = createHtmlElement(_HTML_TR);
		tr.id = _HTML_TR + prefix;
		if(_element.source != "Default"){
			tr.className = _HTML_CLASS_LEAFELEMENT_PROFILE + _element.layer;
		}else{
			tr.className = _HTML_CLASS_LEAFELEMENT_DEFAULT + _element.layer;
		}

		//element's rule
		var rule = _element.rule;
		var crule = _element.crule;

		//requirements
		var required = "required";
		if(crule.min == 0) required = "optional";

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
						var result = true;

						//if the parameter "required" value of element is "optional"
						//and the value of the attribute is empty -- DO NOT VALIDATE!
						if(_element.father.required != "optional"){
							result = crule.validate(_value);
						}

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

	_attributeToTr = function(_attribute){
		
		var element = _attribute.element;
		var prefix = "-" + element.id + "-" + _attribute.id + "-a";
		
		//print <tr> nodes
		var tr = createHtmlElement(_HTML_TR);
		tr.id = _HTML_TR + prefix;
		if(_attribute.source != "Default"){
			tr.className = _HTML_CLASS_ATTRIBUTE_PROFILE + (element.layer + 1);
		}else{
			tr.className = _HTML_CLASS_ATTRIBUTE_DEFAULT + (element.layer + 1);
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
				_input.onblur = function(){
					var _value = this.value;
					var result = true;

					//if the parameter "required" value of element is "optional"
					//and the value of the attribute is empty -- DO NOT VALIDATE!
					if(element.required != "optional"){
						result = rule.validate(_value);
					}

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
		select.onchange = function(){
			try{
				var value = this.value;
				if(value != "Actions" && value != "---"){
					
					if(/remove/.test(value)){
						_this.removeElement(_element);
					}
					else if(/insert/.test(value)){
						var eName = value.substring(value.indexOf(":") + 1);
						_this.addElement(_element , eName);
					}
				}
			}catch(e){
				window.alertException(e);
			}finally{
				this.options[0].selected = true;
			}
		}

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

			var option4 = createHtmlElement("option");
			option4.value = "remove";
			option4.appendChild(createHtmlTextElement("Remove \"" + name + "\""));
			select.appendChild(option4);
		}
		
		// Current element's childrens operations scope.
		// Such as insert new Children node etc. 
		var childElements = domTree.getAllAvailChildrens(_element.name);
		if(childElements.length >0){
			var option5 = createHtmlElement("option");
			option5.value = "---";
			option5.appendChild(createHtmlTextElement("---"));
			select.appendChild(option5);

			var option = new Array();
			for(var i=0;i<childElements.length;i++){
				var name = childElements[i].name;
				var srule = childElements[i].rule;
				
				var isExist = false;
				var currentChilds = _element.childrens;
				for(var j=0;j<currentChilds.length;j++){
					if(name == currentChilds[j].name) isExist = true;
				}
				
				if(srule.max == 1 && isExist){
					//do not anything!			
				}else{
					option[i] = createHtmlElement("option");
					option[i].value = "insert:" + name;

					option[i].appendChild(createHtmlTextElement("Insert \"" + name + "\""));
					select.appendChild(option[i]);
				}
			}
		}
		return select;	
	}

}
