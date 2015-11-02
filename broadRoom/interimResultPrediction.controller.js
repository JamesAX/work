sap.ui.controller("broadRoom.interimResultPrediction", {

    _data: {
        "date": new Date(),
        "time": new Date().getHours() + ":" + new Date().getMinutes()
    },

    onInit: function(evt) {
        //--------get time and date--------
        var oDateModel = new sap.ui.model.json.JSONModel(this._data);
        this.getView().setModel(oDateModel);

        //-------column chart vizframe-------
        var oVizFrame1 = this.getView().byId("ORGchart");
        var oDataset1 = new sap.viz.ui5.data.FlattenedDataset({
            'dimensions': [{
                'name': 'Country',
                'value': "{Country}"
            }],

            'measures': [{
                'name': 'Profit',
                'value': '{profit}'
            }, {
                'name': 'Revenue',
                'value': '{revenue}'
            }, {
                'name': 'Income',
                'value': '{income}'
            }],
            'data': {
                'path': "/businessData"
            }
        });
        var oModel1 = new sap.ui.model.json.JSONModel({
            'businessData': [{
                'Country': "Canada",
                'revenue': 410.87,
                'profit': 141.25,
                'income': 150.55
            }, {
                'Country': "China",
                'revenue': 338.29,
                'profit': 133.82,
                'income': 150.55
            }, {
                'Country': "France",
                'revenue': 487.66,
                'profit': 348.76,
                'income': 150.55
            }, {
                'Country': "Germany",
                'revenue': 470.23,
                'profit': 217.29,
                'income': 150.55
            }, {
                'Country': "India",
                'revenue': 170.93,
                'profit': 117.00,
                'income': 150.55
            }, {
                'Country': "United States",
                'revenue': 905.08,
                'profit': 609.16,
                'income': 150.55
            }, {
                'Country': "Italy",
                'revenue': 410.87,
                'profit': 141.25,
                'income': 150.55
            }, {
                'Country': "Spain",
                'revenue': 338.29,
                'profit': 133.82,
                'income': 150.55
            }, {
                'Country': "Portugal",
                'revenue': 487.66,
                'profit': 348.76,
                'income': 150.55
            }, {
                'Country': "Ireland",
                'revenue': 470.23,
                'profit': 217.29,
                'income': 150.55
            }, {
                'Country': "Scotland",
                'revenue': 170.93,
                'profit': 117.00,
                'income': 150.55
            }, {
                'Country': "Wales",
                'revenue': 905.08,
                'profit': 609.16,
                'income': 150.55
            }, {
                'Country': "England",
                'revenue': 410.87,
                'profit': 141.25,
                'income': 150.55
            }, {
                'Country': "Belgium",
                'revenue': 338.29,
                'profit': 133.82,
                'income': 150.55
            }, {
                'Country': "Netherlands",
                'revenue': 470.23,
                'profit': 217.29,
                'income': 150.55
            }, {
                'Country': "Poland",
                'revenue': 170.93,
                'profit': 117.00,
                'income': 150.55
            }, {
                'Country': "Danemark",
                'revenue': 905.08,
                'profit': 609.16,
                'income': 150.55
            }, {
                'Country': "Sweden",
                'revenue': 410.87,
                'profit': 141.25,
                'income': 150.55
            }, {
                'Country': "Norway",
                'revenue': 338.29,
                'profit': 133.82,
                'income': 150.55
            }, {
                'Country': "Finland",
                'revenue': 487.66,
                'profit': 348.76,
                'income': 150.55
            }]
        });
        var feedPrimaryValues1 = new sap.viz.ui5.controls.common.feeds.FeedItem({
                'uid': "primaryValues",
                'type': "Measure",
                'values': ["Revenue", "Income", "Profit"]
            }),
            feedAxisLabels1 = new sap.viz.ui5.controls.common.feeds.FeedItem({
                'uid': "axisLabels",
                'type': "Dimension",
                'values': [new sap.viz.ui5.controls.common.feeds.AnalysisObject({
                    'uid': "Country",
                    'type': "Dimension",
                    'name': "Country"
                })]
            });

        oVizFrame1.setVizProperties({
            categoryAxis: {
                title: {
                    visible: false
                }
            },
            valueAxis: {
                title: {
                    visible: false
                }
            },
            plotArea: {
                dataLabel: {
                    formatString: 'datalabelFormat',
                    visible: false
                },
                dataShape: {
                    primaryAxis: ["line", "bar", "bar"]
                }
            },
            title: {
                visible: false,
            }
        });
        oVizFrame1.setDataset(oDataset1);
        oVizFrame1.setModel(oModel1);
        oVizFrame1.addFeed(feedPrimaryValues1);
        oVizFrame1.addFeed(feedAxisLabels1);
        oVizFrame1.setVizType('stacked_combination');

        //--------stacked bar chart vizframe---------
        var oVizFrame2 = this.getView().byId("RMSchart");
        var oModel2 = new sap.ui.model.json.JSONModel([{
            "Country": "China",
            "Profit": 100,
            "Forcast": 200,
            "Target": 20
        }, {
            "Country": "Japan",
            "Profit": 159,
            "Forcast": 140,
            "Target": 150
        }, {
            "Country": "India",
            "Profit": 129,
            "Forcast": 120,
            "Target": 100
        }, {
            "Country": "France",
            "Profit": 58,
            "Forcast": 60,
            "Target": 80
        }]);
        var oDataset2 = new sap.viz.ui5.data.FlattenedDataset({
            dimensions: [{
                name: 'Country',
                value: "{Country}"
            }],
            measures: [{
                name: 'Profit',
                value: '{Profit}'
            }, {
                name: 'Target',
                value: '{Target}'
            }],
            data: {
                path: "/"
            }
        });


        var feedPrimaryValues2 = new sap.viz.ui5.controls.common.feeds.FeedItem({
                'uid': "primaryValues",
                'type': "Measure",
                'values': ["Profit"]
            }),
            feedAxisLabels2 = new sap.viz.ui5.controls.common.feeds.FeedItem({
                'uid': "axisLabels",
                'type': "Dimension",
                'values': ["Country"]
            }),
            feedTargetValues2 = new sap.viz.ui5.controls.common.feeds.FeedItem({
                'uid': "targetValues",
                'type': "Measure",
                'values': ["Target"]
            });

        oVizFrame2.setDataset(oDataset2);
        oVizFrame2.setModel(oModel2);
        oVizFrame2.addFeed(feedPrimaryValues2);
        oVizFrame2.addFeed(feedAxisLabels2);
        oVizFrame2.addFeed(feedTargetValues2);
        oVizFrame2.setVizType('stacked_bar');
    },

    onAfterRendering: function() {}


});
