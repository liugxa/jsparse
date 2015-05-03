//*******************************************************************************
// Copyright
//*******************************************************************************

var RULE_VALIDATE_NOT_EMPTY = "The value must be NOT empty!";
var RULE_VALIDATE_NOT_INTEGER = "The value must be a integer type!";
var RULE_VALIDATE_NOT_DURATION = "The value mus be a duration type! eg:P12Y03M12D";
var RULE_VALIDATE_NOT_URL = "The value must be a URL! type!";
var RULE_VALIDATE_NOT_DATE = "The value must be a date type!";
var RULE_VALIDATE_NOT_DECIMAL = "The value must be a decimal type!";
var RULE_VALIDATE_NOT_POSITIVEINTEGER = "The value must be a positive integer type!";
var RULE_VALIDATE_NOT_UNSINGEDLONG = "The value must be a unsinged long type!";
var RULE_VALIDATE_NOT_BOOLEAN = "The value must be a boolean type!";

/**
* @ interface - IRule
* And it's implements will use the validate.js to finish his job!
**/
function IRule(){
	this.name = "";
	this.defaultValue = "";
	this.use = "";

	this.validate = function(_s){};
	this.toString = function(){}
}

function IStructRule(_min , _max){
	this.name = "";
	this.min = _min;
	this.max = _max;

	this.validate = function(_oper , _value){};
	this.toString = function(){}
}

function IContentRule(){
	this.name = "";
	this.defaultValue = "";
	this.use = "";

	this.validate = function(_value){};
	this.toString = function(){}
}

//DefaultRule will be deleted in the new build.
function DefaultRule(_dvalue , _use){
	this.name = "default";
	this.defaultValue = _dvalue;
	this.use = _use;
	
	this.message = "";
	this.validate = function(_value){
		var r = true;
		if(!isRequired(this.use , _value)){
			r = false;
			this.message = RULE_VALIDATE_NOT_EMPTY;
		}
		return r;
	}

	this.toString = function(){
		return "DefaultRule(name:" + this.name + ",defaultValue:" + this.defaultValue + ",use:" + this.use + ")";
	}

}

//*******************************************************************************
// StructRule
//*******************************************************************************
function OccursRule(_min , _max){

	this.name = "occurs";
	this.min = _min ;
	this.max = _max ;
	
	this.message = "";
	this.validate = function(_oper , _value){
		var r = true;
		if(_oper == "add"){
			if(this.max != _SCHEMA_ELEMENT_MAXOCCURS_VALUE){
				if((_value + 1) > this.max){
					r = false;
					this.message = "The number of this elements can not > " + this.max;
				}
			}
		}
		else if(_oper == "remove"){
			if((_value - 1) < this.min){
				r = false;
				this.message = "The number of this element can not < " + this.min;
			}
		}
		return r;
	}

	this.toString = function(){
		return "OccursRule(min:" + this.min + ",max:" + this.max + ")";
	}
}



//*******************************************************************************
// ContentRule
//*******************************************************************************
function isRequired(_use , _value){
	var r = true;
	if(_use == "required" || _use == ""){
		if(_validate.isEmpty(_value)){
			r = false;
		}
	}
	return r;
}

/**
* The Rules class - StringRule 
**/
function StringRule(_dvalue , _use){
	this.name = "string";
	this.defaultValue = _dvalue;
	this.use = _use;
	
	this.message = "";
	this.validate = function(_value){
		var r = true;
		if(!isRequired(this.use , _value)){
			r = false;
			this.message = RULE_VALIDATE_NOT_EMPTY;
		}
		return r;
	}

	this.toString = function(){
		return "StringRule(name:" + this.name + ",defaultValue:" + this.defaultValue + ",use:" + this.use + ")"; 
	}

}

/**
* The Rules class - BooleanRule 
**/
function BooleanRule(_dvalue , _use){
	this.name = "boolean";
	this.defaultValue = _dvalue;
	this.use = _use;

	this.message = "";
	this.validate = function(_value){
		var r = true;
		if(!isRequired(this.use , _value)){
			r = false;
			this.message = RULE_VALIDATE_NOT_EMPTY;
		}else{
			if(	_value != "1"	&& _value != "0"	&&
				_value != 1		&& _value != 0		&&
				_value != true	&& _value != false	&& 
				_value != "true"&& _value != "false"){
					r =  false;
					this.message = RULE_VALIDATE_NOT_BOOLEAN;
			}
		}

		return r;
	}
	this.toString = function(){
		return "BooleanRule(defaultValue:" + this.defaultValue + ",use:" + this.use + ")";
	}
}


