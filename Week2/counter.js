var counter = (function () {
    
    //on(eventString, callback) - register handler for an event
    //trigger(eventString, data) - call all callbacks for eventString
    function EventHandler() {
        //map eventString to list of callbacks
        //'update': [...View.update...]
        var handlers = {};
        
        function on(eventString, callback){
            var cblist = handlers[eventString];
            
            if (cblist === undefined) {
                cblist = [];
                handlers[eventString] = cblist;
            }
            cblist.push(callback);
        }
        
        function trigger(eventString, data){
            var cblist = handlers[eventString];
            
            if (cblist !== undefined){
                for (var i = 0; i < cblist.length; i += 1){
                    cblist[i](data);
                }
            }
        }
        
        return {on: on, trigger: trigger}
    }
    
    //increment - increments counter
    //reset - sets counter to 0
    //getValue - returns current count
    //on(eventString, callback) - update the 
    function Model() {
        var eventHandler = EventHandler();
        var count = 0; //current value of counter
        
        function increment() {
            count++;
            eventHandlers.trigger('update', count);
        }
        
        function reset() {
            count = 0;
            eventHandlers.trigger('update', count);
        }
        
        function getValue() {
            return count;
        }
        
        return {increment: increment, reset: reset, getValue: getValue, on: eventHandler.on};
    }
    
    //needs increment function - cause value of counter to increment
    function Controller(model) {
        function increment() {
            model.increment();
        }
        return {increment: increment};
    }
    
    function View(div, model, controller) {
        var display = $('<div class="view">The current value of the counter is <span>0</span>.</div>')
        var counterValue = display.find('span');
        
        div.append(display);
        
        function update() {
            var cval = model.getCount()
            counterValue.text(cval);
        }
        
        model.on('update', update);
        
        return {};
    }
    
    function setup(div) {
        var model = Model();
        var controller = Controller(model);
        var view = View(div, model, controller);
        var view2 = View(div, model. controller);
        
        var button = $("<button>Increment</button>");
        button.on("click", controller.increment);
        div.append(button);
    }
    
    //items accessible to outsiders
    return {setup: setup};
}());

$(document).ready(function () {
    $('.counter').each(function () {
        counter.setup($(this));
    });
});