



//*******************************************************************************
//HtmlForm methods
//*******************************************************************************
// Pick-up this method from the editableForm.js

function ec(_element){
	var imgId = _HTML_IMG + "-" + _element.getId() + "-i";
	var imgHandle = document.getElementById(imgId);

	if(imgHandle.src.match("open")){
		//want to close this element
		s2f.closeElement(_element);
		imgHandle.src = _HTML_ELEMENT_IMG_CLOSE_SRC;
	}else{
		//want to open this element
		s2f.openElement(_element);
		imgHandle.src = _HTML_ELEMENT_IMG_OPEN_SRC;
	}
}


//*******************************************************************************
// Template (these method has be remove into xmleditor.js)
//*******************************************************************************
/*
//change leaf element template
function changeLeafElementTemplate(_element , _state){
	var prefix = _HTML_TR + "-" + _element.getId();
	var eTr = document.getElementById(prefix);
	
	if(eTr != null){
		eTr.style.display = _state;
	}
}
//change attribute template
function changeAttrTemplate(_element , _state){
	var attributes = _element.attributes;
	for(var j=0;j<attributes.length;j++){
		var attr = attributes[j];

		var prefix = _HTML_TR + "-" + _element.getId() + "-" + attr.id + "-a";
		//alert("prefix=" + prefix);
		var aTr = document.getElementById(prefix);
		if (aTr != null) aTr.style.display = _state;
	}
}

function changeElementValueTemplate(_element , _state){
	var prefix = _HTML_TR + "-" + _element.getId() + "-v";
	var eTr = document.getElementById(prefix);
	
	if(eTr != null){
		eTr.style.display = _state;
	}
}

//*******************************************************************************
function closeElementTr(_element){
	//alert("contract element");
	var childrens = _element.childrens;
	//if child has it's childrens , you should recur invoke this method.
	for(var i=0;i<childrens.length;i++){
		var child = childrens[i];
		closeElementTr(child);

		//close children
		closeLeafElement(child);
	}
	
	var lastTr = document.getElementById(_HTML_TR + "-" +  _element.id + "-end");
	lastTr.style.display = "none";

	//close the child's attributes
	closeAttributeState(_element);
}
function closeLeafElement(_element){
	changeLeafElementTemplate(_element , "none");
}

function closeAttributeState(_element){
	changeAttrTemplate(_element , "none");
	changeElementValueTemplate(_element , "none");
}


//*******************************************************************************
function openElementTr(_element){
	
	//alert("expand element[" + _element + "]");
	var childrens = _element.childrens;
	//if child has it's childrens , you should recur invoke this method.
	for(var i=0;i<childrens.length;i++){
		var child = childrens[i];
		
		var imgId = _HTML_IMG + "-" + child.getId() + "-i";
		var imgHandle = document.getElementById(imgId);
		
		if(imgHandle.src.match("open")){
			openElementTr(child);	
		}

		//open children
		openLeafElement(child);
	}
	var lastTr = document.getElementById(_HTML_TR + "-" +  _element.id + "-end");
	lastTr.style.display = "";

	//alert(_element.name + "isOpen=" + _element.isOpen);
	openAttributeState(_element);
}

function openAttributeState(_element){
	changeAttrTemplate(_element , "");
	changeElementValueTemplate(_element , "");
}

function openLeafElement(_element){
	changeLeafElementTemplate(_element , "");
}
*/




//*******************************************************************************
//Other methods
//*******************************************************************************
function saveHtmlForm(){
	s2f.toXml();
}

