
//*******************************************************************************
//interfaces
//*******************************************************************************
function IDomTree(_context){

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

	this.addChildrens = function(_dt_e){}

	this.toHtml = function(){}
	this.toXml = function(){}

	this.dispose = function(){}
}


//*******************************************************************************
//DefaultDomTree
//*******************************************************************************
function DefaultDomTree(_context , _rootName){

	this.rootName = _rootName;
	this.context = _context;

	//Private propertys
	//***************************************************************************
	var elements = new ActiveRecord(); 
	
	var reader = this.context;
	var parse = this.context.parse;
	var dom = this.context.dom;
	
	var root = null;
	var _this = this;

	//Construction
	//***************************************************************************
	this.init = function(){
		root = getElementsByTagName(dom, getElementName(rootName), getNameSpacePrefix(rootName))[0];
		var dt_r  = new DomTreeElement(rootName , root);

		//add element's rule & attributes!
		dt_r.srule = parse.findElementStructRule(rootName);
		dt_r.crule = parse.findElementContentRule(rootName);
		dt_r.attributes = _findAllAttributes(dt_r);
	
		dt_r.source = "Profile";
		dt_r.layer = 0;
		dt_r.doc = parse.findElementDocumentation(rootName);

		//save element & layer
		elements.save(dt_r);

		//add it's childrens
		this.addChildrens(dt_r);
	}

	//Public methods
	//***************************************************************************
	this.getRoot = function(){
		return elements.load(0);
	}

	this.getElement = function(_id){
		return elements.load(_id);
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

		return r;
	}

	this.addElement = function(_fid , _eName){
		//add element
		var f = elements.load(_fid);
		var e = _createNewElement(f , _eName);
		var r = elements.save(e);

		//add the "required" childrens
		var childrens = parse.findElementChildrens(_eName);
		for(var i=0;i<childrens.length;i++){
			var child = childrens[i];
			var name = child.getAttribute("name");
			if(name == null) name = child.getAttribute("ref");

			var min = child.getAttribute("minOccurs");
			var max = child.getAttribute("maxOccurs");
			
			if(min == null || min == _UNDEFINED) min = 1;
			if(max == null || max == _UNDEFINED) max = 1;
		
			//if the min == 1, it is requried elements.
			if(min == 1) this.addElement(r.id , name);
		}
		return r;
	}

	this.enableRemove = function(_id){
		var r = true;

		var e = elements.load(_id);
		if(e == null) throw "Can not find the element which id=" + _id + "!!";

		//estamite these operation by element's rule
		var srule = e.rule;
		if(srule == null) throw "This structur rule of the element is NOT exist!!";
		
		var father = e.father;
		var es = _findElementsByName(father , e.getName());
		r = srule.validate("remove" , es.length);

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

			//if the name is null, i thinks it's name has been setted into the "ref" attribute.
			if(name == null) name = child.getAttribute("ref");
			var dt_c = new DomTreeElement(name , null);
	
			//set element's rule	
			dt_c.srule = parse.findElementChildrenStructRule(_eName , name);
			dt_c.crule = parse.findElementChildrenContentRule(_eName , name);
				
			r.push(dt_c);
		}
		return r;
	}

	this.addChildrens = function(_dt_e){
		var _element = _dt_e.prototype;
		var childrens = _element.childNodes;
		for(var i=0 ; i < childrens.length ; i++){
			var child = childrens[i];
			var dt_c = new DomTreeElement(child.nodeName , child);
			
			//8=#comment | 3=#text
			if(child.nodeType != 8){
				if(child.nodeType != 3){
					
					//set element's rule		
					dt_c.srule = parse.findElementChildrenStructRule(_element.nodeName , child.nodeName);
					dt_c.crule = parse.findElementChildrenContentRule(_element.nodeName , child.nodeName);
					
					//set element's attribute
					dt_c.attributes = _findAllAttributes(dt_c);

					//set element's layer
					dt_c.layer = _dt_e.layer + 1;

					//set element's document
					dt_c.doc = parse.findElementDocumentation(child.nodeName);
					
					//examine whether element is a leaf of the tree.
					var cs = parse.findElementChildrens(child.nodeName);
					if(cs.length == 0 && dt_c.attributes.length == 0 ) dt_c.isLeaf = true;
					
					//set element's relationship
					_dt_e.addChildren(dt_c);
					dt_c.father = _dt_e;
					
					//set element's source
					dt_c.source = "Profile";

					//save element
					elements.save(dt_c);

					//add childrens
					if(!this.context.lazyLoading) this.addChildrens(dt_c);
				}else{
					if(_dt_e.value == ""){
						_dt_e.value = child.data;
					}else{
						_setElementDefaultValue(dt_c);
					}
				}
			}
		}
	}

	this.findAllAttributes = function(_dt_e){
		//add attributes which be defined in the schema file
		_element = _dt_e.prototype;
		var r = new Array();

		//add attributes which be defined in the schema file
		var aval_attrs = parse.findElementAttributes(_element.nodeName);
		for(var i=0;i<aval_attrs.length;i++){
			var name = aval_attrs[i].getAttribute("name");
			var attr = new DomTreeAttribute(i ,name , "");

			//set attribute's source
			var fa = _findElementAttribute(_element , name);
			if(fa != null){
				//attr.value = fa.value;
				attr.source = "Profile";
				if(fa.value != "") attr.value = fa.value;
			}else{
				attr.source = "Default";

				//set default attribute's value
				//if the attribute is optional and the value defined in the xml file is empty
				//u should fill the attribute's value with the default value.
				_setAttributeDefaultValue(attr);
			}
			
			//set attribute's relationship with element
			attr.element = _dt_e;

			//default: display this attribute
			attr.display = true;
			
			//set attribute's rule
			attr.rule = parse.findElementAttributeRule(_element.nodeName , name);

			//set attribute's document
			attr.doc = parse.findElementAttributeDocumentation(_element.nodeName , name);
			r.push(attr);
		}
		if(_dt_e.name == rootName){
			var alength = root.attributes.length;
			
			//like xmlns:/xsi etc.
			var xattrs = root.attributes;
			for(var i=0; i< xattrs.length;i++){
				if((/xmlns/.test(xattrs[i].name)) || (/xsi/.test(xattrs[i].name))){
					var attr = new DomTreeAttribute(alength + i + 1 , xattrs[i].name , xattrs[i].value);
					attr.display = false;
					r.push(attr);
				}
			}
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

	this.dispose = function(){
		this.rootName = null;
		this.context = null;

		elements = null; 
		root = null;
		_this = null;

	}

	//private methods
	//*****************************************************************
	_toXml = function(_element){
		var srule = _element.rule;
		if(_element.attributes.length == 0) _element.setAttributes(_this.findAllAttributes(_element));

		var s = "<" + _element.name + " ";
		
		// printe element's attribute
		for(var i=0;i<_element.attributes.length;i++){
			var attr = _element.attributes[i];
			var aRequire = attr.use;
			//attribute's value should be encoded;
			if(aRequire == "optional" && attr.value == _NULL_){
				s = s + attr.name + "=\"\"";
			}else if(aRequire == "optional" && attr.value == ""){
				//do nothing!
			}else{
				s = s + attr.name + "=\"" + encode(attr.value) + "\" ";
			}
		}

		// print element's childrens
		if(_element.hasChildrens()){
			//add element's value
			if(_element.value == "" || _element.value == _NULL_){
				s = s + ">";
			}else{
				s = s + ">" + _element.value;
			}
			//add childrens;
			for(var i=0;i<_element.childrens.length;i++){
				var child = _element.childrens[i];
				s = s + _toXml(child);
			}
			s = s + "</" + _element.name + ">";
		}else{
			//add element's value
			if(_element.value == "" || _element.value == _NULL_){
				s = s + "/>";
			}else{
				s = s + ">" + encode(_element.value) + "</" + _element.name + ">";
			}
		}
		return s;
	}

	_toHtml = function(_element , _layer){
		
		var xml = _toXml(_element);
		xml = xml.replace(/</g , "&lt;");
		xml = xml.replace(/>/g , "&gt; <br>");
		return xml;
	}
	
	_setElementDefaultValue = function(_dt_c){
		var _srule = _dt_c.srule;
		var _crule = _dt_c.crule;
		
		//if the element is required and the value of it is empty(user make this mistake)
		//editor can not accept this error and it will modify this value by reading the "default"
		//parameter and the array of "requiredDefaultValues". If it can not get the value from them too, 
		//editor will use its default value.
		//The empty value is permitted if the element is optional
		if(_srule.min != 0){
			//throwException("The value of the required element can NOT be empty!");
			switch(_crule.name){
				case "enumString": 
					_dt_c.value = _crule.getEnumValue(0);
					break;
				case "boolean":
					_dt_c.value = "false";
					break;
				default:
					//if the default value of element is exist, use it!
					//otherwise, find the value from the array of "rdvs" parameter.
					if(_crule.defaultValue != ""){
						_dt_c.value = _crule.defaultValue;
					}
			}//end switch			
		}
	}

	_setAttributeDefaultValue = function(_attr){
		var rule = _attr.rule;
		if(rule.use == "required"){
			//throwException("The value of the required attribute can NOT be empty!");
			switch(rule.name){
				case "enumString": 
					_attr.value = rule.getEnumValue(0);
					break;
				case "boolean":
					_attr.value = "false";
					break;
				default:
					//if the default value of element is exist, use it!
					//otherwise, find the value from the array of "rdvs" parameter.
					if(rule.defaultValue != ""){
						_attr.value = rule.defaultValue;
					}
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

	_createNewElement = function(_father, _eName){
			
		//new element
		var e = new DomTreeElement(_eName , null);
		e.srule = parse.findElementChildrenStructRule(_father.name , _eName); 
		e.crule = parse.findElementChildrenContentRule(_father.name , _eName);
		
		//set element's document
		e.doc = parse.findElementDocumentation(_eName);
		e.source = "Default";

		//configura element's attributes
		var attrs = parse.findElementAttributes(_eName);
		for(var i=0;i<attrs.length;i++){
			var name = attrs[i].getAttribute("name");
			var a = new DomTreeAttribute( i , name , "");

			//attache rule with the attribute
			a.rule = parse.findElementAttributeRule(_eName , name);
			
			//set attribute's document
			a.doc = parse.findElementAttributeDocumentation(_eName , name);
			a.element = e;
			a.source = "Default";
			e.addAttribute(a);

			//set attribute's value
			_setAttributeDefaultValue(a);
			
		}
		
		//set element's value
		_setElementDefaultValue(e);

		//examine whether element is a leaf of the tree.
		var cs = parse.findElementChildrens(_eName);
		if(cs.length == 0 && e.attributes.length == 0 ) e.isLeaf = true;
		
		//set layer
		e.layer = _father.layer + 1;
		
		//set relationship
		_father.addChildren(e);
		e.father = _father;
		return e;
	}

	_findElementsByName = function(_f , _eName){ 
		var childrens = _f.getChildrens();
		var r = new Array();
		for(var i=0;i<childrens.length;i++){
			var c = childrens[i];
			if(c.getName() == _eName) r.push(c);
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