function IntegerRule(_dvalue , _use){

	this.name = "integer";
	this.defaultValue = _dvalue;
	this.use = _use;
	
	this.message = "";
	this.validate = function(_value){
		var r = true;
		if(!isRequired(this.use , _value)){
			r = false;
			this.message = RULE_VALIDATE_NOT_EMPTY;
		}else{
			if(!_validate.isInteger(_value)){
				r = false;
				this.message = RULE_VALIDATE_NOT_INTEGER;
			}
		}
		return r;
	}

	this.toString = function(){
		return "IntegerRule(defaultValue:" + this.defaultValue + ",use:" + this.use + ")"; 
	}
}
function UnsignedLongRule(_dvalue , _use){

	this.name = "unsignedLong";
	this.defaultValue = _dvalue;
	this.use = _use;
	
	this.message = "";
	this.validate = function(_value){
		var r = true;
		if(!isRequired(this.use , _value)){
			r = false;
			this.message = RULE_VALIDATE_NOT_EMPTY;
		}else{
			if(!_validate.isUnsignedLong(_value)){
				r = false;
				this.message = RULE_VALIDATE_NOT_UNSINGEDLONG;
			}
		}
		return r;
	}

	this.toString = function(){
		return "IntegerRule(defaultValue:" + this.defaultValue + ",use:" + this.use + ")"; 
	}
}

function PositiveIntegerRule(_dvalue , _use){

	this.name = "positiveInteger";
	this.defaultValue = _dvalue;
	this.use = _use;
	
	this.message = "";
	this.validate = function(_value){
		var r = true;
		if(!isRequired(this.use , _value)){
			r = false;
			this.message = RULE_VALIDATE_NOT_EMPTY;
		}else{
			if(!_validate.isPositiveInteger(_value)){
				r = false;
				this.message = RULE_VALIDATE_NOT_POSITIVEINTEGER;
			}
		}
		return r;
	}

	this.toString = function(){
		return "IntegerRule(defaultValue:" + this.defaultValue + ",use:" + this.use + ")"; 
	}
}
function RestrictIntegerRule(_dvalue , _use , _min , _max){
	this.name = "restrictInteger";
	this.defaultValue = _dvalue;
	this.use = _use;
	this.min = _min ;
	this.max = _max ;
	
	this.message = "";
	this.validate = function(_value){
		var r = true;
		if(!isRequired(this.use , _value)){
			r = false;
			this.message = RULE_VALIDATE_NOT_EMPTY;
		}else{
			if(!_validate.isIntegerInRange(_value , min , max)){
				r = false;
				this.message = "The value must be from " + this.min + " to " + this.max ;
			}
		}
		return r;
	}

	this.toString = function(){
		return "RestrictIntegerRule(defaultValue:" + this.defaultValue + ",use:" + this.use
				+ ",min:" + this.min + ",max:" + this.max + ")";
	}
}

function EnumStringRule(_dvalue , _use){

	this.name = "enumString";
	this.defaultValue = _dvalue;
	this.use = _use;

	this.enumValues = new Array();
	this.addEnumValue = function(_enumValue){
		this.enumValues.push(_enumValue);

	}
	this.getEnumValue = function(_i){
		return this.enumValues[_i];
	}

	this.message = "";
	this.validate = function(_value){
		var r = true;
		if(!isRequired(this.use , _value)){
			r = false;
			this.message = RULE_VALIDATE_NOT_EMPTY;
		}else{
			var isExist = false;
			for(var i=0;i<this.enumValues.length;i++){
				if(this.enumValues[i] == _value){
					isExist = true;
					break;
				}
			}
			if(!isExist){
				r = false;
				this.message = "The value must be in [" + this.enumValues + "]";
			}
		}
		return r;
	}

	this.toString = function(){
		return "EnumStringRule(defaultValue:" + this.defaultValue + ",use=" + this.use + ",enum=" + this.enumValues.length + ")";
	}
}

