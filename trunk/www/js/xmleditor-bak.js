


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

//GlobalNextStep parameter should be defined a parameter of ServiceDefinitionS2H
var GlobalNextStep = true;

//*******************************************************************************
//DefaultSchema2HtmlForm
//*******************************************************************************
function DefaultSchema2HtmlForm(_domTree , _handle , _imagePrefix){
	return new ServiceDefinitionS2H(_domTree , _handle , _imagePrefix);
}

//*******************************************************************************
//ServiceDefinitionS2H
//*******************************************************************************
function ServiceDefinitionS2H(_domTree , _handle , _imagePrefix){

	// private propertys
	//***************************************************************************
	var domTree = _domTree;
	var handle = _handle;
	var imagePrefix = _imagePrefix;

	var _this = this;
	var td2Factory = new Td2Factory(this);
	
	//todo: noEditColumns will be deleted in the new version
	var notEditColumns = new Array();
	var requiredDefaultValues = new Map();

	var showHelpFlag = false;
	var canEdit = true;

	// public methods(get/set)
	//***************************************************************************
	this.setNotEditColumns = function(_columns){
		notEditColumns = _columns;
	}
	this.addNotEditColumn = function(_column){
		notEditColumns.push(_column);
	}

	this.addRequiredDefaultValues = function(_key , _value){
		requiredDefaultValues.put(_key , _value);
	}
	this.getRequiredDefaultValues = function(){
		return requiredDefaultValues;
	}

	this.canModify = function(_e){
		var r = true;
		for(var i=0;i<notEditColumns.length;i++){
			if(notEditColumns[i] == _e){
				r = false;
				break;
			}
		}
		return r;
	}

	this.isEditable = function(){
		return canEdit;	
	}

	this.setEditable = function(_canEdit){
		canEdit = _canEdit;
		GlobalNextStep = _canEdit;
	}

	this.validateSuccess = function(){
		return GlobalNextStep;
	}

	// public methods
	//***************************************************************************
	//print all elements
	this.layout = function(_canEdit){
		this.cleanUp();
		this.setEditable(_canEdit);
		
		//_printTableTitle();
		_printElement(domTree.getRoot());
		_doOtherThings();
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
		this.addElementAtLast(_element , _eName);
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
			var fTarget = handle.insertBefore(_createFirstTr(newElement , "first") , fTr);

			//print last tr
			var lTarget = handle.insertBefore(_createLastTr(newElement , "last") , fTr);


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

			//print elemnt's value
			if(newElement.crule.name != "default"){
				handle.insertBefore(_elementValueToTr(newElement) , lTarget);
			}

			handle.insertBefore(fTr , _t);
		}

		//close some columns
		showOrHiddenColumns();
	}

	this.addElementAtLast = function(_element , _eName){
		var r =  domTree.enableAdd(_element.id , _eName);
		if(!r) throw RULE_VALIDATE_NOT_ADDNEW;
		
		//register the element 
		var newElement = domTree.addElement(_element.id , _eName);

		//_printElement(newElement);
		_insertNewElement(_element , newElement);
		
		//close some columns
		showOrHiddenColumns();
	}

	this.removeElement = function(_element){

		var r = domTree.enableRemove(_element.id);
		if(!r) throw RULE_VALIDATE_NOT_REMOVE;

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
		
		//close the scope points
		//_changePointsStatus(_element , "none");
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

		//open the scope points
		//_changePointsStatus(_element , "");
		
		//open element's attribute
		_changeAttrStatus(_element , "");

		//open element's value;
		_changeElementValueStatus(_element , "");

	}

	this.showHelpIcon = function(){
		if(showHelpFlag){
			showHelpFlag = false;
		}else{
			showHelpFlag = true;
		}
		_showHelpIcon(domTree.getRoot());
	}

	this.toXml = function(){
		return domTree.toXml();
	}

	this.toHtml = function(){
		return domTree.toHtml();
	}

	//Private methods
	//***************************************************************************
	//doOtherThings will be invoked after the method layout execute.
	//User shoud define this method in the jsp file.If the user can not define it
	//xmleditor will use the default method which has be defined in the xmleditor-function.js file.
	_doOtherThings = function(){
		window.showOrHiddenColumns();
		window.doSpecialThings();
	}

	_printTableTitle = function(){
		var table = createHtmlElement("table");
		table.id = "serviceDefinitionProfile";
		table.className = "appProfileDisplay";
		table.style.border = "0";
		table.cellpadding = "0";
		table.cellspacing = "0";

		var thead = createHtmlElement("thead");
		var tr = createHtmlElement("tr");
		
		var th = new Array(7);
		for(var i=0;i<th.length;i++){
			th[i] = createHtmlElement("th");
			th[i].name = "column-" + i;
			th[i].scope = "col";
		}

		th[0].style.border = "none";
		th[2].className = _HMTL_CLASS_PARAM_VALUE;		
		th[3].className = _HMTL_CLASS_PARAM_VALUE_DEFAULT;
		th[4].className = _HTML_CLASS_PARAM_REQUIREMENTS;
		th[5].className = _HTML_CLASS_PARAM_SOURCE;
		th[6].className = _HTML_CLASS_PARAM_ACTIONS;

		th[0].appendChild(createHtmlTextElement("\u00a0"));
		th[1].appendChild(createHtmlTextElement("Name"));
		th[2].appendChild(createHtmlTextElement("Value"));
		th[3].appendChild(createHtmlTextElement("Default Value"));
		th[4].appendChild(createHtmlTextElement("Requirements"));
		th[5].appendChild(createHtmlTextElement("Source"));
		th[6].appendChild(createHtmlTextElement("Actions"));

		for(var i=0;i<th.length;i++){
			tr.appendChild(th[i]);
		}

		table.appendChild(thead);
		thead.appendChild(tr);

		var tbody = createHtmlElement("tbody");
		table.appendChild(tbody);

		handle.appendChild(table);
		//handle = tbody;
	}
	_showHelpIcon = function(_element){

		if(_element.doc != ""){
			//display or undisplay the element help icon
			_showHelpIconById("imageHelp" + "-" + _element.id);
		}
		//display or undisplay the element's attribute icon
		for(var i=0;i<_element.attributes.length;i++){
			var attribute = _element.attributes[i];
			if(attribute.doc != ""){
				_showHelpIconById("imageHelp" + "-" + _element.id + "-" + attribute.id + "-a");
			}
		}

		for(var i=0;i<_element.childrens.length;i++){
			_showHelpIcon(_element.childrens[i]);
		}

	}

	_showHelpIconById = function(_id){
		var helpIcon = document.getElementById(_id);
		if(helpIcon != null){
			if(showHelpFlag){
				helpIcon.style.display = "";
			}else{
				helpIcon.style.display = "none";
			}
		}
	}

	_insertNewElement = function(_element , _newElement){
		
		if(_newElement.value == "NULL"){
			var getObject = requiredDefaultValues.get(_newElement.name + ":content");
			if(getObject != null) _newElement.value = getObject;
		}

		//print itself
		if(_newElement.isLeaf){
			var lTr = document.getElementById(_HTML_TR + "-" + _element.id + "-last");
			var _t = handle.insertBefore(_leafElementToTr(_newElement) , lTr);
		}else{
			var lTr = document.getElementById(_HTML_TR + "-" + _element.id + "-c-last");
			var _t = handle.insertBefore(_elementToTr(_newElement) , lTr);	
			
			//print the attribute scope
			//print fist tr
			var fTarget = handle.insertBefore(_createFirstTr(_newElement , "first") , lTr);

			//print last tr
			var lTarget = handle.insertBefore(_createLastTr(_newElement , "last") , lTr);
			
			//print the childrens scope
			var fcTarget = handle.insertBefore(_createFirstTr(_newElement , "c-first") , lTr);
			var lcTarget = handle.insertBefore(_createLastTr(_newElement , "c-last") , lTr);

			//print element's attribute
			var atts = _newElement.attributes;
			for(var j=0 ; j < atts.length ; j++){
				var attr = atts[j];
				if(attr.value == "NULL"){
					var getObject = requiredDefaultValues.get(_newElement.name + ":" + attr.name);
					if(getObject != null) attr.value = getObject;
				}
				if(attr.display) handle.insertBefore(_attributeToTr(attr) , lTarget);
			}
			
			//print element's childrens which is a leaf node.
			//display the leaf node just like it's attribute!(SHIT!)
			var childrens = _newElement.childrens;
			for(var i=0;i<childrens.length;i++){
				if(childrens[i].isLeaf){
					if(childrens[i].value == "NULL"){
						var getObject = requiredDefaultValues.get(childrens[i].name);
						if(getObject != null) childrens[i].value = getObject;
					}
					handle.insertBefore(_leafElementToTr(childrens[i]) , lTarget);
				}
			}

			//print elemnt's value
			if(_newElement.crule.name != "default"){
				handle.insertBefore(_elementValueToTr(_newElement) , lTarget);
			}

			var childrens = _newElement.childrens;
			for(var i=0;i<childrens.length;i++){
				if(!childrens[i].isLeaf){
					_insertNewElement(_newElement , childrens[i]);
					//handle.insertBefore(_leafElementToTr(childrens[i]) , lTarget);
				}
			}

		}

	}
	//change element status
	_changeElementStatus = function(_element , _state){
		var prefix = _HTML_TR + "-" + _element.getId();
		_changeStatus(prefix , _state);
	}

	//change element's value status
	_changeElementValueStatus = function(_element , _state){
		var prefix = _HTML_TR + "-" + _element.getId() + "-v";
		_changeStatus(prefix , _state);
	}

	//change element's attribute status
	_changeAttrStatus = function(_element , _state){
		var attributes = _element.attributes;
		for(var j=0;j<attributes.length;j++){
			var attr = attributes[j];

			var prefix = _HTML_TR + "-" + _element.getId() + "-" + attr.id + "-a";
			_changeStatus(prefix , _state);
		}
	}

	_changePointsStatus = function(_element , _state){
		//change the attribute scope status
		var prefix = _HTML_TR + "-" + _element.getId() + "-first";
		_changeStatus(prefix , _state);

		var prefix = _HTML_TR + "-" + _element.getId() + "-last";
		_changeStatus(prefix , _state);

		var prefix = _HTML_TR + "-" + _element.getId() + "-c-first";
		_changeStatus(prefix , _state);

		var prefix = _HTML_TR + "-" + _element.getId() + "-c-last";
		_changeStatus(prefix , _state);

	}

	_changeStatus = function(_id , _state){
		var eTr = document.getElementById(_id);
		if(eTr != null) eTr.style.display = _state;
	}

	_createFirstTr = function(_element , _postfix){
		var tr = createHtmlElement(_HTML_TR);
		tr.id = _HTML_TR + "-" +  _element.id + "-" + _postfix;
		//tr.className = _HTML_CLASS_ATTRIBUTE_PROFILE + "1";
		tr.style.display = "none";

		//<tr> has seven <td> nodes
		var td = new Array(7);
		for(var i=0;i<td.length;i++){
			td[i] = createHtmlElement(_HTML_TD);
			td[i].name = "column-" + i;
			//td[i].className = _HTML_CLASS_CONTROL_ROW;
			//td[i].appendChild(createHtmlTextElement(tr.id));
			tr.appendChild(td[i]);
		}
		return tr;
	}

	_createLastTr = function(_element , _postfix){
		var tr = createHtmlElement(_HTML_TR);
		tr.id = _HTML_TR + "-" +  _element.id + "-" + _postfix;
		//tr.className = _HTML_CLASS_ATTRIBUTE_PROFILE + "1";
		tr.style.display = "none";

		//<tr> has seven <td> nodes
		var td = new Array(7);
		for(var i=0;i<td.length;i++){
			td[i] = createHtmlElement(_HTML_TD);
			td[i].name = "column-" + i;
			//td[i].className = _HTML_CLASS_CONTROL_ROW;
			//td[i].appendChild(createHtmlTextElement(tr.id));
			tr.appendChild(td[i]);
		}
		return tr;
	}

	_printElement = function(_element){

		_printElementItem(_element);
		
		//print it's childrens which is NOT a leaf node!
		//print fist tr
		var fTarget = handle.appendChild(_createFirstTr(_element , "c-first"));
		var childrens = _element.childrens;
		for(var i=0;i<childrens.length;i++){
			if(!childrens[i].isLeaf){
				//alert("print children=" + childrens[i]);
				_printElement(childrens[i]);
			}
		}
		//print last tr
		var lTarget = handle.appendChild(_createLastTr(_element , "c-last"));
	}

	_printElementItem = function(_element){
		
		//print itself
		handle.appendChild(_elementToTr(_element));	

		//print fist tr
		var fTarget = handle.appendChild(_createFirstTr(_element , "first"));

		//print last tr
		var lTarget = handle.appendChild(_createLastTr(_element , "last"));

		
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
			
			//todo: please remove this line if u have another good choice?!thanks
			//if(CONSUMER_PATH != "" && childrens[i].name == "ego:ConsumerID") childrens[i].value = CONSUMER_PATH;
			if(childrens[i].value == "NULL"){
				var getObject = requiredDefaultValues.get(childrens[i].name);
				if(getObject != null) childrens[i].value = getObject;
			}

			if(childrens[i].isLeaf){
				handle.insertBefore(_leafElementToTr(childrens[i]) , lTarget);
			}
		}

		//print elemnt's value
		//if the element has defined the content rule, print it! 
		//otherwish don't print the "content" line.
		if(_element.crule.name != "default"){
			handle.insertBefore(_elementValueToTr(_element) , lTarget);
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
		
		//remove the attribute scope points
		//remove the first tr
		var firstTr = document.getElementById(_HTML_TR + "-" +  _element.id + "-first");
		if(firstTr != null) handle.removeChild(firstTr);

		//remove the last tr
		var lastTr = document.getElementById(_HTML_TR + "-" +  _element.id + "-last");
		if(lastTr != null) handle.removeChild(lastTr);

		//remove the childrens scope points
		//remove the first tr
		var cfirstTr = document.getElementById(_HTML_TR + "-" +  _element.id + "-c-first");
		if(cfirstTr != null) handle.removeChild(cfirstTr);

		//remove the last tr
		var clastTr = document.getElementById(_HTML_TR + "-" +  _element.id + "-c-last");
		if(clastTr != null) handle.removeChild(clastTr);

		//remove itself
		var ch = document.getElementById(_HTML_TR + "-" + _element.getId());
		if(ch != null) handle.removeChild(ch);

	}

	//***************************************************************************
	//***************************************************************************
	_elementToTr = function(_element){

		var srule = _element.rule;
		//required or optional
		var required = "required";
		if(srule.min == 0) required = "optional";
		
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
		}

		//element's help image
		var imgHelp = createHtmlElement(_HTML_IMG);
		imgHelp.src = imagePrefix + _HTML_ELEMENT_IMG_HELP_SRC;
		imgHelp.id = "imageHelp" + prefix;
		imgHelp.className = "embeddedHelpIcon";
		imgHelp.width = _HTML_IMG_DEFAULT_WIDTH;
		imgHelp.height = _HTML_IMG_DEFAULT_HEIGHT;
		imgHelp.style.display = "none";
		if(showHelpFlag && _element.doc !="") imgHelp.style.display = "";


		imgHelp.onmouseover = function(){return window.showHelp(_element.name , _element.doc);};
		imgHelp.onmouseout = function(){return nd();};

		//<tr> has seven <td> nodes
		var td = new Array(7);
		for(var i=0;i<td.length;i++){
			td[i] = createHtmlElement(_HTML_TD);
			td[i].name = "column-" + i;
		}
		td[0].appendChild(img);
		td[1].appendChild(imgHelp);
		td[1].appendChild(createHtmlTextElement(_element.name));
		td[2].appendChild(createHtmlTextElement("\u00a0"));
		td[3].appendChild(createHtmlTextElement("\u00a0"));
		td[4].appendChild(createHtmlTextElement(required));
		td[5].appendChild(createHtmlTextElement(_element.source));
		var select = _getActionOptions(_element);
		if(select != null){
			td[6].appendChild(select);
		}else{
			td[6].appendChild(createHtmlTextElement("\u00a0"))
		}
		
		//set tds class
		td[0].className = _HTML_CLASS_CONTROL_ROW;
		td[1].className = _HTML_CLASS_PARAMNAME;
		if(required == "required") td[1].className = _HTML_CLASS_PARAMNAME_REQUIRED;

		td[2].className = _HMTL_CLASS_PARAM_VALUE;		
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

	_elementValueToTr = function(_element){

		var prefix = "-" + _element.id + "-v";

		//element's rule
		var rule = _element.rule;
		var crule = _element.crule;

		//requirements
		var required = "optional";
		var getObject = requiredDefaultValues.get(_element.name + ":content");
		if(getObject != null) required = "required";
		
		//defaultValue
		var dValue = "\u00a0";
		var df = crule.defaultValue;
		if(df != "") dValue = df;

		//source
		var source = _element.source;

		//print <tr> nodes
		var tr = createHtmlElement(_HTML_TR);
		tr.id = _HTML_TR + prefix;

		tr.className = _HTML_CLASS_ATTRIBUTE_DEFAULT + (_element.layer + 1);
		if(required == "required" || source == "Profile") tr.className = _HTML_CLASS_ATTRIBUTE_PROFILE + (_element.layer + 1);
		
		//<td> nodes
		var td = new Array(7);
		for(var i=0;i<td.length;i++){
			td[i] = createHtmlElement(_HTML_TD);
			td[i].name = "column-" + i;
		}	
		
		td[1].appendChild(createHtmlTextElement("content"));
		_appendElementValueTd2(tr , td[2] , _element , prefix);
		
		td[3].appendChild(createHtmlTextElement(dValue));
		td[4].appendChild(createHtmlTextElement(required));
		td[5].appendChild(createHtmlTextElement(source));
		td[6].appendChild(createHtmlTextElement("\u00a0"));

		td[0].className = _HTML_CLASS_CONTROL_ROW;
		td[1].className = _HTML_CLASS_PARAMNAME;
		td[2].className = _HMTL_CLASS_PARAM_VALUE;		
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

	//leaf element will be looked as an "attribute" of element.
	_leafElementToTr = function(_element){

		var prefix = "-" + _element.id;
		//print <tr> nodes
		var tr = createHtmlElement(_HTML_TR);
		tr.id = _HTML_TR + prefix;

		//element's rule
		var rule = _element.rule;
		var crule = _element.crule;

		//requirements
		var required = "required";
		if(rule.min == 0) required = "optional";

		//defaultValue
		var dValue = "\u00a0";
		var df = crule.defaultValue;
		if(df != "") dValue = df;
		
		//element's help image
		var imgHelp = createHtmlElement(_HTML_IMG);
		imgHelp.src = imagePrefix + _HTML_ELEMENT_IMG_HELP_SRC;
		imgHelp.id = "imageHelp" + prefix;
		imgHelp.className = "embeddedHelpIcon";
		imgHelp.width = _HTML_IMG_DEFAULT_WIDTH;
		imgHelp.height = _HTML_IMG_DEFAULT_HEIGHT;
		imgHelp.style.display = "none";
		if(showHelpFlag && _element.doc != "") imgHelp.style.display = "";

		imgHelp.onmouseover = function(){return window.showHelp(_element.name , _element.doc);};
		imgHelp.onmouseout = function(){return nd();};

		//source
		var source = _element.source;

		tr.className = _HTML_CLASS_ATTRIBUTE_PROFILE + _element.layer;
		//if the elemnt is optional and its value is empty, u should change the class to remind user!
		//todo: if the element is required but it's value is empty(ERROR! user make a mistake), 
		//how to remind user this mistake?It is a better way to use another color.
		if(required == "optional" && _element.value == "") tr.className = _HTML_CLASS_ATTRIBUTE_DEFAULT + _element.layer;

		//<td> nodes
		var td = new Array(7);
		for(var i=0;i<td.length;i++){
			td[i] = createHtmlElement(_HTML_TD);
			td[i].name = "column-" + i;
		}

		td[1].appendChild(imgHelp);
		td[1].appendChild(createHtmlTextElement(_element.name));
		_appendLeafElementTd2(tr , td[2] , _element , prefix);

		td[3].appendChild(createHtmlTextElement(dValue));
		td[4].appendChild(createHtmlTextElement(required));
		td[5].appendChild(createHtmlTextElement(source));
		td[6].appendChild(createHtmlTextElement("\u00a0"));
		
		//print tds class
		td[0].className = _HTML_CLASS_CONTROL_ROW;
		td[1].className = _HTML_CLASS_PARAMNAME;
		if(required == "required") td[1].className = _HTML_CLASS_PARAMNAME_REQUIRED;

		td[2].className = _HMTL_CLASS_PARAM_VALUE;		
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
		var rule = _attribute.getRule();
		
		//required
		var required = rule.use;
		
		//default value
		var defaultValue = "\u00a0";
		if(rule.defaultValue != "") defaultValue = rule.defaultValue;
		
		//source
		var source = _attribute.source;
		
		//attribute prefix
		var prefix = "-" + element.id + "-" + _attribute.id + "-a";

		//attribute's help image
		var imgHelp = createHtmlElement(_HTML_IMG);
		imgHelp.id = "imageHelp" + prefix;
		imgHelp.className = "embeddedHelpIcon";
		imgHelp.src = imagePrefix + _HTML_ELEMENT_IMG_HELP_SRC;
		imgHelp.width = _HTML_IMG_DEFAULT_HEIGHT;
		imgHelp.height = _HTML_IMG_DEFAULT_HEIGHT;
		imgHelp.style.display = "none";
		if(showHelpFlag && _attribute.doc != "") imgHelp.style.display = "";

		imgHelp.onmouseover = function(){return window.showHelp(_attribute.name , _attribute.doc);};
		imgHelp.onmouseout = function(){return nd();};

		//print <tr> nodes
		var tr = createHtmlElement(_HTML_TR);
		tr.id = _HTML_TR + prefix;

		tr.className = _HTML_CLASS_ATTRIBUTE_DEFAULT + (element.layer + 1);
		if(required == "required" || source == "Profile") tr.className = _HTML_CLASS_ATTRIBUTE_PROFILE + (element.layer + 1);
		

		//<td> nodes
		var td = new Array(7);
		for(var i=0;i<td.length;i++){
			td[i] = createHtmlElement(_HTML_TD);
			td[i].name = "column-" + i;
		}
		
		//append tds
		td[1].appendChild(imgHelp);
		td[1].appendChild(createHtmlTextElement(_attribute.name));

		_appendAttributeTd2(tr , td[2] , _attribute , prefix);
		td[3].appendChild(createHtmlTextElement(defaultValue));
		td[4].appendChild(createHtmlTextElement(required));
		td[5].appendChild(createHtmlTextElement(_attribute.source));
		td[6].appendChild(createHtmlTextElement("\u00a0"));
		
		//set tds class
		td[0].className = _HTML_CLASS_CONTROL_ROW;
		td[1].className = _HTML_CLASS_PARAMNAME;
		if(required == "required") td[1].className = _HTML_CLASS_PARAMNAME_REQUIRED;
		
		td[2].className = _HMTL_CLASS_PARAM_VALUE;		
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

	//return the action drop-down list object
	_getActionOptions = function(_element){
		var select = null;
		var srule = _element.rule;

		//get enable elements
		var enableElements = new Array();
		var childElements = domTree.getAllAvailChildrens(_element.name);
		for(var i=0;i<childElements.length;i++){
			var name = childElements[i].name;
			var cSrule = childElements[i].rule;
			
			var isExist = false;
			var currentChilds = _element.childrens;
			for(var j=0;j<currentChilds.length;j++){
				if(name == currentChilds[j].name){
					if(cSrule.max == 1){
						isExist = true;
						break;
					}
				}
			}
			if(!isExist) enableElements.push(childElements[i]);
		}

		//print it
		//alert(_element + "|" + enableElements.length + "|" + srule.min + "|" + srule.max);
		if(enableElements.length == 0 && srule.min == 1 && srule.max == 1){
				//do not display the action select object
		}else{
			// Select object default information.
			select = createHtmlElement("select");
			select.name = "select" + "-" + _element.id;
			select.id = "select" + "-" + _element.id;			
			select.style.width = "220px";

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
					setButtonState("");
					this.options[0].selected = true;
				}
			}

			var option0 = createHtmlElement("option");
			option0.selected = "selected";
			option0.value = "Actions";
			option0.appendChild(createHtmlTextElement("Actions"));
			select.appendChild(option0);
			
			//the root element can not be deleted
			if(_element.name == "sc:ServiceDefinition" ||(srule.min == 1 && srule.max == 1)){
				//do not display the remove option
			}else{
				var option1 = createHtmlElement("option");
				option1.value = "---";
				option1.appendChild(createHtmlTextElement("---"));
				select.appendChild(option1);
				
				var option4 = createHtmlElement("option");
				option4.value = "remove";
				option4.appendChild(createHtmlTextElement("Remove \"" + _element.name + "\""));
				select.appendChild(option4);
			}

			//display the element which can be added
			if(enableElements.length >0){
				var option5 = createHtmlElement("option");
				option5.value = "---";
				option5.appendChild(createHtmlTextElement("---"));
				select.appendChild(option5);

				var option = new Array();
				for(var i=0;i<enableElements.length;i++){
					var name = enableElements[i].name;
					
					option[i] = createHtmlElement("option");
					option[i].value = "insert:" + name;

					option[i].appendChild(createHtmlTextElement("Insert \"" + name + "\""));
					select.appendChild(option[i]);
				}
			}
		}
		return select;	
	}

	_appendLeafElementTd2 = function(_tr , _td2 , _element , _prefix){
		
		var eValue = "\u00a0";
		if(_element.value != "") eValue = _element.value;
		
		var span = createHtmlElement("span");
		span.appendChild(createHtmlTextElement(eValue));

		_td2.appendChild(span);
		_td2.onclick = function(){
			if(GlobalNextStep){
				//step 1: wheter can modify this value?
				if(_this.canModify(_element.name)){
					//step 2: display dropdown list or input base on the rule
					var span = this.getElementsByTagName("span")[0];
					var isExist = false;
					var childrens = span.childNodes;
					for(var i=0;i<childrens.length;i++){
						var child = childrens[i];
						if(child.nodeType == 1){
							isExist = true;
							break;
						}
					}
					if(!isExist){
						td2Factory.createInstanceOfElement(this , _element , _prefix);
					}
				}else{
					var alterMessage = RULE_VALIDATE_NOT_EDIT.replace("{0}",_element.name);
                    alert(alterMessage);
				}
			}
		}
	}


	_appendAttributeTd2 = function(_tr , _td2 , _attribute , _prefix){

		var aValue = "\u00a0";
		if(_attribute.value != "") aValue = _attribute.value;

		var span = createHtmlElement("span");
		span.appendChild(createHtmlTextElement(aValue));

		_td2.appendChild(span);
		_td2.onclick = function(){
			if(GlobalNextStep){
				var e = _attribute.element;
				var validateName = e.name + ":" + _attribute.name;
				//step 1: wheter can modify this value?
				if(_this.canModify(validateName)){
						//step 2: display dropdown list or input base on the rule
						var span = this.getElementsByTagName("span")[0];
						var isExist = false;
						var childrens = span.childNodes;
						for(var i=0;i<childrens.length;i++){
							var child = childrens[i];
							if(child.nodeType == 1){
								isExist = true;
								break;
							}
						}
						if(!isExist){
							td2Factory.createInstanceOfAttribute(this , _attribute , _prefix);
						}
				}else{
					var alterMessage = RULE_VALIDATE_NOT_EDIT.replace("{0}",_attribute.name );
                    alert(alterMessage);
				}
			}
		}
	}

	_appendElementValueTd2 = function(_tr , _td2 , _element , _prefix){
		var eValue = "\u00a0";
		if(_element.value != "") eValue = _element.value;

		var span = createHtmlElement("span");
		span.appendChild(createHtmlTextElement(eValue));

		_td2.appendChild(span);
		_td2.onclick = function(){
			if(GlobalNextStep){
				var validateName = _element.name + ":content";
				//step 1: wheter can modify this value?
				if(_this.canModify(validateName)){
						//step 2: display dropdown list or input base on the rule
						var span = this.getElementsByTagName("span")[0];
						var isExist = false;
						var childrens = span.childNodes;
						for(var i=0;i<childrens.length;i++){
							var child = childrens[i];
							if(child.nodeType == 1){
								isExist = true;
								break;
							}
						}
						if(!isExist){
							td2Factory.createInstanceOfElementValue(this , _element , _prefix);
						}
				}else{
					var alterMessage = RULE_VALIDATE_NOT_EDIT.replace("{0}",_element.name);
                    alert(alterMessage);
				}
			}
		}
	}
}

