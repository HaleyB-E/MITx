var knapsack = (function() {

    var currentWeight = 0;
    var maxWeight = 0;
    var currentValue = 0;
    var data = {"weightValuePair":[], "combo":[]};
    
    function setup(div){ 
        //REGION SETUP
        
        //sets up major regions - header; ungrabbedBin(house), grabbedBin(knapsack), and results (to store combinations with relevant values)
        var binHeader = $('<div class="row binHeader"><div class="span4"><h1>House</h1></div>'
                        + '<div class="span4"><h1>Knapsack</h1></div><div class="span4"><h1>Results</h1>'
                        +'</div><div class="span4"><h2>Graph (kg vs. $)</h2></div>');
        var ungrabbedBin = $('<div class="span4 ungrabbedBin itemBin"></div>');
        var grabbedBin = $('<div class="span4 grabbedBin itemBin"></div>');
        var results = $('<div class="span4 results"><table class="resultsTable table table-striped" border="1">'
                        + '<tr><thead><th>Value</th><th>Weight</th><th>Items</th></thead></tr></table></div>');
        var graphContainer = $('<div class="span4 graph-container"></div>');
        
        //adds auto-updating record of weight and value to grabbedBin
        $(grabbedBin).append('<p><text>Current value: $<span class="grabbedValue">0</span></text>'
                             +'<p><text>Current weight: <span class="grabbedWeight">0</span> kg</text>');
        
        
        //BUTTONS
        
        //creates button to save current combination on results bar
        var saveButton = $('<button class="btn btn-primary resultsButton">Save combination</button>');
        saveButton.click(function() {
            //creates a string containing all items in the combo
            var items = ($('.grabbedBin').children('.itemButton').children('img'));
            var combo = "";
            for (var i = 0; i < items.length; i++){
                combo += $(items[i]).data("name");
                if (i < (items.length - 1)){
                    combo += ", ";
                }
            }
            //adds relevant daya to array
            data.weightValuePair.push([currentWeight, currentValue]);
            data.combo.push(combo);
            //adds relevant data to table
            $('.resultsTable').append('<tr><td>' + currentValue + '</td><td>' + currentWeight + '</td><td>' + combo + '</td></tr>');
        });
        
        //creates button to clear items from knapsack
        var clearButton = $('<button class="btn resultsButton">Clear Knapsack</button>');
        clearButton.click(function() {
            var items = $('.grabbedBin').children('.itemButton').each(function() {
                currentWeight -= $(this).find('img').data('weight');
                currentValue -= $(this).find('img').data('value');
                this.remove();
                $('.ungrabbedBin').append(this);
            });
            updateDisplay();
        });
        
        $(grabbedBin).append(saveButton, clearButton);
        
        var updateButton = $('<button class="btn">Update graph</button>');
        updateButton.click(updateGraph);
        
        //creates button to graph value vs. weight for data
        var graphButton = $('<button class="btn">Graph data</button>');
        graphButton.click(function(){
            createGraph();
            $(results).append(updateButton);
            this.remove();
        });
        
        $(results).append(graphButton);
   
        
        
        //updates display in grabbedBin scoreboard
        function updateDisplay(){
            $('.grabbedValue').text(currentValue);
            $('.grabbedWeight').text(currentWeight);
        }   
        
        //sets initial weight to zero and max weight to page-provided limit
        currentWeight = 0;
        maxWeight = div.data("maxweight");
        
        //creates buttons with each item on them and starts them in ungrabbedBin
        $('img').each(function() {
            var button = $('<button class="itemButton" title="value=$' + $(this).data("value") 
                           + ', weight='+ $(this).data("weight") + ' kg"></button>').append(this);
            $(button).tooltip();
            $(ungrabbedBin).append(button);     
        }); 
        
        //adds header, bins, and statistical stuff to page
        $(div).append(binHeader, ungrabbedBin, grabbedBin, results, graphContainer);
        
        
        //ITEM MOVEMENT
        
        //adds functionality to item buttons so they move when clicked (if valid weightwise)
        $('.itemButton').click(function() {
            var itemWeight = $(this).find('img').data('weight');
            var itemValue = $(this).find('img').data('value');
            if( $('.ungrabbedBin').has(this).length > 0){
                
                if (currentWeight + itemWeight <= maxWeight){
                    currentWeight += itemWeight;
                    currentValue += itemValue;
                    this.remove();
                    $('.grabbedBin').append(this);
                }
                else{
                    //alert goes here
                    alert("That object would exceed your knapsack's weight limit!");
                }
            }
            else{
                currentWeight -= itemWeight;
                currentValue -= itemValue;
                this.remove();
                $('.ungrabbedBin').append(this);
            }
            updateDisplay();
        });
        
        
        //GRAPH
        
        var graph = d3.select(".graph-container").append("svg")
                .attr("class", "graph")
                .attr("height", "250px")
                .attr("width", "350px");
        
        function createGraph(){
            
            var dataSet = d3.values(data.weightValuePair);
            
            var x_scale = d3.scale.linear().domain([0, d3.max(dataSet, function(d){
                return d[0];
            })]).range([10, 300]);
            
            var y_scale = d3.scale.linear().domain([0, d3.max(dataSet, function(d){
                return d[1];
            })]).range([200, 50]);
                                    
            //adds datapoints to graph
            graph.selectAll("circle").data(dataSet)
                .enter().append("circle")
                .attr("cx", function(d){
                    return x_scale(d[0]);
                }).attr("cy", function(d){
                    return y_scale(d[1]);
                }).attr("r", 3)
                .append("svg:title")
                    .text(function(d, i){
                        return d3.values(data.combo)[i];
                    });
            
            //adds horizontal lines to graph
            graph.selectAll("line").data(y_scale.ticks(5))
                .enter().append("line")
                .attr("x1", 15)
                .attr("x2", 300)
                .attr("y1", y_scale)
                .attr("y2", y_scale);
            
            //adds y-axis labels to graph
            graph.selectAll(".y-scale-label").data(y_scale.ticks(5))
                .enter().append("text")
                .attr("class", "y-scale-label")
                .attr("x", 0)
                .attr("y", y_scale)
                .text(String);
            
            //adds x-axis labels to graph
            graph.selectAll(".x-scale-label").data(x_scale.ticks(5))
                .enter().append("text")
                .attr("class", "x-scale-label")
                .attr("y", 200)
                .attr("x", x_scale)
                .text(String)
                .attr("dy", 12);
        }
        
        //redraws graph to account for additional data - TODO: FIX REDUNDANCY (CURRENT CODE IS AS DRY AS THE AMAZON)
        function updateGraph(){
            //recalculate data and scaling factors
            var dataSet = d3.values(data.weightValuePair);
            
            var x_scale = d3.scale.linear().domain([0, d3.max(dataSet, function(d){
                return d[0];
            })]).range([10, 300]);
            var y_scale = d3.scale.linear().domain([0, d3.max(dataSet, function(d){
                return d[1];
            })]).range([200, 50]);
            
            var xScaleTicks = x_scale.ticks(5);
            var yScaleTicks = y_scale.ticks(5);
            
            //console.log(xScaleTicks);
            console.log(yScaleTicks);
            
            //DATA
            //move old datapoints to new location            
            graph.selectAll("circle").transition()
                .duration(1000)
                .attr("cx", function(d){
                    return x_scale(d[0]);
                }).attr("cy", function(d){
                    return y_scale(d[1]);
                }).attr("r", 3);
            //place new datapoints on graph
            graph.selectAll("circle").data(d3.values(data.weightValuePair))
                .enter().append("circle")
                .attr("cx", function(d){
                    return x_scale(d[0]);
                }).attr("cy", function(d){
                    return y_scale(d[1]);
                }).attr("r", 3)
                .append("svg:title")
                    .text(function(d, i){
                        return d3.values(data.combo)[i];
                    });
            
            //AXIS LINES AND LABELS
            
            //moves Y-labels and lines or else replaces them
            if (yScaleTicks.length === 5){
                graph.selectAll('.y-scale-label').transition()
                    .duration(1000)
                    .text(function(d, i){
                        return yScaleTicks[i];
                    });
            }
            else {
                $('.y-scale-label').remove();
                graph.selectAll('.y-scale-label').data(yScaleTicks)
                    .enter().append("text")
                    .attr("class", "y-scale-label")
                    .attr("x", 0)
                    .attr("y", y_scale)
                    .text(String);
                
                $('line').remove();
                
                graph.selectAll("line").data(yScaleTicks)
                    .enter().append("line")
                    .attr("x1", 15)
                    .attr("x2", 300)
                    .attr("y1", y_scale)
                    .attr("y2", y_scale);
            }
            
            //moves X-labels
            if (xScaleTicks.length === 5){
                graph.selectAll('.x-scale-label').transition()
                    .duration(1000)
                    .text(function(d, i){
                        return xScaleTicks[i];
                    });
            }
            else {
                $('.x-scale-label').remove();
                graph.selectAll('.x-scale-label').data(xScaleTicks)
                    .enter().append("text")
                    .attr("class", "x-scale-label")
                    .attr("y", 200)
                    .attr("x", x_scale)
                    .text(String)
                    .attr("dy", 12);
            }

        }

            
    }
    
    return {setup: setup};
    
})();




$(document).ready(function () {
    $('.knapsack').each(function () {
        knapsack.setup($(this));
    });
});