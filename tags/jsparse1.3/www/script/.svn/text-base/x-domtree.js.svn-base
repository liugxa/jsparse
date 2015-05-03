//*******************************************************************************
//interfaces
//*******************************************************************************
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

	this.reader = _reader;

	//Private propertys
	//***************************************************************************
	var reader = _reader;
	var elements = new ActiveRecord(); 
	//var layers = new Map(); //Todo:this feature will be implemented 

	//Construction
	//***************************************************************************
	this.init = function(_rootName){
		var dom = reader.getDom();
		var parse = reader.getParse();

		var root = dom.getElementsByTagName(_rootName)[0];
		var dt_r  = new DomTreeElement(_rootName);

		//add element's rule & attributes!
		dt_r.setRule(parse.findElementRule(root.nodeName));
		dt_r.setAttributes(_findAllAttributes(parse , root , dt_r));
		dt_r.setLayer(0);

		//save element & layer
		elements.save(dt_r);
				
		//add it's childrens
		_addChildrens(parse , root , dt_r , 1);
	}

	//Public methods
	//***************************************************************************
	this.getElements = function(){
		return elements;
	}
	this.getLayers = function(){
		return layers;
	}
	this.getRoot = function(){
		return elements.load(0);
	}
	this.getElement = function(_id){
		return elements.load(_id);
	}
	this.getReader = function(){
		return reader;
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
		var element = elements.load(_id);
		return element.getChildrens();
	}
	
	this.enableAdd = function(_fid , _eName){
		
		var r = true;
		var f = elements.load(_fid);
		if(f == null) throw "Can not find the element which id=" + _fid + "!!";

		//estamite these operation by element's rule
		var rule = reader.getParse().findElementRule(_eName);
		if(rule == null) throw "This rule of the element is NOT exist!!";
		
		var es = _findElementsByName(f , _eName);
		//alert("find element[" + _eName + "] rule[ " + rule.name  + "](add," + es.length + ")");
		r = rule.validate("add" , es.length);

		return r;
	}

	this.addElement = function(_fid , _eName){

		var f = elements.load(_fid);

		//add element
		var e = _createNewElement(reader.getParse() , _eName);
		e.setLayer(f.layer + 1);
		
		f.addChildren(e);
		e.setFather(f);

		return elements.save(e);
	}

	this.enableRemove = function(_id){
		var r = true;

		var e = elements.load(_id);
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

		var e = elements.load(_id);
		if(e == null) throw "Can not find the element which id=" + _id + "!!";
		
		_removeElement(e);
	}

	
	this.modifyAttribute = function(_id ,_attrName , _value){}
	this.addNewAttribute = function(_id , _attr){}
	this.removeAttribute = function(_id , _attrName){}
		
	this.getAllAvailAttributes = function(_eName){
		var parse = reader.getParse();
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
		var parse = reader.getParse();
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
		//todo
		return this.getElements();
	}

	//private methods
	//*****************************************************************
	_addChildrens = function(_parse , _element , _dt_e , _layerId){
		
		var childrens = _element.childNodes;
		for(var i=0 ; i < childrens.length ; i++){
			var child = childrens[i];
			var dt_c = new DomTreeElement(child.nodeName);
			
			//add element's rule & attributes!
			dt_c.setRule(_parse.findElementRule(child.nodeName));
			dt_c.setAttributes(_findAllAttributes(_parse , child , dt_c));
			dt_c.setLayer(_layerId);
			
			_dt_e.addChildren(dt_c);
			dt_c.setFather(_dt_e);
			
			//save element
			elements.save(dt_c);

			//continute add childrens;
			_addChildrens(_parse , child , dt_c , _layerId + 1);
		}
	}

	_removeElement = function(_dt_e){
		var childrens = _dt_e.getChildrens();
		while(childrens.length > 0 ){
			_removeElement(childrens[0]);
		}

		//remove element
		var f = _dt_e.father;
		f.removeChildren(_dt_e);

		elements.remove(_dt_e.id);
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
		var rule = _parse.findElementRule(_eName);
		e.setRule(rule);

		//configura element's attributes
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

		//tid up: the old attribute will be display first.
		


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
		try{
			domTree.init("Profile");
			if(domTree.getReader() != null){
				_alertSuccess(fname);
			}else{
				_alertFailure(fname);
			}
		}catch(e){
			_alertException(fname , e);
		}
	}

	this.testGetRoot = function(){
		var fname = "testGetRoot";
		
		var root = domTree.getRoot();
		if(root == null || root.getName() != "Profile"){
			_alertFailure(fname, "root name is not Profile");
		}else{
			_alertSuccess(fname);
		}
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
		//alert("childrens.length=" + childrens.length);
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
		
		try{
			//test add "Consumer" element ok!
			domTree.addElement(0 , "Consumer");
			_alertSuccess(fname);
		}catch(e){
				_alertException(fname , e);
		}
	}

	this.testRemoveElement = function(){
		var fname = "testRemoveElement";

		//test remove osType
		try{
			domTree.removeElement(3);
			_alertSuccess(fname);
		}catch(e){
			_alertException(fname , e);
		}
	}

	this.testFindAllAttributes = function(){
		var fname = "testFindAllAttributes";

		var as = domTree.getAllAvailAttributes("Service");
		if(as.length == 3){
			_alertSuccess(fname);
		}else{
			_alertFailure(fname);
		}
	}
	
	this.testFindAllChildrens = function(){
		var fname = "testFindAllChildrens";

		var cs = domTree.getAllAvailChildrens("SOAM");
		if(cs.length == 8){
			_alertSuccess(fname);
		}else{
			_alertFailure(fname);
		}
	}

	
	this.testToXml = function(){
		var fname = "testToXml";
		var xml = domTree.toXml();
		if(xml == null){
			_alertFailure(fname);
		}else{
			_alertSuccess(fname);
			alert(xml);
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