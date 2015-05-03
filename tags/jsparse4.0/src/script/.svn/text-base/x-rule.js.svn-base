//*******************************************************************************
// Copyright
//*******************************************************************************
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
					this.message = "The number of this elements can not great than " + this.max;
				}
			}
		}
		else if(_oper == "remove"){
			if((_value - 1) < this.min){
				r = false;
				this.message = "The number of this element can not less than " + this.min;
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
/**
* The Rules class - StringRule 
**/
function PrintableStringRule(_dvalue , _use){
	this.name = "printableString";
	this.defaultValue = _dvalue;
	this.use = _use;
	
	this.message = "";
	this.validate = function(_value){
		var r = true;
		if(!_validate.isPrintableString(_value , 0 , 128)){
			r = false;
			this.message = RULE_VALIDATE_NOT_PATTERN_2;
		}
		return r;
	}

	this.toString = function(){
		return "PrintableStringRule(name:" + this.name + ",defaultValue:" + this.defaultValue + ",use:" + this.use + ")"; 
	}

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
		return true;
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
		if(	_value != "1"	&& _value != "0" &&
			_value.toLowerCase() != "true"	&& 
			_value.toLowerCase() != "false"){
				r =  false;
				this.message = RULE_VALIDATE_NOT_BOOLEAN;
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
		if(!_validate.isInteger(_value)){
			r = false;
			this.message = RULE_VALIDATE_NOT_INTEGER;
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
		if(!_validate.isUnsignedLong(_value)){
			r = false;
			this.message = RULE_VALIDATE_NOT_UNSINGEDLONG;
		}
		return r;
	}

	this.toString = function(){
		return "UnsignedLongRule(defaultValue:" + this.defaultValue + ",use:" + this.use + ")"; 
	}
}

function PositiveIntegerRule(_dvalue , _use){

	this.name = "positiveInteger";
	this.defaultValue = _dvalue;
	this.use = _use;
	
	this.message = "";
	this.validate = function(_value){
		var r = true;
		if(!_validate.isPositiveInteger(_value)){
			r = false;
			this.message = RULE_VALIDATE_NOT_POSITIVEINTEGER;
		}
		return r;
	}

	this.toString = function(){
		return "PositiveIntegerRule(defaultValue:" + this.defaultValue + ",use:" + this.use + ")"; 
	}
}
function NonNegativeIntegerRule(_dvalue , _use){

	this.name = "nonNegativeInteger";
	this.defaultValue = _dvalue;
	this.use = _use;
	
	this.message = "";
	this.validate = function(_value){
		var r = true;
		if(!_validate.isNonNegativeInteger(_value)){
			r = false;
			this.message = RULE_VALIDATE_NON_NEGATIVEINTEGER;
		}
		return r;
	}

	this.toString = function(){
		return "NonNegativeIntegerRule(defaultValue:" + this.defaultValue + ",use:" + this.use + ")"; 
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
		//first: it must be a interger object
		if(!_validate.isInteger(_value)){
			r = false;
			this.message = RULE_VALIDATE_NOT_INTEGER;
		}else{
			//second: validate the number range 
			if(this.min != "~"){
				if(this.max != "~"){
					if(!_validate.isIntegerInRange(_value , this.min , this.max)){
						r = false;
						this.message = "The value must be from " + this.min + " to " + this.max ;
					}
				}else{
					if(_value < this.min){
						r = false;
						this.message = "The lease value must be " + this.min;					
					}
				}
			}else{
				if(this.min != "~"){
					if(_value > this.max){
						r = false;
						this.message = "The biggest value must be " + this.max ;					
					}
				}
			}
		}
		return r;
	}

	this.toString = function(){
		return "RestrictIntegerRule(defaultValue:" + this.defaultValue + ",use:" + this.use
				+ ",min:" + this.min + ",max:" + this.max + ")";
	}
}
function RestrictPositiveIntegerRule(_dvalue , _use , _min , _max){

	this.name = "restrictPositiveInteger";
	this.defaultValue = _dvalue;
	this.use = _use;
	this.min = _min ;
	this.max = _max ;
	
	this.message = "";
	this.validate = function(_value){
		var r = true;
		//first: it must be a positive interger object
		if(!_validate.isPositiveInteger(_value)){
			r = false;
			this.message = RULE_VALIDATE_NOT_POSITIVEINTEGER;
		}else{
			//second: validate the number range 
			if(this.min != "~"){
				if(this.max != "~"){
					if(!_validate.isIntegerInRange(_value , this.min , this.max)){
						r = false;
						this.message = "The value must be from " + this.min + " to " + this.max ;
					}
				}else{
					if(_value < this.min){
						r = false;
						this.message = "The lease value must be " + this.min;					
					}
				}
			}else{
				if(this.min != "~"){
					if(_value > this.max){
						r = false;
						this.message = "The biggest value must be " + this.max ;					
					}
				}
			}
		}
		return r;
	}
	this.toString = function(){
		return "RestrictPositiveIntegerRule(defaultValue:" + this.defaultValue + ",use:" + this.use + ")"; 
	}
}
function RestrictNonNegativeIntegerRule(_dvalue , _use , _min , _max){

	this.name = "restrictNonNegativeInteger";
	this.defaultValue = _dvalue;
	this.use = _use;
	this.min = _min ;
	this.max = _max ;
	
	this.message = "";
	this.validate = function(_value){
		var r = true;
		//first: it must be a nonNegative interger object
		if(!_validate.isNonNegativeInteger(_value)){
			r = false;
			this.message = RULE_VALIDATE_NON_NEGATIVEINTEGER;
		}else{
			//second: validate the number range 
			if(this.min != "~"){
				if(this.max != "~"){
					if(!_validate.isIntegerInRange(_value , this.min , this.max)){
						r = false;
						this.message = "The value must be from " + this.min + " to " + this.max ;
					}
				}else{
					if(_value < this.min){
						r = false;
						this.message = "The lease value must be " + this.min;					
					}
				}
			}else{
				if(this.min != "~"){
					if(_value > this.max){
						r = false;
						this.message = "The biggest value must be " + this.max ;					
					}
				}
			}
		}
		return r;
	}

	this.toString = function(){
		return "RestrictNonNegativeIntegerRule(defaultValue:" + this.defaultValue + ",use:" + this.use + ")"; 
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
		if(!_validate.isDecimal(_value)){
			r = false;
			this.message = RULE_VALIDATE_NOT_DECIMAL;
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
		if(!_validate.isDuration(_value)){
			r = false;
			this.message = RULE_VALIDATE_NOT_DURATION;
		}
		return r;
	}
	this.toString = function(){
		return "DurationRule(name:" + this.name + ",defaultValue:" + this.defaultValue + ",use:" + this.use + ")";
	}
}

function RestrictDuration(_dvalue , _use){

	this.name = "duration";
	this.defaultValue = _dvalue;
	this.use = _use;

	this.message = "";
	this.validate = function(_value){
		var r = true;
		if(!_validate.isDuration(_value)){
			r = false;
			this.message = RULE_VALIDATE_NOT_RESTRICT_DURATION;
		}
		return r;
	}
	this.toString = function(){
		return "RestrictDuration(name:" + this.name + ",defaultValue:" + this.defaultValue + ",use:" + this.use + ")";
	}
}

function AnySimpleTypeRule(_dvalue , _use){

	this.name = "anySimpleType";
	this.defaultValue = _dvalue;
	this.use = _use;
	
	this.message = "";
	this.validate = function(_value){
		var r = true;
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
		if(!_validate.isDateTime(_value)){
			r = false;
			this.message = RULE_VALIDATE_NOT_DATE;
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
		if(!_validate.isURL(_value)){
			r = false;
			this.message = RULE_VALIDATE_NOT_URL;
		}
		return r;
	}

	this.toString = function(){
		return "anyURI(name:" + this.name + ",defaultValue:" + this.defaultValue + ",use:" + this.use + ")";
	}

}
function NCNameRule(_dvalue , _use){
	this.name = "NCName";
	this.defaultValue = _dvalue;
	this.use = _use;
	
	this.message = "";
	this.validate = function(_value){
		var r = true;
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
		
		var defValue = (_defaultValue == _UNDEFINED || _defaultValue == null)?"":_defaultValue;
		var use = (_use == _UNDEFINED || _use == null)?"optional":_use;

		var rule = new DefaultRule(defValue , use);
		switch(_type){
			case standNS + "anySimpleType":
				rule = new AnySimpleTypeRule(defValue , use);
				break;
			case standNS + "duration":
				//rule = new DurationRule(defValue , use);
				rule = new RestrictDuration(defValue , use);
				break;				
			case standNS + "string": 
			case standNS + "normalizedString":
				//rule = new StringRule(defValue , use);
				rule = new PrintableStringRule(defValue , use);
				break;
			case standNS + "int":
			case standNS + "integer":
				rule =  new IntegerRule(defValue , use);
				break;
			case standNS + "positiveInteger": 
				rule =  new PositiveIntegerRule(defValue , use);
				break;
			case standNS + "boolean" : 
				rule = new BooleanRule(defValue , use);
				break;
			case standNS + "base64Binary":
				break;
			case standNS + "dateTime":
				rule = new DateTimeRule(defValue , use);
				break;
			case standNS + "anyURI":
				rule = new AnyURIRule(defValue , use);
				break;
			case standNS + "unsignedLong":
				rule = new UnsignedLongRule(defValue , use);
				break;
			case standNS + "NCName":
				rule = new NCNameRule(defValue , use);
				break;
		}
		return rule;
	}

	this.getRuleBySimpleType = function(_simpleType , _use , _defaultValue){
		if(_simpleType == null) throwException("RuleFactoryException:The parameter[simpleType] is null!");
		
		var defValue = (_defaultValue == _UNDEFINED || _defaultValue == null)?"":_defaultValue;
		var use = (_use == _UNDEFINED || _use == null)?"optional":_use;

		var rule = new DefaultRule(defValue , use);
		var restric = _getFirstNodeOfElement(_simpleType , "restriction");
		if(restric != null){
			var base = restric.getAttribute("base");
			switch(base){
				case standNS + "integer":
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
					if(minNodes.length >0){
						min = minNodes[0].getAttribute("value");
					}else{
						min = "~";
					}
					if(maxNodes.length >0){
						max = maxNodes[0].getAttribute("value");
					}else{
						max = "~";
					}
					//alert("min=" + min + "| max=" + max);
					
					rule = new RestrictIntegerRule(defValue , use , min , max);
					break;
				case standNS + "nonNegativeInteger" :
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
					if(minNodes.length >0){
						min = minNodes[0].getAttribute("value");
					}else{
						min = "~";
					}
					if(maxNodes.length >0){
						max = maxNodes[0].getAttribute("value");
					}else{
						max = "~";
					}
					//alert("min=" + min + "| max=" + max);
					
					rule = new RestrictNonNegativeIntegerRule(defValue , use , min , max);
					break;
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
					if(minNodes.length >0){
						min = minNodes[0].getAttribute("value");
					}else{
						min = "~";
					}
					if(maxNodes.length >0){
						max = maxNodes[0].getAttribute("value");
					}else{
						max = "~";
					}
					//alert("min=" + min + "| max=" + max);
					
					rule = new RestrictPositiveIntegerRule(defValue , use , min , max);
					break;
				case standNS + "normalizedString" :
				case standNS + "string":
				case standNS + "Name":
				case standNS + "anyURI":
					//find the <xsd:enumeration> element
					var enums = null;
					if(Browser.isIe()){
						enums = restric.getElementsByTagName(standNS + "enumeration");
					}else{
						enums = restric.getElementsByTagName("enumeration");
					}
					//if find the enumeration element return EnumStringRule
					//todo:OtherWise: too complex
					if(enums.length >0){
						rule = new EnumStringRule(defValue , use);
						for(var i=0;i<enums.length;i++){
							var enumValue = enums[i].getAttribute("value");
							rule.addEnumValue(enumValue);
						}
						break;
					}else{
						break;
					}
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
					rule = new DecimalRule(defValue , use);	
					
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