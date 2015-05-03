

//*******************************************************************************
//Utils classes
//*******************************************************************************

function createXMLDoc(){
	var doc = null;
	if (document.implementation && document.implementation.createDocument){
		doc = document.implementation.createDocument("", "", null);
		//xmlDoc.onload = createTable;
	}
	else if (window.ActiveXObject){
		doc = new ActiveXObject("Microsoft.XMLDOM");
		//xmlDoc.onreadystatechange = function () {
		//	if (xmlDoc.readyState == 4) createTable()
		//};
 	}
	else{
		if(_DEBUG) alert('Your browser can\'t handle this script');
	}
	return doc;
}

//@disuse be replaced by createHtmlElement
function HtmlElement(_s){
	return document.createElement(_s);
}

function createHtmlElement(_s){
	return document.createElement(_s);
}
//@disuse be replaced by createHtmlTextElement
function HtmlTextElement(_s){
	return document.createTextNode(_s);
}

function createHtmlTextElement(_s){
	return document.createTextNode(_s);
}

//below methods be often used in text case;
function Assert(_fName){

	this.fName = _fName;
	this.assertNotNull = function(_name , _object){

		if(_object == null){
			alert("Test " + this.fName + " failure! because the [" + _name + "] is null!");
		}
	}

	
	this.assertTrue = function(_condition){
		if(_condition){
			_alertSuccess(this.fName);
		}else{
			_alertFailure(this.fName);
		}
	}

	this.assertFailure = function(_condition){

	}

}


function _alertRetest(methodName){
	alert("You must retest the " + methodName + " method first!");
}

function _alertSuccess(methodName , message){
	if(message == undefined) message = "";
	alert("Test " + methodName + " result: success! " + message);
}

function _alertFailure(methodName , message){
	if(message == undefined) message = "";
	alert("Test " + methodName  + " result: failure! " + message);
}

function _alertException(methodName , e){
	if (e instanceof Error) {
		alert("Test " + methodName + " result: failure! catch system excpetion:" + e.message);
	}else{
		alert("Test " + methodName + " result: failure! catch business excpetion:" + e);
	}
}

function throwException(_message){
	throw _message;
}


function iterator(obj) {
    for (var property in obj) {
        alert(property + " : " + obj[property]);
    }
}




function printAttributes(_arrays){
	var s = "";
	for(var i=0;i<_arrays.length;i++){
		s = s + "[" + _arrays[i].name + "/" + _arrays[i].value + "] | ";
	}
	return s;
}