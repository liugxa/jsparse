
//*******************************************************************************
// Copyright
//*******************************************************************************


/**
* @ interface - IRule
* And it's implements will use the validate.js to finish his job!
**/
function IRule(_dvalue , _use){
	this.name = "";
	this.defaultValue = _dvalue;
	this.use = _use;

	this.express = "";
	this.validate = function(_value){};
}


function DefaultRule(_dvalue , _use){
	this.name = "default";
	this.defaultValue = _dvalue;
	this.use = _use;

	this.express = "";
	this.validate = function(_value){};

}

/**
* The Rules class - StringRule 
**/
function StringRule(_dvalue , _use){
	this.name = "string";
	this.defaultValue = _dvalue;
	this.use = _use;

	this.express = this.name + ":" + this.use;
	this.validate = function(_value){
		var r = true;
		
		if(this.use == _SCHEMA_ELEMENT_ATTR_USE_REQUIRED && _value == ""){
			r = false;
		}

		//alert("use=" + this.use + "|value=" + _value + "|result=" +r);
		return r;
	}

}

/**
* The Rules class - BooleanRule 
**/
function BooleanRule(_dvalue , _use){
	this.name = "boolean";
	this.defaultValue = _dvalue;
	this.use = _use;

	this.express = "";
	this.validate = function(_value){
		var r = false;
		if(	_value == "1"	|| _value == "0"	||
			_value == 1		|| _value == 0		||
			_value == true	|| _value == false	|| 
			_value == "true"|| -value == "false"){
				r = true;
		}
		return r;
	}
}

/**
* The Rules class - BooleanRule 
**/
function DecimalRule(_dvalue , _use){

	this.name = "decimal";
	this.defaultValue = _dvalue;
	this.use = _use;

	this.express = "";
	this.validate = function(_value){
		return _validate.isDecimal(_value);
	}

}

function IntegerRule(_dvalue , _use){

	this.name = "integer";
	this.defaultValue = _dvalue;
	this.use = _use;
	
	this.express = "";
	this.validate = function(_value){
		return _validate.isDecimal(this.value);
	}

}

function OccursRule(_dValue , _use , _min , _max){

	this.name = "occurs";

	this.defaultValue = _dValue;
	this.use = _use;

	this.min = _min ;
	this.max = _max ;
	
	this.express = "";
	this.validate = function(_oper , _number){

		var r = true;
		if(this.min == _UNDEFINED || this.min == null) this.min = 1;
		if(this.max == _UNDEFINED || this.max == null) this.max = 1;
		
		//alert("nubmer=" + _number + "|min=" + this.min + "|max=" + this.max + "|oper=" + _oper);
		if(_open = "add"){
			if(this.max != _SCHEMA_ELEMENT_MAXOCCURS_VALUE){
				//just to compare the cNuber and max value;
				if((_number + 1) > this.max){
					r = false;
				}
			}
		}else{
			if((_number - 1) < this.min){
				r = false;
			}
		}
			
		return r;
	}

	this.toString = function(){
		return "OccursRule(defaultValue:" + this.defaultValue + ",use=" + this.use + ",min=" + this.min + ",max=" + this.max + ")";
	}
}

function NormalizedStringRule(_dvalue , _use){

	this.name = "normalizedString";
	this.defaultValue = _dvalue;
	this.use = _use;

	this.express = this.name + ":" + this.use;
	this.validate = function(_value){

		//TODO:

	}
}

function EnumNormalizedStringRule(_dvalue , _use , _enumArray){

	this.name = "enumNormalizedString";
	this.defaultValue = _dvalue;
	this.use = _use;
	this.enumArray = _enumArray;

	this.express = this.name + ":" + this.use;
	this.validate = function(_value){

		//TODO:

	}
}

function RuleFactory(){

	this.getAttributeRule = function(_attribute){
			//examine the node's type
			var type = _attribute.getAttribute(_SCHEMA_ELEMENT_ATTR_TYPE);
			var use = _attribute.getAttribute(_SCHEMA_ELEMENT_ATTR_USE);
			var dvalue = _attribute.getAttribute("default");
			//alert("element[" + _elementName + "].attribute[" + _attributeName + "]|type=" + type + "|use=" + use + "|defaultValue=" + dvalue);
			
			if(type != null){
				if(type == _SCHEMA_ELEMENT_ATTR_TYPE_STRING){
					return new StringRule(dvalue , use);
				}
				
				if(type == _SCHEMA_ELEMENT_ATTR_TYPE_NORMALIZED_STRING){
					return new NormalizedStringRule(dvalue , use);	
				}

				if(type == _SCHEMA_ELEMENT_ATTR_TYPE_POSITIVE_INTEGER){
					return new IntegerRule(dvalue , use);
				}
				if(type == "xs:boolean"){
					return new BooleanRule(dvalue , use);
				}
			}else{
				var restriction = _findRestrictionNodeOfAttribute(_attribute);
				var base = restriction.getAttribute("base");

				if(base == "xs:nonNegativeInteger" || base == "xs:positiveInteger"){

					var min = 1;//defalut value in w3c
					var max = 1;//defalut value in w3c
					for(var i=0;i<restriction.childNodes.length;i++){
						var cn = restriction.childNodes[i];
						if(cn.nodeType != 3){
							if(cn.nodeName == "xs:minInclusive"){
								min = cn.getAttribute("value");
							}else{
								max = cn.getAttribute("value");
							}
						}
					}
					var s = use + ":" + min + "-" + max;
					return new OccursRule(dvalue , use , min , max);
				}
				
				if(base == "xs:normalizedString"){
					
					var enumArray = new Array();

					var enums = restriction.childNodes;
					for(var i=0;i<enums.length;i++){
						if(enums[i].nodeType != 3){
							var enumValue = enums[i].getAttribute("value");
							enumArray.push(enumValue);
						}
					}
					return new EnumNormalizedStringRule(dvalue , use , enumArray);
				}
				
				if(base == "xs:decimal"){
					return new DecimalRule(dvalue , use);	
				}
				
				//TODO:add other rules

			}//end if
			
			
			//if system find another rule that can not implements , it will 
			//return a default rule object.
			return new DefaultRule(dvalue , use);
	}

	_findRestrictionNodeOfAttribute  = function(_attribute){
		try{
			var acNodes = _attribute.childNodes;
			for(var i=0;i<acNodes.length;i++){
				if(acNodes.nodeType != 3){
					//find the <xs:simpleType> node
					var cNodes = acNodes[i].childNodes;
					for(var j=0;j<cNodes.length;j++){
						if(cNodes[j].nodeType != 3){
							//find <xs:restriction> node
							return cNodes[j];
						}
					}
				}
			}
		}catch (e){
			alert(e.message);
			throw e;
		}

	}
}
