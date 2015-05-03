


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
function hiddenActionColumn(){
	hiddenColumn(6);
}

function hiddenColumn(_column){
	var cName = "column-" + _column;
	
	//remove table's title
	var ths = document.getElementsByTagName("th");
	if(ths[_column] != null) ths[_column].style.display = "";		

	//remove table's content
	var tds = document.getElementsByTagName("td");	
	for(var i=0;i<tds.length;i++){
		var name = tds[i].name;
		if(name == cName) tds[i].style.display = "none";
	}
}

//hiddenColumns method will hidden or show the columns by check the checkbox staus. 
//if u do not use the checkbox, it will display all columns!
function hiddenColumns(){
	//close some columns
	var checkboxs = ["showDefaults" , "showRequirements" , "showSource" , "showActions"]
	for(var i=0;i<checkboxs.length;i++){
		var check = document.getElementById(checkboxs[i]);
		window.hidenOrShowColumn(check , i + 3);
	}
}
function hidenOrShowColumn(_checkbox , _column){
	if(_checkbox == null || _checkbox.checked){
		var cName = "column-" + _column;
		//remove table's title
		var ths = document.getElementsByTagName("th");
		if(ths[_column] != null) ths[_column].style.display = "";		

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

/*

//*******************************************************************************
//Common functions : will be removed into domtree.js
//*******************************************************************************
function isUndefined(obj){
	var r = false;
	
	//ie 6 sp2
	if(obj + "" == undefined){
		r = true;
	}
	return r;
}

//*******************************************************************************
//HtmlForm methods
//*******************************************************************************
function appendXmlHttpMessage(xmlHttp){
	cleanDivContent("serviceErrorMessage");
	
	var responseXml = xmlHttp.responseXML;
	var responseText = xmlHttp.responseText;
	if(responseText != null || responseText != ""){
		//append exception
		if(responseText.indexOf("Exception:") != -1){
			var exceptionMsg = responseText.substring(responseText.indexOf(":") + 1);
			appendException(exceptionMsg);
			return;
		}
		//append message
		if(responseText.indexOf("Message:") != -1){
			var messageMsg = responseText.substring(responseText.indexOf(":") + 1);
			appendMessage(messageMsg);
			return;
		}
	}
}
function appendMessage(_messageMsg){
	var message = _messageMsg.toUpperCase();
	//the message be defined in serviceMessage.jsp
	//VEM is the prefix of parameter.
	message = "VEM_" + message.replace(/\./g , "_");
	alert(eval(message));
	self.close();
}


function appendException(_exceptionMsg){
	appendMsg2Div("serviceErrorMessage", _exceptionMsg);
}


//*******************************************************************************
// Action dropdown list operations
//*******************************************************************************
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

function removeElement(_eId){
	s2f.removeElement(parseInt(_eId));
}

function insertElement(_eId , _eName){
	s2f.addElement(parseInt(_eId) , _eName);
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
function hiddenActionColumn(){
	hiddenColumn(6);
}

function hiddenColumn(_column){
	var cName = "column-" + _column;
	
	//remove table's title
	var ths = document.getElementsByTagName("th");
	if(ths[_column] != null) ths[_column].style.display = "";		

	//remove table's content
	var tds = document.getElementsByTagName("td");	
	for(var i=0;i<tds.length;i++){
		var name = tds[i].name;
		if(name == cName) tds[i].style.display = "none";
	}
}
//hiddenColumns method will hidden or show the columns by check the checkbox staus. 
//if u do not use the checkbox, it will display all columns!
function hiddenColumns(){
	//close some columns
	var checkboxs = ["showDefaults" , "showRequirements" , "showSource" , "showActions"]
	for(var i=0;i<checkboxs.length;i++){
		var check = document.getElementById(checkboxs[i]);
		window.hidenOrShowColumn(check , i + 3);
	}
}
function hidenOrShowColumn(_checkbox , _column){
	if(_checkbox == null || _checkbox.checked){
		var cName = "column-" + _column;
		//remove table's title
		var ths = document.getElementsByTagName("th");
		if(ths[_column] != null) ths[_column].style.display = "";		

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



*/