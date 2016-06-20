(function()
{
/**
* Alfresco Slingshot aliases
*/
var $html = Alfresco.util.encodeHTML,
  $isValueSet = Alfresco.util.isValueSet;
 
if (Alfresco.DocumentList)
{     
	YAHOO.Bubbling.fire("registerRenderer",
	{
	   propertyName: "hasCustomType",
 
	   renderer: function type_renderer(record)
	   {
			var jsNode = record.jsNode;        
			var properties = jsNode.properties;
			var html = "";
			
			var typestr = jsNode.type.replace(':', '_') + '.title';
			//var typestr = jsNode.nodeRef.toString();
			var qNameType = record.jsNode.qNameType;
			var typeShort = record.jsNode.typeShort;
			var title = jsNode.title;
 
			html = '<span class="item">' + "Type : " + '<b>' + this.msg(typestr) + '</b></span>';
			return html;
	  }
  });
}
})();