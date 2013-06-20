var knapsack = (function() {

    var currentWeight = 0;
    var maxWeight = 0;
    
    function setup(div){ 
        
        var ungrabbedBin = $('<div class="ungrabbedBin itemBin"></div>');
        var grabbedBin = $('<div class="grabbedBin itemBin"></div>');
        
        currentWeight = 0;
        maxWeight = div.data("maxweight");
        
        //creates buttons with each item on them and starts them in ungrabbedBin
        $('img').each(function() {
            var button = $('<button class="itemButton"> $' + $(this).data("value") + ',' + $(this).data("weight") + ' kg</button>').append(this);
            ungrabbedBin.append(button);     
        }); 
        
        $(div).append(ungrabbedBin, grabbedBin);
        
        //adds functionality to buttons so they move when clicked
        $('.itemButton').click(function() {
            
            if( $('.ungrabbedBin').has(this).length > 0){
                var weightToAdd = $(this).find('img').data('weight');
                if (validWeight(weightToAdd)){
                    currentWeight += weightToAdd;
                    this.remove();
                    $('.grabbedBin').append(this);
                }
                else{
                    console.log("FAILURE");
                }
            }
            else{
                this.remove();
                $('.ungrabbedBin').append(this);
            }
        });       
    }
    
    //
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