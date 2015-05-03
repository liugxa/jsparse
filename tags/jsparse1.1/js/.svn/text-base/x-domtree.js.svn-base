

//*******************************************************************************
//Base classes
//*******************************************************************************

function DomTreeElement(_name){

	//Public propertys
	//***************************************************************************
	this.id = -1;
	this.name = _name;

	//Private propertys
	//***************************************************************************
	this.father = null;
	this.childrens = new Array();

	this.state = "new";// new element or old one
	this.attributes = new Array();
	this.rule = new DefaultRule();

	//Construction
	//***************************************************************************
	this.init = function(){
		//todo:
		//get all attributes

		//get rule
	}

	//Public methods
	//***************************************************************************
	this.getId = function(){
		return this.id;
	}
	this.setId = function(_i){
		this.id = _i;
	}
	this.setState = function(_s){
		this.state = _s;
	}
	this.getState = function(){
		return this.state;
	}
	this.setName = function(_n){
		this.name = _n;
	}
	this.getName = function(){
		return this.name;
	}
	
	//property father
	this.setFather = function(_f){
		this.father = _f;
	}
	this.getFather = function(){
		return this.father;
	}

	//property childrens
	this.hasChildrens = function(){
		var r = false;
		if(this.childrens.length >0) r = true;
		return r;
	}
	this.getChildrens = function(){
		return this.childrens;
	}
	this.addChildren = function(_c){
		this.childrens.push(_c);
	}
	this.removeChildren = function(_i){
		for(var i=0;i<this.childrens.length;i++){
			var child = this.childrens[i];
			if(child.id == _i){
				this.childrens.splice(i ,1);
				break;
			}
		}
	}

	//property attributes
	this.setAttributes = function(_attrs){
		this.attributes = _attrs
	}
	this.getAttributes = function(){
		return this.attributes;
	}

	this.addAttribute = function(_a){
		this.attributes.push(_a);
	}

	this.removeAttribute = function(_aName){
		for(var i=0;i<this.attributes.length;i++){
			var attribute = this.attributes[i];
			if(attribute.name == _aName){
				this.attributes.splice(i ,1);
				break;
			}
		}
	}

	this.setRule = function(_r){
		this.rule = _r;
	}

	this.getRule = function(){
		return this.rule;
	}

	this.toString = function(){
		var fn = this.father == null?"":this.father.getName();
		return "(id:" + this.getId() + ",name:" + this.getName() + ",father:" + fn + 
			",childrens.length:" + this.childrens.length + 
			",attributes.length:" + this.attributes.length + ")";
	}
	

}


/**
* IDomTree: The Attribute class extends Element
**/
function DomTreeAttribute(_id , _name , _value){

	//Public propertys
	//***************************************************************************
	this.id = _id;
	this.name = _name;
	this.value = _value;


	//Private propertys
	//***************************************************************************
	this.state = "new";// new element or old one
	this.element = null;
	this.rule = new DefaultRule();

	this.setState = function(_s){
		this.state = _s;
	}
	this.getState = function(){
		return this.state;
	}
	this.setElement = function(_e){
		this.element = _e;
	}
	this.getElement = function(){
		return this.element;
	}
	
	this.setRule = function(_r){
		this.rule = _r
	}
	this.getRule = function(){
		return this.rule;
	}

	this.toString = function(){
		return "(id:" + this.id + ",name:" + this.name + ",value:" + this.value 
			+ ",state:" + this.state + ",element:" + this.element + ",rule:" + this.rule + ")";
	}
}


//*******************************************************************************
//interfaces
//*******************************************************************************

function DefaultDomTreeReader(){
	//Public propertys
	//***************************************************************************
	this.parse = null;
	this.dom = null;

	//Construction
	//***************************************************************************
	this.init = function(_xmlFileName , _schemaFileName){
		
		var sXmlDoc = XmlDocument.create();
		sXmlDoc.async = false;
		sXmlDoc.load(_schemaFileName);
		
		var xmlDoc = XmlDocument.create();
		xmlDoc.async = false;
		xmlDoc.load(_xmlFileName);

		//Of cource, Now, you can use the parse & dom to lay out your page!!
		//But the base way is to use the decorated dom object! It not only contains
		//the avaliable attributes, but also contains the rules of element & attributes too.
		this.parse = new NomralSchemaParse(sXmlDoc);
		this.dom = xmlDoc;
	}

	//Public methods
	//***************************************************************************
	this.getParse = function(){
		return this.parse;
	}

	this.getDom = function(){
		return this.dom;
	}
}