/**
* The Rules class - BooleanRule 
**/
function DecimalRule(_dvalue , _use){

	this.name = "decimal";
	this.defaultValue = _dvalue;
	this.use = _use;

	this.message = "";
	this.validate = function(_value){
		var r = true;
		if(!isRequired(this.use , _value)){
			r = false;
			this.message = RULE_VALIDATE_NOT_EMPTY;
		}else{
			if(!_validate.isDecimal(_value)){
				r = false;
				this.message = RULE_VALIDATE_NOT_DECIMAL;
			}
		}
		return r;
	}
	this.toString = function(){
		return "DecimalRule(defaultValue:" + this.defaultValue + ",use:" + this.use + ")";
	}
}
function DurationRule(_dvalue , _use){

	this.name = "duration";
	this.defaultValue = _dvalue;
	this.use = _use;

	this.message = "";
	this.validate = function(_value){
		var r = true;
		if(!isRequired(this.use , _value)){
			r = false;
			this.message = RULE_VALIDATE_NOT_EMPTY;
		}else{
			if(!_validate.isDuration(_value)){
				r = false;
				this.message = RULE_VALIDATE_NOT_DURATION;
			}
		}
		return r;
	}
	this.toString = function(){
		return "DurationRule(name:" + this.name + ",defaultValue:" + this.defaultValue + ",use:" + this.use + ")";
	}
}

function AnySimpleTypeRule(_dvalue , _use){

	this.name = "anySimpleType";
	this.defaultValue = _dvalue;
	this.use = _use;
	
	this.message = "";
	this.validate = function(_value){
		var r = true;
		if(!isRequired(this.use , _value)){
			r = false;
			this.message = RULE_VALIDATE_NOT_EMPTY;
		}
		return r;
	}
	this.toString = function(){
		return "AnySimpleTypeRule(name:" + this.name + ",defaultValue:" + this.defaultValue + ",use:" + this.use + ")";
	}
}

