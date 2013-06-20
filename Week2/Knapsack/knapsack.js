var knapsack = (function() {

    var currentWeight = 0;
    var maxWeight = 0;
    var currentValue = 0;
    
    function setup(div){ 
        
        //sets up major regions - header; ungrabbedBin(house), grabbedBin(knapsack), and results (to store combinations with relevant values)
        var binHeader = $('<div class="row binHeader"><div class="span4"><h1>House</h1></div><div class="span4"><h1>Knapsack</h1></div><div class="span4"><h1>Results</h1></div>');
        var ungrabbedBin = $('<div class="span4 ungrabbedBin itemBin"></div>');
        var grabbedBin = $('<div class="span4 grabbedBin itemBin"></div>');
        var results = $('<div class="span4 results itemBin"><table class="resultsTable table table-striped" border="1"><tr><thead><th>Value</th><th>Weight</th><th>Items</th></thead></tr></table></div>');   //MAKE NOT ITEMBIN LATER
        
        //adds auto-updating record of weight and value to grabbedBin
        $(grabbedBin).append('<p><text>Current value: $<span class="grabbedValue">0</span></text><p><text>Current weight: <span class="grabbedWeight">0</span> kg</text>');
        
        //creates button to save current combination on results bar
        var saveButton = $('<p><button class="btn btn-primary">Save combination</button></p>');
        saveButton.click(function() {
            var weight = currentWeight;
            var value = currentValue;
            var items = ($('.grabbedBin').children('.itemButton').children('img'));
            
            //creates a string containing all items in the combo
            var combo = "";
            for (var i = 0; i < items.length; i++){
                combo += $(items[i]).data("name");
                if (i < (items.length - 1)){
                    combo += ", ";
                }
            }
            
            $('.resultsTable').append('<tr><td>' + currentValue + '</td><td>' + currentWeight + '</td><td>' + combo + '</td></tr>');
            
        });
        
        
        
        
        $(grabbedBin).append(saveButton);
        
        
        
        function updateDisplay(){
            $('.grabbedValue').text(currentValue);
            $('.grabbedWeight').text(currentWeight);
        }   
        
        //sets initial weight to zero and max weight to page-provided limit
        currentWeight = 0;
        maxWeight = div.data("maxweight");
        
        //creates buttons with each item on them and starts them in ungrabbedBin
        $('img').each(function() {
            var button = $('<button class="itemButton"> $' + $(this).data("value") + ',' + $(this).data("weight") + ' kg</button>').append(this);
            $(ungrabbedBin).append(button);     
        }); 
        
        $(div).append(binHeader, ungrabbedBin, grabbedBin, results);
        
        //adds functionality to buttons so they move when clicked (if valid weightwise)
        $('.itemButton').click(function() {
            var itemWeight = $(this).find('img').data('weight');
            var itemValue = $(this).find('img').data('value');
            if( $('.ungrabbedBin').has(this).length > 0){
                
                if (validWeight(itemWeight)){
                    currentWeight += itemWeight;
                    currentValue += itemValue;
                    this.remove();
                    $('.grabbedBin').append(this);
                }
                else{
                    //alert goes here
                    alert("You have exceeded your knapsack's weight limit!");
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
    }
    
    //true indicates added weight will be over the limit
    function validWeight(weightToAdd){
        return (currentWeight + weightToAdd <= maxWeight);
        
    }
    
    return {setup: setup};
    
})();




$(document).ready(function () {
    $('.knapsack').each(function () {
        knapsack.setup($(this));
    });
});