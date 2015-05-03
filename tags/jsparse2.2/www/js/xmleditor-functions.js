
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
/*
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
*/

// Element actions
function selectActions(_select){
	try{
		var value = _select.value;	
		if(value != "Actions" && value != "---"){
			var thisRow = _select.parentNode.parentNode;			
			var eId = thisRow.id.substring(thisRow.id.indexOf("-")+1);

			if(/remove/.test(value)){
				removeElement(eId);
			}
			else if(/insert/.test(value)){
				var eName = value.substring(value.indexOf(":")+1);
				insertElement(eId , eName);
			}
		}
		_select.options[0].selected = true;
	}catch (e){
		alertException(e);
	}
}

//*******************************************************************************
// these methods will be insert into Schema2Html.js
//*******************************************************************************
function removeElement(_eId){
	//if(confirm("Are you realy want to delete a new element[" + elementId + "]?!")){
		s2f.removeElement(parseInt(_eId));
	//}
}

function insertElement(_eId , _eName){
	//alert("insert element(" + _eId + " , " + _eName + ")");
	//if(confirm("Are you realy want to add a new element[" + eName + "]?!")){
		s2f.addElement(parseInt(_eId) , _eName);
	//}
}

function insertElementBefore(_eId){
	alert("Oooop! this action will be implements in the next version!");
}

function insertElementAfter(_eId){
	alert("Oooop! this action will be implements in the next version!");
}


//*******************************************************************************
// Hide and show columns in table.
//*******************************************************************************
function hidenOrShowColumn(_checkbox , _column){
	if(_checkbox.checked){

		var cName = "column-" + _column;

		//remove table's title
		var ths = document.getElementsByTagName("th");
		ths[_column].style.display = "";		

		//remove table's content
		var tds = document.getElementsByTagName("td");	
		for(var i=0;i<tds.length;i++){
			var name = tds[i].name;
			if(name == cName){
				tds[i].style.display = "";
			}
		}
	}else{
		var cName = "column-" + _column;

		//remove table's title
		var ths = document.getElementsByTagName("th");
		ths[_column].style.display = "none";
		

		//remove table's content
		var tds = document.getElementsByTagName("td");	
		for(var i=0;i<tds.length;i++){
			var name = tds[i].name;
			if(name == cName){
				tds[i].style.display = "none";
			}
		}
	}
}