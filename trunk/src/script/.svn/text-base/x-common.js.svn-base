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

function DomTreeElement(_name , _prototype){

	//propertys
	//***************************************************************************
	this.id = -1;
	this.name = _name;
	this.prototype = _prototype;

	this.layer = -1;
	this.doc = "";
	this.ns = ""; //ns meaning "nams space"
	
	this.isLeaf = false;
	this.source = ""; //data source: "Profile"(came from the xml file) | "Default" (came from the schema file) 
	this.value = "";

	this.father = null;
	this.childrens = new Array();
	this.attributes = new Array();

	//element's rules
	this.crule = new DefaultRule(-1 , -1);//content rule
	this.srule = new OccursRule(-1 , -1);//struct rule

	//Public methods
	//***************************************************************************
	//property childrens
	this.hasChildrens = function(){
		var r = false;
		if(this.childrens.length >0) r = true;
		return r;
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

	this.toString = function(){
		var fn = this.father == null?"":this.father.name;
		return "(" + this.id + " , " + this.name + 
			" , f:" + fn + " , c.length:" + this.childrens.length + 
			" , a.length:" + this.attributes.length +
			" , sr:" + this.srule + ", cr:" + this.crule + " , v:" + this.value + ")";
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
	this.source = ""; //data source: "Profile"(came from the xml file) | "Default" (came from the schema file) 	

	this.element = null;
	this.rule = new DefaultRule();

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
	this.removeAll = removeAll;
	this.size = size;
	this.isEmpty = isEmpty;
	this.iterator = iterator;
	this.contains = contains;
	this.indexOf = indexOf;
	this.toString = toString;

	function add(obj){
		this.innerArray[this.innerArray.length] = obj;
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
	function removeAll() {
		this.innerArray = new Array();
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
	function contains(obj){
		for (var i = 0; i < this.innerArray.length; i++){
			if ( this.innerArray[i] == obj ){
				return true;
			}
		}
		return false;
	}
	function indexOf(obj) {
		for (var i = 0; i < this.innerArray.length; i++){
			if ( this.innerArray[i] == obj ){
				return i;
			}
		}
		return -1;
	}
	function toString() {
		var s = "";
		for (var i = 0; i < this.innerArray.length; i++){
			if( i != 0 ) {
				s += ",";
			}
			s += this.innerArray[i];
		}
		return s;
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

function formatData(data){
	// Use ECMA-262 Edition 3 String and RegExp features
	data = data.replace(/[\t\n\r ]+/g, " ");
	data = data.replace(/:/g, ": ");
	data = data.replace(/;/g, "; ");

	if (data.charAt(0) == " ") data = data.substring(1, data.length);
	if (data.charAt(data.length - 1) == " ") data = data.substring(0, data.length - 1);
	return data;
}

function trimString(s){
  while ((s.substring(0,1) == ' ') || (s.substring(0,1) == '\n') || (s.substring(0,1) == '\r') || (s.substring(0,1) == '\t')){
    s = s.substring(1,s.length);
  }

  // Remove trailing spaces and carriage returns
  var chCode = s.charCodeAt(s.length-1);
  while (chCode==13 || chCode==10 || chCode==9 || chCode==32){
    s = s.substring(0,s.length-1);
    chCode = s.charCodeAt(s.length-1);
  }
  return s;
}

function getElementsByTagName(_dom, _elementName, _prefix){
	var e = _dom.getElementsByTagName(_elementName);
	if(e.length == 0){
		if(_prefix != null){
			e = _dom.getElementsByTagName(_prefix + ":" + _elementName);
		}
	}
	return e;
}


function getElementName(_refName){
	var r = "";
	var index = _refName.indexOf(":");
	if(index != -1){
		r  = _refName.substring(index + 1);
	}else{
		r = _refName;
	}
	return r;
}

function getNameSpacePrefix(_refName){
	var r = "";
	var index = _refName.indexOf(":");
	if(index != -1){
		r  = _refName.substring(0, index);
	}
	return r;
}

function encode(_str){
	_str = _str.replace(/&/g ,	"&#38;");	
	_str = _str.replace(/</g ,	"&#60;");	
	_str = _str.replace(/>/g ,	"&#62;");	
	_str = _str.replace(/\'/g , "&#39;");	
	_str = _str.replace(/\"/g , "&#34;");	
	return _str;
}
