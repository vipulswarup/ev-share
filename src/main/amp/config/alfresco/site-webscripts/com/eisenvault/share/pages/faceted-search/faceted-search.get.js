//Replace the Browser Title
var pageTitleWidget = widgetUtils.findObject(model.jsonModel.widgets, "id", "HEADER_TITLE");

if(pageTitleWidget != null){
    pageTitleWidget.config.browserTitlePrefix = "EisenVault";
}

//This part would help in replacing the logo and text part in the footer
//Right now this doesn't work as expected so commenting it out

//var footerWidget = widgetUtils.findObject(model.jsonModel.widgets, "id", "ALF_STICKY_FOOTER");
//
//if(footerWidget != null){
//	footerWidget.config.widgetsForFooter = [
//    {
//        name: "eisenvault/footer/EvShareFooter",
//        config: {
//           semanticWrapper: "footer",
//           logoImageSrc: "eisenvault_logo.png"
//        }
//     }
//   ]
//}