


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

	//Public propertys
	//***************************************************************************
	var domTree = _domTree;
	var handle = _handle;
	var imagePrefix = _imagePrefix;

	var _this = this;
	var td2Factory = new Td2Factory();

	var notEditColumns = new Array();
	
	//Public methods
	//***************************************************************************
	this.setNotEditColumns = function(_columns){
		notEditColumns = _columns;
	}

	this.addNotEditColumns = function(_name){
		notEditColumns.push(_name);
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

	//print all elements
	this.layout = function(_canEdit){
		this.cleanUp();
		
		GlobalNextStep = _canEdit;
		_printElement(domTree.getRoot());
	}

	this.setEdittable = function(_editFlag){
		GlobalNextStep = _editFlag;
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
		hiddenColumns();
	}

	_insertNewElement = function(_element , _newElement){

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
				if(attr.display) handle.insertBefore(_attributeToTr(attr) , lTarget);
			}
			
			//print element's childrens which is a leaf node.
			//display the leaf node just like it's attribute!(SHIT!)
			var childrens = _newElement.childrens;
			for(var i=0;i<childrens.length;i++){
				if(childrens[i].isLeaf){
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

	this.addElementAtLast = function(_element , _eName){
		var message = domTree.enableAdd(_element.id , _eName);
		if(message != "") throw "Can not add the " + _eName + " element!! Cause: " + message;
		
		//register the element 
		var newElement = domTree.addElement(_element.id , _eName);
		//_printElement(newElement);
		_insertNewElement(_element , newElement);
		
		/*
		//print itself
		if(newElement.isLeaf){
			var lTr = document.getElementById(_HTML_TR + "-" + _element.id + "-last");
			var _t = handle.insertBefore(_leafElementToTr(newElement) , lTr);
		}else{
			var lTr = document.getElementById(_HTML_TR + "-" + _element.id + "-c-last");
			var _t = handle.insertBefore(_elementToTr(newElement) , lTr);	
			
			//print the attribute scope
			//print fist tr
			var fTarget = handle.insertBefore(_createFirstTr(newElement , "first") , lTr);

			//print last tr
			var lTarget = handle.insertBefore(_createLastTr(newElement , "last") , lTr);
			
			//print the childrens scope
			var fcTarget = handle.insertBefore(_createFirstTr(newElement , "c-first") , lTr);
			var lcTarget = handle.insertBefore(_createLastTr(newElement , "c-last") , lTr);

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
		}
		*/
		
		//close some columns
		hiddenColumns();
	}

	this.removeElement = function(_element){

		//if(_element.required == "required"){
		//	throw "You can remove the 'optional' element but not the 'required' element!"
		//}

		var message = domTree.enableRemove(_element.id);
		if(message != "") throw "You can not remove the " + _element.name + " element !! Cause:" + message;

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
			if(CONSUMER_PATH != "" && childrens[i].name == "ego:ConsumerID") childrens[i].value = CONSUMER_PATH;
			
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
		td[0].appendChild(img);
		td[1].appendChild(createHtmlTextElement(_element.name));
		td[1].appendChild(imgHelp);
		td[2].appendChild(createHtmlTextElement("\u00a0"));
		td[3].appendChild(createHtmlTextElement("\u00a0"));
		td[4].appendChild(createHtmlTextElement(required));
		td[5].appendChild(createHtmlTextElement(_element.source));

		//set actions drop-down list
		var select = _getActionOptions(_element);
		td[6].appendChild(select);
		
		//set tds class
		td[0].className = _HTML_CLASS_CONTROL_ROW;
		if(required == "required"){
			td[1].className = _HTML_CLASS_PARAMNAME_REQUIRED;
		}else{
			td[1].className = _HTML_CLASS_PARAMNAME;
		}
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
		
		//defaultValue
		var dValue = "\u00a0";
		var df = crule.defaultValue;
		if(df != "") dValue = df;

		//source
		var source = "Default";
		if(_element.value != "") source="Profile";

		//print <tr> nodes
		var tr = createHtmlElement(_HTML_TR);
		tr.id = _HTML_TR + prefix;
		if(source == "Profile"){
			tr.className = _HTML_CLASS_ATTRIBUTE_PROFILE + (_element.layer + 1);
		}else{
			tr.className = _HTML_CLASS_ATTRIBUTE_DEFAULT + (_element.layer + 1);
		}

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
		
		//source
		var source = "Profile";
		if(_element.state == "new") source="Default";

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

		td[1].appendChild(createHtmlTextElement(_element.name));
		_appendLeafElementTd2(tr , td[2] , _element , prefix);
		td[3].appendChild(createHtmlTextElement(dValue));
		td[4].appendChild(createHtmlTextElement(required));
		td[5].appendChild(createHtmlTextElement(source));
		td[6].appendChild(createHtmlTextElement("\u00a0"));
		
		//print tds class
		td[0].className = _HTML_CLASS_CONTROL_ROW;
		if(required == "required"){
			td[1].className = _HTML_CLASS_PARAMNAME_REQUIRED;
		}else{
			td[1].className = _HTML_CLASS_PARAMNAME;
		}
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
		imgHelp.src = imagePrefix + _HTML_ELEMENT_IMG_HELP_SRC;
		imgHelp.width = 12;
		imgHelp.height = 12;
		imgHelp.onmouseover = function(){return overlib(_attribute.doc);};
		imgHelp.onmouseout = function(){return nd();};

		//print <tr> nodes
		var tr = createHtmlElement(_HTML_TR);
		tr.id = _HTML_TR + prefix;

		tr.className = _HTML_CLASS_ATTRIBUTE_PROFILE + (element.layer + 1);
		if(source == "Default" && required == "optional") tr.className = _HTML_CLASS_ATTRIBUTE_DEFAULT + (element.layer + 1);
		
		//if the elemnt is optional and its value is empty, u should change the class to remind user!
		//todo: if the element is required but it's value is empty(ERROR! user make a mistake), 
		//how to remind user this mistake?It is a better way to use another color.
		if(required == "optional" && _attribute.value == "") tr.className = _HTML_CLASS_ATTRIBUTE_DEFAULT + (element.layer + 1);

		//<td> nodes
		var td = new Array(7);
		for(var i=0;i<td.length;i++){
			td[i] = createHtmlElement(_HTML_TD);
			td[i].name = "column-" + i;
		}
		
		//append tds
		td[1].appendChild(createHtmlTextElement(_attribute.name));
		if(_attribute.doc != "") td[1].appendChild(imgHelp);

		_appendAttributeTd2(tr , td[2] , _attribute , prefix);
		td[3].appendChild(createHtmlTextElement(defaultValue));
		td[4].appendChild(createHtmlTextElement(required));
		td[5].appendChild(createHtmlTextElement(_attribute.source));
		td[6].appendChild(createHtmlTextElement("\u00a0"));
		
		//set tds class
		td[0].className = _HTML_CLASS_CONTROL_ROW;
		if(required == "required"){
			td[1].className = _HTML_CLASS_PARAMNAME_REQUIRED;
		}else{
			td[1].className = _HTML_CLASS_PARAMNAME;
		}
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

		// Select object default information.
		var select = createHtmlElement("select");
		select.name = "select" + "-" + _element.id;
		select.id = "select" + "-" + _element.id;			
		
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

		// Current element operations scope
		//if the element CAN be deleted, display it. Otherwise NOT!
		//todo: How to estimate the element can be deleted or not? i don't know?!
		//if(_element.required != "required"){
		
		//the root element can not be deleted
		if(_element.name != "sc:ServiceDefinition"){
			var option1 = createHtmlElement("option");
			option1.value = "---";
			option1.appendChild(createHtmlTextElement("---"));
			select.appendChild(option1);
			
			var option4 = createHtmlElement("option");
			option4.value = "remove";
			option4.appendChild(createHtmlTextElement("Remove \"" + _element.name + "\""));
			select.appendChild(option4);
		}
		//}

		//get enable elements
		var enableElements = new Array();
		var childElements = domTree.getAllAvailChildrens(_element.name);
		for(var i=0;i<childElements.length;i++){
			var name = childElements[i].name;
			var srule = childElements[i].rule;
			
			var isExist = false;
			var currentChilds = _element.childrens;
			for(var j=0;j<currentChilds.length;j++){
				if(name == currentChilds[j].name){
					if(srule.max == 1){
						isExist = true;
						break;
					}
				}
			}
			if(!isExist) enableElements.push(childElements[i]);
		}

		//print it
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
					alert("The " + _element.name + " can not be edited ");
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
					alert("The " + _attribute.name + " can not be edited ");
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
					alert("The " + _element.name + "'s content can not be edited ");
				}
			}
		}
	}
}