//*******************************************************************************
//Td2Factory
//*******************************************************************************
function Td2Factory(_s2f){
	var s2f = _s2f;
	this.createInstanceOfElement = function(_td2 , _element , _prefix){
		//clean up
		var span = _td2.getElementsByTagName("span")[0];
		span.innerHTML = "";

		//get rule's informations
		var child = null;
		var crule = _element.crule;
		switch(crule.name){
			case "enumString": 
				child = this.getEnumStringSelect(_td2 , _element.crule.enumValues , _element , _prefix);
				break;
			case "boolean":
				child = this.getBooleanSelect(_td2 , _element ,_prefix);
				break;
			default:
				child = this.getInputOfElement(_td2 , _element , _prefix);
		}
		span.appendChild(child);
		child.focus();
	}

	this.createInstanceOfAttribute = function(_td2 , _attribute , _prefix){
		//clean up
		var span = _td2.getElementsByTagName("span")[0];
		span.innerHTML = "";

		//get rule's informations
		var child = null;
		var rule = _attribute.rule;
		switch(rule.name){
			case "enumString": 
				child = this.getEnumStringSelect(_td2 , _attribute.rule.enumValues , _attribute , _prefix);
				break;
			case "boolean":
				child = this.getBooleanSelect(_td2 , _attribute ,_prefix);
				break;
			default:
				child = this.getInputOfAttribute(_td2 , _attribute , _prefix);
		}
		span.appendChild(child);
		child.focus();
	}

	this.createInstanceOfElementValue = function(_td2 , _element , _prefix){
		//clean up
		var span = _td2.getElementsByTagName("span")[0];
		span.innerHTML = "";

		//get rule's informations
		var child = null;
		var crule = _element.crule;
		switch(crule.name){
			case "enumString": 
				child = this.getEnumStringSelect(_td2 , _element.crule.enumValues , _element , _prefix);
				break;
			case "boolean":
				child = this.getBooleanSelect(_td2 , _element ,_prefix);
				break;
			default:
				child = this.getInputOfElementValue(_td2 , _element , _prefix);
		}
		span.appendChild(child);
		child.focus();
	}

	this.getEnumStringSelect = function(_td2 , _enums , _object , _prefix){

		var select = createHtmlElement("select");
		select.name = "select" + _prefix;
		select.id = "select" + _prefix;	

		for(var k=0;k<_enums.length;k++){
			var enumV = _enums[k];
			
			var option = createHtmlElement("option");
			option.value = enumV;
			option.appendChild(createHtmlTextElement(enumV));
			
			if(_object.value == enumV){
				option.selected = true;
			}
			select.appendChild(option);
		}
		select.onchange = function(){
			var _value = this.options[this.selectedIndex].value;
			_object.value = _value;

			//change button status
			window.setButtonState("");
		}

		select.onblur = function(){
			var _value = this.options[this.selectedIndex].value;
			var span = _td2.getElementsByTagName("span")[0];
			span.innerHTML = "";

			var eValue = "\u00a0";
			if(_value != "") eValue = _value;			
			span.appendChild(createHtmlTextElement(eValue));
		}

		if(_object.value == "") _object.value = _enums[0];
		return select;
	}

	this.getBooleanSelect = function(_td2 , _object , _prefix){
		var select = createHtmlElement("select");
		select.name = "select" + _prefix;
		select.id = "select" + _prefix;	

		var option0 = createHtmlElement("option");
		option0.value = "true";
		option0.appendChild(createHtmlTextElement("true"));
			
		var option1 = createHtmlElement("option");
		option1.value = "false";
		option1.appendChild(createHtmlTextElement("false"));

		if(_object.value.toLowerCase() == "true"){
			option0.selected = true;
		}else{
			option1.selected = true;
		}
		select.appendChild(option0);
		select.appendChild(option1);

		select.onchange = function(){
			var _value = this.options[this.selectedIndex].value;
			_object.value = _value;

			//change button status
			window.setButtonState("");
		}
		select.onblur = function(){
			var _value = this.options[this.selectedIndex].value;
			var span = _td2.getElementsByTagName("span")[0];
			span.innerHTML = "";

			var eValue = "\u00a0";
			if(_value != "") eValue = _value;			
			span.appendChild(createHtmlTextElement(eValue));
		}

		if(_object.value == "") _object.value="true";
		return select;
	}

	this.getInputOfElement = function(_td2 , _element , _prefix){
		var crule = _element.crule;
		var srule = _element.rule;
		var message = "";

		var input = createHtmlElement("input");
		input.id = _prefix + "-i";
		input.size = 40;
		input.className = "input-text";
		input.value = _element.value;
		
		input.onblur = function(){
			var inputValue = this.value;
			//if the parameter "required" value of element is "optional"
			//and the value of the attribute is empty -- DO NOT VALIDATE!
			var result = true;
			if(inputValue == ""){
				if(srule.min == 0){
					//do not validate it!
				}else{
					message = RULE_VALIDATE_NOT_EMPTY;
					result = false;
				}
			}else{
   				//if the element's name is "ego:Umask", validat by use the patterns:/^0[0-7]{3}$/;
   				if(_element.name == "ego:Umask"){
           			var pattern = /^0[0-7]{3}$/;
           			if(!pattern.test(inputValue)){
                   		result = false;
                   		message = RULE_VALIDATE_NOT_PATTERN_0;
           			}
   				}else{
           			result = crule.validate(inputValue);
           			message = crule.message;
   				}
			}

			//validate the result
			if(result){
				if(srule.min == 0){
					var _tr = _td2.parentNode;
					if(this.value != ""){
						_tr.className = _HTML_CLASS_ATTRIBUTE_PROFILE + _element.layer;
					}else{
						_tr.className = _HTML_CLASS_ATTRIBUTE_DEFAULT + _element.layer;
					}
				}
				_executeSuccess(_td2 , this , _element);
			}else{
				_executeFailure(_td2 , this , _element , message);

			}
		}
		return input;
	}

	this.getInputOfAttribute = function(_td2 , _attribute , _prefix){

		var element = _attribute.element;
		var rule = _attribute.rule;
		var input = createHtmlElement("input");
		var message = "";

		input.id = _prefix + "-i";
		input.size = 40;
		input.className = "input-text";
		input.value = _attribute.value;
		
		input.onblur = function(){
			var inputValue = this.value;
			var result = true;

			if(inputValue == ""){
				if(rule.use == "required"){
					message = RULE_VALIDATE_NOT_EMPTY;
					result = false;
				}
			}else{
      			//if the attribute is "ServiceName",validate it by use the pattern:/^[A-Za-z_]{1}[A-Za-z0-9_]{0,39}$/
       			if(_attribute.name == "ServiceName"){
               		var pattern = /^[A-Za-z_]{1}[A-Za-z0-9_]{0,39}$/;
               		if(!pattern.test(inputValue)){
                    	result = false;
                       	message = RULE_VALIDATE_NOT_PATTERN_1;
               		}
       			}else{
               		result = rule.validate(inputValue);
               		message = rule.message;
       			}
			}

			if(result){
				if(rule.use != "required"){
					var _tr = _td2.parentNode;
					if(this.value != ""){
						_tr.className = _HTML_CLASS_ATTRIBUTE_PROFILE + (element.layer + 1);
					}else{
						_tr.className = _HTML_CLASS_ATTRIBUTE_DEFAULT + (element.layer + 1);
					}
				}
				_executeSuccess(_td2 , this , _attribute);
			}else{
				_executeFailure(_td2 , this , _attribute , message);
			}
		}
		return input;
	}

	this.getInputOfElementValue = function(_td2 , _element , _prefix){
		var crule = _element.crule;
		var input = createHtmlElement("input");
		var message = "";
		input.id = _prefix + "-i";
		input.size = 40;
		input.className = "input-text";
		input.value = _element.value;
		input.onblur = function(){
			var inputValue = this.value;
			
			var result = true;
			if(inputValue == ""){
				//don't validate it!
				var getObject = s2f.getRequiredDefaultValues().get(_element.name + ":content");
				if(getObject != null){
					message = RULE_VALIDATE_NOT_EMPTY;
					result = false;
				}
			}else{
				result = crule.validate(inputValue);
				message = crule.message;
			}

			//var result = crule.validate(inputValue);
			if(result){
				var _tr = _td2.parentNode;
				if(this.value != ""){
					_tr.className = _HTML_CLASS_ATTRIBUTE_PROFILE + (_element.layer + 1);
				}else{
					_tr.className = _HTML_CLASS_ATTRIBUTE_DEFAULT + (_element.layer + 1);
				}
				_executeSuccess(_td2 , this , _element);
			}else{
				_executeFailure(_td2 , this , _element , message);
			}
		}
		return input;
	}


	//*******************************************************************************
	// private methods
	//*******************************************************************************
	_executeSuccess = function(_td2 , _input , _object){
		//change button status
		window.setButtonState("");
		_object.value = _input.value;

		var span = _td2.getElementsByTagName("span")[0];
		span.innerHTML = "";

		var eValue = "\u00a0";
		if(_input.value != "") eValue = _input.value;			
		span.appendChild(createHtmlTextElement(eValue));

		GlobalNextStep = true;
	}

	_executeFailure = function(_td2 , _input , _object , _message){
		var fdoc = window.formatData(_object.doc);
		//alert(crule.message); //alert message is not a good solution!
		var span = _td2.getElementsByTagName("span")[0];
		var divs = _td2.getElementsByTagName("div");
		if(divs.length > 0){
			//get messageSpan;
			var div = divs[0];
			var messageSpan = div.getElementsByTagName("span")[1];
			messageSpan.innerHTML = "";	 
			messageSpan.appendChild(createHtmlTextElement(_message));

			var hrefSpan = div.getElementsByTagName("span")[2];
			if(hrefSpan.childNodes.length >0){
				var href = hrefSpan.childNodes[1];
				href.innerHTML = "";
				href.onclick = function(){
						var text = href.firstChild.data;
						if(text == "More"){
							messageSpan.innerHTML = "";
							href.innerHTML = "";

							href.appendChild(createHtmlTextElement("Less"));
							messageSpan.appendChild(createHtmlTextElement(fdoc) , hrefSpan);
						}else{
							messageSpan.innerHTML = "";
							href.innerHTML = "";

							href.appendChild(createHtmlTextElement("More"));
							messageSpan.appendChild(createHtmlTextElement(_message) , hrefSpan);
						}
					}
				href.appendChild(createHtmlTextElement("More"));
			}
		}else{
			var div = createHtmlElement("div");
			var errorSpan = createHtmlElement("span");
			errorSpan.className = "formError";
			
			var messageSpan = createHtmlElement("span");
			messageSpan.className = "formErrorExtra";
			
			var hrefSpan = createHtmlElement("span");
			hrefSpan.className = "formErrorToggle";

			var href = createHtmlElement("a");
			href.href = "#";
			href.onclick = function(){
					var text = href.firstChild.data;
					if(text == "More"){
						messageSpan.innerHTML = "";
						href.innerHTML = "";

						href.appendChild(createHtmlTextElement("Less"));
						messageSpan.appendChild(createHtmlTextElement(fdoc) , hrefSpan);
					}else{
						messageSpan.innerHTML = "";
						href.innerHTML = "";

						href.appendChild(createHtmlTextElement("More"));
						messageSpan.appendChild(createHtmlTextElement(_message) , hrefSpan);
					}
				}
			//if the document of element has be defined in schema file, show [More] hyperlink
			//Otherwise xmleditor don't display it!
			if(_object.doc != ""){
				href.appendChild(createHtmlTextElement("More"));			
				hrefSpan.appendChild(createHtmlTextElement("["));
				hrefSpan.appendChild(href);
				hrefSpan.appendChild(createHtmlTextElement("]"));
			}

			messageSpan.appendChild(createHtmlTextElement(_message));
			errorSpan.appendChild(messageSpan);
			errorSpan.appendChild(hrefSpan);

			div.appendChild(errorSpan);
			span.insertBefore(div , _input);

		}
		window.setButtonState("");
		GlobalNextStep = false;
	}
}
