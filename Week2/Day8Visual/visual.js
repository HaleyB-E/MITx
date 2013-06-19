var OUTER_HEIGHT = 300;
var OUTER_WIDTH = 300;

var margin = { top: 20, right: 20, bottom: 20, left: 20 };

var chart_width = OUTER_WIDTH - margin.left - margin.right;
var chart_height = OUTER_HEIGHT - margin.top - margin.bottom;

var stack = d3.layout.stack();
var stackedData = stack(data);

var yStackMax = d3.max(stackedData, function(layer) {
    return d3.max(layer, function(d){
        return d.y + d.y0;
    });
});

var yGroupMax = d3.max(stackedData, function(layer){
    return d3.max(layer, function(d){
        return d.y;
    })
});

var x_scale = d3.scale.ordinal().domain(d3.range(data[0].length)).rangeBands([0, chart_width]);
var y_scale = d3.scale.linear().domain([0, yStackMax]).range([chart_height, 0]);
var chartColor1 = d3.scale.linear().domain([1,10]).range(['#FF0000', '#620101']);
var chartColor2= d3.scale.linear().domain([1,50]).range(['#FCFF00', '#6E4A06']);
var chartColor3 = d3.scale.linear().domain([1, 20]).range(['#2CFF01', '#105A01']);
var chartColor4 = d3.scale.linear().domain([1, 35]).range(['#0A23FF', '#010741']);

var chart = d3.select(".chart-container").append("svg")
    .attr("class", "chart")
    .attr("height", OUTER_HEIGHT)
    .attr("width", OUTER_WIDTH)
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//add horizontal lines to chart
chart.selectAll("line").data(y_scale.ticks(10))
    .enter().append("line")
    .attr("x1", 0)
    .attr("x2", chart_width)
    .attr("y1", y_scale)
    .attr("y2", y_scale);

//add y-axis labels
chart.selectAll(".y-scale-label").data(y_scale.ticks(10))
    .enter().append("text")
    .attr("class", "y-scale-label")
    .attr("x", 0)
    .attr("y", y_scale)
    .text(String)      //shorthand version of the identity function (NOTE this converts to string)
    .attr("text-anchor", "end")
    .attr("dy", "0.3em")
    .attr("dx", -(margin.left / 8));

//create groups for stacked chart
var layer_groups = chart.selectAll(".layer").data(stackedData)
    .enter().append("g")
    .attr("class", "layer");

//creates bars for stacked bar chart
var rects = layer_groups.selectAll("rect").data(function(d) {
    return d;
}).enter().append("rect")
    .attr("x", function(d, i) {
        return x_scale(i);
    }).attr("y", function(d){
        return y_scale(d.y0 + d.y);
    }).attr("width", x_scale.rangeBand())
    .attr("height", function(d){
        return y_scale(d.y0) - y_scale(d.y0 + d.y);
    })
    .style("fill", function(d, i, j){
        if (j === 0){
            return chartColor1(d.y);
        }
        else if (j=== 1){
            return chartColor2(d.y);
        }
        else if (j === 2){
            return chartColor3(d.y);
        }
        return chartColor4(d.y);
    });

function goGrouped(){
    y_scale.domain([0, yGroupMax]);

    rects.transition()
        .duration(1000)
        .delay(function(d, i){
            return i * 20;
        }).attr("x", function(d, i, j){
            return x_scale(i) + x_scale.rangeBand()/stackedData.length * j
        }).attr("width", x_scale.rangeBand() / stackedData.length)
        .transition()
            .attr("y", function(d) {
                return y_scale(d.y);
            }).attr("height", function(d) {
                return chart_height - y_scale(d.y);
            });
}