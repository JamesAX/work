sap.ui.core.Control.extend("control.worldMap", {
  metadata: { // the Control API
    properties: {
      "name": "string" // setter and getter are created behind the scenes, 
        // including data binding and type validation
    }
  },
  init: function() {},
  renderer: function(oRm, oControl) { // the part creating the HTML
    // oControl.draw();
    setTimeout(function() {
      oControl.draw();
      $(window)
        .resize(function() {
          oControl.draw();
        });
    }, 100);
  },
  draw: function() {
    var parentId = this.getParent()
      .getId();
    $('#' + parentId)
      .empty();
    this.createMap();
  },
  createMap: function() {
    var parentId = this.getParent()
      .getId();
    var width = 1300;
    height = 900;
    var projection = d3.geo.mercator()
      .scale(800)
      .translate([-900, 900])
    var svg = d3.select("#" + parentId)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    var path = d3.geo.path().projection(projection);
    var g = svg.append("g");
    var tooltip = d3.select("body")
      .append("div")
      .attr("class", "tooltip");
    // load and display the World
    d3.json("data/world-110m2.json", function(error, topology) {
      // load and display the cities
      d3.csv("data/cities.csv", function(error, data) {
        var gEnter = g.selectAll("circle")
          .data(data)
          .enter();
        //add circles and tooltips
        gEnter.append("a")
          .attr("xlink:href", '#')
          .append("circle")
          .attr("class", "circle")
          .attr("cx", function(d) {
            return projection([d.lon, d.lat])[0];
          })
          .attr("cy", function(d) {
            return projection([d.lon, d.lat])[1];
          })
          .attr("r", 5)
          .style("stroke", "white")
          .style("fill","pink")
          //add popover
          .on("click", function(data) {
            var that = this;
            //get city name to popover
            var model = new sap.ui.model.json.JSONModel();
            model.setData(data);

            var popover = sap.ui.xmlfragment("fragment.popover");
            popover.setModel(model);
            popover.bindElement("/");
            jQuery.sap.delayedCall(0, that, function () {
              popover.openBy(that);
            });
          })
          .on("mousemove", function() {
            return tooltip.style("top", (d3.event.pageY - height / 2.8) + "px").style("left", (d3.event.pageX - width / 3.8) + "px");
          })
          .on("mouseout", function() {
            return tooltip.style("visibility", "hidden");
          });

        //add place names
        gEnter.append("text")
          .attr("dx", function(d) {
            return projection([d.lon, d.lat])[0];
          })
          .attr("dy", function(d) {
            return projection([d.lon, d.lat])[1] - 15;
          })
          .style("font-size", "9px")
          .text(function(d) {
            return d.city
          });

        //add map markers      
        var mapMarker = gEnter.append("image")
          .attr("xlink:href",
            "https://cdn0.iconfinder.com/data/icons/weboo-2/128/pin.png"
          )

        mapMarker.attr("x", function(d) {
            return projection([d.lon, d.lat])[0] - 18;
          })
          .attr("y", function(d) {
            return projection([d.lon, d.lat])[1] - 36;
          })
          .attr("width", 36)
          .attr("height", 36)
          .style("opacity", 0)
          .on("mouseover", function() {
            d3.select(this)
              .style("opacity", "1")
              .style("transition", "0.5s");
          })
          .on("mouseout", function() {
            d3.select(this).style("opacity", "0");
          });
      });
      g.selectAll("path")
        .data(topojson.object(topology, topology.objects.countries).geometries)
        .enter()
        .append("path")
        .attr("d", path)
    });
    // zoom and pan
    var zoom = d3.behavior.zoom()
      .on("zoom", function() {
        g.attr("transform", "translate(" + d3.event.translate.join(",") +
          ")scale(" + d3.event.scale + ")");
        g.selectAll("circle")
          .attr("d", path.projection(projection));
        g.selectAll("path")
          .attr("d", path.projection(projection));
      });
    svg.call(zoom)
  }
});