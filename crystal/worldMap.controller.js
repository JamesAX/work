sap.ui.controller("crystal.worldMap", {


    onInit: function() {

        //first chart
        var oVizFrame = this.getView().byId("vizFrameLine");

        var oModel_bl = new sap.ui.model.json.JSONModel({
            "Products": [{
                "Month": "Jan",
                "Profit": 450,
                "Forcast": 200,
                "Target": 20,
                "Revenue": 20,
                "Revenue2": 30,
                "Revenue3": 40
            }, {
                "Month": "Feb",
                "Profit": 490,
                "Forcast": 140,
                "Target": 150,
                "Revenue": 20,
                "Revenue2": 30,
                "Revenue3": 40
            }, {
                "Month": "Mar",
                "Profit": 450,
                "Forcast": 120,
                "Target": 100,
                "Revenue": 30,
                "Revenue2": 40,
                "Revenue3": 60
            }, {
                "Month": "Apr",
                "Profit": 440,
                "Forcast": 60,
                "Target": 80,
                "Revenue": 35,
                "Revenue2": 30,
                "Revenue3": 50
            }, {
                "Month": "May",
                "Profit": 460,
                "Forcast": 120,
                "Target": 150,
                "Revenue": 40,
                "Revenue2": 65,
                "Revenue3": 70
            }, {
                "Month": "June",
                "Profit": 470,
                "Forcast": 60,
                "Target": 55,
                "Revenue": 50,
                "Revenue2": 60,
                "Revenue3": 70
            }]
        });
        var oDataset_bl = new sap.viz.ui5.data.FlattenedDataset({
            dimensions: [{
                name: 'Month',
                value: "{Month}"
            }],
            measures: [{
                group: 1,
                name: 'Profit',
                value: '{Profit}'
            }, {
                group: 1,
                name: 'Target',
                value: '{Target}'
            }, {
                group: 1,
                name: "Forcast",
                value: "{Forcast}"
            }, {
                group: 1,
                name: "Revenue",
                value: "{Revenue}"
            }, {
                group: 1,
                name: 'Revenue2',
                value: '{Revenue2}'
            }, {
                group: 1,
                name: "Revenue3",
                value: "{Revenue3}"
            }],
            data: {
                path: "/Products"
            }
        });

        oVizFrame.setVizProperties({
            general: {
                layout: {
                    padding: 0.04
                }
            },
            plotArea: {

            },
            legend: {
                title: {
                    visible: false
                }
            },
            valueAxis: {
                title: {
                    text: "Order Number"
                }
            },
            title: {
                text: "Production Order Track and Predict"
            },
            categoryAxis: {
                title: {
                    visible: false
                }
            }

        });
        oVizFrame.setDataset(oDataset_bl);
        oVizFrame.setModel(oModel_bl);

        var feedPrimaryValues_bl7 = new sap.viz.ui5.controls.common.feeds.FeedItem({
                'uid': "primaryValues",
                'type': "Measure",
                'values': ["Profit", "Revenue","Revenue2","Revenue3"]
            }),
            feedAxisLabels_bl7 = new sap.viz.ui5.controls.common.feeds.FeedItem({
                'uid': "axisLabels",
                'type': "Dimension",
                'values': ["Month"]
            }),
            feedTargetValues_bl7 = new sap.viz.ui5.controls.common.feeds.FeedItem({
                'uid': "targetValues",
                'type': "Measure",
                'values': ["Target"]
            });

        oVizFrame.addFeed(feedPrimaryValues_bl7);
        oVizFrame.addFeed(feedAxisLabels_bl7);
        oVizFrame.addFeed(feedTargetValues_bl7);
        oVizFrame.setVizType('line');


        //second chart
        var oVizFrame3 = this.getView().byId("vizFrameBullet");

        var oModel2 = new sap.ui.model.json.JSONModel({
            "Products": [{
                "Quarter": "Q1",
                "Profit": 100,
                "Forcast": 200,
                "Target": 200,
                "Revenue": 100,
                "Revenue2": 150,
                "Target2": 512
            }, {
                "Quarter": "Q2",
                "Profit": 129,
                "Forcast": 120,
                "Target": 100,
                "Revenue": 200,
                "Revenue2": 222,
                "Target2": 263
            }, {
                "Quarter": "Q3",
                "Profit": 58,
                "Forcast": 60,
                "Target": 80,
                "Revenue": 116,
                "Revenue2": 152,
                "Target2": 113
            }, {
                "Quarter": "Q4",
                "Profit": 49,
                "Forcast": 60,
                "Target": 55,
                "Revenue": 144,
                "Revenue2": 242,
                "Target2": 243
            }]
        });
        var oDataset2 = new sap.viz.ui5.data.FlattenedDataset({
            dimensions: [{
                name: 'Quarter',
                value: "{Quarter}"
            }],
            measures: [{
                group: 1,
                name: 'Profit',
                value: '{Revenue2}'
            }, {
                group: 1,
                name: 'Target',
                value: '{Target}'
            }, {
                group: 1,
                name: "Forcast",
                value: "{Forcast}"
            }, {
                group: 1,
                name: "Revenue",
                value: "{Revenue}"
            }, {
                group: 1,
                name: 'Revenue2',
                value: '{Revenue2}'
            }, {
                group: 1,
                name: "Target2",
                value: "{Target2}"
            }],
            data: {
                path: "/Products"
            }
        });

        oVizFrame3.setVizProperties({
            plotArea: {
                showGap: true
            },
            title: {
                text: "Revenue Analysis and Predict"
            },
            valueAxis: {
                title: {
                    visible: false
                }
            }
        });
        oVizFrame3.setDataset(oDataset2);
        oVizFrame3.setModel(oModel2);

        var feedPrimaryValues2 = new sap.viz.ui5.controls.common.feeds.FeedItem({
                'uid': "primaryValues",
                'type': "Measure",
                'values': ["Revenue", "Revenue2"]
            }),
            feedAxisLabels2 = new sap.viz.ui5.controls.common.feeds.FeedItem({
                'uid': "axisLabels",
                'type': "Dimension",
                'values': ["Quarter"]
            }),
            feedTargetValues2 = new sap.viz.ui5.controls.common.feeds.FeedItem({
                'uid': "targetValues",
                'type': "Measure",
                'values': ["Target", "Target2"]
            });

        oVizFrame3.addFeed(feedPrimaryValues2);
        oVizFrame3.addFeed(feedAxisLabels2);
        oVizFrame3.addFeed(feedTargetValues2);
        oVizFrame3.setVizType('vertical_bullet');

        //third chart
        var oVizFrame3 = this.getView().byId("vizFrameScatter");

        var oVizFrame3Model = new sap.ui.model.json.JSONModel({
            'businessData': [{
                "Sales_Month": "April",
                "Marital Status": "Married",
                "Customer Gender": "Female",
                "Sales_Quarter": "Q1",
                "Cost": 190,
                "Unit Price": 128.3,
                "Gross Profit": 321,
                "Sales Revenue": 120
            }, {
                "Sales_Month": "May",
                "Marital Status": "Married",
                "Customer Gender": "Female",
                "Sales_Quarter": "Q2",
                "Cost": 189.9,
                "Unit Price": 151.17,
                "Gross Profit": 181.59,
                "Sales Revenue": 471.49
            }, {
                "Sales_Month": "June",
                "Marital Status": "Married",
                "Customer Gender": "Female",
                "Sales_Quarter": "Q3",
                "Cost": 135,
                "Unit Price": 321,
                "Gross Profit": 124,
                "Sales Revenue": 349
            }, {
                "Sales_Month": "July",
                "Marital Status": "Married",
                "Customer Gender": "Female",
                "Sales_Quarter": "Q4",
                "Cost": 169.4,
                "Unit Price": 185.2,
                "Gross Profit": 153.8,
                "Sales Revenue": 145.9
            }, {
                "Sales_Month": "Augst",
                "Marital Status": "Married",
                "Customer Gender": "Male",
                "Sales_Quarter": "Q1",
                "Cost": 270.2,
                "Unit Price": 175,
                "Gross Profit": 154.3,
                "Sales Revenue": 164.9
            }]
        });

        var oDataset1 = new sap.viz.ui5.data.FlattenedDataset({
            dimensions: [{
                name: 'Sales_Quarter',
                value: "{Sales_Quarter}"
            }, {
                name: 'Customer Gender',
                value: "{Customer Gender}"
            }, {
                name: 'Sales_Month',
                value: "{Sales_Month}"
            }, {
                name: 'Marital Status',
                value: "{Marital Status}"
            }],

            measures: [{
                name: 'Cost',
                value: '{Cost}'
            }, {
                name: 'Unit Price',
                value: '{Unit Price}'
            }, {
                name: 'Gross Profit',
                value: '{Gross Profit}'
            }, {
                name: 'Sales Revenue',
                value: '{Sales Revenue}'
            }],

            data: {
                path: "/businessData"
            }
        });
        oVizFrame3.setDataset(oDataset1);
        oVizFrame3.setModel(oVizFrame3Model);

        //set feeds
        var feedPrimaryValues1 = new sap.viz.ui5.controls.common.feeds.FeedItem({
                "uid": "primaryValues",
                "type": "Measure",
                "values": ["Cost"]
            }),
            feedSecondaryValues1 = new sap.viz.ui5.controls.common.feeds.FeedItem({
                "uid": "secondaryValues",
                "type": "Measure",
                "values": ["Unit Price"]
            }),
            feedBubbleWidth1 = new sap.viz.ui5.controls.common.feeds.FeedItem({
                "uid": "bubbleWidth",
                "type": "Measure",
                "values": ["Gross Profit"]
            }),
            feedBubbleHeight1 = new sap.viz.ui5.controls.common.feeds.FeedItem({
                "uid": "bubbleHeight",
                "type": "Measure",
                "values": ["Sales Revenue"]
            }),
            feedRegionColor1 = new sap.viz.ui5.controls.common.feeds.FeedItem({
                "uid": "regionColor",
                "type": "Dimension",
                "values": ["Sales_Month", "Sales_Quarter", "Customer Gender"]
            }),
            feedRegionShape1 = new sap.viz.ui5.controls.common.feeds.FeedItem({
                "uid": "regionShape",
                "type": "Dimension",
                "values": ["Marital Status"]
            });

        oVizFrame3.setVizProperties({
            title: {
                text: "Labors Performance Analysis"
            },
            sizeLegend: {
                visible: false
            },
            legend: {
                visible: false
            },
            valueAxis: {
                title: {
                    visible: false
                }
            },
            valueAxis2: {
                title: {
                    visible: false
                }
            }
        });

        oVizFrame3.addFeed(feedPrimaryValues1);
        oVizFrame3.addFeed(feedSecondaryValues1);
        oVizFrame3.addFeed(feedBubbleWidth1);
        oVizFrame3.addFeed(feedBubbleHeight1);
        oVizFrame3.addFeed(feedRegionColor1);
        oVizFrame3.addFeed(feedRegionShape1);
        oVizFrame3.setVizType('bubble');
    }

    

});
