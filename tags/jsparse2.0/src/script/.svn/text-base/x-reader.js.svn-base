//*******************************************************************************
//DefaultDomTreeReader
//*******************************************************************************


function DefaultDomTreeContext(_isLocal){
	//Public propertys
	//***************************************************************************
	this.parse = null;
	this.dom = null;
	this.isLocal = _isLocal;

	//Public methods
	//***************************************************************************
	this.initilize = function(_xmlFile , _schemaFile , _nameSpace , _standNS){
		
		//Of cource, Now, you can use the parse & dom to lay out your page!!
		//But the base way is to use the decorated dom object! It not only contains
		//the avaliable attributes, but also contains the rules of element & attributes too.
		this.dom = this.getDomObject(_xmlFile);
		var sXmlDoc = this.getDomObject(_schemaFile);

		var parse = new MultiNSSchemaParse(sXmlDoc ,_nameSpace , _standNS);
		parse.ruleFactory = new RuleFactory(_standNS);
		this.parse = parse;
	}
	
	this.defInitilize = function(_xmlFile , _schemaFile , _nameSpace , _standNS){

		//Of cource, Now, you can use the parse & dom to lay out your page!!
		//But the base way is to use the decorated dom object! It not only contains
		//the avaliable attributes, but also contains the rules of element & attributes too.
		this.dom = this.getDomObject(_xmlFile);
		var sXmlDoc = this.getDomObject(_schemaFile);

		var parse = new SingleNSSchemaParse(sXmlDoc ,_nameSpace , _standNS);
		parse.ruleFactory = new RuleFactory(_standNS);
		this.parse = parse;
	}

	this.addRefParse = function(_schemaFile , _nameSpace , _standNS){
		var sXmlDoc = this.getDomObject(_schemaFile);

		var ref = new MultiNSSchemaParse(sXmlDoc , _nameSpace , _standNS);
		ref.ruleFactory = this.parse.ruleFactory;
		this.parse.refParse = ref;
	}

	this.getDomObject = function(_xmlFile){
		if(this.isLocal){
			return _getLocalDomObject(_xmlFile);
		}else{
			return _getRemoteDomObject(_xmlFile);
		}
	}

	//Private methods
	//***************************************************************************
	_getRemoteDomObject = function(_xmlFile){
		var xmlHttp = XmlHttp.create();
		xmlHttp.open("GET", _xmlFile, false);
    	xmlHttp.send(null);	
		return xmlHttp.responseXML;
	}
	
	_getLocalDomObject = function(_xmlFile){
		var xmlDoc = XmlDocument.create();
		xmlDoc.async = false;
		xmlDoc.load(_xmlFile);
		return xmlDoc;
	}


}