function validateForm(){
	
	var table = document.getElementById("resourcePlanTable");
	//alert(table);

	//find <span> tag
	
	var spanArray = table.getElementsByTagName("span");
	var spanInput = "";
	for(var i=0;i<spanArray.length;i++){
		//find the span value
		spanInput = spanArray[i].innerHTML;
		
		//get input values?! faint!
		var sv = "";
		if(spanInput != ""){
			var indexV = spanInput.indexOf("value");
			if(indexV != -1){
				var indexC = spanInput.indexOf("class");
				sv = spanInput.substring(indexV + 6 , indexC);
				//alert(sv);
			}
		}else{
			sv = spanInput;
		}
		
		//find input tag <-requirements>
		var inputName0 = spanArray[i].getAttribute("id") + "-requirements";
		var input0 = document.getElementById(inputName0);
		var elementName = input0.value;

		var inputName1 = spanArray[i].getAttribute("id") + "-profile";
		var input1 = document.getElementById(inputName1);
		var attributeName = input1.value;

		var rule = parse.findElementAttributeRule(elementName , attributeName);
		
		//StringRule
		if(rule.name == "string"){
			//alert("rule.validate(" + sv + ") = " + rule.validate(sv));
			if(rule.validate(sv) != true){
				var message = "Validate the " + elementName + "'s attribute[" + attributeName + "] failure!! The value should NOT empty!";
				alert(message);
				return false;
			}
		}
		
		//DecimalRule
		if(rule.name == "decimal"){
			
			if(rule.validate(sv) != true){
				var message = "Decimal validate the " + elementName + "'s attribute[" + attributeName + "] failure!!";
				alert(message);
				return false;

			}
		}

		//todo: add other rules
	}

	alert("Validate successfuly! system will save these information!");
}

// Element actions
function selectActions(_select){
	var value = _select.value;	
	if(value != "Actions" && value != "---"){
		if(value.match("remove")){	
			elementSuicide(_select);
		}
		if(value.match("before")){	
			elementBefore(_select);
		}
		if(value.match("after")){	
			elementAfter(_select);
		}
		if(value.match("insert")){	
			elementInsert(_select);
		}
	}
	_select.options[0].selected = true;
}


//these methods will be insert into Schema2Html.js
///////////////////////////////////////////////////////////////

function elementBefore(_select){
	alert("Oooop! this action will be implements in the next version!");
}

function elementAfter(_select){
	alert("Oooop! this action will be implements in the next version!");
}

//elememt want to remove itself! - like suicide
function elementSuicide(_select){
	try{
		var thisRow = _select.parentNode.parentNode;
		var elementId = thisRow.id.substring(thisRow.id.indexOf("-")+1);

		//if(confirm("Are you realy want to delete a new element[" + elementId + "]?!")){
			s2f.removeElement(parseInt(elementId));
		//}
	}catch (e){
		alertException(e);
	}
}

function elementInsert(_select){
	try{
		//add the new element
		var thisRow = _select.parentNode.parentNode;
		var fid = thisRow.id.substring(thisRow.id.indexOf("-")+1);
			
		var sValue = _select.value;
		var eName = sValue.substring(sValue.indexOf(":")+1);
		
		//if(confirm("Are you realy want to add a new element[" + eName + "]?!")){
			s2f.addElement(parseInt(fid) , eName);
		//}
	}catch (e){
		alertException(e);
	}
}


// Hide and show columns in table.
function toggleThisColumn(thisColumn) {
	if(thisColumn.checked == true) {
		if(thisColumn.id=="showDefaults") {
			getStyleClass('.paramValueDefault').style.display = '';			
		} else if (thisColumn.id=="showRequirements") {
			getStyleClass('.paramRequirements').style.display = '';	
		} else if (thisColumn.id=="showSource") {
			getStyleClass('.paramSource').style.display = '';
		} else if (thisColumn.id=="showActions") {
			getStyleClass('.paramActions').style.display = 'block';
		}
	} else {
		if(thisColumn.id=="showDefaults") {
			getStyleClass('div.appProfileDisplay table td.paramValueDefault').style.display = 'none';
		} else if (thisColumn.id=="showRequirements") {
			getStyleClass('.paramRequirements').style.display = 'none';
		} else if (thisColumn.id=="showSource") {
			getStyleClass('.paramSource').style.display = 'none';
		} else if (thisColumn.id=="showActions") {
			getStyleClass('.paramActions').style.display = 'none';
		}
	}
}


function getStyleClass (className) {
	//for (var s = 0; s < document.styleSheets.length; s++){
		var sheet = document.styleSheets[12];
		if(sheet.rules){
			for (var r = 0; r < sheet.rules.length; r++){
				if (sheet.rules[r].selectorText.match(className)){
					return sheet.rules[r];
				}
			}
		}else if(sheet.cssRules){
			for (var r = 0; r < sheet.cssRules.length; r++){
				if (sheet.cssRules[r].selectorText.match(className))
					return sheet.cssRules[r];
			}
		}
	//}
}