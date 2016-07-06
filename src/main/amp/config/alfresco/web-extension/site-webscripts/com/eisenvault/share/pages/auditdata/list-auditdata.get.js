<import resource="classpath:/alfresco/templates/org/alfresco/import/alfresco-util.js">
<import resource="classpath:/alfresco/site-webscripts/org/alfresco/components/documentlibrary/include/documentlist.lib.js">

var siteName = page.url.templateArgs.site;
var nodeRef = page.url.args.nodeRef;
var jsonNode = AlfrescoUtil.getNodeDetails(nodeRef, null, {
    actions: true
});

model.jsonModel = {
		services:[
		          "alfresco/services/CrudService",
		          "alfresco/services/NavigationService"
		],
	   widgets:[
				/*
				 * Commenting this module as in title bar we can see Alfresco as a title
				 * {
				    id: "SET_PAGE_TITLE",
				    name: "alfresco/header/SetTitle",
				    config: {
				    	setBrowserTitle: "EisenVault Audit Trail"
				        title: "Audit Trail"
				    }
				 },*/
	            {
	            	id: "SHARE_VERTICAL_LAYOUT",
	                name: "alfresco/layout/VerticalWidgets",
	                config:{
	                	widgets:[
							 {
								 name: "alfresco/layout/LeftAndRight",
								 config:{
									 style: {
			                              marginTop: "10px",
			                              marginBottom: "10px",
			                              marginLeft: "10px"
			                         },
			                         widgets:[
										{
										    name: "alfresco/renderers/FileType",
										    align: "left",
										    config: {
										       currentItem: jsonNode.item
										    }
										 },
										 {
											name: "alfresco/layout/VerticalWidgets",
											config:{
												align: "left",
												style: {
				                                       marginLeft: "20px"
				                                },
				                                widgets:[
				                                       {
				                                          name: "alfresco/layout/LeftAndRight",
				                                          config: {
				                                             style: {
				                                                marginBottom: "5px"
				                                             },
				                                             widgets: [
		                                                       {
		                                                    	   name:"alfresco/html/Label",
		                                                    	   align:"left",
		                                                    	   config:{
		                                                    		   style:{
		                                                    			   
		                                                    		   },
		                                                    		   label: "list-auditdata.audit.trail.for"
		                                                    	   }
		                                                       },
				                                                {
				                                                   name: "alfresco/renderers/Property",
				                                                   align: "left",
				                                                   config: {
				                                                      propertyToRender: "node.properties.cm:name",
				                                                      postParam: "prop_cm_name",
				                                                      currentItem: jsonNode.item,
				                                                      renderSize: "large"
				                                                   }
				                                                },
				                                                {
				                                                   name: "alfresco/renderers/Separator",
				                                                   align: "left"
				                                                },
				                                                {
				                                                   name: "alfresco/renderers/Version",
				                                                   align: "left",
				                                                   config: {
				                                                      currentItem: jsonNode.item
				                                                   }
				                                                }
				                                             ]
				                                          }
				                                       },
				                                       {
				                                           name: "alfresco/layout/LeftAndRight",
				                                           config: {
				                                              widgets: [
				                                                 {
				                                                    name: "alfresco/renderers/Date",
				                                                    align: "left",
				                                                    config: {
				                                                       currentItem: jsonNode.item
				                                                    }
				                                                 },
				                                                 {
				                                                    name: "alfresco/renderers/Separator",
				                                                    align: "left"
				                                                 },
				                                                 {
				                                                    name: "alfresco/renderers/Favourite",
				                                                    align: "left",
				                                                    config: {
				                                                       currentItem: jsonNode.item
				                                                    }
				                                                 },
				                                                 {
				                                                    name: "alfresco/renderers/Separator",
				                                                    align: "left"
				                                                 },
				                                                 {
				                                                    name: "alfresco/renderers/Like",
				                                                    align: "left",
				                                                    config: {
				                                                       currentItem: jsonNode.item
				                                                    }
				                                                 }
				                                              ]
				                                           }
				                                       }
				                                ]
											}
										 },
										 {
											 name:"eisenvault/widgets/BackButton",
											 align: "right",
											 config:{
												 style:{
													 marginLeft: "20px",
													 marginRight: "20px"
												 },
												 label: "list-auditdata.go.back"
											 }
										 }
			                         ]
								 }
							 }
	                	]
	                }
	            },
	            addTableWidget()
	   ]
};

