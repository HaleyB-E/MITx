var data= [0,4,8,8,15,16,23,42];

//var chart=$("<div></div>").addClass("chart");
//$(".chart-container").append(chart);

//data.forEach(function(d) {
//    chart.append($("<div></div>").css("width", d * 10 + "px").text(d));
//});

var chart = d3.select(".chart-container").append("div").attr("class", "chart");
chart.selectAll("div").data(data).enter().append("div");