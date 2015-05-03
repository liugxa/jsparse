
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

function alertMessage(_message){
	alert(_message);
}

//*******************************************************************************
//HtmlForm methods
//*******************************************************************************
/*
function appendXmlHttpMessage(oper , xmlHttp){
	cleanErrorMessage();
	var responseText = xmlHttp.responseText;
	if(responseText != null && responseText != ""){
		//if the responseText is not empty, we regard it as an exception object!! 
		//so, display it!
		appendException(responseText);
		return;
	}else{
		var message = "";
		switch(oper){
			case "create":
				message = VEM_SERVICE_EDITOR_SAVE_SUCCESS;
				break;
			case "edit":
			case "editXml":
				message = VEM_SERVICE_EDITOR_UPDATE_SUCCESS;
				break;
		}
		alert(message);
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
*/

function getResponseException(xmlHttp){
	var result = "";
	var responseText = xmlHttp.responseText;
	if(responseText != null && responseText != ""){
		result = responseText;
	}
	return result;
}

function cleanErrorMessage(_handle){
	//var errorId = "serviceErrorMessage";
    //var msgContainer = document.getElementById(errorId);
    if(_handle != null){
		_handle.innerHTML = "";
        _handle.style.display = "none";
    }   
}

function appendException(_handle , _exceptionMsg){	
	//var errorId = "serviceErrorMessage";
	//var msgContainer = document.getElementById(errorId);
	var errorMsg = _getExceptionMsg(_exceptionMsg);
    if(_handle != null){
		var msgElement = document.createTextNode(errorMsg);
		cleanErrorMessage(_handle);

        _handle.appendChild(msgElement);
        _handle.style.display = "";
    }else{
        alertMessage(errorMsg);
    }
}

function catchException(_handle , _e){
	if (_e instanceof Error) {
		//this is the javascript exception , ignore it!
		//alertMessage(_e.message);
	}else{
		var errorMsg = _getExceptionMsg(_e);
		appendException(_handle , errorMsg);
	}
}

function _getExceptionMsg(_exceptionMsg){
	//we should use the getErrorMsgFromErrorPage() method which be defined in the common.js file
	//to get the error message from the error page. if we can not find it, return the msg directlly.
	var errorMsg = "";
	try{
		errorMsg = getErrorMsgFromErrorPage(_exceptionMsg);
	}catch(e){};

	if(errorMsg == "") return _exceptionMsg;
	
}

function alertExceptionAndExit(_e){
	if (_e instanceof Error) {
		//this is the javascript exception , ignore it!
		//alertMessage(_e.message);
	}else{
		var errorMsg = _getExceptionMsg(_e);
		self.close();
		alert(errorMsg);
	}
}
//*******************************************************************************
// Action dropdown list operations
//*******************************************************************************
/*
function toggleHelpState(){
	s2f.showHelpIcon();
}
*/

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
	var xmlTable = document.getElementById('xmlTablePreferencesId');
	var iframeHack = document.getElementById('iframeHack');

	if(xmlTable.style.display == "none") {
		if(_validate.isIe()){
			// IE has a problem when a div is placed over top of a form element: the
			// form element will show through the div. This bug can be worked around 
			// by putting an iframe behind the div. This part of the function
			// manipulates the iframe and a secondary framing div to provide the same
			// visual appearance as seen in Firefox (and any other self-respecting 
			// standards-compliant browser!).
			xmlTable.style.top = "2.65em";
			xmlTable.style.right = "10px";
			xmlTable.style.position = "absolute";
			xmlTable.style.display = "block";
			xmlTable.style.zIndex = 100;

			iframeHack.style.width = xmlTable.offsetWidth;
			iframeHack.style.height = xmlTable.offsetHeight;
			iframeHack.style.top = xmlTable.style.top;
			iframeHack.style.right = xmlTable.style.right;
			iframeHack.style.position = xmlTable.style.position;
			iframeHack.style.zIndex = xmlTable.style.zIndex - 1;

			iframeHack.style.display = "block";
		}else{
			xmlTable.style.display = "";
		}
	}else{
		xmlTable.style.display = "none";
		iframeHack.style.display = "none";
	}
}

function closeXmlTable(){
	showOrHiddenColumns();

	var iframeHack = document.getElementById('iframeHack');
	var xmlTable = document.getElementById('xmlTablePreferencesId');

	xmlTable.style.display = "none";
	iframeHack.style.display = "none";
}

//*******************************************************************************
//other methods
//todo: this methods should remove into the serviceEditor.js file
//*******************************************************************************
function showOrHiddenColumns(){
	//close some columns
	var xmlTable = document.getElementById('xmlTablePreferencesId');
	if(xmlTable != null){
			var labels = xmlTable.getElementsByTagName("label");
			var checkboxs = xmlTable.getElementsByTagName("input");
			
			//first, remove the action label and columns
			if(!s2f.isEditable()){
				//remove the "showAction" checkbox
				//why is there sill a "showAction" label? delete it!
				if(labels.length >= 3){
					labels[labels.length-1].innerHTML = "";
				}
				hiddenActionColumn();
			}

			//display the columns by the vlaue of the checkbox
			displayColumnsByCheckboxs(checkboxs);
	}else{
			//If user do NOT defined the div of xmlTable,xml editor will display all columns. 
			//Off course, if the editor can not be editable, it do not show the "Actions" column!
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
	var checkboxIds = ["showName" , "showValue" , "showDefaults" , "showRequirements" , "showSource" , "showActions"];
	
	for(var i=0;i<checkboxIds.length;i++){
		for(var j=0;j<_checkboxs.length;j++){
			var cId = _checkboxs[j].id;
			if(cId == checkboxIds[i]){
				window.hidenOrShowColumn(_checkboxs[j] , i + 1);
				break;
			}
		}
	}
}

function hiddenActionColumn(){
	hiddenColumn(6);
}

function hidenOrShowColumn(_checkbox , _column){
	if(_checkbox != null && _checkbox.checked){
		s2f.showColumn(_column);
	}else{
		s2f.hiddenColumn(_column);
	}
}

function showColumn(_column){
	s2f.showColumn(_column);
}

function hiddenColumn(_column){
	s2f.hiddenColumn(_column);
}

function removeTable(_tableId){
	var table = document.getElementById(_tableId);
	if(table != null) table.innerHTML = "";
}


function printCostData(_lastDate){
	var now = new Date();
	var cost = now.getTime() - _lastDate.getTime();
	var status = window.status;
	if(status != ""){
		window.status = status + "|" + cost;
	}else{
		window.status = cost;
	}
	return now;
}

//*******************************************************************************
//below methods are the abstract method, u should add this methods in the jsp file
//and implemet it.thanks!
//*******************************************************************************
function doSpecialThings(){}
function setButtonState(_state){}

