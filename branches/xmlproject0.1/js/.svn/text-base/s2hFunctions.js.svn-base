


//*******************************************************************************
//HtmlForm methods
//*******************************************************************************
// Pick-up this method from the editableForm.js
function toggleTreeNode(_thisImage){

	var thisRow = _thisImage.parentNode.parentNode;
	var imageHandle = document.getElementById(_thisImage.id);
	

	//alert("new toggleTreeNode method!");	
	// Now hide or show each row depending on the state of it's parent
	var trRowArray = document.getElementById("resourcePlanTable").getElementsByTagName("tr");
	
	// Look at each row in the table
	for (var rowCount = 0; rowCount < trRowArray.length; rowCount++) {
		// Look at each ancestor consumer if the row is a consumer
		var thisConsumer = trRowArray[rowCount];
		//alert("thisConsumer.id=" + thisConsumer.id + " | thisRow.id=" + thisRow.id);

		if(thisConsumer.id.match(thisRow.id)) {			
			if(thisConsumer.id.indexOf("-a") != -1){
				//Set invisibility of the row based on parent consumer state
				var state = thisConsumer.style.display;
				if(state == ""){
					thisConsumer.style.display = "none";
					imageHandle.src = "images/icon-link-ec-expand.gif";
				}
				if(state == "none"){
					thisConsumer.style.display = "";
					imageHandle.src = "images/icon-link-ec-contract.gif";
				}
			}
		}
	}

}

function saveHtmlForm(){
	s2f.toXml();
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

		var rule = s2f.parse.findElementAttributeRule(elementName , attributeName);
		
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
	
	//alert("select.value=" + _select.value);
	var value = _select.value;
	
	if(value != "Actions" && value != "---"){
		if(value.match("remove")){	
			elementSuicide(_select);
		}
		if(value.match("before")){	
			elementBefore(_select);
		}
		if(value.match("after")){	
			elementAfter(_select);
		}
		if(value.match("insert")){	
			elementInsert(_select);
		}
	}
}


//these methods will be insert into Schema2Html.js
///////////////////////////////////////////////////////////////

function elementBefore(_select){
	alert("Oooop! this action will be implements in the next version!");
}

function elementAfter(_select){
	alert("Oooop! this action will be implements in the next version!");
}

//elememt want to remove itself! - like suicide
function elementSuicide(_select){

	var thisRow = _select.parentNode.parentNode;
	//alert("remove the row:" + thisRow.id);

	changeTrState(thisRow , "none");
}

function elementInsert(_select){

	//todo:judge whether can insert a new element?
	var r = true;

	if(r){
		//add the new element
		var thisRow = _select.parentNode.parentNode;
		//alert("this row id =" + thisRow.id);
		
		var sValue = _select.value;
		//alert("sValue=" + sValue.length);
		
		var elementName = sValue.substring(sValue.indexOf(":")+1);
		//alert("element.name = " + elementName);

		//test 4
		//var trRow = document.getElementById(thisRow.id);
		var element = s2f.parse.findElementByName(elementName);
		if(element != null){
			
			var number  = getNextNumberOfRow(thisRow);		
			//alert("number=" + number);
			
			
			//todo:change it!
			var xelement = new XElement(number , elementName , "-0-" + number);
			s2f.xroot.addChildren(xelement);
			xelement.setFather(s2f.xroot);
			xelement.state = "new";

			//
			var attributes = s2f.parse.findElementAttributes(elementName);
			for(var i=0;i<attributes.length;i++){
				var attr = attributes[i];
				var attrName = attr.getAttribute("name");
				//alert("attribute.name=" + attrName);

				var xattr = new XAttribute(i , attrName , "");
				xattr.state = "new";
				xelement.addAttribute(xattr);
				xattr.setElement(xelement);
			}
			
			//_element , _id , _fTreeId , _layer
			s2f.printElement(xelement,1);

		}
		else{
			alert("element's name can not be finded in the schema file!");
		}
	}
}


function getNextNumberOfRow(_thisRow){
	
	var r = 0;

	var trRowArray = document.getElementById("resourcePlanTable").getElementsByTagName("tr");
	// Look at each row in the table
	for (var rowCount = 0; rowCount < trRowArray.length; rowCount++) {

		var thisConsumer = trRowArray[rowCount];
		
		//alert("thisRow.id=" + _thisRow.id);
		var index = thisConsumer.id.indexOf(_thisRow.id) + _thisRow.id.length + 1;
		var subStr = thisConsumer.id.substring(index , index +1);
		
		//alert("index = " + index + "|subStr=" + subStr + "|result=" + r);
		if (subStr > r){
			r = subStr;
		}
	}
	return parseInt(r)+1;
}


// Set invisibility of the row and it's childrens
function changeTrState(_thisRow , _state){
	

	// Pick-up this method from the editableForm.js
	// Now hide or show each row depending on the state of it's parent
	var trRowArray = document.getElementById("resourcePlanTable").getElementsByTagName("tr");
	
	// Look at each row in the table
	for (var rowCount = 0; rowCount < trRowArray.length; rowCount++) {

		var thisConsumer = trRowArray[rowCount];
		
		// Look at each ancestor consumer if the row is a consumer
		if(thisConsumer.id.match(_thisRow.id)) {
			
			//alert("dispear the element:" + thisConsumer.id);
			//Set invisibility of the row based on parent consumer state
			thisConsumer.style.display = _state;	
		}
	}
}