function IDomTree(_reader){

	this.init = function(_rootName){}

	this.getRoot = function(){}
	this.getElement = function(_id){}

	this.hasChildrens = function(_id){}
	this.getChildrens = function(_id){}

	this.enableAdd = function(_fid , _eName){}
	this.addElement = function(_fid , _eName){}

	this.enableRemove = function(_id){}
	this.removeElement = function(_id){}
	
	this.modifyAttribute = function(_id ,_attrName , _value){}
	this.addNewAttribute = function(_id , _attr){}
	this.removeAttribute = function(_id , _attrName){}
	
	this.getAllAvailAttributes = function(_eName){}
	this.getAllAvailChildrens = function(_eName){}

	this.toXml = function(){};
}

function DefaultDomTree(_reader){

	//Public propertys
	//***************************************************************************
	this.reader = _reader;

	//Private propertys
	//***************************************************************************
	this.record = new ActiveRecord(); //Map defined in x-collects.js

	//Construction
	//***************************************************************************
	this.init = function(_rootName){
		var dom = this.reader.getDom();
		var parse = this.reader.getParse();

		var root = dom.getElementsByTagName(_rootName)[0];
		var dt_r  = new DomTreeElement(_rootName);
		//add element's rule
		dt_r.setRule(parse.findElementRule(root.nodeName));

		//add element attributes!
		dt_r.setAttributes(_findAllAttributes(parse , root , dt_r));

		this.record.save(dt_r);
		_addChildrens(this.record , parse , root , dt_r);
	}

	//Public methods
	//***************************************************************************
	this.getRoot = function(){
		return this.record.find(0);
	}
	
	this.getElement = function(_id){
		return this.record.find(_id);
	}
	
	this.hasChildrens = function(_id){
		var r = false;
		var childrens = this.getChildrens(_id);
		if(childrens.length >0 ){
			r = true;
		}
		return r;
	}

	this.getChildrens = function(_id){
		
		var element = this.record.find(_id);
		return element.getChildrens();
	}
	
	this.enableAdd = function(_fid , _eName){
		
		var r = true;
		var f = this.record.find(_fid);
		if(f == null) throw "Can not find the element which id=" + _fid + "!!";

		//estamite these operation by element's rule
		var rule = this.reader.getParse().findElementRule(_eName);
		if(rule == null) throw "This rule of the element is NOT exist!!";
		
		var es = _findElementsByName(f , _eName);
		//alert("find element[" + _eName + "] rule[ " + rule.name  + "](add," + es.length + ")");
		r = rule.validate("add" , es.length);

		return r;
	}

	this.addElement = function(_fid , _eName){
		
		/*
		var f = this.record.find(_fid);
		if(f == null) throw "Can not find the element which id=" + _fid + "!!";

		//estamite these operation by element's rule
		var rule = this.reader.getParse().findElementRule(_eName);
		if(rule == null) throw "This rule of the element is NOT exist!!";
		//alert("Find rule's name of element[" + _eName + "]=" + rule.name);

		var es = _findElementsByName(f , _eName);
		if(!rule.validate("add" , es.length)) throw "validate failure?! can not add these element!!";
		*/

		var f = this.record.find(_fid);
		if(f == null) throw "Can not find the element which id=" + _fid + "!!";


		//add element
		var e = _createNewElement(this.reader.getParse() , _eName);
		var rule = this.reader.getParse().findElementRule(_eName);

		f.addChildren(e);		
		e.setFather(f);
		e.setRule(rule);
		this.record.save(e);
		
		return e;
	}

	this.enableRemove = function(_id){
		var r = true;

		var e = this.record.find(_id);
		if(e == null) throw "Can not find the element which id=" + _id + "!!";

		//estamite these operation by element's rule
		var rule = e.getRule();
		if(rule == null) throw "This rule of the element is NOT exist!!";
		//alert("e.name=" + e.name + "|rule.name=" + rule.name);
		
		var father = e.father;
		var es = _findElementsByName(father , e.getName());
		//alert("rule:" + rule.name + "(remove , " + es.length + ") execute!");
		r = rule.validate("remove" , es.length);

		return r;
	}

	this.removeElement = function(_id){
		
		/*
		var e = this.record.find(_id);
		if(e == null) throw "Can not find the element which id=" + _id + "!!";

		//estamite these operation by element's rule
		var rule = e.getRule();
		if(rule == null) throw "This rule of the element is NOT exist!!";
		//alert("e.name=" + e.name + "|rule.name=" + rule.name);
		
		var father = e.father;
		var es = _findElementsByName(father , e.getName());
		if(!rule.validate("remove" , es.length)) throw "validate failure?! can not remove these element!!";
		*/
		var e = this.record.find(_id);
		if(e == null) throw "Can not find the element which id=" + _id + "!!";
		
		var father = e.father;
		//remove element from the children list of it's father
		father.removeChildren(_id);
		
		//remove childrens of the element
		_removeChildrens(this.record ,e);

		//remove element
		this.record.remove(_id);
	}

	
	this.modifyAttribute = function(_id ,_attrName , _value){}
	this.addNewAttribute = function(_id , _attr){}
	this.removeAttribute = function(_id , _attrName){}
		
	this.getAllAvailAttributes = function(_eName){
		var parse = this.reader.getParse();
		var attrs = parse.findElementAttributes(_eName);
		
		var r = new Array();
		//add attributes which be defined in the schema file
		for(var i=0;i<attrs.length;i++){
			var _a = attrs[i];
			var _name = _a.getAttribute("name");
			
			var dt_attr = new DomTreeAttribute(i ,_name , "");
			//attache rule with the attribute
			dt_attr.rule = parse.findElementAttributeRule(_eName , _name);
			r.push(dt_attr);
		}
		return r;
	}

	this.getAllAvailChildrens = function(_eName){
		var parse = this.reader.getParse();
		var cs = parse.findElementChildrens(_eName);
		var r = new Array();
		for(var i=0;i<cs.length;i++){
			var c = cs[i];
			var name = c.getAttribute("name");

			var dt_c = new DomTreeElement(name);
			r.push(dt_c);
		}
		return r;
	}

	this.toXml = function(){
		return this.dom.xml;
	}

	//private methods
	//*****************************************************************
	_addChildrens = function(_record , _parse , _element , _dt_r){
		var childrens = _element.childNodes;
		for(var i=0;i<childrens.length;i++){
			var child = childrens[i];
			var dt_c = new DomTreeElement(child.nodeName);
			
			//add element's rule
			dt_c.setRule(_parse.findElementRule(child.nodeName));

			//add element attributes!
			dt_c.setAttributes(_findAllAttributes(_parse , child , dt_c));

			_dt_r.addChildren(dt_c);
			dt_c.setFather(_dt_r);
			_record.save(dt_c);

			_addChildrens(_record , _parse , child , dt_c);
		}
	}

	_removeChildrens = function(_record , _dt_e){
		var childrens = _dt_e.getChildrens();
		for(var i=0;i<childrens.length;i++){
			var c = childrens[i];
			if(c.hasChildrens()){
				_removeChildrens(_record , c);
			}
			_record.remove(c.id);
		}
	}

	_findElementsByName = function(_f , _eName){ 
		var childrens = _f.getChildrens();
		var r = new Array();
		for(var i=0;i<childrens.length;i++){
			var c = childrens[i];
			if(c.getName() == _eName) r.push(c);
		}
		//alert("result=" + r.length);
		return r;
	}
	_createNewElement = function(_parse, _eName){
		
		//var t = _dom.createElement(_elementName);
		//When u execute "createElement" method , IE browse will attach a "xmlns" attribute
		//with these element! Furthermore , u can not delete the attribute "xmlns"?! fuck!
		//t.removeAttribute("xmlns"); 
		
		//new element
		var e = new DomTreeElement(_eName);
		var attrs = _parse.findElementAttributes(_eName);
		for(var i=0;i<attrs.length;i++){
			var name = attrs[i].getAttribute("name");
			var a = new DomTreeAttribute( i , name , "");

			//attache rule with the attribute
			a.rule = _parse.findElementAttributeRule(_eName , name);
			a.setElement(e);
			e.addAttribute(a);
		}
		return e;
	}


	_findAllAttributes = function(_parse , _element , _dt_e){

		var r = new Array();
		//add attributes which be defined in the schema file
		var aval_attrs = _parse.findElementAttributes(_element.nodeName);
		for(var i=0;i<aval_attrs.length;i++){
			var _a = aval_attrs[i];
			var _name = _a.getAttribute("name");
			
			var _attr = new DomTreeAttribute(i ,_name , "");
			var _fa = _findElementAttribute(_element , _name);
			if(_fa != null){
				_attr.value = _fa.value;
				_attr.setState("old");
			}
			
			_attr.setElement(_dt_e);

			//attache rule with the attribute
			_attr.rule = _parse.findElementAttributeRule(_element.nodeName , _name);
			r.push(_attr);
		}
		return r;
	}

	_findElementAttribute = function(_element , _attrName){
		var r = null;
		for(var i=0;i<_element.attributes.length;i++){
			var attr = _element.attributes[i];
			
			if(attr.name == _attrName){
				r = attr;
			}
		}
		return r;
	}
}



