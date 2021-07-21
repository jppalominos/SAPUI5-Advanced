// @ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "logaligroup/Employees/model/formatter"
],
    /**
     * 
     * @param {typeof sap.ui.core.mvc.Controller} Controller 
     */
    function (Controller, formatter) {
        'use strict';

        function onInit() {
            this._bus = sap.ui.getCore().getEventBus();
        };

        function onCreateIncidence() {

            var tableIncidence = this.getView().byId("tableIncidence");
            var newIncidence = sap.ui.xmlfragment("logaligroup.Employees.fragment.NewIncidence", this);
            var incidenceModel = this.getView().getModel("incidenceModel");
            var odata = incidenceModel.getData();
            var index = odata.length;
            odata.push({ index: index + 1, _ValidateDate: false });
            incidenceModel.refresh();
            newIncidence.bindElement("incidenceModel>/" + index);
            tableIncidence.addContent(newIncidence);
        };

        function onDeleteIncidence(oEvent) {

            var contextObj = oEvent.getSource().getBindingContext("incidenceModel").getObject();
            this._bus.publish("incidence", "onDeleteIncidence", {
                IncidenceId: contextObj.IncidenceId,
                SapId: contextObj.SapId,
                EmployeeId: contextObj.EmployeeId
            });

            /*var tableIncidence = this.getView().byId("tableIncidence");
            var rowIncidence = oEvent.getSource().getParent().getParent();
            var incidenceModel = this.getView().getModel("incidenceModel");
            var odata = incidenceModel.getData();
            var contextObj = rowIncidence.getBindingContext("incidenceModel");

            //odata.splice(contextObj.index - 1, 1);
            odata.splice(contextObj.sPath.substring(1, contextObj.sPath.length), 1);
            for (var i in odata) {
                odata[i].index = parseInt(i) + 1;
            };

            incidenceModel.refresh();
            tableIncidence.removeContent(rowIncidence);

            for (var j in tableIncidence.getContent()) {
                tableIncidence.getContent()[j].bindElement("incidenceModel>/" + j)
            };*/
        };

        function onSaveIncidence(oEvent) {

            var incidence = oEvent.getSource().getParent().getParent();
            var incidenceRow = incidence.getBindingContext("incidenceModel");
            this._bus.publish("incidence", "onSaveIncidence", { incidenceRow: incidenceRow.sPath.replace('/', '') });
        };

        function updateIncidenceCreationDate(oEvent) {

            let context = oEvent.getSource().getBindingContext("incidenceModel");
            let contextObj = context.getObject();

            if (!oEvent.getSource().isValidValue()){
                contextObj._ValidateDate = false;
                contextObj.CreationDateState = "Error";
            } else {
                contextObj.CreationDateX = true;
                contextObj._ValidateDate = true;
                contextObj.CreationDateState = "None";
            };
            
            context.getModel().refresh();
        };

        function updateIncidenceReason(oEvent) {

            let context = oEvent.getSource().getBindingContext("incidenceModel");
            let contextObj = context.getObject();

            if (oEvent.getSource().getValue()){
                contextObj.ReasonX = true;    
                contextObj.ReasonState = "None";
            } else {
                contextObj.ReasonState = "Error";
            };
           
            context.getModel().refresh();
        };

        function updateIncidenceType(oEvent) {
            var context = oEvent.getSource().getBindingContext("incidenceModel");
            var contextObj = context.getObject();
            contextObj.TypeX = true;
        };

        var EmployeeDetails = Controller.extend("logaligroup.Employees.controller.EmployeeDetails", {});
        EmployeeDetails.prototype.onInit = onInit;
        EmployeeDetails.prototype.onCreateIncidence = onCreateIncidence;
        EmployeeDetails.prototype.onDeleteIncidence = onDeleteIncidence;
        EmployeeDetails.prototype.Formatter = formatter;
        EmployeeDetails.prototype.onSaveIncidence = onSaveIncidence;

        EmployeeDetails.prototype.updateIncidenceCreationDate = updateIncidenceCreationDate;
        EmployeeDetails.prototype.updateIncidenceReason = updateIncidenceReason;
        EmployeeDetails.prototype.updateIncidenceType = updateIncidenceType;

        return EmployeeDetails;

    });