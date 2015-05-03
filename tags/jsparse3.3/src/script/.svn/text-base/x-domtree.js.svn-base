
//prototype.js
//var Element = new Object();
//Element.extend = function(element) {}

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


//*******************************************************************************
//DefaultDomTree
//*******************************************************************************
function DefaultDomTree(_reader){

	this.reader = _reader;

	//Private propertys
	//***************************************************************************
	var elements = new ActiveRecord(); 
	//var layers = new Map(); //Todo:this feature will be implemented 

	var reader = this.reader;
	var parse = this.reader.parse;
	var dom = this.reader.dom;
	
	var templateMap = new Map();
	var templateDom = this.reader.template;

	//Construction
	//***************************************************************************
	this.init = function(_rootName){
		
		var root = null;
		if(Browser.isIe()){
			root = dom.getElementsByTagName(_rootName)[0];
		}else{
			var name = _getElementName(_rootName);
			root = dom.getElementsByTagName(name)[0];
		}
		var dt_r  = new DomTreeElement(_rootName);

		//add element's rule & attributes!
		dt_r.setRule(parse.findElementStructRule(_rootName));
		dt_r.setContentRule(parse.findElementContentRule(_rootName));
		dt_r.setAttributes(_findAllAttributes(root , dt_r));

		dt_r.source = "Profile";
		dt_r.required = "required";

		//add special attributes which be defined in the xml file
		//like xmlns:/xsi etc.
		var alength = dt_r.attributes.length;
		var xattrs = root.attributes;
		for(var i=0;i<xattrs.length;i++){
			if((/xmlns/.test(xattrs[i].name)) || (/xsi/.test(xattrs[i].name))){
				var attr = new DomTreeAttribute(alength + i + 1 , xattrs[i].name , xattrs[i].value);
				attr.display = false;
				
				dt_r.addAttribute(attr);
				attr.setElement(dt_r);
			}
		}

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
		var rule = parse.findElementChildrenStructRule(f.name , _eName);
		if(rule == null) throw "This rule of the element is NOT exist!!";
		
		var es = _findElementsByName(f , _eName);
		r = rule.validate("add" , es.length);

		return rule.message;
	}

	this.addElement = function(_fid , _eName){

		var f = elements.load(_fid);

		//add element
		var e = _createNewElement(f , _eName);
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
		r = rule.validate("remove" , es.length);

		return rule.message;
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
		var r = new Array();

		var childrens = parse.findElementChildrens(_eName);
		for(var i=0;i<childrens.length;i++){
			var child = childrens[i];
			var name = child.getAttribute("name");
			if(name == null) name = child.getAttribute("ref");
			var dt_c = new DomTreeElement(name);
	
			//set element's rule
			var srule = parse.findElementChildrenStructRule(_eName , name);
			var crule = parse.findElementChildrenContentRule(_eName , name);
					
			dt_c.setRule(srule);
			dt_c.setContentRule(crule);
			
			r.push(dt_c);
		}
		return r;
	}

	this.toHtml = function(){
		var root = elements.load(0);
		return _toHtml(root , 1);
	}

	this.toXml = function(){
		var root = elements.load(0);
		return _toXml(root);
	}

	//private methods
	//*****************************************************************
	_encode = function(_str){
		var keyWord = ['&' , '<' , '>' , '\'' , '\"'];
		var encode	= ['&#38;' , '&#60;' , '&#62;' , '#&39;' , '&#34;'];

		var r = _str;
		for(var i=0;i<keyWord.length;i++){
			var sps = r.split(keyWord[i]);
			//alert(sps + "|" + sps.length);
			
			var s = "";
			for(var j=0;j<sps.length;j++){
				if(j != (sps.length - 1)){
					s = s + sps[j] + encode[i];
				}else{
					s = s + sps[j];
				}
			}	
			r = s;
		}
		return r;
	}

	_toXml = function(_element){
		
		var s = "<" + _element.name;

		// printe element's attribute
		for(var i=0;i<_element.attributes.length;i++){
			var attr = _element.attributes[i];
			//attribute's value should be encoded;
			if(attr.value != "\u00a0"){
				s = s + " " + attr.name + "=\"" + _encode(attr.value) + "\" ";
			}else{
				s = s + " " + attr.name + "=\"\"";
			}
		}

		// print element's childrens
		if(_element.hasChildrens()){
			if(_element.value != ""){
				s = s + ">" + _element.value;
			}else{
				s = s + ">";
			}

			//add childrens;
			for(var i=0;i<_element.childrens.length;i++){
				var child = _element.childrens[i];
				s = s + _toXml(child);
			}

			s = s + "</" + _element.name + ">";
		}else{
			//add element's value
			if(_element.value != ""){
				//element's value should be encoded;
				if(_element.value != "\u00a0"){
					s = s + ">" + _encode(_element.value) + "</" + _element.name + ">";
				}else{
					s = s + "/>";
				}
			}else{
				s = s + "/>";
			}
		}
		return s;
	}
	_toHtml = function(_element , _layer){
		
		var s = "";
		for(var i=0;i<_layer;i++){
			s = s + "&nbsp;&nbsp;&nbsp;&nbsp;";
		}
		s = s + "&lt;" + _element.name;

		// printe element's attribute
		for(var i=0;i<_element.attributes.length;i++){
			var attr = _element.attributes[i];
			s = s + " " + attr.name + "=\"" + attr.value + "\" ";
		}

		// print element's childrens
		if(_element.hasChildrens()){
			if(_element.value != ""){
				s = s + "&gt;" + _element.value + "&lt;" + "<br>";
			}else{
				s = s + "&gt;" + "<br>";
			}

			//add childrens;
			for(var i=0;i<_element.childrens.length;i++){
				var child = _element.childrens[i];
				s = s + _toHtml(child , _layer + 1) + "<br>";
			}

			for(var i=0;i<_layer;i++){
				s = s + "&nbsp;&nbsp;&nbsp;&nbsp;";
			}
			s = s + "&lt;" + "/" + _element.name + "&gt;";
		}else{
			//add element's value
			if(_element.value != ""){
				s = s + "&gt;" + _element.value + "&lt;" + "/" + _element.name + "&gt;";
			}else{
				s = s + "/" + "&gt;";
			}
		}
		return s;
	}

	_addChildrens = function(_element , _dt_e , _layerId){
		var childrens = _element.childNodes;
		for(var i=0 ; i < childrens.length ; i++){
			var child = childrens[i];
			var dt_c = new DomTreeElement(child.nodeName);
			
			//8=#comment | 3=#text
			if(child.nodeType != 8){
				if(child.nodeType != 3){
					
					//set element's rule
					var srule = parse.findElementChildrenStructRule(_element.nodeName , child.nodeName);
					var crule = parse.findElementChildrenContentRule(_element.nodeName , child.nodeName);
					
					dt_c.setRule(srule);
					dt_c.setContentRule(crule);
					
					//set element's attribute
					dt_c.setAttributes(_findAllAttributes(child , dt_c));

					//set element's layer
					dt_c.setLayer(_layerId);

					//set element's document
					dt_c.setDocument(parse.findElementDocumentation(child.nodeName));
					
					//examine whether element is a leaf of the tree.
					var cs = parse.findElementChildrens(child.nodeName);
					if(cs.length == 0 && dt_c.attributes.length == 0 ) dt_c.isLeaf = true;
					
					//set element's relationship
					_dt_e.addChildren(dt_c);
					dt_c.setFather(_dt_e);
					
					//set element's source
					dt_c.source = "Profile";

					//todo: how to estimcat this property?
					//if this element are not defined in the template file, return "optional"
					if(templateDom != null){
						var r = _isElementExist(templateDom , child.nodeName);
						//if this element has be defined in the templat file.
						//return "required" directly.
						var exist = templateMap.get(child.nodeName);
						if(r && !exist){
							dt_c.required = "required";
							templateMap.put(child.nodeName , true);
						}else{
							dt_c.required = "optional";
						}
					}else{
						dt_c.required = "required";
					}

					//save element
					elements.save(dt_c);
					
					//continute add childrens;
					_addChildrens(child , dt_c , _layerId + 1);
				}else{
					if(_dt_e.value == ""){
						var data = _data_of(child);
						_dt_e.value=data;
					}
				}
			}
		}
	}

	_data_of = function( txt ){
		var data = txt.data;
		// Use ECMA-262 Edition 3 String and RegExp features
		data = data.replace(/[\t\n\r ]+/g, " ");
		if (data.charAt(0) == " ")
		data = data.substring(1, data.length);
		if (data.charAt(data.length - 1) == " ")
		data = data.substring(0, data.length - 1);
		return data;
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

	_createNewElement = function(_father, _eName){
			
		//new element
		var e = new DomTreeElement(_eName);
		e.setRule(parse.findElementChildrenStructRule(_father.name , _eName));
		e.setContentRule(parse.findElementChildrenContentRule(_father.name , _eName));
		e.source = "Default";
		e.required = "optional";

		//configura element's attributes
		var attrs = parse.findElementAttributes(_eName);
		for(var i=0;i<attrs.length;i++){
			var name = attrs[i].getAttribute("name");
			var a = new DomTreeAttribute( i , name , "");

			//attache rule with the attribute
			a.rule = parse.findElementAttributeRule(_eName , name);
			a.setElement(e);
			a.source = "Default";
			e.addAttribute(a);
		}

		//todo: add all "required" childrens	
		//examine whether element is a leaf of the tree.
		var cs = parse.findElementChildrens(_eName);
		if(cs.length == 0 && e.attributes.length == 0 ) e.isLeaf = true;
		
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
				attr.source = "Profile";
			}else{
				attr.source = "Default";
			}
			attr.setElement(_dt_e);
			attr.display = true;
			
			//attache rule with the attribute
			attr.rule = parse.findElementAttributeRule(_element.nodeName , name);
			attr.setDocument(parse.findElementAttributeDocumentation(_element.nodeName , name));
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

	_getAttributeName = function(_attrRefName){
		return _getRealNameOfRef(_attrRefName);
	}

	_getElementName = function(_elementRefName){
		return _getRealNameOfRef(_elementRefName);
	}
	_getRealNameOfRef = function(_refName){
		var r = "";
		var index = _refName.indexOf(":");
		if(index != -1){
			r  = _refName.substring(index + 1);
		}else{
			r = _refName;
		}
		return r;
	}
	
	_isElementExist = function(_dom , _elementName){
		var r = true;

		var name = "";
		if(!Browser.isIe()) name = _getElementName(_elementName);
		var es = _dom.getElementsByTagName(name);
		if(es.length <= 0) r = false;
		
		return r;
	}
}
