var data = [0, 4, 8, 8, 15, 16, 23, 42];
var CHART_HEIGHT = 300;
var CHART_WIDTH = 300;

var x_scale = d3.scale.ordinal().domain(d3.keys(data)).rangeBands([0, CHART_WIDTH]);
var y_scale = d3.scale.linear().domain([0, d3.max(data)]).range([0, CHART_HEIGHT]);

var chart = d3.select(".chart-container").append("svg")
    .attr("class", "chart")
    .attr("height", CHART_HEIGHT)
    .attr("width", CHART_WIDTH);

chart.selectAll("rect").data(data)
    .enter().append("rect")
    .attr("width", x_scale.rangeBand())
    .attr("height", y_scale)
    .attr("x", function (d, i) {
        return x_scale(i);
    })
    .attr("y", function(d) {
        return CHART_HEIGHT-y_scale(d);
    });

chart.selectAll("text").data(data)
    .enter().append("text")
    .attr("y", function(d) {
        return CHART_HEIGHT-y_scale(d) + 3;
    })
    .attr("dy", "0.7em")
    .attr("x", function (d, i) {
        return x_scale(i) + (x_scale.rangeBand() / 2);
    })
    .attr("text-anchor", "middle")
    .text(function (d) {
        return d;
    });