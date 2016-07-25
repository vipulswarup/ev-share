var widget, widgetsToRemove = [ "HEADER_REPOSITORY", "HEADER_MY_FILES",
		"HEADER_ADMIN_CONSOLE", "HEADER_SHARED_FILES" ], idx, max;

if (user.isAdmin) {
	widgetUtils.deleteObjectFromArray(model.jsonModel, "id", "HEADER_MY_FILES");

}
if (user.isAdmin) {
	widgetUtils.deleteObjectFromArray(model.jsonModel, "id",
			"HEADER_SHARED_FILES");

}
if (user.isAdmin) {
	widgetUtils.deleteObjectFromArray(model.jsonModel, "id",
			"HEADER_REPOSITORY");
}

var menuBar = widgetUtils.findObject(model.jsonModel, "id",
		"HEADER_APP_MENU_BAR");
if (menuBar != null) {
	menuBar.config.widgets.push({
		name : "alfresco/menus/AlfMenuBarItem",
		config : {
			label : "header.menu.trashcan.label",
			targetUrl : "user/" + encodeURIComponent(user.name)
					+ "/user-trashcan"
		}
	});
}

for (idx = 0, max = widgetsToRemove.length; idx < max; idx++) {

	if (!user.isAdmin) {

		findAndRemoveIn(model.jsonModel.widgets, null, null,
				widgetsToRemove[idx]);
	}

}

function findAndRemoveIn(obj, arrContext, arrIdx, id) {
	var idx, max, key;

	if (obj !== undefined && obj !== null) {
		if (Object.prototype.toString.apply(obj) === "[object Object]") {
			if (obj.hasOwnProperty("id") && obj.id === id) {
				if (arrContext !== null && arrIdx !== null) {
					arrContext.splice(arrIdx, 1);
				}

				else {
					logger
							.debug("Unexpected match outside of array structure: "
									+ jsonUtils.toJSONString(obj));
				}

			} else {
				for (key in obj) {
					if (obj.hasOwnProperty(key)) {
						findAndRemoveIn(obj[key], null, null, id);
					}

				}
			}
		} else if (Object.prototype.toString.apply(obj) === "[object Array]") {
			for (idx = 0, max = obj.length; idx < max; idx++) {
				findAndRemoveIn(obj[idx], obj, idx, id);
			}

		}
	}
}

var sitesMenu = widgetUtils.findObject(model.jsonModel, "id",
		"HEADER_SITES_MENU");
if (sitesMenu != null) {
	// Hide the site finder...
	sitesMenu.config.showSiteFinder = false;
	sitesMenu.config.showCreateSite = true;
	sitesMenu.config.showFavourites = false;
	sitesMenu.config.showUsefulGroup = false;
	sitesMenu.config.showRecentSites = true;
}

sitesMenu.config.label="header.menu.sites.label";
sitesMenu.config.mySitesLabel="My Departments";
sitesMenu.config.siteFinderLabel="Department Finder";
sitesMenu.config.createSiteLabel="Create Department";
sitesMenu.config.recentGroupLabel="header.menu.recent.sites.label";

if(page.titleId == "page.userSites.title"){
	var userSitesTitle = widgetUtils.findObject(model.jsonModel, "id", "HEADER_TITLE");
	userSitesTitle.config.label = "User Departments List";
}
