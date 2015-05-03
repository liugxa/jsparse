
//*******************************************************************************
//EditorHelper
//*******************************************************************************
function EditorHelper(_s2f , _table){
	var s2f = _s2f;
	var table = _table;
	var thead = table.getElementsByTagName("thead")[0];
	var tbody = table.getElementsByTagName("tbody")[0];

	this.printTable = function(){
		this.printTableTitle();
		this.printElement(s2f.domTree.getRoot());
	}

	this.printTableTitle = function(){
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

		th[0].appendChild(createHtmlTextElement(XML_EDITOR_EMPTY));
		th[1].appendChild(createHtmlTextElement(XML_EDITOR_TABLE_TITLE_NAME));
		th[2].appendChild(createHtmlTextElement(XML_EDITOR_TABLE_TITLE_VALUE));
		th[3].appendChild(createHtmlTextElement(XML_EDITOR_TABLE_TITLE_DEFAULTVALUE));
		th[4].appendChild(createHtmlTextElement(XML_EDITOR_TABLE_TITLE_REQUIREMENTS));
		th[5].appendChild(createHtmlTextElement(XML_EDITOR_TABLE_TITLE_SOURCE));
		th[6].appendChild(createHtmlTextElement(XML_EDITOR_TABLE_TITLE_ACTIONS));

		for(var i=0;i<th.length;i++){
			if(s2f.canColumn(i)) tr.appendChild(th[i]);
		}

		thead.appendChild(tr);
	}

	/**
	* print the element before the target element. If the target is NULL, edotor will append
	* the element at last of the tree.
	*/
	this.printElement = function(_target , _element){
		if(_target == null) throwException("The target object can not be defined NULL!");

		//print itself
		tbody.insertBefore(_elementToTr(_element) , _target);	

		//print fist tr
		var fTarget = tbody.insertBefore(_createFirstTr(_element , "first") , _target);

		//print last tr
		var lTarget = tbody.insertBefore(_createLastTr(_element , "last") , _target);

		
		//print element's attribute
		var atts = _element.attributes;
		for(var j=0 ; j < atts.length ; j++){
			var attr = atts[j];
			if(attr.display) tbody.insertBefore(_attributeToTr(attr) , lTarget);
		}
		
		//print element's childrens which is a leaf node.
		//display the leaf node just like it's attribute!(SHIT!)
		var childrens = _element.childrens;
		for(var i=0;i<childrens.length;i++){
			
			//todo: please remove this line if u have another good choice?!thanks
			//if(CONSUMER_PATH != "" && childrens[i].name == "ego:ConsumerID") childrens[i].value = CONSUMER_PATH;
			if(childrens[i].value == "NULL"){
				var getObject = s2f.requiredDefaultValues.get(childrens[i].name);
				if(getObject != null) childrens[i].value = getObject;
			}

			if(childrens[i].isLeaf){
				tbody.insertBefore(_leafElementToTr(childrens[i]) , lTarget);
			}
		}

		//print elemnt's value
		//if the element has defined the content rule, print it! 
		//otherwish don't print the "content" line.
		if(_element.crule.name != "default"){
			tbody.insertBefore(_elementValueToTr(_element) , lTarget);
		}

		//print it's childrens which is NOT a leaf node!
		//print fist tr
		tbody.insertBefore(_createFirstTr(_element , "c-first") , _target);
		var childrens = _element.childrens;
		for(var i=0;i<childrens.length;i++){
			if(!childrens[i].isLeaf){
				//alert("print children=" + childrens[i]);
				_printElement(childrens[i]);
			}
		}
		//print last tr
		tbody.insertBefore(_createLastTr(_element , "c-last") , _target);
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

	this.createLastTr = function(_element , _postfix){
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
		td[6].appendChild(_getActionOptions(_element));
		
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
			if(_this.canColumn(i)) tr.appendChild(td[i]);
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
			if(_this.canColumn(i)) tr.appendChild(td[i]);
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
			if(_this.canColumn(i)) tr.appendChild(td[i]);
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
			if(_this.canColumn(i)) tr.appendChild(td[i]);
		}
		return tr;
	}

	//return the action drop-down list object
	_getActionOptions = function(_element){

		// Select object default information.
		var select = createHtmlElement("select");
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
				window.setButtonState("");
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
		if(_element.name != domTree.getRoot().name){
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
					if(srule.max == 1 && srule.min != 0){
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


var EditorHelper = new EditorHelper();
var Td2Factory = new Td2Factory();
