
var s2f = initilize();

//*******************************************************************************
//init methods
//*******************************************************************************

function initilize(){

	//initilize domtree
	var context = _getContext();
	var domTree = new DefaultDomTree(context);
	domTree.init("sc:ServiceInfo");

	var tbody = document.getElementById("resourcePlanTable").tBodies[0];			
	var s2f = new ServiceDefinitionS2H(domTree , tbody , "images/");
	s2f.layout();

	var checkboxs = ["showDefaults" , "showRequirements" , "showSource" , "showActions"]
	for(var i=0;i<checkboxs.length;i++){
		var check = document.getElementById(checkboxs[i]);
		hidenOrShowColumn(check , i + 3);
	}
	return s2f;
}

function _getContext(){
	var XML_FILE	= "xml/serviceTemplate.xml";
	//var XML_FILE	= "xml/gui_service_comment.xml";
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
