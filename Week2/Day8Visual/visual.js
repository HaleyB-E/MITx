var data = [0, 4, 8, 8, 15, 16, 23, 42];
var CHART_HEIGHT = 140;

var x_scale = d3.scale.linear().domain([0, d3.max(data)]).range(["0%", "100%"]);
var y_scale = d3.scale.ordinal().domain(d3.keys(data)).rangeBands([0, CHART_HEIGHT]);

var chart = d3.select(".chart-container").append("svg").attr("class", "chart");
chart.selectAll("rect").data(data)
    .enter().append("rect")
    .attr("width", x_scale).attr("height", 20)
    .attr("y", function (d, i) {
        return y_scale(i);
    });

chart.selectAll("text").data(data)
    .enter().append("text")
    .attr("x", x_scale)
    .attr("dx", -3)
    .attr("y", function (d, i) {
        return y_scale(i) + (y_scale.rangeBand() / 2);
    })
    .attr("dy", "0.35em")
    .attr("text-anchor", "end")
    .text(function (d) {
        return d;
    });