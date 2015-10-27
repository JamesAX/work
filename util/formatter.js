jQuery.sap.declare("util.formatter");
var formatter = {
  /**
   * Bar info
   * @param  {} barInfo
   * @return {}
   */
  ganttChartBarFormatter: function (level, color, startDate, endDate, targetDate) {
    //Remove style class first
    this.removeStyleClass('main-bar');
    this.removeStyleClass('first-bar');
    this.removeStyleClass('second-bar');
    this.removeStyleClass('bar-color-red');
    this.removeStyleClass('bar-color-green');
    this.removeStyleClass('bar-color-yellow');

	this.getParent().removeStyleClass('main-container-box');
	this.getParent().removeStyleClass('first-container-box');
	this.getParent().removeStyleClass('second-container-box');


    var valid = true;

    //Set the length of bar
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    targetDate = new Date(targetDate);
    var overallStartDate = new Date(sap.startDate);

    var beginDays = (startDate.getTime() - overallStartDate.getTime()) / 86400000 + 1;
    var endDays = (endDate.getTime() - overallStartDate.getTime()) / 86400000 + 1;
    var targetDays = (targetDate.getTime() - overallStartDate.getTime()) / 86400000 + 1;

    var columnNumber = this.getId().match(/col\d+/g)[0].match(/\d+/g)[0];
    columnNumber = parseInt(columnNumber, 10);

    if (columnNumber <= endDays && columnNumber >= beginDays) {
      valid = true;
    } else {
      valid = false;
    }

    if (valid) {
      //Add style class - set the width of bar
      if (level === '1') {
        this.addStyleClass('main-bar');
        this.getParent().addStyleClass('main-container-box');
      } else if (level === '2') {
        this.addStyleClass('first-bar');
        this.getParent().addStyleClass('first-container-box');
      } else if (level === '3') {
        this.addStyleClass('second-bar');
        this.getParent().addStyleClass('second-container-box');
      }
      //Add style class - set color of bar
      if (color === 'red') {
        this.addStyleClass('bar-color-red');
      } else if (color === 'green') {
        this.addStyleClass('bar-color-green');
      } else if (color === 'yellow') {
        this.addStyleClass('bar-color-yellow');
      }
      //Set Target Line
      if(columnNumber === targetDays) {
      	this.getParent().addStyleClass('target-border');
      	this.addStyleClass('target-gantt-cell');
      } else {
      	this.getParent().removeStyleClass('target-border');
      	this.removeStyleClass('target-gantt-cell');
      }
    }
  },
};