function DateTimeRule(_dvalue , _use){

	this.name = "dateTime";
	this.defaultValue = _dvalue;
	this.use = _use;

	this.message = "";
	this.validate = function(_value){
		var r = true;
		if(!isRequired(this.use , _value)){
			r = false;
			this.message = RULE_VALIDATE_NOT_EMPTY;
		}else{
			if(!_validate.isDateTime(_value)){
				r = false;
				this.message = RULE_VALIDATE_NOT_DATE;
			}
		}
		return r;
	}
	this.toString = function(){
		return "DateTimeRule(name:" + this.name + ",defaultValue:" + this.defaultValue + ",use:" + this.use + ")";
	}
}
function AnyURIRule(_dvalue , _use){
	this.name = "anyURI";
	this.defaultValue = _dvalue;
	this.use = _use;
	
	this.message = "";
	this.validate = function(_value){
		var r = true;
		if(!isRequired(this.use , _value)){
			r = false;
			this.message = RULE_VALIDATE_NOT_EMPTY;
		}else{
			if(!_validate.isURL(_value)){
				r = false;
				this.message = RULE_VALIDATE_NOT_URL;
			}
			
		}
		return r;
	}

	this.toString = function(){
		return "anyURI(name:" + this.name + ",defaultValue:" + this.defaultValue + ",use:" + this.use + ")";
	}

}
function NCNameRule(_dvalue , _use){
	this.name = "NCNameRule";
	this.defaultValue = _dvalue;
	this.use = _use;
	
	this.message = "";
	this.validate = function(_value){
		var r = true;
		if(!isRequired(this.use , _value)){
			r = false;
			this.message = RULE_VALIDATE_NOT_EMPTY;
		}
		return r;
	}

	this.toString = function(){
		return "NCNameRule(name:" + this.name + ",defaultValue:" + this.defaultValue + ",use:" + this.use + ")";
	}

}
function RuleFactory(_standNs){

	//Public property
	//*********************************************************************
	this.standNS  = _standNs;
	var standNS = this.standNS + ":";


	//Public functions
	//*********************************************************************
	this.getElementStructRule = function(_element){
		
		var min = _element.getAttribute(_SCHEMA_ELEMENT_MINOCCURS);
		var max = _element.getAttribute(_SCHEMA_ELEMENT_MAXOCCURS);

		if(min == null || min == _UNDEFINED) min = 1;
		if(max == null || max == _UNDEFINED) max = 1;
		
		return new OccursRule(min ,max);

	}


	this.getRuleByType = function(_type ,  _use , _defaultValue){
		if(_type == null || _type == "") throwException("RuleFactoryException:The parameter[type] is null!");
		
		var rule = new DefaultRule(_defaultValue , _use);
		switch(_type){
			case standNS + "anySimpleType":
				rule = new AnySimpleTypeRule(_defaultValue , _use);
				break;
			case standNS + "duration":
				rule = new DurationRule(_defaultValue , _use);
				break;				
			case standNS + "string": 
			case standNS + "normalizedString":
				rule = new StringRule(_defaultValue , _use);
				break;
			case standNS + "int":
			case standNS + "integer":
				rule =  new IntegerRule(_defaultValue , _use);
				break;
			case standNS + "positiveInteger": 
				rule =  new PositiveIntegerRule(_defaultValue , _use);
				break;
			case standNS + "boolean" : 
				rule = new BooleanRule(_defaultValue , _use);
				break;
			case standNS + "base64Binary":
				break;
			case standNS + "dateTime":
				rule = new DateTimeRule(_defaultValue , _use);
				break;
			case standNS + "anyURI":
				rule = new AnyURIRule(_defaultValue , _use);
				break;
			case standNS + "unsignedLong":
				rule = new UnsignedLongRule(_defaultValue , _use);
				break;
			case standNS + "NCName":
				rule = new NCNameRule(_defaultValue , _use);
				break;
		}
		return rule;
	}

	this.getRuleBySimpleType = function(_simpleType , _use , _defaultValue){
		if(_simpleType == null) throwException("RuleFactoryException:The parameter[simpleType] is null!");
		
		var rule = new DefaultRule(_defaultValue , _use);
		var restric = _getFirstNodeOfElement(_simpleType , "restriction");
		if(restric != null){
			var base = restric.getAttribute("base");
			switch(base){
				case standNS + "nonNegativeInteger" :
				case standNS + "positiveInteger":
					var min = 1;//defalut value in w3c
					var max = 1;//defalut value in w3c
					
					var minNodes = null;
					var maxNodes = null;

					if(Browser.isIe()){
						minNodes = restric.getElementsByTagName(standNS + "minInclusive");
						maxNodes = restric.getElementsByTagName(standNS + "maxInclusive");
					}else{
						minNodes = restric.getElementsByTagName("minInclusive");
						maxNodes = restric.getElementsByTagName("maxInclusive");
					}
					//alert(minNodes[0].getAttribute("value") + "|" + maxNodes[0].getAttribute("value"));

					if(minNodes.length >0) min = minNodes[0].getAttribute("value");
					if(maxNodes.length >0) max = maxNodes[0].getAttribute("value");
					
					rule = new RestrictIntegerRule(_defaultValue , _use , min , max);
					break;
				case standNS + "normalizedString" :
				case standNS + "string":
					rule = new EnumStringRule(_defaultValue , _use);
					
					var enums = null;
					if(Browser.isIe()){
						enums = restric.getElementsByTagName(standNS + "enumeration");
					}else{
						enums = restric.getElementsByTagName("enumeration");
					}
					for(var i=0;i<enums.length;i++){
						var enumValue = enums[i].getAttribute("value");
						rule.addEnumValue(enumValue);
					}
					break;
				case standNS + "decimal": 
					var minExclusive = null;
					var fractionDigits = null;
					var totalDigits = null;

					if(Browser.isIe()){
						minExclusive = restric.getElementsByTagName(standNS + "minExclusive");
						fractionDigits = restric.getElementsByTagName(standNS + "minExclusive");
						totalDigits = restric.getElementsByTagName(standNS + "minExclusive");
					}else{
						minExclusive = restric.getElementsByTagName("minExclusive");
						fractionDigits = restric.getElementsByTagName("minExclusive");
						totalDigits = restric.getElementsByTagName("minExclusive");
					}		
					rule = new DecimalRule(_defaultValue , _use);	
					
					break;

				//Todo: add others
				//case xxx:
			}
		}else{
			//TODO: other types
			//<xsd:list> or <xsd:union>


		}

		return rule;
	}

	_getFirstNodeOfElement = function(_element , _nodeName){
		var r = null;
		var nodes = _element.childNodes;
		for(var i=0;i<nodes.length;i++){
			if(nodes[i].nodeType != 8 && nodes[i].nodeType != 3 
				&& nodes[i].nodeName == (standNS + _nodeName)){
				return nodes[i];
			}
		}
		return r;
	}
}