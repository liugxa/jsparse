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
	var elements = new ActiveRecord(); 
	//var layers = new Map(); //Todo:this feature will be implemented 
	
	var parse = this.reader.parse;
	var dom = this.reader.dom;

	//Construction
	//***************************************************************************
	this.init = function(_rootName){

		var root = dom.getElementsByTagName(_rootName)[0];
		var dt_r  = new DomTreeElement(_rootName);

		//add element's rule & attributes!
		dt_r.setRule(parse.findElementStructRule(_rootName));
		dt_r.setAttributes(_findAllAttributes(root , dt_r));
		dt_r.setLayer(0);

		//save element & layer
		elements.save(dt_r);


		//add it's childrens
		_addChildrens(root , dt_r , 1);
		
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
		var rule = parse.findElementStructRule(_eName);
		if(rule == null) throw "This rule of the element is NOT exist!!";
		
		var es = _findElementsByName(f , _eName);
		//alert("find element[" + _eName + "] rule[ " + rule.name  + "](add," + es.length + ")");
		r = rule.validate("add" , es.length);

		return r;
	}

	this.addElement = function(_fid , _eName){

		var f = elements.load(_fid);

		//add element
		var e = _createNewElement(parse , _eName);
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
		
		_removeDomTreeElement(e);
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
	_addChildrens = function(_element , _dt_e , _layerId){
		
		var childrens = _element.childNodes;
		for(var i=0 ; i < childrens.length ; i++){
			var child = childrens[i];
			var dt_c = new DomTreeElement(child.nodeName);
			
			if(child.nodeType != 3){
				
				//add element's rule & attributes!
				dt_c.setRule(parse.findElementStructRule(child.nodeName));
				dt_c.setAttributes(_findAllAttributes(child , dt_c));
				dt_c.setLayer(_layerId);

				_dt_e.addChildren(dt_c);
				dt_c.setFather(_dt_e);

				//save element
				elements.save(dt_c);
				
				//continute add childrens;
				_addChildrens(child , dt_c , _layerId + 1);
			}else{
				dt_c.setValue(child.nodeValue);
			}
		}
	}

	_removeDomTreeElement = function(_dt_e){
		var childrens = _dt_e.getChildrens();
		while(childrens.length > 0 ){
			_removeDomTreeElement(childrens[0]);
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
		var rule = _parse.findElementStructRule(_eName);
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


	_findAllAttributes = function(_element , _dt_e){
		
		var r = new Array();
		
		//add attributes which be defined in the schema file
		var aval_attrs = parse.findElementAttributes(_element.nodeName);
		//alert(aval_attrs.length);
		for(var i=0;i<aval_attrs.length;i++){
			var name = aval_attrs[i].getAttribute("name");

			var attr = new DomTreeAttribute(i ,name , "");
			var fa = _findElementAttribute(_element , name);

			if(fa != null){
				attr.value = fa.value;
				attr.setState("old");
			}
			attr.setElement(_dt_e);
			
			//attache rule with the attribute
			attr.rule = parse.findElementAttributeRule(_element.nodeName , name);
			r.push(attr);
		}
		return r;
	}

	_findElementAttribute = function(_element , _attrName){
		var r = null;
		for(var i=0;i<_element.attributes.length;i++){
			var attr = _element.attributes[i];
			if(attr.name == _attrName){
				r = attr;
				break;
			}
		}
		return r;
	}
}



function MultiNSDomTree(_reader){

	this.reader = _reader;

	//Private propertys
	//***************************************************************************
	var elements = new ActiveRecord(); 
	//var layers = new Map(); //Todo:this feature will be implemented 
	
	var parse = this.reader.parse;
	var dom = this.reader.dom;

	//Construction
	//***************************************************************************
	this.init = function(_rootName){

		var root = dom.getElementsByTagName(_rootName)[0];		
		var dt_r  = new DomTreeElement(_rootName);

		//add element's rule & attributes!
		dt_r.setRule(parse.findElementStructRule(_rootName));
		dt_r.setAttributes(_findAllAttributes(root , dt_r));
		dt_r.setLayer(0);
		dt_r.setDocument(parse.findElementDocumentation(_rootName));

		//save element & layer
		elements.save(dt_r);

		//add it's childrens
		_addChildrens(root , dt_r , 1);
		
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
		var rule = parse.findElementStructRule(_eName);
		if(rule == null) throw "This rule of the element is NOT exist!!";
		
		var es = _findElementsByName(f , _eName);
		//alert("find element[" + _eName + "] rule[ " + rule.name  + "](add," + es.length + ")");
		r = rule.validate("add" , es.length);

		return r;
	}

	this.addElement = function(_fid , _eName){

		var f = elements.load(_fid);

		//add element
		var e = _createNewElement(parse , _eName);
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
		
		_removeDomTreeElement(e);
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
			if(name == null) name = c.getAttribute("ref");

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
	_addChildrens = function(_element , _dt_e , _layerId){
		
		var childrens = _element.childNodes;
		for(var i=0 ; i < childrens.length ; i++){
			var child = childrens[i];
			var dt_c = new DomTreeElement(child.nodeName);

			if(child.nodeType != 3){
				//add element's rule & attributes!
				//alert("find " + child.nodeName + " attributes!");
				//dt_c.setRule(parse.findChildrenStructRule(child));
				dt_c.setAttributes(_findAllAttributes(child , dt_c));
				dt_c.setLayer(_layerId);
				dt_c.setDocument(parse.findElementDocumentation(child.nodeName));

				_dt_e.addChildren(dt_c);
				dt_c.setFather(_dt_e);

				//save element
				elements.save(dt_c);
				
				//continute add childrens;
				_addChildrens(child , dt_c , _layerId + 1);
			}else{
				//alert("set " + _dt_e.id + "'s value=" + child.nodeValue);
				_dt_e.setValue(child.nodeValue);
			}
		}
	}

	_removeDomTreeElement = function(_dt_e){
		var childrens = _dt_e.getChildrens();
		while(childrens.length > 0 ){
			_removeDomTreeElement(childrens[0]);
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
		var rule = _parse.findElementStructRule(_eName);
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


	_findAllAttributes = function(_element , _dt_e){		
		var r = new Array();

		//add attributes which be defined in the schema file
		var aval_attrs = parse.findElementAttributes(_element.nodeName);
		//alert(aval_attrs.length);
		for(var i=0;i<aval_attrs.length;i++){
			var name = aval_attrs[i].getAttribute("name");

			var attr = new DomTreeAttribute(i ,name , "");
			var fa = _findElementAttribute(_element , name);

			if(fa != null){
				attr.value = fa.value;
				attr.setState("old");
			}
			attr.setElement(_dt_e);
			
			//attache rule with the attribute
			//attr.rule = parse.findElementAttributeRule(_element.nodeName , name);
			r.push(attr);
		}
		return r;
	}

	_findElementAttribute = function(_element , _attrName){
		var r = null;
		for(var i=0;i<_element.attributes.length;i++){
			var attr = _element.attributes[i];
			if(attr.name == _attrName){
				r = attr;
				break;
			}
		}
		return r;
	}
}
