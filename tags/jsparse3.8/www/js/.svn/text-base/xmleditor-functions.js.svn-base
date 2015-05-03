
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
function toggleHelpState(){
	s2f.showHelpIcon();
}
function showHelp(_title , _content){
	// This variable feeds into overlib function below
	var feedOverlib = 
		'<div id="helpTooltip_Div" class="helpTooltip" style="width: 20em; padding: 6px; font-size: 150%">'+
		'<h2>' + _title + '</h2>'+
		'<p>' + _content + '</p>'+
		'</div>';

	// Call overlib function; reates a div with ID="overDiv"
	overlib(feedOverlib, HAUTO, VAUTO, CSSCLASS, FOLLOWMOUSE);
}

// ------------------------------------------------------------------------//
// Show/hide checkboxes to control view of columns in XML editor
function showXmlTablePreferences() {
	var floatTable = document.getElementById("xmlTablePreferencesId");
	if(floatTable.style.display == "none") {
		floatTable.style.display = "";
	}else{
		floatTable.style.display = "none";
	}
}

function xtpExecute(){
	var floatTable = document.getElementById("xmlTablePreferencesId");
	showOrHiddenColumns();
	floatTable.style.display = "none";
}
//*******************************************************************************
//other methods
//todo: this methods should remove into the serviceEditor.js file
//*******************************************************************************
function setButtonState(_state){
	var btns = ["btSave" , "btRevert"];
	if(_state == "disabled"){
		for(var i=0;i<btns.length;i++){
			var btn = document.getElementById(btns[i]);
			if(btn != null){
				btn.className = "button-disabled";
				btn.disabled = "disabled";
			}
		}
		needToConfirm = false;
	}else{
		for(var i=0;i<btns.length;i++){
			var btn = document.getElementById(btns[i]);
			if(btn != null){
				btn.className = "";
				btn.disabled = "";
			}
		}
		needToConfirm = true;
	}
}

function showOrHiddenColumns(){
	//close some columns
	var checkboxsDiv = document.getElementById("xmlTablePreferencesId");
	if(checkboxsDiv != null){
		var labels = checkboxsDiv.getElementsByTagName("label");
		var checkboxs = checkboxsDiv.getElementsByTagName("input");

		if(!s2f.isEditable()){
			//remove the "showAction" checkbox
			//why is there sill a "showAction" label? delete it!
			if(labels.length >= 3) labels[labels.length-1].innerHTML = "";
			hiddenActionColumn();
		}

		//display the columns by the vlaue of the checkbox
		displayColumnsByCheckboxs(checkboxs);
	}else{
		//if the xmleditor is editable , display all columns
		//Otherwise do not show "Actions" column
		displayAllColumns();
		if(!s2f.isEditable()) hiddenActionColumn();
	}
}

function displayAllColumns(){
	var columns = 7;
	for(var k=1; k < columns; k++){
		var cName = "column-" + k;
		var tds = document.getElementsByTagName("td");	
		for(var i=0;i<tds.length;i++){
			var name = tds[i].name;
			if(name == cName){
				tds[i].style.display = "";
			}
		}
	}
}

//	hiddenColumns method will hidden or show the columns by check the checkbox staus. 
//	if u do not use the checkbox, it will display all columns!
function displayColumnsByCheckboxs(_checkboxs){
	for(var i=0;i<_checkboxs.length;i++){
		window.hidenOrShowColumn(_checkboxs[i] , i + 1);
	}
}

function hiddenActionColumn(){
	hiddenColumn(6);
}

function hidenOrShowColumn(_checkbox , _column){
	if(_checkbox != null && _checkbox.checked){
		showColumn(_column);
	}else{
		hiddenColumn(_column);
	}
}

function showColumn(_column){
	var cName = "column-" + _column;
	
	//remove table's title
	var ths = document.getElementsByTagName("th");
	if(ths[_column] != null) ths[_column].style.display = "";		

	//remove table's content
	var tds = document.getElementsByTagName("td");	
	for(var i=0;i<tds.length;i++){
		var name = tds[i].name;
		if(name == cName) tds[i].style.display = "";
	}
}

function hiddenColumn(_column){
	var cName = "column-" + _column;
	
	//remove table's title
	var ths = document.getElementsByTagName("th");
	if(ths[_column] != null) ths[_column].style.display = "none";		

	//remove table's content
	var tds = document.getElementsByTagName("td");	
	for(var i=0;i<tds.length;i++){
		var name = tds[i].name;
		if(name == cName) tds[i].style.display = "none";
	}
}	


var importWindow = null;
window.onunload = function(){
	if(importWindow != null ) importWindow.close();
}
document.onkeypress = function captureEnter(evt){
    evt = (evt) ? evt : window.event;
    if (evt.keyCode == 13){
        return false;
    }
}

function doSpecialThings(){}