function addTableWidget(){
	return {
       name: "alfresco/layout/ClassicWindow",
       config: {
    	   style:{
      		 marginLeft: "10px",
      		 marginRight: "10px"
      	 },
          title: "list-auditdata.audit.data",
          refreshCurrentItem: true,
          widgets: [
            {
              name: "alfresco/layout/VerticalWidgets",
              config: {
                widgets:[
                         createTable()
                ]
              }
            }
          ]
       }
	};
}

function createTable(){
	return{
		name: "alfresco/lists/AlfList",
		config:{
			loadDataPublishTopic: "ALF_CRUD_GET_ALL",
			loadDataPublishPayload:{
				url: "ev/nodeaudittrail?nodeRef="+nodeRef
			},
			itemsProperty: "data",
			widgets:[
			         {
			        	 name:"alfresco/lists/views/AlfListView",
			        	 config:{
			        		 additionalCssClasses: "bordered",
			        		 widgetsForHeader: [
			                                    {
			                                        name: "alfresco/documentlibrary/views/layouts/HeaderCell",
			                                        config: {
			                                            id: "userNameTableHeader",
			                                            label: "list-auditdata.user.name"
			                                        }
			                                    },
			                                    {
			                                        name: "alfresco/documentlibrary/views/layouts/HeaderCell",
			                                        config: {
			                                            id: "methodTableHeader",
			                                            label: "list-auditdata.action.performed"
			                                        }
			                                    },
			                                    {
			                                        name: "alfresco/documentlibrary/views/layouts/HeaderCell",
			                                        config: {
			                                            id: "timeTableHeader",
			                                            label: "list-auditdata.time"
			                                        }
			                                    },
			                                    {
			                                        name: "alfresco/documentlibrary/views/layouts/HeaderCell",
			                                        config: {
			                                            id: "propertyDisplayHeader",
			                                            label: "list-auditdata.properties.update"
			                                        }
			                                    }
			                                ],
			        		 widgets:[
			        		          {
			        		        	  name: "alfresco/lists/views/layouts/Row",
			        		        	  config:{
			        		        		  widgets:[
			        		        		           {
			        		        		        	   name: "alfresco/lists/views/layouts/Cell",
			        		        		        	   config:{
			        		        		        		   additionalCssClasses: "mediumpad",
			        		        		        		   widgets:[
			        		        		        		            {
			        		        		        		            	name:"alfresco/renderers/Property",
			        		        		        		            	config:{
			        		        		        		            		propertyToRender:"userName"
			        		        		        		            	}
			        		        		        		            }
			        		        		        		   ]
			        		        		        	   }
			        		        		           },
			        		        		           {
			        		        		        	   name: "alfresco/lists/views/layouts/Cell",
			        		        		        	   config:{
			        		        		        		   additionalCssClasses: "mediumpad",
			        		        		        		   widgets:[
			        		        		        		            {
			        		        		        		            	name:"alfresco/renderers/Property",
			        		        		        		            	config:{
			        		        		        		            		propertyToRender:"method"
			        		        		        		            	}
			        		        		        		            }
			        		        		        		   ]
			        		        		        	   }
			        		        		           },
			        		        		           {
			        		        		        	   name: "alfresco/lists/views/layouts/Cell",
			        		        		        	   config:{
			        		        		        		   additionalCssClasses: "mediumpad",
			        		        		        		   widgets:[
			        		        		        		            {
			        		        		        		            	name:"eisenvault/widgets/Property",
			        		        		        		            	config:{
			        		        		        		            		propertyToRender: "time"
			        		        		        		            	}
			        		        		        		            }
			        		        		        		   ]
			        		        		        	   }
			        		        		           },
			        		        		           {
			        		        		        	   name: "alfresco/lists/views/layouts/Cell",
			        		        		        	   config:{
			        		        		        		   additionalCssClasses: "mediumpad",
			        		        		        		   widgets:[
			        		        		        		            {
			        		        		        		            	name:"eisenvault/widgets/DisplayArray",
			        		        		        		            	config:{
			        		        		        		            		propertyToRender: "propertyList"
			        		        		        		            	}
			        		        		        		            }
			        		        		        		   ]
			        		        		        	   }
			        		        		           }
			        		        		  ]
			        		        	  }
			        		          }
			        		 ]
			        	 }
			         }
			]
		}
		
	}
}
