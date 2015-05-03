

//*******************************************************************************
// Hide and show columns in table.
//*******************************************************************************
function hiddenColumn(_column){
	var cName = "column-" + _column;
	
	//remove table's title
	//var ths = document.getElementsByTagName("th");
	//ths[6].style.display = "";		

	//remove table's content
	var tds = document.getElementsByTagName("td");	
	for(var i=0;i<tds.length;i++){
		var name = tds[i].name;
		if(name == cName){
			tds[i].style.display = "none";
		}
	}
}

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