//*******************************************************************************
//Test cases
//*******************************************************************************
function _Test(){
	
	var XML_FILE = "../xml/ApplicationProfile.xml";
	var SCHEMA_FILE = "../xml/ApplicationProfile.xsd";

	var reader = new DefaultDomTreeReader();
	reader.init(XML_FILE , SCHEMA_FILE);
	
	var domTree = new DefaultDomTree(reader);
	
	this.testInit = function(){
		var fname = "testInit";
		
		domTree.init("Profile");
		if(domTree.reader != null){
			_alertSuccess(fname);
			return;
		}
		_alertFailure(fname);
	}

	this.testGetRoot = function(){
		var fname = "testGetRoot";
		
		var root = domTree.getRoot();
		if(root == null || root.getName() != "Profile"){
			_alertFailure(fname, "root name is not Profile");
			return;
		}
		_alertSuccess(fname);
	}



	this.testGetElement = function(){
		var fname = "testGetElement";
		
		var element = domTree.getElement(1);

		//test element
		if(element == null || element.getName() != "Consumer"){
			_alertFailure(fname , "element is null or name is error!");
			return;
		}
		//tese element's rule
		var rule = element.getRule();
		if(rule.name != "occurs" || rule.min != null){
			_alertFailure(fname , "the rule of the element is error!");
			return;
		}
		
		//test element's attributes
		var attributes = element.getAttributes();
		if(attributes.length != 15){
			_alertFailure(fname , "the attributes number of the element is error!");
			return;
		}

		if(	attributes[0].name != "applicationName" ||
			attributes[14].name != "flushDataAsap" ||
			attributes[1].value != "consumerId001"){
			_alertFailure(fname , "the name of the attribute is error!");
			return;
		}

		//test attribute's rule
		if(	attributes[0].rule.name != "normalizedString" ||
			attributes[14].rule.name != "boolean"){

			_alertFailure(fname , "the rule of the attribute is error!");
			return;
		}

		_alertSuccess(fname);
	}
	this.testHasChildrens = function(){
		var fname = "testHasChildrens";

		var b = domTree.hasChildrens(1);
		if(b){
			_alertFailure(fname, "the element [Consumer] has no children!");
			return;
		}

		_alertSuccess(fname);
	}
	this.testGetChildrens = function(){
		var fname = "testGetChildrens";
		
		var childrens = domTree.getChildrens(2);
		if(childrens.length != 2){
			_alertFailure(fname , "the numbers of childrens[Service] is error!");
			return;
		}

		if(childrens[0].getName() != "osTypes" || childrens[1].getName() != "Control"){
			_alertFailure(fname , "the name of childrens[Service] is error!");
			return;
		}

		//test rule of the childrens
		if(childrens[1].getRule().name != "occurs" || childrens[1].getRule().min != 0){
			_alertFailure(fname , "the rule of childrens[Service] is error!");
			return;
		}

		_alertSuccess(fname);
	}
	
	this.testAddElement = function(){
		var fname = "testAddElement";

		//test add "Consumer" element ok!
		var r = domTree.addElement(0 , "Consumer");
		if(r == null){
			_alertFailure(fname , "Can not add 'Consumer' element!");
			return;
		}
		_alertSuccess(fname);
		//alert(domTree.record);
	}

	this.testRemoveElement = function(){
		var fname = "testRemoveElement";

		//test remove osType
		try{
			domTree.removeElement(3);
		}catch(e){
			_alertException(fname , e);
			return;
		}
		_alertSuccess(fname);
	}

	testToXml = function(){
		alert(service.toXml());
	}

	this.testFindAllAttributes = function(){
		var fname = "testFindAllAttributes";

		var as = domTree.findAllAttributes("Service");
		if(as.length == 3){
			_alertSuccess(fname);
		}else{
			_alertFailure(fname);
		}
	}
	
	this.testFindAllChildrens = function(){
		var fname = "testFindAllChildrens";

		var cs = domTree.findAllChildrens("SOAM");
		if(cs.length == 8){
			_alertSuccess(fname);
		}else{
			_alertFailure(fname);
		}
	}
}

//*******************************************************************************
//Test:
//*******************************************************************************
if(_DEBUG_DOMTREE) autoTest();
function autoTest(){
	var test = new _Test();
	for (var property in test) {
		if(test[property] instanceof Function){
			test[property]();
		}
	}
}