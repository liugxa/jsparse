<?xml version="1.0" encoding="GB2312"?>

<HTML xmlns:xsl="http://www.w3.org/TR/WD-xsl">
<HEAD>
<TITLE></TITLE>
	
<link REL='Stylesheet' HREF='css/base.css' TYPE='text/css'/>
<link REL='Stylesheet' HREF='css/navigation.css' TYPE='text/css'/>
<link REL='Stylesheet' HREF='css/navigation_new.css' TYPE='text/css'/>
<link REL='Stylesheet' HREF='css/object-properties.css' TYPE='text/css'/>
<link REL='Stylesheet' HREF='css/soa.css' TYPE='text/css'/>
<link REL='Stylesheet' HREF='css/NewForm_0.css' TYPE='text/css'/>
<link REL='Stylesheet' HREF='css/NewForm_1.css' TYPE='text/css'/>
<link REL='Stylesheet' HREF='css/NewForm_2.css' TYPE='text/css'/>
<link REL='Stylesheet' HREF='css/NewForm_3.css' TYPE='text/css'/>
<link REL='Stylesheet' HREF='css/NewForm_4.css' TYPE='text/css'/>
<link REL='Stylesheet' HREF='css/NewForm_5.css' TYPE='text/css'/>
<link REL='Stylesheet' HREF='css/NewForm_6.css' TYPE='text/css'/>
<link REL='Stylesheet' HREF='css/appProfileDisplay.css' TYPE='text/css'/>

<SCRIPT language='JavaScript' src="index_files/editableForm.js" type='text/JavaScript'></SCRIPT>
<SCRIPT language='JavaScript' src="index_files/manipulateElements.js"type='text/JavaScript'></SCRIPT>

<!--
<SCRIPT language='JavaScript' src="index_files/common.js" type='text/JavaScript'></SCRIPT>
<SCRIPT language='JavaScript' src="index_files/navTree.js" type='text/JavaScript'></SCRIPT>
<SCRIPT language='JavaScript' src="index_files/overlib.js" type='text/JavaScript'></SCRIPT>
<SCRIPT language='JavaScript' src="index_files/hosts.js" type='text/JavaScript'></SCRIPT>
-->


</HEAD>
<BODY> 


<FORM id='myForm'>

<div class="objectProps">

<h1>Application Profile (MultiDerCalc (v1.5))</h1>



		<label for="cc" class="labelSelect-Required" style="display: none">Consumer *</label>
		<select name="textfield" class="inputSelect-Required"  id="cc" onchange="MM_jumpMenu('parent',this,0)">
		  <option value="01_02_app-profile-1-basic.htm">Basic Configuration</option>
          <option value="01_02_app-profile-2-advanced.htm">Advanced Configuration</option>
          <option value="01_02_app-profile-3-all.htm" selected="selected">Edit XML</option>
        </select>


<!-- * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  -->

<!-- BEGIN View of Objects -->
<div id="contentObjectsId" class="appProfileDisplay" style="padding-left: 0px !important">
  <table id="resourcePlanTable" border="0" cellpadding="0" cellspacing="0">
        <thead>
			<tr>
			  <th scope="col">&nbsp;</th>
			  <th scope="col">Name</th>
			  <th scope="col">Value</th>
			  <th scope="col" class="paramValueDefault">Default Value </th>
			  <th scope="col">Requirements</th>
			  <th scope="col">Source </th>
			  <th scope="col">Actions</th>
			</tr>
        </thead>

		<!-- This table information will be printed by schema2HtmlForm.js -->
		<tbody></tbody>
	</table>
</div>

<!-- END View of Objects -->

<DIV class='windowControls'>
<BUTTON id='buttonCreate' onclick='saveHtmlForm()'	name='buttonCreate'>Save</BUTTON>
<BUTTON id='buttonCancel' onclick='self.close()'	name='buttonCancel'>Revert</BUTTON>
<BUTTON id='buttonCancel' onclick='self.close()'	name='buttonImport'>Import...</BUTTON>
<BUTTON id='buttonCancel' onclick='self.close()'	name='buttonExport'>Export...</BUTTON>
<BUTTON id='buttonClose'  onclick='self.close()'	name='buttonClose'>Close</BUTTON>
</DIV>

</DIV>

<SCRIPT language=JavaScript src="js/xmlextras.js" type=text/JavaScript></SCRIPT>
<SCRIPT language=JavaScript src="js/validate.js" type=text/JavaScript></SCRIPT>

<SCRIPT language=JavaScript src="js/x-collects.js" type=text/JavaScript></SCRIPT>
<SCRIPT language=JavaScript src="js/x-variable.js" type=text/JavaScript></SCRIPT>
<SCRIPT language=JavaScript src="js/x-common.js" type=text/JavaScript></SCRIPT>

<SCRIPT language=JavaScript src="js/x-schemaParse.js" type=text/JavaScript></SCRIPT>
<SCRIPT language=JavaScript src="js/x-schema2Html.js" type=text/JavaScript></SCRIPT>
<SCRIPT language=JavaScript src="js/x-s2hFunctions.js" type=text/JavaScript></SCRIPT>

<SCRIPT language=JavaScript>

//*******************************************************************************
//init methods
//*******************************************************************************
var tbody =  null;
var parse = null;
var s2f = null;

init();
function init(){
	try{
		var sXmlDoc = XmlDocument.create();
		sXmlDoc.async = false;
		sXmlDoc.load("ApplicationProfile.xsd");
		
		var xmlDoc = XmlDocument.create();
		xmlDoc.async = false;
		xmlDoc.load("ApplicationProfile.xml");

		var parse = new NomralSchemaParse(sXmlDoc);
		var tbody = document.getElementById("resourcePlanTable").tBodies[0];
		
		s2f = new Schema2HtmlForm(xmlDoc , parse, tbody);
		var r = s2f.initDomTree();

		s2f.printContent();
	}
	catch(e){
	}
}

</SCRIPT>

</FORM>
</BODY>
</HTML>