//*******************************************************************************
//Td2Factory
//*******************************************************************************
function Td2Factory(){
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
					message = "The value must NOT be empty!";
					result = false;
				}
			}else{
				result = crule.validate(inputValue);
				message = crule.message;
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
				//change button status
				window.setButtonState("");
				_element.value = inputValue;

				var span = _td2.getElementsByTagName("span")[0];
				span.innerHTML = "";

				var eValue = "\u00a0";
				if(this.value != "") eValue = this.value;			
				span.appendChild(createHtmlTextElement(eValue));

				GlobalNextStep = true;
			}else{
				//alert(crule.message); //alert message is not a good solution!
				var span = _td2.getElementsByTagName("span")[0];
				var divs = _td2.getElementsByTagName("div");
				if(divs.length > 0){
					var div = divs[0];
					div.innerHTML = "";
					
					//div.appendChild(createHtmlTextElement(crule.message));
					div.appendChild(createHtmlTextElement(message));
					span.insertBefore(div , this);
				}else{
					var div = createHtmlElement("div");
					//div.appendChild(createHtmlTextElement(crule.message));
					div.appendChild(createHtmlTextElement(message));
					span.insertBefore(div , this);
				}

				window.setButtonState("disabled");
				GlobalNextStep = false;
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
					message = "The value must NOT be empty!";
					result = false;
				}
			}else{
				result = rule.validate(inputValue);
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
				//change button status
				window.setButtonState("");
				_attribute.value = inputValue;

				var span = _td2.getElementsByTagName("span")[0];
				span.innerHTML = "";

				var eValue = "\u00a0";
				if(this.value != "") eValue = this.value;			
				span.appendChild(createHtmlTextElement(eValue));

				GlobalNextStep = true;
			}else{
				//alert(crule.message); //alert message is not a good solution!
				var span = _td2.getElementsByTagName("span")[0];
				var divs = _td2.getElementsByTagName("div");
				if(divs.length > 0){
					var div = divs[0];
					div.innerHTML = "";
					
					//div.appendChild(createHtmlTextElement(rule.message));
					div.appendChild(createHtmlTextElement(message));
					span.insertBefore(div , this);
				}else{
					var div = createHtmlElement("div");
					//div.appendChild(createHtmlTextElement(rule.message));
					div.appendChild(createHtmlTextElement(message));
					span.insertBefore(div , this);
				}

				window.setButtonState("disabled");
				GlobalNextStep = false;
			}
		}
		return input;
	}

	this.getInputOfElementValue = function(_td2 , _element , _prefix){
		var crule = _element.crule;
		var input = createHtmlElement("input");
		input.id = _prefix + "-i";
		input.size = 40;
		input.className = "input-text";
		input.value = _element.value;
		
		input.onblur = function(){
			var inputValue = this.value;
			
			var result = true;
			if(inputValue == ""){
				//don't validate it!
			}else{
				result = crule.validate(inputValue);
			}

			//var result = crule.validate(inputValue);
			if(result){
				var _tr = _td2.parentNode;
				if(this.value != ""){
					_tr.className = _HTML_CLASS_ATTRIBUTE_PROFILE + (_element.layer + 1);
				}else{
					_tr.className = _HTML_CLASS_ATTRIBUTE_DEFAULT + (_element.layer + 1);
				}
				//change button status
				window.setButtonState("");
				_element.value = inputValue;

				var span = _td2.getElementsByTagName("span")[0];
				span.innerHTML = "";

				var eValue = "\u00a0";
				if(this.value != "") eValue = this.value;			
				span.appendChild(createHtmlTextElement(eValue));

				GlobalNextStep = true;
			}else{
				//alert(crule.message); //alert message is not a good solution!
				var span = _td2.getElementsByTagName("span")[0];
				var divs = _td2.getElementsByTagName("div");
				if(divs.length > 0){
					var div = divs[0];
					div.innerHTML = "";
					
					div.appendChild(createHtmlTextElement(crule.message));
					span.insertBefore(div , this);
				}else{
					var div = createHtmlElement("div");
					div.appendChild(createHtmlTextElement(crule.message));
					span.insertBefore(div , this);
				}

				window.setButtonState("disabled");
				GlobalNextStep = false;
			}
		}
		return input;
	}
}
