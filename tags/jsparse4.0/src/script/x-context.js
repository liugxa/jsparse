//*******************************************************************************
//DefaultDomTreeReader
//*******************************************************************************
function DomUtil(){
	var _this = this;
	this.getDomObject = function(_isLocal , _xmlFile){
		if(_isLocal){
			return _getLocalDomObject(_xmlFile);
		}else{
			return _getRemoteDomObject(_xmlFile);
		}
	}

	this.postXmlObject = function(_url , _xml){
		return _postXml(_url , _xml);
	}

	//Private methods
	//***************************************************************************
	_getRemoteDomObject = function(_xmlFile){
		var xmlHttp = XmlHttp.create();
		xmlHttp.open("GET", _xmlFile, false);
    	xmlHttp.send(null);

		//alert(xmlHttp.getAllResponseHeaders());
		//alert("responsXML:" + xmlHttp.responseXML + "| xml:"  + xmlHttp.responseXML.xml + "| responseText:" +  xmlHttp.responseText);
		//if(xmlHttp.responseXml == null) throw xmlHttp.responseText;
		var responseHeader = xmlHttp.getResponseHeader("Content-Type");
		if(responseHeader != null){
			//if the Content-Type is text/xml, return the xml object
			if(responseHeader.indexOf("text/xml") == -1){
				throw "Exception:" + xmlHttp.responseText;
			}
		}
		return xmlHttp.responseXML;
	}
	
	_getLocalDomObject = function(_xmlFile){
		var xmlDoc = XmlDocument.create();
		xmlDoc.async = false;
		xmlDoc.load(_xmlFile);
		return xmlDoc;
	}

	_postXml = function(_url , _xml){
       	var xmlHttp = XmlHttp.create();
        xmlHttp.open("POST" , _url , false);
        xmlHttp.setRequestHeader("context-type","text/xml;charset=utf-8");
        xmlHttp.send(_xml);

		var responseHeader = xmlHttp.getResponseHeader("Content-Type");
		if(responseHeader != null){
			//if the Content-Type is text/xml, return the xml object
			if(responseHeader.indexOf("text/xml") == -1){
				if(xmlHttp.responseText != null && xmlHttp.responseText != ""){
					 throw "Exception:" + xmlHttp.responseText;
				}
			}
		}
        return xmlHttp;
	}
}


//@ the LinkListDomTreeContext class has be replaced by DefaultDomTreeContext!
function LinkListDomTreeContext(_isLocal){
	return new DefaultDomTreeContext(_isLocal);
}


function DefaultDomTreeContext(_isLocal){
	//Public propertys
	//***************************************************************************
	this.parse = null;
	this.dom = null;
	this.isLocal = _isLocal;

	this.template = null;
	var domUtil = new DomUtil();

	//Public methods
	//***************************************************************************
	this.initilize = function(_xmlFile , _schemaFile , _nameSpace , _standNS){
		
		//Of cource, Now, you can use the parse & dom to lay out your page!!
		//But the base way is to use the decorated dom object! It not only contains
		//the avaliable attributes, but also contains the rules of element & attributes too.
		this.dom = domUtil.getDomObject(this.isLocal , _xmlFile);
		var sXmlDoc = domUtil.getDomObject(this.isLocal , _schemaFile);

		var parse = new MultiNSSchemaParse(sXmlDoc ,_nameSpace , _standNS);
		parse.ruleFactory = new RuleFactory(_standNS);
		this.parse = parse;
	}
	
	this.addRefParse = function(_schemaFile , _nameSpace , _standNS){
		var sXmlDoc = domUtil.getDomObject(this.isLocal , _schemaFile);

		var ref = new MultiNSSchemaParse(sXmlDoc , _nameSpace , _standNS);
		ref.ruleFactory = this.parse.ruleFactory;
		this.parse.refParse = ref;
	}

	this.setTemplate = function(_templateFile){
		this.template = domUtil.getDomObject(this.isLocal , _templateFile);
	}
}