
var JS_ACTION = "create";
var CONSUMER_PATH = "/EGOService";
var s2f = initilize();

var NOT_MODIFY_ELEMENTS = ["ego:ConsumerID" , "ServiceName"];

function canModify(_e){
	var r = true;
	for(var i=0;i<NOT_MODIFY_ELEMENTS.length;i++){
		if(NOT_MODIFY_ELEMENTS[i] == _e){
			r = false;
			break;
		}
	}
	return r;
}

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

	var checkboxs = ["showDefaults" , "showRequirements" , "showSource" , "showActions"]
	for(var i=0;i<checkboxs.length;i++){
		var check = document.getElementById(checkboxs[i]);
		hidenOrShowColumn(check , i + 3);
	}
	
	//set button useableless
	setButtonState("disabled");
	return s2f;
}

function _getContext(){
	//var XML_FILE	= "xml/serviceTemplate.xml";
	//var XML_FILE	= "xml/webgui.xml";
	var XML_FILE	= "xml/sample.xml";
	var SCHEMA_FILE = "xml/sc.xsd";
	var SCHEMA_REF_FILE = "xml/ego.xsd";

	var context = new DefaultDomTreeContext(true);
	context.initilize(XML_FILE , SCHEMA_FILE , "sc" , "xsd");
	context.addRefParse(SCHEMA_REF_FILE  , "ego" , "xsd");
	
	var TEMPLATE_FILE = "xml/serviceTemplate.xml";
	context.setTemplate(TEMPLATE_FILE);
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

	
function setButtonState(_state){
	var btns = ["btSave" , "btClean" , "btReflash"];
	
	if(_state == "disabled"){
		for(var i=0;i<btns.length;i++){
			var btn = document.getElementById(btns[i]);
			btn.className = "button-disabled";
			btn.disabled = "disabled";
		}
	}else{
		for(var i=0;i<btns.length;i++){
			var btn = document.getElementById(btns[i]);
			btn.className = "";
			btn.disabled = "";
		}	
	}
}