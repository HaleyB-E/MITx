var knapsack = (function() {

    function setup(div){    
        var ungrabbedBin = $('<div class="ungrabbedBin itemBin"></div>');
        var grabbedBin = $('<div class="grabbedBin itemBin"></div>');
        
        $('img').each(function() {
            var button = $('<button class="itemButton"></button>').append(this);
            ungrabbedBin.append(button);     
        }); 
        
        $(div).append(ungrabbedBin, grabbedBin);
        
        $('.itemButton').click(function() {
            if( $('.ungrabbedBin').has(this).length > 0){
                    this.remove();
                    $('.grabbedBin').append(this);
            }
            else{
                    this.remove();
                    $('.ungrabbedBin').append(this);
            }
        });
        
    }
    
    return {setup: setup};
    
})();

function tester(){
    if($('.grabbedBin').find($('.itemButton')) > 0){
        console.log("true");
    }
    
}

$(document).ready(function () {
    $('.knapsack').each(function () {
        knapsack.setup($(this));
    });
});