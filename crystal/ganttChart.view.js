jQuery.sap.require("util.formatter");

var FORMATTER = formatter;
sap.ui.jsview("crystal.ganttChart", {

  getControllerName: function () {
    return "crystal.ganttChart";
  },

  onBeforeShow: function (evt) {

  },

  onAfterShow: function (evt) {
    var DOC_DATA = evt.data.DOC_DATA;
  },

  createContent: function (oController) {
    //Bring the table onto the UI 
    var ganttChartBox = this.createGanttChartBox(oController);

    var chartBox = this.createCharts(oController);


    var viewBox = new sap.m.HBox({
      items: [
        ganttChartBox,
        chartBox
      ]
    });
    return viewBox;
  },

  createCharts: function (oController) {
    this.sideCharts = sap.ui.xmlfragment("fragment.sideCharts", this);

    this.setPieChart();
    this.setColumnChart();

    return this.sideCharts;
  },

  setPieChart: function () {
    /***************** Pie Chart Start *************************/
    //Data
    var oData = this.testData.pieData;
    var oModel = new sap.ui.model.json.JSONModel();
    oModel.setData(oData);
    //Dataset
    var oDataset = new sap.viz.ui5.data.FlattenedDataset({
      dimensions: [{
        name: "Store Name",
        value: "{Store Name}"
      }],
      measures: [{
        name: 'Revenue',
        value: '{Revenue}'
      }],
      data: {
        path: "/milk"
      }
    });

    //Set Dataset
    sapById('idVizFramePie').setDataset(oDataset);
    //Set Model
    sapById('idVizFramePie').setModel(oModel);

    //Feedsize
    var feedSize = new sap.viz.ui5.controls.common.feeds.FeedItem({
        'uid': "size",
        'type': "Measure",
        'values': ["Revenue"]
      }),
      feedColor = new sap.viz.ui5.controls.common.feeds.FeedItem({
        'uid': "color",
        'type': "Dimension",
        'values': ["Store Name"]
      });
    //Set feed
    sapById('idVizFramePie').addFeed(feedSize);

    //Set feed color
    sapById('idVizFramePie').addFeed(feedColor);
    //set other properties
    sapById('idVizFramePie').setVizProperties({
      legend: {
        title: {
          visible: false
        }
      },
      title: {
        visible: false,
      }
    });
    /***************** Pie Chart Finish *************************/
  },

  setColumnChart: function () {
    //Data
    var oData = this.testData.pieData;
    var oModel = new sap.ui.model.json.JSONModel();
    oModel.setData(oData);
    //Dataset
    var oDataset = new sap.viz.ui5.data.FlattenedDataset({
      dimensions: [{
        name: "Store Name",
        value: "{Store Name}"
      }],
      measures: [{
        name: 'Revenue',
        value: '{Revenue}'
      }],
      data: {
        path: "/milk"
      }
    });

    //Set Dataset
    sapById('idVizFrameColumn').setDataset(oDataset);
    //Set Model
    sapById('idVizFrameColumn').setModel(oModel);

    var feedValueAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
        'uid': "valueAxis",
        'type': "Measure",
        'values': ["Revenue"]
      }),
      feedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
        'uid': "categoryAxis",
        'type': "Dimension",
        'values': ["Store Name"]
      });
    sapById('idVizFrameColumn').addFeed(feedValueAxis);
    sapById('idVizFrameColumn').addFeed(feedCategoryAxis);

    sapById('idVizFrameColumn').setVizProperties({
      general: {
        layout: {
          padding: 0.04
        }
      },
      valueAxis: {
        label: {
          formatString: 'axisFormat'
        },
        title: {
          visible: false
        }
      },
      categoryAxis: {
        title: {
          visible: false
        }
      },
      plotArea: {
        dataLabel: {
          visible: true,
          formatString: 'datalabelFormat',
          style: {
            color: null
          }
        }
      },
      legend: {
        title: {
          visible: false
        }
      },
      title: {
        visible: false,
        text: 'Revenue by City and Store Name'
      }
    });
    /***************** Column Chart Finish *************************/

  },

  createGanttChartBox: function (oController) {
    //Define some sample data 
    var oData = this.testData.ganttData;

    //Begin date
    sap.startDate = '2015-01-01';

    //get period
    var startDate = oData.root[0].startDate.replace(/\-/g, '/');
    var endDate = oData.root[0].endDate.replace(/\-/g, '/');
    var targetDate = oData.root[0].targetDate.replace(/\-/g, '/');

    startDate = new Date(startDate);
    endDate = new Date(endDate);
    targetDate = new Date(targetDate);

    var periodDays = (endDate.getTime() - startDate.getTime()) / 86400000;
    var targetPeriodDays = (targetDate.getTime() - startDate.getTime()) / 86400000;

    //Create an instance of the table control
    var oTable = new sap.ui.table.TreeTable('tree-table', {
      columns: [
        new sap.ui.table.Column({
          label: "Name",
          template: "name",
          width: '150px',
          resizable: false,
          autoResizable: true
        })
      ],
      selectionMode: sap.ui.table.SelectionMode.Single,
      selectionBehavior: 'Row',
      fixedColumnCount: 1,
      visibleRowCount: 13,
      width: '1050px',
      height: '800px'
      // enableColumnReordering: true,
      // expandFirstLevel: true
    });

    //Create header texts
    var dates = [];
    var tempStartDate = startDate;

    while (tempStartDate.getTime() !== endDate.getTime() + 86400000) {
      dates.push({
        yearMonth: tempStartDate.getFullYear() + '-' + (tempStartDate.getMonth() + 1),
        day: tempStartDate.getDate()
      });
      tempStartDate = new Date(tempStartDate.getTime() + 86400000);
    }

    //Create Headers
    var tempFirstDate = '';
    dates.forEach(function (date) {
      yearMonthText = date.yearMonth;
      var dayText = date.day;

      //Style Class
      var yearMonthClass = '';

      if (tempFirstDate === date.yearMonth) {
        yearMonthText = '';
      } else {
        tempFirstDate = yearMonthText;
        yearMonthClass = 'show-year-month';
      }

      oTable.addColumn(new sap.ui.table.Column({
        multiLabels: new sap.m.VBox({
          items: [
            new sap.m.Label({
              text: yearMonthText
            }).addStyleClass(yearMonthClass),
            new sap.m.Label({
              text: dayText
            })
          ]
        }).addStyleClass('header-box'),
        template: new sap.m.HBox({
          alignItems: 'Center',
          items: [
            new sap.m.Text({
              text: {
                parts: [{
                  path: 'level'
                }, {
                  path: 'color'
                }, {
                  path: 'startDate'
                }, {
                  path: 'endDate'
                }, {
                  path: 'targetDate'
                }, ],
                formatter: FORMATTER.ganttChartBarFormatter
              }
            })
          ]
        }).addStyleClass('gantt-cell'),
        width: '30px'
      }));
    });


    oTable.addColumn(new sap.ui.table.Column({
      label: "Estimated Loss(HKD)",
      template: "estLoss",
      width: '150px',
      resizable: false,
      autoResizable: true
    }));

    //Create a model and bind the table rows to this model
    var oModel = new sap.ui.model.json.JSONModel();
    oModel.setData(oData);
    oTable.setModel(oModel);
    oTable.bindRows("/root");


    //Put Table in the box
    var tableBox = new sap.m.HBox('table-box');
    tableBox.addItem(oTable);

    return tableBox;
  },

  testData: {
    ganttData: {
      root: {
        name: "root",
        description: "root description",
        checked: false,
        0: {
          name: "item1",
          description: "item1 description",
          startDate: '2015-01-01',
          endDate: '2015-03-31',
          targetDate: '2015-02-01',
          level: '1',
          color: 'red',
          estLoss: '1000',
          estLoss: '1000',
          0: {
            name: "subitem1-1",
            description: "subitem1-1 description",
            startDate: '2015-01-11',
            endDate: '2015-02-31',
            targetDate: '2015-02-01',
            level: '2',
            color: 'red',
            0: {
              name: "subsubitem1-1-1",
              description: "subsubitem1-1-1 description",
              startDate: '2015-01-11',
              endDate: '2015-02-20',
              targetDate: '2015-02-01',
              level: '3',
              color: 'green',
            },
            1: {
              name: "subsubitem1-1-2",
              description: "subsubitem1-1-2 description",
              startDate: '2015-01-15',
              endDate: '2015-02-20',
              targetDate: '2015-02-01',
              level: '3',
              color: 'green',
            }
          },
          1: {
            name: "subitem1-2",
            description: "subitem1-2 description",
            startDate: '2015-01-08',
            endDate: '2015-03-31',
            targetDate: '2015-02-01',
            level: '2',
            color: 'green',
            0: {
              name: "subsubitem1-2-1",
              description: "subsubitem1-2-1 description",
              startDate: '2015-01-08',
              endDate: '2015-03-31',
              targetDate: '2015-02-01',
              level: '3',
              color: 'green',
            }
          }
        },
        1: {
          name: "item2",
          description: "item2 description",
          startDate: '2015-01-15',
          endDate: '2015-03-31',
          targetDate: '2015-02-01',
          level: '1',
          color: 'red',
          estLoss: '1000',
          0: {
            name: "subitem2-1",
            description: "subitem2-1 description",
            startDate: '2015-01-15',
            endDate: '2015-03-31',
            targetDate: '2015-02-01',
            level: '2',
            color: 'yellow',
          }
        },
        2: {
          name: "item3",
          description: "item3 description",
          startDate: '2015-01-20',
          endDate: '2015-03-31',
          targetDate: '2015-02-01',
          level: '2',
          color: 'yellow',
          estLoss: '1000'
        }
      }
    },
    pieData: {
      "milk": [{
        "Store Name": "24-Seven",
        "Revenue": 428214.13,
        "Cost": 94383.52,
        "Consumption": 76855.15368
      }, {
        "Store Name": "A&A",
        "Revenue": 1722148.36,
        "Cost": 274735.17,
        "Consumption": 310292.22
      }]
    }

  }

});