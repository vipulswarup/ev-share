var sitesMenu = widgetUtils.findObject(model.jsonModel, "id", "HEADER_SITES_MENU");
sitesMenu.config.label="Department";
sitesMenu.config.mySitesLabel="My Departments";
sitesMenu.config.siteFinderLabel="Department Finder";
sitesMenu.config.createSiteLabel="Create Department";
sitesMenu.config.recentGroupLabel="Recent Departments";

if(page.titleId == "page.userSites.title"){
	var userSitesTitle = widgetUtils.findObject(model.jsonModel, "id", "HEADER_TITLE");
	userSitesTitle.config.label = "User Departments List";
}
