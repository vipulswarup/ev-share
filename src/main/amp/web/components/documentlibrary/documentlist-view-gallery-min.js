(function() {
	var I = YAHOO.util.Dom, G = YAHOO.util.Event, u = YAHOO.util.Anim;
	var D = Alfresco.util.encodeHTML;
	var X = "org.alfresco.share.documentList", q = X + ".galleryColumns", v = "ygddfdiv";
	var s = 7, F = "397px", o = [ -40, -20 ], l = 700, K = 20, w = 100, N = false, L = true;
	Alfresco.DocumentListGalleryViewRenderer = function(ad, af, ae) {
		Alfresco.DocumentListGalleryViewRenderer.superclass.constructor.call(
				this, ad, af);
		this.parentElementIdSuffix = "-gallery";
		this.parentElementEmptytIdSuffix = "-gallery-empty";
		this.rowClassName = "alf-gallery-item";
		this.infoPanelClassName = "alf-detail";
		this.metadataBannerViewName = "detailed";
		this.metadataLineViewName = "detailed";
		this.galleryColumns = ae;
		this.infoPanelPopupTimeout = l;
		this.windowResizeCheckTime = K;
		this.windowResizeMinTime = w;
		this.documentList = null;
		return this
	};
	YAHOO.extend(Alfresco.DocumentListGalleryViewRenderer,
			Alfresco.DocumentListViewRenderer);
	Alfresco.DocumentListGalleryViewRenderer.prototype.getRowItemId = function e(
			ad) {
		if (this.documentList != null && ad != null) {
			return this.documentList.id + "-gallery-item-" + ad.getId()
		}
	};
	Alfresco.DocumentListGalleryViewRenderer.prototype.getRowItem = function k(
			af, ah) {
		if (this.documentList != null && af != null) {
			var ag = this.getRowItemId(af);
			var ai = document.getElementById(ag);
			if (ai === null && ah != null) {
				var ae = I.getAncestorByTagName(ah, "tr");
				var ad = this.documentList.id + "-gallery-item-" + ae.id;
				ai = document.getElementById(ad);
				if (ai !== null) {
					ai.setAttribute("id", ag)
				}
			}
			return ai
		}
	};
	Alfresco.DocumentListGalleryViewRenderer.prototype.getRowItemSelectId = function j(
			ad) {
		if (ad != null) {
			return "checkbox-" + ad.getId() + "-gallery-item"
		}
	};
	Alfresco.DocumentListGalleryViewRenderer.prototype.getRowItemDetailElement = function aa(
			ae) {
		if (ae != null) {
			var ad = I.getChildren(ae)[1];
			if (I.hasClass(ad, "yui-panel-container")) {
				ad = I.getFirstChild(ad)
			}
			return ad
		}
	};
	Alfresco.DocumentListGalleryViewRenderer.prototype.getRowItemDetailDescriptionElement = function f(
			ad) {
		if (ad != null) {
			var ae = this.getRowItemDetailElement(ad);
			return I.getChildren(I.getFirstChild(ae))[3]
		}
	};
	Alfresco.DocumentListGalleryViewRenderer.prototype.getRowItemDetailThumbnailElement = function a(
			ad) {
		if (ad != null) {
			var ae = this.getRowItemDetailElement(ad);
			return I.getFirstChild(I.getFirstChild(ae))
		}
	};
	Alfresco.DocumentListGalleryViewRenderer.prototype.getRowItemThumbnailElement = function r(
			ad) {
		if (ad != null) {
			return I.getFirstChild(ad)
		}
	};
	Alfresco.DocumentListGalleryViewRenderer.prototype.getRowItemHeaderElement = function R(
			ae) {
		if (ae != null) {
			var ad = this.getRowItemThumbnailElement(ae);
			return I.getFirstChild(ad)
		}
	};
	Alfresco.DocumentListGalleryViewRenderer.prototype.getRowItemSelectElement = function T(
			ae) {
		if (ae != null) {
			var ad = this.getRowItemHeaderElement(ae);
			return I.getFirstChild(ad)
		}
	};
	Alfresco.DocumentListGalleryViewRenderer.prototype.getRowItemLabelElement = function z(
			ae) {
		if (ae != null) {
			var ad = this.getRowItemThumbnailElement(ae);
			return I.getChildren(ad)[1]
		}
	};
	Alfresco.DocumentListGalleryViewRenderer.prototype.getRowItemStatusElement = function Q(
			ad) {
		if (ad != null) {
			var ae = this.getRowItemDetailElement(ad);
			return I.getChildren(I.getFirstChild(ae))[1]
		}
	};
	Alfresco.DocumentListGalleryViewRenderer.prototype.getRowItemActionsElement = function ab(
			ad) {
		if (ad != null) {
			var ae = this.getRowItemDetailElement(ad);
			return I.getChildren(I.getFirstChild(ae))[2]
		}
	};
	Alfresco.DocumentListGalleryViewRenderer.prototype.getDataTableRecordIdFromRowElement = function H(
			ae, af) {
		var ad = Alfresco.DocumentListGalleryViewRenderer.superclass.getDataTableRecordIdFromRowElement
				.call(this, ae, af);
		if (ad != null) {
			return ad.replace(ae.id + "-gallery-item-", "")
		}
	};
	Alfresco.DocumentListGalleryViewRenderer.prototype.getRowElementFromDataTableRecord = function Z(
			ad, ae) {
		var af = this.getRowItemId(ae);
		return document.getElementById(af)
	};
	Alfresco.DocumentListGalleryViewRenderer.prototype.getRowSelectElementFromDataTableRecord = function P(
			ae, af) {
		var ad = this.getRowItemSelectId(af);
		return I.get(ad)
	};
	Alfresco.DocumentListGalleryViewRenderer.prototype.setupItemHovers = function m(
			ae) {
		var ad = I.get(ae.id + this.parentElementIdSuffix);
		G.delegate(ad, "mouseover",
				Alfresco.DocumentListGalleryViewRenderer.onMouseOverItem,
				"div." + this.rowClassName, this);
		G.delegate(ad, "mouseout",
				Alfresco.DocumentListGalleryViewRenderer.onMouseOutItem, "div."
						+ this.rowClassName, this)
	};
	Alfresco.DocumentListGalleryViewRenderer.prototype.destroyItemHovers = function S(
			ae) {
		var ad = I.get(ae.id + this.parentElementIdSuffix);
		G.removeDelegate(ad, "mouseover",
				Alfresco.DocumentListGalleryViewRenderer.onMouseOverItem);
		G.removeDelegate(ad, "mouseout",
				Alfresco.DocumentListGalleryViewRenderer.onMouseOutItem)
	};
	Alfresco.DocumentListGalleryViewRenderer.prototype.setupRenderer = function M(
			ah) {
		Alfresco.DocumentListGalleryViewRenderer.superclass.setupRenderer.call(
				this, ah);
		this.documentList = ah;
		var af = I.get(ah.id + this.parentElementIdSuffix);
		this.galleryColumnsChangedEvent = new YAHOO.util.CustomEvent(
				"galleryViewColumnsChangedCE");
		YAHOO.Bubbling.subscribe("galleryViewColumnsChanged", function(aj, ai) {
			this.galleryColumnsChangedEvent.fire()
		}, this);
		this.setupItemHovers(ah);
		var ag = this;
		G.delegate(af, "click", function ae(ak, aj, ai) {
			ag.onShowGalleryItemDetail(ah, ag, ak, aj, ai)
		}, ".alf-show-detail", this);
		G.delegate(af, "click", function ad(ak, aj, ai) {
			var al = G.getTarget(ak);
			ah.selectedFiles[al.value] = al.checked;
			YAHOO.Bubbling.fire("selectedFilesChanged")
		}, ".alf-select input", this);
		YAHOO.Bubbling.on("selectedFilesChanged", function(aj, ai) {
			this.onSelectedFilesChanged(ah)
		}, this);
		this.galleryColumns = Alfresco.util.findValueByDotNotation(
				ah.services.preferences.get(), q);
		if (!this.galleryColumns) {
			this.galleryColumns = s
		}
		this.setupGalleryColumnsSlider(ah, this)
	};
	Alfresco.DocumentListGalleryViewRenderer.prototype.overrideDataTable = function x(
			af) {
		var ae = this;
		if (af.widgets.dataTable) {
			if (af.widgets.dataTable.getRecord != af.widgets.dataTable.getHiddenRecord) {
				af.widgets.dataTable.getVisibleRecord = af.widgets.dataTable.getRecord;
				af.widgets.dataTable.getHiddenRecord = function ag(ai) {
					var ah = af.widgets.dataTable.getVisibleRecord(ai);
					if (ah == null) {
						if (typeof ai === "string") {
							ah = af.widgets.dataTable.getVisibleRecord(ai
									+ "-hidden")
						} else {
							if (ai) {
								ah = af.widgets.dataTable
										.getVisibleRecord(ai.id + "-hidden")
							}
						}
					}
					return ah
				};
				af.widgets.dataTable.getRecord = af.widgets.dataTable.getHiddenRecord
			}
			if (af.widgets.dataTable.getContainerEl != af.widgets.dataTable.getGalleryContainerEl) {
				af.widgets.dataTable.origGetContainerEl = af.widgets.dataTable.getContainerEl;
				af.widgets.dataTable.getGalleryContainerEl = function ad() {
					return I.get(af.id + ae.parentElementIdSuffix)
				};
				af.widgets.dataTable.getContainerEl = af.widgets.dataTable.getGalleryContainerEl
			}
		}
	};
	Alfresco.DocumentListGalleryViewRenderer.prototype.restoreDataTable = function p(
			ad) {
		if (ad.widgets.dataTable.getContainerEl == ad.widgets.dataTable.getGalleryContainerEl) {
			ad.widgets.dataTable.getContainerEl = ad.widgets.dataTable.origGetContainerEl
		}
	};
	Alfresco.DocumentListGalleryViewRenderer.prototype.renderView = function Y(
			af, aj, am, ah) {
		this.overrideDataTable(af);
		var al = this;
		af.widgets.dataTable.onDataReturnInitializeTable.call(
				af.widgets.dataTable, aj, am, ah);
		var ao = I.get(af.id + this.parentElementIdSuffix);
		var ae = af.widgets.dataTable.getRecordSet();
		if (ae.getLength() == 0) {
			var ad = I.get(af.id + this.parentElementEmptytIdSuffix);
			ao.innerHTML = ad.innerHTML;
			I.getFirstChild(ad).innerHTML = "";
			af.widgets.dataTable.fireEvent("tableMsgShowEvent", {
				html : ao.innerHTML
			});
			I.removeClass(ao, "alf-gallery");
			I.removeClass(ao, "hidden");
			I.setStyle(ao, "height", "auto");
			return
		}
		ao.innerHTML = "";
		I.setStyle(ao, "opacity", 0);
		I.addClass(ao, "alf-gallery");
		I.removeClass(ao, "hidden");
		var ap = I.get(af.id + "-gallery-item-template"), ar = null;
		var ay, ai, ax, av;
		for (ax = 0, av = ae.getLength(); ax < av; ax++) {
			ay = ae.getRecord(ax);
			ai = ay.getData();
			var an = this.getRowItemId(ay);
			ar = ap.cloneNode(true);
			I.removeClass(ar, "hidden");
			ar.setAttribute("id", an);
			ao.appendChild(ar);
			var ag = this.getRowItemThumbnailElement(ar);
			var au = this.getRowItemHeaderElement(ar);
			var ak = this.getRowItemDetailElement(ar);
			var aw = this.getRowItemActionsElement(ar);
			au.setAttribute("id", af.id + "-item-header-" + ay.getId());
			aw.setAttribute("id", af.id + "-actions-" + an);
			this.renderCellThumbnail(af, ag, ay, ar, null, "");
			var at = ai.jsNode.nodeRef.nodeRef;
			var aq = new Alfresco.DnD(at, af);
			ak.panel = new YAHOO.widget.Panel(ak, {
				visible : false,
				draggable : false,
				close : false,
				constraintoviewport : true,
				underlay : "none",
				width : F,
				context : [ ar, "tl", "tl",
						[ this.galleryColumnsChangedEvent ], o ]
			})
		}
		af.widgets.galleryColumnsSlider.initialize();
		this.currentResizeCallback = function(az) {
			al.resizeView(af, aj, am, ah)
		};
		this.setupWindowResizeListener()
	};
	Alfresco.DocumentListGalleryViewRenderer.prototype.destroyView = function W(
			ah, af, ag, ai) {
		this.restoreDataTable(ah);
		I.get(ah.id + this.parentElementIdSuffix).innerHTML = "";
		I.addClass(I.get(ah.id + this.parentElementIdSuffix), "hidden");
		I.addClass(I.get(ah.id + "-gallery-slider"), "hidden");
		var ad = I.get(v);
		columnOptions = [ 3, 4, 7, 10 ];
		for (var ae = 0; ae < columnOptions.length; ae++) {
			I.removeClass(ad, "alf-gallery-columns-" + columnOptions[ae])
		}
		if (this.windowResizeCallback) {
			G.removeListener(window, "resize", this.windowResizeCallback)
		}
	};
	Alfresco.DocumentListGalleryViewRenderer.onSelectModeImgClicked = function O(
			ah, af, ae, ag) {
		var aj = I.getAncestorByClassName(af, ag.rowClassName);
		var ad = I.getElementsByClassName("alf-select", "div", aj)[0];
		var ai = I.getFirstChild(ad);
		ai.checked = !ai.checked;
		ag.documentList.selectedFiles[ai.value] = ai.checked;
		YAHOO.Bubbling.fire("selectedFilesChanged")
	};
	Alfresco.DocumentListGalleryViewRenderer.onMouseOverItem = function ac(ag,
			af, ad, ae) {
		I.addClass(af, "alf-hover");
		ae.onEventHighlightRow(ae.documentList, ag, af)
	};
	Alfresco.DocumentListGalleryViewRenderer.onMouseOutItem = function b(ag,
			af, ad, ae) {
		I.removeClass(af, "alf-hover")
	};
	Alfresco.DocumentListGalleryViewRenderer.prototype.onActionShowMore = function h(
			af, ae, ad) {
		Alfresco.DocumentListGalleryViewRenderer.superclass.onActionShowMore
				.call(this, af, ae, ad);
		var ah = function ag() {
			if (af.hideMoreActionsFn) {
				af.hideMoreActionsFn.call(this)
			}
		};
		var ai = I.getNextSibling(ad);
		G.on(ai, "mouseleave", ah, ai)
	};
	Alfresco.DocumentListGalleryViewRenderer.prototype.onSelectedFilesChanged = function c(
			am) {
		var ak = am.widgets.dataTable.getRecordSet(), an, ai, ae, al, aj, ah, ag;
		var af = false;
		for (ah = 0, ag = ak.getLength(); ah < ag; ah++) {
			an = ak.getRecord(ah);
			ae = an.getData("jsNode");
			al = ae.nodeRef;
			aj = this.getRowElementFromDataTableRecord(am, an);
			isChecked = am.selectedFiles[al];
			if (isChecked) {
				I.addClass(aj, "alf-selected");
				af = true
			} else {
				I.removeClass(aj, "alf-selected")
			}
		}
		var ad = I.get(am.id + this.parentElementIdSuffix);
		if (af) {
			if (!I.hasClass(ad, "alf-selected")) {
				I.addClass(ad, "alf-selected")
			}
		} else {
			I.removeClass(ad, "alf-selected")
		}
	};
	Alfresco.DocumentListGalleryViewRenderer.prototype.renderCellSelected = function y(
			ao, am, ap, ah, ae) {
		var aj = this.getRowItem(ap, am);
		if (aj != null) {
			var ai = this.getRowItemSelectElement(aj);
			var af = ap.getData("jsNode"), al = af.nodeRef, ad = ap
					.getData("displayName"), ag = document
					.createElement("input"), ak = document
					.createElement("label");
			var an = this.getRowItemSelectId(ap);
			ag.id = an;
			ag.type = "checkbox";
			ag.name = "fileChecked";
			ag.value = al;
			ag.checked = ao.selectedFiles[al] ? true : false;
			ak.id = "label_for_" + ag.id;
			ak.style.fontSize = "0em";
			ak.innerHTML = (ag.checked ? ao.msg("checkbox.uncheck") : ao
					.msg("checkbox.check"))
					+ " " + ad;
			ak.setAttribute("for", ag.id);
			ai.innerHTML = "";
			ai.appendChild(ak);
			ai.appendChild(ag);
			YAHOO.Bubbling.on("selectedFilesChanged",
					function(aq) {
						if (I.get(ak.id)) {
							I.get(ak.id).innerHTML = (ao.selectedFiles[al] ? ao
									.msg("checkbox.uncheck") : ao
									.msg("checkbox.check"))
									+ " " + ad
						}
					})
		}
	};
	Alfresco.DocumentListGalleryViewRenderer.prototype.getThumbnail = function t(
			ar, aq, at, an, ag, ai, am) {
		if (ai == null) {
			ai = "-hidden"
		}
		if (am == null) {
			am = "imgpreview"
		}
		var al = at.getData(), aj = al.jsNode, ap = aj.properties, ae = al.displayName, af = aj.isContainer, ak = aj.isLink, ao = ae
				.substring(ae.lastIndexOf(".")), ad = aj.nodeRef.nodeRef + ai, ah;
		if (af) {
			if(aj.properties["empfm:alltypes"] >=0 && aj.properties["empfm:alltypes"] < 4)
				{
			ah = '<img id="' + ad
					+ '" class="alf-gallery-item-thumbnail-img" src="'
					+ Alfresco.constants.URL_RESCONTEXT
					+ 'components/documentlibrary/images/folder-invalid-256.png" />'
				}
			else
				{
				ah = '<img id="' + ad
				+ '" class="alf-gallery-item-thumbnail-img" src="'
				+ Alfresco.constants.URL_RESCONTEXT
				+ 'components/documentlibrary/images/folder-256.png" />'
				}
		} else {
			ah = '<img id="' + ad
					+ '" class="alf-gallery-item-thumbnail-img" src="'
					+ Alfresco.DocumentList.generateThumbnailUrl(al, am)
					+ '" alt="' + D(ao) + '" title="' + D(ae) + '" />'
		}
		return {
			id : ad,
			html : ah,
			isContainer : af,
			isLink : ak
		}
	};
	Alfresco.DocumentListGalleryViewRenderer.prototype.renderCellThumbnail = function i(
			an, am, ao, ai, ae, af, ah) {
		var ak;
		var ad = this.getThumbnail(an, am, ao, ai, ae, af, ah);
		var ag = ao.getData();
		if (!document.getElementById(ad.id)) {
			if (ad.isContainer) {
				am.innerHTML += '<span class="folder">'
						+ (ad.isLink ? '<span class="link"></span>' : "")
						+ (an.dragAndDropEnabled ? '<span class="droppable"></span>'
								: "")
						+ Alfresco.DocumentList.generateFileFolderLinkMarkup(
								an, ag) + ad.html + "</a>";
				ak = new YAHOO.util.DDTarget(ad.id)
			} else {
				am.innerHTML += (ad.isLink ? '<span class="link"></span>' : "")
						+ Alfresco.DocumentList.generateFileFolderLinkMarkup(
								an, ag) + ad.html + "</a>"
			}
			var aj = document.getElementById(ad.id);
			if (aj) {
				var al = new Image();
				al.onload = function() {
					if (al.width > al.height) {
						I.addClass(aj, "alf-landscape")
					}
				};
				al.src = aj.src
			}
		}
	};
	Alfresco.DocumentListGalleryViewRenderer.prototype.renderCellStatus = function V(
			ad, ag, af, ah, aj) {
		Alfresco.DocumentListGalleryViewRenderer.superclass.renderCellStatus
				.call(this, ad, ag, af, ah, aj);
		var ai = this.getRowItem(af, ag);
		if (ai != null) {
			var ae = this.getRowItemStatusElement(ai).innerHTML = ag.innerHTML;
			ag.innerHTML = ""
		}
	};
	Alfresco.DocumentListGalleryViewRenderer.prototype.renderCellDescription = function J(
			ak, aj, al, ah, ae) {
		Alfresco.DocumentListGalleryViewRenderer.superclass.renderCellDescription
				.call(this, ak, aj, al, ah, ae);
		var ai = this.getRowItem(al, aj);
		if (ai != null) {
			var af = this.getRowItemDetailDescriptionElement(ai).innerHTML = aj.innerHTML;
			aj.innerHTML = "";
			this.getRowItemLabelElement(ai).innerHTML = Alfresco.DocumentList
					.generateFileFolderLinkMarkup(ak, al.getData())
					+ D(al.getData().displayName) + "</a>";
			var ag = this.getRowItemDetailThumbnailElement(ai);
			if (ag.innerHTML == "") {
				var ad = this.getThumbnail(ak, aj, al, ah, ae, "-detail");
				this.getRowItemDetailThumbnailElement(ai).innerHTML = ad.html
			}
		}
	};
	Alfresco.DocumentListGalleryViewRenderer.prototype.onFileRenamed = function E(
			af, ae, ad) {
		var ai = ad[1];
		if (ai && (ai.file !== null)) {
			var ag = af._findRecordByParameter(ai.file.node.nodeRef, "nodeRef");
			if (ag !== null) {
				af.widgets.dataTable.updateRow(ag, ai.file);
				var ah = this.getRowItemId(ag);
				Alfresco.util.Anim.pulse(ah)
			}
		}
	};
	Alfresco.DocumentListGalleryViewRenderer.prototype.resizeView = function C(
			ah, af, ag, ai) {
		var ad = I.get(ah.id + this.parentElementIdSuffix);
		var ae = ah.widgets.galleryColumnsSlider.getColumnValue();
		ah.widgets.galleryColumnsSlider.setGalleryViewColumns(ad, ae, N)
	};
	Alfresco.DocumentListGalleryViewRenderer.prototype.checkWindowResizeTime = function d() {
		var ad = this;
		var ae = Date.now();
		if (ae - this.lastResize < ad.windowResizeMinTime) {
			this.resizeTimer = setTimeout(function() {
				ad.checkWindowResizeTime()
			}, ad.windowResizeCheckTime)
		} else {
			clearTimeout(this.resizeTimer);
			this.resizeTimer = this.lastResize = 0;
			if (this.currentViewportWidth != I.getViewportWidth()) {
				this.currentResizeCallback();
				this.currentViewportWidth = I.getViewportWidth()
			}
		}
	};
	Alfresco.DocumentListGalleryViewRenderer.prototype.onWindowResize = function A() {
		var ad = this;
		this.lastResize = Date.now();
		this.resizeTimer = this.resizeTimer || setTimeout(function() {
			ad.checkWindowResizeTime()
		}, ad.windowResizeCheckTime)
	};
	Alfresco.DocumentListGalleryViewRenderer.prototype.setupWindowResizeListener = function g() {
		var ad = (navigator.userAgent.match(/(iPad|iPhone|iPod)/i) ? true
				: false);
		if (!ad) {
			var ae = this;
			this.currentViewportWidth = I.getViewportWidth();
			if (ae.windowResizeCallback) {
				G.removeListener(window, "resize", ae.windowResizeCallback)
			}
			ae.windowResizeCallback = function(af) {
				ae.onWindowResize()
			};
			G.addListener(window, "resize", ae.windowResizeCallback)
		}
	};
	Alfresco.DocumentListGalleryViewRenderer.prototype._setEmptyDataSourceMessage = function U(
			af, ad) {
		var ae = I.get(af.id + this.parentElementEmptytIdSuffix);
		I.getFirstChild(ae).innerHTML = ad
	};
	YAHOO.lang
			.augmentObject(
					Alfresco.DocumentListGalleryViewRenderer.prototype,
					{
						setupGalleryColumnsSlider : function n(ag, ai) {
							var ae = I.get(ag.id + this.parentElementIdSuffix);
							ag.widgets.galleryColumnsSlider = YAHOO.widget.Slider
									.getHorizSlider(ag.id
											+ "-gallery-slider-bg", ag.id
											+ "-gallery-slider-thumb", 0, 60,
											20);
							ag.widgets.galleryColumnsSlider.animate = true;
							ag.widgets.galleryColumnsSlider
									.subscribe(
											"change",
											function(ak) {
												var aj = ag.widgets.galleryColumnsSlider
														.getColumnValue();
												ag.widgets.galleryColumnsSlider
														.setGalleryViewColumns(
																ae, aj, true);
												ag.widgets.galleryColumnsSlider
														.setColumnsPreference(aj)
											});
							ag.widgets.galleryColumnsSlider.initialize = function() {
								I.removeClass(I.get(ag.id + "-gallery-slider"),
										"hidden");
								var aj = ag.widgets.galleryColumnsSlider
										.getPixelValue(ai.galleryColumns);
								ag.widgets.galleryColumnsSlider.setValue(aj,
										true, true, true);
								ag.widgets.galleryColumnsSlider
										.setGalleryItemDimensions(ae,
												ai.galleryColumns, true)
							};
							ag.widgets.galleryColumnsSlider.getColumnValue = function() {
								switch (ag.widgets.galleryColumnsSlider
										.getValue()) {
								case 0:
									return 10;
								case 20:
									return 7;
								case 40:
									return 4;
								case 60:
									return 3
								}
							};
							ag.widgets.galleryColumnsSlider.getPixelValue = function(
									aj) {
								switch (aj) {
								case 10:
									return 0;
								case 7:
									return 20;
								case 4:
									return 40;
								case 3:
									return 60
								}
							};
							ag.widgets.galleryColumnsSlider.setGalleryItemDimensions = function ah(
									ak, an, am) {
								if (an == null) {
									an = ag.widgets.galleryColumnsSlider
											.getColumnValue()
								}
								var au = ag.widgets.dataTable.getRecordSet()
										.getLength();
								var ar = Math.ceil(au / an);
								var aq = parseInt(I.getComputedStyle(ak,
										"width"));
								var ap = Math.floor(aq / an) * 0.92;
								var at = ap * ar * 1.13;
								I.setStyle(ak, "opacity", 0);
								I.setStyle(ak, "height", at + "px");
								var al = I.get(v);
								columnOptions = [ 3, 4, 7, 10 ];
								for (var ao = 0; ao < columnOptions.length; ao++) {
									I.removeClass(ak, "alf-gallery-columns-"
											+ columnOptions[ao]);
									I.removeClass(al, "alf-gallery-columns-"
											+ columnOptions[ao])
								}
								I.addClass(ak, "alf-gallery-columns-" + an);
								I.addClass(al, "alf-gallery-columns-" + an);
								var aj = I.getChildren(ak);
								I.batch(aj, function(av) {
									I.setStyle(av, "height", ap + "px")
								});
								if (am) {
									if (!ag.widgets.galleryColumnsSlider.fadeInAnimation) {
										ag.widgets.galleryColumnsSlider.fadeInAnimation = new YAHOO.util.Anim(
												ak, {
													opacity : {
														from : 0,
														to : 1
													}
												}, 0.4,
												YAHOO.util.Easing.easeOut)
									}
									ag.widgets.galleryColumnsSlider.fadeInAnimation
											.animate()
								} else {
									I.setStyle(ak, "opacity", 1)
								}
							};
							ag.widgets.galleryColumnsSlider.setGalleryViewColumns = function ad(
									aj, al, ak) {
								ag.widgets.galleryColumnsSlider
										.setGalleryItemDimensions(aj, al, ak);
								YAHOO.Bubbling
										.fire("galleryViewColumnsChanged")
							};
							ag.widgets.galleryColumnsSlider.setColumnsPreference = function af(
									aj) {
								if (aj == null) {
									aj = ag.widgets.galleryColumnsSlider
											.getColumnValue()
								}
								ai.galleryColumns = aj;
								ag.services.preferences.set(q, aj)
							}
						},
						onShowGalleryItemDetail : function B(ar, aq, af, ao, ag) {
							var an = I.getAncestorByClassName(ao,
									aq.rowClassName);
							var ap = I.getElementsByClassName(
									aq.infoPanelClassName, null, an)[0];
							I.setStyle(ap, "display", "");
							var ad = ap.panel.cfg.getProperty("zIndex"), ah = 3;
							ap.panel.cfg.setProperty("zIndex", ah);
							ap.panel.render();
							ap.panel.show(ap.panel);
							var ai = function ae() {
								aq.onEventUnhighlightRow(ar, af, an);
								ap.panel.hide(ap.panel);
								I.setStyle(ap, "display", "none");
								ap.panel.cfg.setProperty("zIndex", ad)
							};
							if (ap.hideTimerId) {
								window.clearTimeout(ap.hideTimerId)
							}
							ap.hideTimerId = window.setTimeout(ai,
									aq.infoPanelPopupTimeout * 4);
							var ak = function aj(au, at) {
								if (at.hideTimerId) {
									window.clearTimeout(at.hideTimerId);
									at.hideTimerId = null
								}
							};
							var am = function al(av, au) {
								var aw = G.getTarget(av);
								var at = aw.relatedTarget;
								if ((at !== au) && (!I.isAncestor(au, at))) {
									if (au.hideTimerId) {
										window.clearTimeout(au.hideTimerId)
									}
									au.hideTimerId = window.setTimeout(ai,
											aq.infoPanelPopupTimeout / 100)
								}
							};
							G.on(ap, "mouseover", ak, ap);
							G.on(ap, "mouseout", am, ap)
						}
					})
})();