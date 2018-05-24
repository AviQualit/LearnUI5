sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"myFirstUi5/model/models",
	"sap/ui/model/json/JSONModel"
], function(UIComponent, Device, models,JSONModel) {
	"use strict";

	return UIComponent.extend("myFirstUi5.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			jQuery.sap.require("sap.m.MessageBox");
			jQuery.sap.require("sap.m.MessageToast");

			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");

			this.setModel(oModel, "device");

			sap.ui.core.UIComponent.prototype.init.apply(
				this, arguments);
		
		}
	});
});