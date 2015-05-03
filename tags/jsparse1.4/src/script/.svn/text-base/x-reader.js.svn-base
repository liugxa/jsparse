//*******************************************************************************
//DefaultDomTreeReader
//*******************************************************************************
function DefaultDomTreeReader(){
	//Public propertys
	//***************************************************************************
	this.parse = null;
	this.dom = null;

	//Construction
	//***************************************************************************
	this.getParse = function(){
		return this.parse;
	}

	this.getDom = function(){
		return this.dom;
	}
	
	this.initilize = function(_xmlFileName , _schemaFileName){
				
		var xmlDoc = XmlDocument.create();
		xmlDoc.async = false;
		xmlDoc.load(_xmlFileName);

		//Of cource, Now, you can use the parse & dom to lay out your page!!
		//But the base way is to use the decorated dom object! It not only contains
		//the avaliable attributes, but also contains the rules of element & attributes too.
		this.dom = xmlDoc;
		
		var sXmlDoc = XmlDocument.create();
		sXmlDoc.async = false;
		sXmlDoc.load(_schemaFileName);

		this.parse = new SingleNSSchemaParse(sXmlDoc , "app" , "xs");
		//alert("DefaultDomTreeReader.parse = " + this.parse);
	}


	this.init = function(){

		var xmlDoc = XmlDocument.create();
		xmlDoc.async = false;
		xmlDoc.load("../xml/gui_service.xml");

		//Of cource, Now, you can use the parse & dom to lay out your page!!
		//But the base way is to use the decorated dom object! It not only contains
		//the avaliable attributes, but also contains the rules of element & attributes too.
		this.dom = xmlDoc;

		var ego_sXmlDoc = XmlDocument.create();
		ego_sXmlDoc.async = false;
		ego_sXmlDoc.load("../xml/ego.xsd");
		var egoParse = new MultiNSSchemaParse(ego_sXmlDoc , "ego" , "xsd" , null);

		var sc_sXmlDoc = XmlDocument.create();
		sc_sXmlDoc.async = false;
		sc_sXmlDoc.load("../xml/sc.xsd");
		var scParse = new MultiNSSchemaParse(sc_sXmlDoc , "sc" , "xsd" , egoParse);

		this.parse = scParse;
	}
}