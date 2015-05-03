//*******************************************************************************
// Copyright
//*******************************************************************************

/*
function Layer(_id){
	this.id = _id;
	this.elements = new Array();
	
	this.setId = function(_i){
		this.id = _i;
	}
	this.getId = function(){
		return this.id;
	}
	this.getElements = function(){
		return this.elements;
	}

	this.addElement = function(_e){
		this.elements.push(_e);
	}

	//about layer's element operations
	this.removeElement = function(_e){		
		for(var i=0;i<this.elements.length;i++){
			if(this.elements[i].getId() == _e.getId()){
				this.elements.splice(i ,1);
				return;
			}
		}
	}
	this.getElement = function(_id){
		var r = null;
		for(var i=0;i<this.elements.length;i++){
			if(this.elements[i].getId() == _id){
				r = this.elements[i];
				break;
			}
		}
		return r;
	}
	this.toString = function(){
		var s = "";
		for(var i=0;i<this.elements.length;i++){
			s = s + this.elements[i];
		}
		return "(" + this.id + "," + s + ")";
	}
}
*/

//*******************************************************************************
//Base classes
//*******************************************************************************

function DomTreeElement(_name){

	//propertys
	//***************************************************************************
	this.id = -1;
	this.name = _name;

	this.father = null;
	this.childrens = new Array();
	this.attributes = new Array();
	this.layer = -1;

	this.doc = "";
	this.ns = ""; //ns meaning "nams space"
	
	this.isLeaf = false;	
	this.source = "";
	this.value = "";

	//element's rules
	this.crule = new DefaultRule(-1 , -1);//content rule
	this.rule = new OccursRule(-1 , -1);//struct rule
	
	//Public methods
	//***************************************************************************
	this.setContentRule = function(_cr){
		this.crule = _cr;
	}
	this.getContentRule = function(){
		return this.crule;
	}
	this.setDocument = function(_doc){
		this.doc = _doc;
	}
	this.getDocument = function(){
		return this.doc;
	}
	this.setValue = function(_value){
		this.value = _value;	
	}
	this.getValue = function(){
		return this.value;
	}

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
	this.removeChildren = function(_c){		
		//alert("remove " + _eid + " from " + this.id);
		for(var i=0;i<this.childrens.length;i++){
			if(this.childrens[i].id == _c.id){
				this.childrens.splice(i ,1);
				return;
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

	this.setLayer = function(_layer){
		this.layer = _layer;
	}
	this.getLayer = function(){
		return this.layer;
	}

	this.setRule = function(_r){
		this.rule = _r;
	}

	this.getRule = function(){
		return this.rule;
	}

	this.toString = function(){
		var fn = this.father == null?"":this.father.getName();
		return "(" + this.getId() + " , " + this.getName() + 
			" , f:" + fn + " , c.length:" + this.childrens.length + 
			" , a.length:" + this.attributes.length +
			" , sr:" + this.rule + ", cr:" + this.crule + " , v:" + this.value + ")";
	}
}


/**
* IDomTree: The Attribute class extends Element
**/
function DomTreeAttribute(_id , _name , _value){

	//propertys
	//***************************************************************************
	this.id = _id;
	this.name = _name;
	this.value = _value;

	this.doc = "";
	this.display = true; //todo:this property will be replaced by the "status"
	this.source = "";	

	this.element = null;
	this.rule = new DefaultRule();

	this.setDocument = function(_doc){
		this.doc = _doc;
	}
	this.getDocument = function(){
		return this.doc;
	}
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
		return "(id:" + this.id + ", name:" + this.name + ", value:" + this.value 
			+ ", source:" + this.source + ", rule:" + this.rule + ")";
	}
}


//*******************************************************************************
//Utils classes
//*******************************************************************************
/**
* @title: java-like Map
* @author: lizhantao
* @date: 2004-11-22
* @email: lazett@gmail.com gliu@platform.com
* @warning: only support simple type key,String best!;
*/
function ActiveRecord(){
	this.map = new Map();
	this.sequence = -1;//synchronization?my god! it not db!! forgot it!

	this.save = function(object){
		this.sequence ++;
		this.map.put(this.sequence , object);
		object.setId(this.sequence);
		
		return object;
	}
	
	this.remove = function(i){
		this.map.remove(i);
	}

	this.load = function(i){
		return this.map.get(i);
	}
	
	this.toString = function(){
		return this.map.toString();
	}
}

/**
* @title: java-like Map
* @author: lizhantao
* @date: 2004-11-22
* @email: lazett@gmail.com gliu@platform.com
* @warning: only support simple type key,String best!;
*/
function Map() { 
	this.pairs = new List();
	this.get = get;
	this.put = put;
	this.remove = remove;
	this.size = size;
	this.isEmpty = isEmpty;
	this.keySet = keySet;
	this.containsKey = containsKey;
	this.toString = toString;

	function Item(key, value){
		this.key = key;
		this.value = value;
		this.toString = function(){
			return "<li>[key=" + this.key + " | value=" + this.value + "]</li> \n\r";
		}	
	}

	function put(key, value){
		for(var iter = this.pairs.iterator();iter.hasNext();){
			var item = iter.next();
			if(item.key === key){
				item.value = value;
				return;
			}
		}

		this.pairs.add(new Item(key,value));
	}

	function get(key){
		for(var iter = this.pairs.iterator();iter.hasNext();){
			var item = iter.next();
			if(item.key === key){
				return item.value;
			}
		}
		return null;
	}

	function remove(key){
		for(var iter = this.pairs.iterator();iter.hasNext();){
			var item = iter.next();
			if(item.key === key){
				iter.remove();
			}
		}
	}

	function size(){
		return this.pairs.size();
	}

	function isEmpty(){
		return this.pairs.size() <= 0;
	}
	function keySet(){
		var keys = new List();
		for(var iter = this.pairs.iterator();iter.hasNext();){
			var item = iter.next();
			keys.add(item.key);
		}
		return keys;
	}
	function containsKey(key){
		for(var iter = this.pairs.iterator();iter.hasNext();){
			var item = iter.next();
			if(item.key === key){
				return true;
			}
		}
		return false;
	}
	function toString(){
		var str = "";
		for(var iter = this.pairs.iterator();iter.hasNext();){
			str = str + iter.next().toString();
		}
		return str;
	}
}
/**
* @title: java-like List
* @author: lizhantao
* @date: 2004-11-22
* @email: lazett@gmail.com gliu@platform.com
*/
function List(){
	this.innerArray = new Array();
	this.add = add;
	this.get = get;
	this.remove = remove;
	this.size = size;
	this.isEmpty = isEmpty;
	this.iterator = iterator;
	this.contains = contains;

	function add(value){
		this.innerArray[this.innerArray.length] = value;
	}
	function get(i){
		if (i< 0 || i>= this.innerArray.length){
			return;
		}
		return this.innerArray[i];
	}
	function remove(i){
		if (i< 0 || i>= this.innerArray.length){
			return;
		}
		this.innerArray.splice(i,1);
	}
	function size(){
		return this.innerArray.length;
	}
	function isEmpty(){
		return this.innerArray.length <= 0;
	}
	function iterator(){
		return new Iterator(this);
	}
	function contains(object){
		for (var i = 0; i < this.pairs.length; i++){
			if ( this.innerArray[i] === object ){
				return true;
			}
		}
		return false;
	}
}
/**
* @title: java-like Set
* @author: lizhantao
* @date: 2004-11-22
* @email: lazett@gmail.com gliu@platform.com
* @warning: only support simple type value,String best!;
*/
function Set(){
	this.innerArray = new Array();
	this.add = add;
	this.get = get;
	this.remove = remove;
	this.size = size;
	this.isEmpty = isEmpty;
	this.iterator = iterator;
	this.contains = contains;

	function add(value){
		for (var i = 0; i < this.pairs.length; i++){
			if ( this.innerArray[i] === value ){
				return;
			}
		}
		this.innerArray[this.innerArray.length] = value;
	}
	function get(i){
		if (i< 0 || i>= this.innerArray.length){
			return;
		}
		return this.innerArray[i];
	}
	function remove(i){
		if (i< 0 || i>= this.innerArray.length){
			return;
		}
		this.innerArray.splice(i,1);
	}
	function size(){
		return this.innerArray.length;
	}
	function isEmpty(){
		return this.innerArray.length <= 0;
	}
	function iterator(){
		return new Iterator(this);
	}
	function contains(object){
		for (var i = 0; i < this.pairs.length; i++){
			if ( this.innerArray[i] === object ){
				return true;
			}
		}
		return false;
	}
}
/**
* @title: java-like Iterator
* @author: lizhantao
* @date: 2004-11-22
* @email: lazett@gmail.com gliu@platform.com
*/
function Iterator(list){
	this.list = list;
	this.cursor = 0;
	this.hasNext = hasNext;
	this.next = next;
	this.remove = remove;

	function hasNext(){
		return this.cursor != this.list.size();
	}
	function next(){
		var result = this.list.get(this.cursor);
		this.cursor++;
		return result;
	}
	function remove(){
		this.cursor--;
		this.list.remove(this.cursor);
	}
} 
/*
//*******************************************************************************
//DomUtil class(cross browser)
//*******************************************************************************
function DomUtil(_dom){
	var dom = _dom;
	var browser = new Browser();
	this.getElementsByTagName = function(_eName){
		var r = null;
		if(browser.isIe()){
			r = dom.getElementsByTagName(_eName)[0];
		}else{
			var name = _getElementName(_eName);
			r = dom.getElementsByTagName(name)[0];
		}
		return r;
	}
	_getElementName = function(_eName){
		var r = "";
		var index = _refName.indexOf(":");
		if(index != -1){
			r  = _refName.substring(index + 1);
		}else{
			r = _refName;
		}
		return r;
	}
}

//*******************************************************************************
//Browser class
//*******************************************************************************
function Browser(){
	var agent = navigator.userAgent;
	var MSIE = agent.indexOf("MSIE");
	var NETS = agent.indexOf("Netscape");
	var OPER = agent.indexOf("Opera");

	this.isIe = function(){
		if(MSIE == 25) {
			return true;
		}else{
			return false;
		}
	}
}
function CheckBrowser(){

	this.n = navigator.userAgent.toLowerCase();
	this.db = (document.compatMode && document.compatMode.toLowerCase() != "backcompat")?document.documentElement : (document.body || null);
	this.op = !!(window.opera && document.getElementById);
	if(this.op) document.onmousedown = new Function('e','if(((e = e || window.event).target || e.srcElement).tagName == "IMAGE") return false;');
	this.ie = !!(this.n.indexOf("msie") >= 0 && document.all && this.db && !this.op);
	this.iemac = !!(this.ie && this.n.indexOf("mac") >= 0);
	this.ie4 = !!(this.ie && !document.getElementById);
	this.n4 = !!(document.layers && typeof document.classes != _UNDEFINED );
	this.n6 = !!(typeof window.getComputedStyle != _UNDEFINED  && typeof document.createRange != _UNDEFINED );
	this.w3c = !!(!this.op && !this.ie && !this.n6 && document.getElementById);
	this.ce = !!(document.captureEvents && document.releaseEvents);
	this.px = this.n4? '' : 'px';
	this.tiv = this.w3c? 40 : 10;
}
*/
//Others
//*******************************************************************************
function createHtmlElement(_s){
	return document.createElement(_s);
}

function createHtmlTextElement(_s){
	return document.createTextNode(_s);
}

function alertException(e){
	if (e instanceof Error) {
		throw e;
		//alert("Catch system excpetion:" + e.message);
	}else{
		alert(e);
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


function isUndefined(obj){
	var r = false;
	
	//ie 6 sp2
	if(obj + "" == undefined){
		r = true;
	}
	return r;
}