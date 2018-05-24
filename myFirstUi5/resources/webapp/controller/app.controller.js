sap.ui.define([
	"jquery.sap.global",
	"sap/m/MessageToast",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(jQuery, MessageToast, Controller, JSONModel) {
	"use strict";
	return Controller.extend("myFirstUi5.controller.app", {
				onInit: function() {
					var myController  = this;
					var view = this.getView();
				// 	var sUrl = "/xsodata/corn.xsodata";
				// 	var oModel = new JSONModel(sUrl);
				// sap.ui.getCore().setModel(oModel);
				// 	//var oModel = new sap.ui.model.odata.ODataModel("/xsodata/corn.xsodata", true);
				$.ajax({
				type: 'get',
				url: '/node/select/corn',
				success: function(data) {
					//build model
					myController.buildTable(myController,data);
					view.byId("datasetRadioGroup").getSelectedButton().fireSelect();
					}
				});
				},
			buildTable: function(mycontroller, dataModel){
			var view = mycontroller.getView();
			var oTable = view.byId("productTable");
			//create coloumns by going over the keys of first data in the array
			for (var key in dataModel.Objects[0]) {
    	if (dataModel.Objects[0].hasOwnProperty(key)) {
        var coloumnName = key.slice(0, key.length);
        oTable.addColumn(new sap.ui.table.Column({
		label: new sap.m.Label({text: coloumnName}),
		template: new sap.m.Text({text: "{"+coloumnName+"}"}),
		/*template: new sap.ui.commons.Text().bindProperty("value", coloumnName),*/
		sortProperty: coloumnName,
		filterProperty: coloumnName
/*
oTable.addColumn(new sap.ui.table.Column({
    label: new sap.ui.commons.Label({text: "First Name"}), 
    template: new sap.ui.commons.TextField({value: "{name}"})
  }));
*/
  }));
    }
}				//bind to model
				var oModel = new JSONModel(dataModel.Objects);
					//bind model to table
					view.byId("productTable").setModel(oModel);
					view.byId("productTable").bindRows("/");
				
		},
		onDatasetSelected: function(oEvent) {
			var view = this.getView();
			var myController = this;
			var DataSetKey = oEvent.getSource().data("key");
			 

			switch (DataSetKey) {
				case "new":
					var newest = view.byId("productTable").getModel().oData[0]._SETTLE.toString().slice(0);
					view.byId("dynamicText").setText("Most  recent settle value is: " +newest);
					break;
				case "old":
					var oldest = view.byId("productTable").getModel().oData[view.byId("productTable").getModel().oData.length-1]._SETTLE.toString().slice(0);
					view.byId("dynamicText").setText("Oldest settle value is:" +oldest);
					break;
				default:
					
			}


 		}
	});
});