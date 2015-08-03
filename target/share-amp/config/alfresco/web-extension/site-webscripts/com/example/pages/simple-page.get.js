var licenseHolder = context.properties["editionInfo"].holder,
    footerConfig = config.scoped["Edition"]["footer"],
    footerCopyRight = footerConfig.getChildValue("label"),
    footerCssClass = footerConfig.getChildValue("css-class"),
    footerLogo = footerConfig.getChildValue("logo"),
    footerLogoAltText = footerConfig.getChildValue("alt-text");

model.jsonModel = {
    widgets: [{
        id: "SET_PAGE_TITLE",
        name: "alfresco/header/SetTitle",
        config: {
            title: "This is a simple page"
        }
    }, 
    {
        id: "MY_HORIZONTAL_WIDGET_LAYOUT",
        name: "alfresco/layout/HorizontalWidgets",
        config: {
            widgetWidth: 50,
            widgets: [
                {
                    name: "alfresco/logo/Logo",
                    config: {
                        logoClasses: "alfresco-logo-only"
                    }
                },
                {
                  name: "eisenvault/footer/EvShareFooter",
                  config: {
                      semanticWrapper: "footer",
                      licenseLabel: licenseHolder,
                      copyrightLabel: footerCopyRight,
                      altText: footerLogoAltText,
                      logoImageSrc: footerLogo,
                      cssClass: footerCssClass
                   }
                }
            ]
        }
    }]
};
