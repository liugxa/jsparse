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

	this.validate = function(_value){};
	this.toString = function(){}
}


function DefaultRule(_dvalue , _use){
	this.name = "default";
	this.defaultValue = _dvalue;
	this.use = _use;

	this.validate = function(_value){};
	this.toString = function(){
		return "DefaultRule(name:" + this.name + ",defaultValue:" + this.defaultValue + ",use:" + this.use + ")";
	}

}

/**
* The Rules class - StringRule 
**/
function StringRule(_dvalue , _use){
	this.name = "string";
	this.defaultValue = _dvalue;
	this.use = _use;

	this.validate = function(_value){
		var r = true;
		
		if(this.use == _SCHEMA_ELEMENT_ATTR_USE_REQUIRED && _value == ""){
			r = false;
		}

		//alert("use=" + this.use + "|value=" + _value + "|result=" +r);
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
	this.toString = function(){
		return "BooleanRule(defaultValue:" + this.defaultValue + ",use=" + this.use + ")";
	}
}

/**
* The Rules class - BooleanRule 
**/
function DecimalRule(_dvalue , _use){

	this.name = "decimal";
	this.defaultValue = _dvalue;
	this.use = _use;

	this.validate = function(_value){
		return _validate.isDecimal(_value);
	}
	this.toString = function(){
		return "DecimalRule(defaultValue:" + this.defaultValue + ",use=" + this.use + ")";
	}
}

function IntegerRule(_dvalue , _use){

	this.name = "integer";
	this.defaultValue = _dvalue;
	this.use = _use;
	
	this.validate = function(_value){
		return _validate.isDecimal(this.value);
	}

	this.toString = function(){
		return "IntegerRule(defaultValue:" + this.defaultValue + ",use:" + this.use + ")"; 
	}
}

function OccursRule(_dValue , _use , _min , _max){

	this.name = "occurs";

	this.defaultValue = _dValue;
	this.use = _use;

	this.min = _min ;
	this.max = _max ;
	
	this.validate = function(_oper , _number){

		var r = true;
		if(this.min == _UNDEFINED || this.min == null) this.min = 1;
		if(this.max == _UNDEFINED || this.max == null) this.max = 1;
		
		//alert("nubmer=" + _number + "|min=" + this.min + "|max=" + this.max + "|oper=" + _oper);
		if(_oper == "add"){
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

	this.validate = function(_value){
		//TODO:
	}
	this.toString = function(){
		return "NormalizedStringRule(defaultValue:" + this.defaultValue + ",use=" + this.use + ")";
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

	this.validate = function(_value){
		//TODO:
	}

	this.toString = function(){
		return "EnumStringRule(defaultValue:" + this.defaultValue + ",use=" + this.use + ",enum=" + this.enumValues.length + ")";
	}
}

function DurationRule(_dvalue , _use){

	this.name = "duration";
	this.defaultValue = _dvalue;
	this.use = _use;

	this.toString = function(){
		return "DurationRule(name:" + this.name + ",defaultValue:" + this.defaultValue + ",use:" + this.use + ")";
	}
}

function AnySimpleTypeRule(_dvalue , _use){

	this.name = "anySimpleType";
	this.defaultValue = _dvalue;
	this.use = _use;

	this.toString = function(){
		return "AnySimpleTypeRule(name:" + this.name + ",defaultValue:" + this.defaultValue + ",use:" + this.use + ")";
	}
}

function RuleFactory(_standNs){

	//Public property
	//*********************************************************************
	this.standNS  = _standNs;
	
	//Private property
	//*********************************************************************
	var standNS = this.standNS + ":";


	//Public functions
	//*********************************************************************
	this.getRuleByType = function(_type ,  _use , _defaultValue){
		if(_type == null || _type == "") throwException("RuleFactoryException:The parameter[type] is null!");
		
		var rule = null;
		switch(_type){
			case standNS + "anySimpleType":
				rule = new AnySimpleTypeRule(_defaultValue , _use);
				break;
			case standNS + "duration":
				rule = new DurationRule(_defaultValue , _use);
				break;				
			case standNS + "string": 
				rule = new StringRule(_defaultValue , _use);
				break;
			case standNS + "normalizedString":
				rule =  new NormalizedStringRule(_defaultValue , _use);	
				break;
			case standNS + "integer":
			case standNS + "positiveInteger": 
				rule =  new IntegerRule(_defaultValue , _use);
				break;
			case standNS + "boolean" : 
				rule = new BooleanRule(_defaultValue , _use);
				break;
			case "xsd:base64Binary":
			case "xsd:dateTime":
			case "xsd:anyURI":
			default:
				rule = new DefaultRule(_defaultValue , _use);
		}
		return rule;
	}

	this.getRuleBySimpleType = function(_simpleType , _use , _defaultValue){
		if(_simpleType == null) throwException("RuleFactoryException:The parameter[simpleType] is null!");
		
		var rule = null;
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
					
					rule = new OccursRule(_defaultValue , _use , min , max);
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
					rule = new DecimalRule(_defaultValue , _use);	
					break;

				//Todo: add others
				//case xxx:

				default:
					rule = new DefaultRule(_defaultValue , _use);
			}
		}else{
			//TODO: other types
			//<xsd:list> or <xsd:union>


		}

		return rule;
	}
	
	/* deleted by L.G 2006.08.29
	this.getElementContentRuleByType = function(_type ){
		var rule = null;
		switch(_type){
			case "xsd:string":
				rule = new StringRule();
				break;
			case "xsd:integer":
			case "xsd:anySimpleType":
				rule = new AnySimpleTypeRule();
				break;
			case "xsd:base64Binary":
			case "xsd:duration":
				rule = new DurationRule();
				break;
			case "xsd:dateTime":
			case "xsd:anyURI":
			default:
				rule = new DefalutRule();
				break;
		}
		return rule;
	}
	
	this.getElementContentRuleBySimpleType = function(_simpleType){
		//alert("getElementContentRuleBySimpleType(" + _simpleType + ")");
		var rule = new EnumStringRule();

		if(_simpleType != null){
			var restris = _simpleType.getElementsByTagName(standNS + "restriction");
			//TODO: if simpleTypes has many restriction elements?forgot it--complex?!
			if(restris.length >0){
				var res = restris[0];
				var res_bas = res.getAttribute("bas");
				
				var enums = res.getElementsByTagName(standNS + "enumeration");
				for(var i=0;i<enums.length;i++){
					var value = enums[i].getAttribute("value");
					rule.addEnumValue(value);
				}
			}
		}
		return rule;
	}

	this.getAttributeRuleByType = function(_type , _use , _defaultValue){

		var rule = null;
		switch(_type){
			case standNS + _SCHEMA_ATTR_STRING : 
				rule = new StringRule(_defaultValue , _use);
				break;
			case standNS + _SCHEMA_ATTR_NORMALIZED_STRING :
				rule =  new NormalizedStringRule(_defaultValue , _use);	
				break;
			case standNS + _SCHEMA_ATTR_POSITIVE_INTEGER : 
				rule =  new IntegerRule(_defaultValue , _use);
				break;
			case standNS + "boolean" : 
				rule = new BooleanRule(_defaultValue , _use);
				break;
			default:
				rule = new DefaultRule(_defaultValue , _use);
		}
		//if system find another rule that can not implements , it will 
		//return a default rule object.
		return rule;
	}


	this.getAttributeRuleByRestric = function(_restriction , _use , _defaultValue){
		var base = _restriction.getAttribute("base");

		switch(base){
			case standNS + "nonNegativeInteger" :
			case standNS + "positiveInteger":
				var min = 1;//defalut value in w3c
				var max = 1;//defalut value in w3c
				var minNodes = _restriction.getElementsByTagName(standNS + "minInclusive");
				if(minNodes.length >0) min = minNodes[0].getAttribute("value");

				var maxNodes = _restriction.getElementsByTagName(standNS + "maxInclusive");
				if(maxNodes.length >0) max = maxNodes[0].getAttribute("value");
				
				rule = new OccursRule(_defaultValue , _use , min , max);
				break;
			case standNS + "normalizedString" :
			case standNS + "string":
				rule = new EnumStringRule(_defaultValue , _use);
				var enums = _restriction.getElementsByTagName(standNS + "enumeration");
				for(var i=0;i<enums.length;i++){
					var enumValue = enums[i].getAttribute("value");
					rule.addEnumValue(enumValue);
				}
				break;
			case standNS + "decimal": 
				rule = new DecimalRule(_defaultValue , _use);	
				break;

			//Todo: add others
			//case xxx:

			default:
				rule = new DefaultRule(_defaultValue , _use);
		}

		//if system find another rule that can not implements , it will 
		//return a default rule object.
		return rule;
	}
	*/

	_getFirstNodeOfElement = function(_element , _nodeName){
		var r = null;
		var nodes = _element.childNodes;
		for(var i=0;i<nodes.length;i++){
			if(nodes[i].nodeType != 3 && nodes[i].nodeName == (standNS + _nodeName)){
				return nodes[i];
			}
		}
		return r;
	}
}