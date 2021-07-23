// @ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
],
    /**
     * 
     * @param {typeof sap.ui.core.mvc.Controller} Controller 
     * @param {typeof sap.ui.core.routing.History} History 
     */
    function (Controller, History) {
        'use strict';

        return Controller.extend("logaligroup.Employees.controller.OrderDetails", {

            onInit: function () {

            },

            onBack: function (oEvent) {

                var oHistory = History.getInstance();
                var sPreviusHash = oHistory.getPreviousHash();

                if (sPreviusHash !== undefined) {
                    window.history.go(-1);
                } else {
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouter.navTo("RouteMain", true);
                };
            }
        });
    });