var knapsack = (function() {

    var currentWeight = 0;
    var maxWeight = 0;
    var currentValue = 0;
    
    function setup(div){ 
        
        var ungrabbedBin = $('<div class="ungrabbedBin itemBin">House</div>');
        var grabbedBin = $('<div class="grabbedBin itemBin">Knapsack</div>');
        
        $(grabbedBin).append('<p><text>Current value: <span class="grabbedValue">0</span></text><p><text>Current weight: <span class="grabbedWeight">0</span></text>');
        
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
            ungrabbedBin.append(button);     
        }); 
        
        $(div).append(ungrabbedBin, grabbedBin);
        
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
                    console.log("FAILURE");
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