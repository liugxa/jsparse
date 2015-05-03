
var s2f = initilize();

//*******************************************************************************
//init methods
//*******************************************************************************

function initilize(){

	//initilize domtree
	var context = _getContext();
	var domTree = new DefaultDomTree(context);
	domTree.init("sc:ServiceDefinition");

	var tbody = document.getElementById("resourcePlanTable").tBodies[0];			
	var s2f = new ServiceDefinitionS2H(domTree , tbody , "images/");
	s2f.layout();
	return s2f;
}

function _getContext(){

	var XML_FILE	= "xml/gui_service_comment.xml";
	var SCHEMA_FILE = "xml/sc.xsd";
	var SCHEMA_REF_FILE = "xml/ego.xsd";

	var context = new LinkListDomTreeContext(true);
	context.initilize(XML_FILE , SCHEMA_FILE , "sc" , "xsd");
	context.addRefParse(SCHEMA_REF_FILE  , "ego" , "xsd");
	return context;
}

//*******************************************************************************
//HtmlForm methods
//*******************************************************************************

//remove elements
function cleanUp(){
	s2f.cleanUp();
}

function saveHtmlForm(){
	var xml = s2f.toXml();
	alert(xml);
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
	try{
		var value = _select.value;	
		if(value != "Actions" && value != "---"){
			var thisRow = _select.parentNode.parentNode;
			var eId = thisRow.id.substring(thisRow.id.indexOf("-")+1);
			
			switch(value){
				case "remove" :
					removeElement(eId);
				case "insert" :
					insertElement(eId);
				case "before" :
					insertElementBefore(eId);
				case "after"  : 
					insertElementAfter(eId);
			}
		}
		_select.options[0].selected = true;
	}catch (e){
		alertException(e);
	}
}


//these methods will be insert into Schema2Html.js
///////////////////////////////////////////////////////////////

function insertElementBefore(_eId){
	alert("Oooop! this action will be implements in the next version!");
}

function insertElementAfter(_eId){
	alert("Oooop! this action will be implements in the next version!");
}

function removeElement(_eId){
	//if(confirm("Are you realy want to delete a new element[" + elementId + "]?!")){
		s2f.removeElement(parseInt(_eId));
	//}
}

function isertElement(_eId){
	var sValue = _select.value;
	var eName = sValue.substring(sValue.indexOf(":")+1);
		
	//if(confirm("Are you realy want to add a new element[" + eName + "]?!")){
		s2f.addElement(parseInt(fid) , eName);
	//}
}


// Hide and show columns in table.
/*
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
*/