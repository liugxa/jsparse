
var GlobalNextStep = false;
var s2f = initilize();

//*******************************************************************************
//init methods
//*******************************************************************************

function initilize(){

	//initilize domtree
	var context = _getContext();
	var domTree = new DefaultDomTree(context);
	domTree.init("Profile");

	var tbody = document.getElementById("resourcePlanTable").tBodies[0];			
	var s2f = new DefaultSchema2HtmlForm(domTree , tbody , "images/");
	s2f.layout();

	return s2f;
}

function _getContext(){
	var XML_FILE	= "xml/appsample.xml";
	var SCHEMA_FILE = "xml/app.xsd";

	var context = new DefaultDomTreeContext(true);
	context.initilize(XML_FILE , SCHEMA_FILE , "" , "xs");
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
function hiddenColumns(){
	//close some columns
	var checkboxs = ["showDefaults" , "showRequirements" , "showSource" , "showActions"]
	for(var i=0;i<checkboxs.length;i++){
		var check = document.getElementById(checkboxs[i]);
		window.hidenOrShowColumn(check , i + 3);
	}
}

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