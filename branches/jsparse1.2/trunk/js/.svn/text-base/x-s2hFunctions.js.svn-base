


//*******************************************************************************
//HtmlForm methods
//*******************************************************************************
// Pick-up this method from the editableForm.js

function ec(_element , _thisImage){

	if(_thisImage.src.match("open")){
		//want to close this element
		closeElementTr(_element);
		_element.isOpen = false;
		_thisImage.src = _HTML_ELEMENT_IMG_CLOSE_SRC;
	}else{
		//want to open this element
		if(_element.childrens.length >0){
			openElementTr(_element);
		}else{
			changeAttrTemplate(_element , "");
		}
		_element.isOpen = true;
		_thisImage.src = _HTML_ELEMENT_IMG_OPEN_SRC;
	}
}


function closeElementTr(_element){
	//alert("contract element");
	var childrens = _element.childrens;
	if(childrens.length > 0){
		//if child has it's childrens , you should recur invoke this method.
		for(var i=0;i<childrens.length;i++){
			var child = childrens[i];
			closeElementTr(child);

			//close children
			closeLeafElement(child);
		}
	}else{
		//close the child's attributes
		closeAttributeState(_element);
	}

}

function openElementTr(_element){
	//alert("expand element");
	var childrens = _element.childrens;
	if(childrens.length > 0){
		//if child has it's childrens , you should recur invoke this method.
		for(var i=0;i<childrens.length;i++){
			var child = childrens[i];
			openElementTr(child);
			
			//open children
			openLeafElement(child);
		}
	}else{
		//alert(_element.name + "isOpen=" + _element.isOpen);
		openAttributeState(_element);
	}
}
//*******************************************************************************
//Help methods
//*******************************************************************************

//change attribute template
function changeAttrTemplate(_element , _state){
	var attributes = _element.attributes;
	for(var j=0;j<attributes.length;j++){
		var attr = attributes[j];

		var prefix = "rowConsumer" + _element.treeCode + "-" + attr.id + "-a";
		var aTr = document.getElementById(prefix);
		if (aTr != null) aTr.style.display = _state;
	}
}

function openAttributeState(_element){
	if(_element.isOpen == true){
		changeAttrTemplate(_element , "");
	}else{
		//if the element has be opened,ignore!
	}
}

function closeAttributeState(_element){
	changeAttrTemplate(_element , "none");
}



//change leaf element template
function changeLeafElementTemplate(_element , _state){
	var prefix = "rowConsumer" + _element.treeCode;
	var eTr = document.getElementById(prefix);
	if(eTr != null) eTr.style.display = _state;
}
function openLeafElement(_element){
	changeLeafElementTemplate(_element , "");
}

function closeLeafElement(_element){
	changeLeafElementTemplate(_element , "none");
}



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
	
	//alert("select.value=" + _select.value);
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

	var thisRow = _select.parentNode.parentNode;
	//alert("remove the row:" + thisRow.id);

	s2f.removeElement(thisRow.id);
}

function elementInsert(_select){

	//todo:judge whether can insert a new element?
	var r = true;

	if(r){
		//add the new element
		var thisRow = _select.parentNode.parentNode;
		//alert("this row id =" + thisRow.id);
		
		var sValue = _select.value;
		var elementName = sValue.substring(sValue.indexOf(":")+1);
		//alert("sValue=" + sValue + " | element.name = " + elementName);

		s2f.insertElement(thisRow.id , elementName);

	}
}