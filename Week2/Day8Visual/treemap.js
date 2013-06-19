//This doesn't do very much! but color scales are NIFTY!

var OUTER_HEIGHT = 300;
var OUTER_WIDTH = 300;

var margin = { top: 20, right: 20, bottom: 20, left: 20 };

var chartWidth = OUTER_WIDTH - margin.left - margin.right;
var chartHeight = OUTER_HEIGHT - margin.top - margin.bottom;
//var chartColor = d3.scale.category20()          //COOL THING: color scales
var chartColor1 = d3.scale.linear().domain([1,10]).range(['red', 'blue']);
var chartColor2 = d3.scale.linear().domain([1, 10]).range(['yellow', 'red']);

var treemap = d3.layout.treemap()
    .size([OUTER_WIDTH, OUTER_HEIGHT]);

var chart = d3.select(".chart-container").append("svg")
    .attr("height", OUTER_HEIGHT)
    .attr("width", OUTER_WIDTH)
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var cell = chart.selectAll("cell").data(data[0])
    .enter().append("g")
    .attr("class", "cell")
    .attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
    });

cell.append("rect")
    .attr("width", function(d) {
        return d.dx;
    }).attr("height", function(d){
        return d.dy;
    }).style("fill", function(d){
        return chartColor2(d.y / 10);
    });

var cell2 = chart.selectAll("cell2").data(data[1])
    .enter().append("g")
    .attr("class", "cell2")
    .attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
    });

cell2.append("rect")
    .attr("width", function(d) {
        return d.dx;
    }).attr("height", function(d){
        return d.dy;
    }).style("fill", function(d){
        return chartColor1((d.y - 100) / 10);
    });