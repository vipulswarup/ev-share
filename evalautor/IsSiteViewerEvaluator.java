package com.eisenvault.helpers.action.evalautor;

import javax.servlet.http.HttpSession;

import org.alfresco.web.evaluator.BaseEvaluator;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.extensions.surf.RequestContext;
import org.springframework.extensions.surf.ServletUtil;
import org.springframework.extensions.surf.UserFactory;
import org.springframework.extensions.surf.exception.ConnectorServiceException;
import org.springframework.extensions.surf.support.ThreadLocalRequestContext;
import org.springframework.extensions.webscripts.Status;
import org.springframework.extensions.webscripts.connector.Connector;
import org.springframework.extensions.webscripts.connector.CredentialVault;
import org.springframework.extensions.webscripts.connector.Response;

/**
 * Action evaluator class to decide when to apply the evaluator. This class
 * hides the Review/Unreview action from the members who have Collaborator or
 * Contributor access
 * 
 * @author Hiten Rastogi
 * 
 */
public class IsSiteViewerEvaluator extends BaseEvaluator {

	private static Log logger = LogFactory.getLog(IsSiteViewerEvaluator.class);

	protected static final String SITE = "site";

	public void debug(String debugMessage) {
		if (logger.isDebugEnabled()) {
			logger.debug("*******" + debugMessage + "*******");
		}
	}

	/**
	 * 
	 * Returns the current site id OR null if we aren't in a site
	 * 
	 * 
	 * 
	 * @param context
	 * 
	 * @return The current site id OR null if we aren't in a site
	 */

	protected String getSite(RequestContext context) {
		debug("Inside getSite()");
		// Look for siteId in url path & parameters
		String site = context.getUriTokens().get(SITE);
		debug("Getting site from Uri tokens " + site);
		if (site == null) {
			site = context.getParameter(SITE);
			debug("Getting site from context param " + site);
		}
		if (site == null) {
			String[] pathNames = context.getUri()
					.substring(context.getContextPath().length()).split("/");
			for (int i = 0; i < pathNames.length; i++) {
				if (pathNames[i].equals(SITE) && (i + 1 < pathNames.length)) {
					site = pathNames[i + 1];
					debug("Getting site from context pathNames " + site);
					break;
				}
			}
		}
		return site;
	}

	@Override
	public boolean evaluate(JSONObject arg0) {

		try {
			debug("Inside evaluate()");
			final RequestContext rc = ThreadLocalRequestContext
					.getRequestContext();
			HttpSession session = ServletUtil.getSession();
			CredentialVault cv = rc.getCredentialVault();
			String currentSite = getSite(rc);
			if (cv != null) {
				String userName = (String) session
						.getAttribute(UserFactory.SESSION_ATTRIBUTE_KEY_USER_ID);
				Connector connector = rc.getServiceRegistry()
						.getConnectorService()
						.getConnector("alfresco", userName, session);

				debug("Calling membership webscript /api/sites/" + currentSite
						+ "/memberships/" + rc.getUserId());
				Response res = connector.call("/api/sites/" + currentSite
						+ "/memberships/" + rc.getUserId());
				debug("Getting back Membership Response :: " + res);

				if (res.getStatus().getCode() == Status.STATUS_OK) {
					String response = res.getResponse();
					JSONParser p = new JSONParser();
					Object obj = p.parse(response);
					System.out.println(">> Object obj value :: " + obj);
					if (obj instanceof JSONObject) {
						JSONObject jsonRes = (JSONObject) obj;
						String siteMemberShip = (String) jsonRes.get("role");
						debug("Role/Site membership " + siteMemberShip);
						if ("SiteViewer".equals(siteMemberShip)) {
							return true;
						}
					}
				}
			}
		} catch (ConnectorServiceException e) {
			e.printStackTrace();
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return false;
	}
}
