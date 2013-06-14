// Graphing Calculator javascript


$(document).ready(function(){
    $('.calculator').each(function(){
        setup_calc(this);
    });
});


function setup_calc(div) {
    
    //sets up graph display and graphing parameters
    var screenDiv = $('<div></div>');
    screenDiv.append('<canvas width="400" height="300" class="graph">test</canvas>');
    screenDiv.append('<text class="input-text">f(x)= </text>');
    screenDiv.append('<input type="text" class="equation-input"></input>');
    
    var plotDiv = $('<div></div>');
    plotDiv.append('<button class="smallbutton plotbutton">Plot</button>');
    plotDiv.append('<text class="limits">min x= </text>');
    plotDiv.append('<input type="text" class="limits xmin"></input>');
    plotDiv.append('<text class="limits">max x= </text>');
    plotDiv.append('<input type="text" class="limits xmax"></input>');
    
   
    //sets up remaining calculator buttons
    var row1 = $('<div></div>', {class: 'row', id: 'row1'});
    row1.append('<button class="smallbutton numbutton">x</button>');
    row1.append('<button class="smallbutton">??</button>');
    row1.append('<button class="smallbutton">??</button>');
    row1.append('<button class="smallbutton">??</button>');

    var row2 = $('<div></div>', {class: 'row', id: 'row2'});
    row2.append('<button class="smallbutton clear">C</button>');
    row2.append('<button class="smallbutton">&#177; ??</button>');
    row2.append('<button class="smallbutton mathbutton" data-operation="/">&divide;</button>');
    row2.append('<button class="smallbutton mathbutton" data-operation="*">&#215;</button>');
    
    var row3 = $('<div></div>', {class: 'row', id: 'row3'});
    row3.append('<button class="smallbutton numbutton">7</button>');
    row3.append('<button class="smallbutton numbutton">8</button>');
    row3.append('<button class="smallbutton numbutton">9</button>');
    row3.append('<button class="smallbutton mathbutton" data-operation="-">&#8722;</button>');
    
    var row4 = $('<div></div>', {class: 'row', id: 'row4'});
    row4.append('<button class="smallbutton numbutton">4</button>');
    row4.append('<button class="smallbutton numbutton">5</button>');
    row4.append('<button class="smallbutton numbutton">6</button>');
    row4.append('<button class="smallbutton mathbutton" data-operation="+">+</button>');

    var row5 = $('<div></div>', {class: 'row', id: 'row5'});
    row5.append('<button class="smallbutton numbutton">1</button>');
    row5.append('<button class="smallbutton numbutton">2</button>');
    row5.append('<button class="smallbutton numbutton">3</button>');
    row5.append('<button class="tallbutton equals">=</button>');
    
    var row6 = $('<div></div>', {class: 'row', id: 'row6'});
    row6.append('<button class="widebutton numbutton">0</button>');
    row6.append('<button class="smallbutton decimal">.</button>');
    
    $(div).append(screenDiv, plotDiv, row1, row2, row3, row4, row5, row6);
    
    
    //sets up button behavior
    $('.plotbutton').on("click",function (){
        graphFunct($('.graph'), $('.equation-input'),$('.xmin'),$('.xmax'));
    });
    $('.numbutton,.decimal').on("click",function (){
        var current = $('.equation-input').val();
        $('.equation-input').val(current + $(this).text());     
    });
    $('.mathbutton').on("click",function (){
        var current = $('.equation-input').val();
        $('.equation-input').val(current + $(this).data("operation"));     
    });
    $('.equals').on("click",function (){
        var input = $('.equation-input').val();
        $('.equation-input').val((String(calculate(input))));
    });
    $('.clear').on("click",function (){
        $('.equation-input').val("");
    });
}


function graphFunct(graph,input,xmin,xmax){
    var DOMgraph = graph[0];
    var ctx = DOMgraph.getContext('2d');
    
    ctx.clearRect(0,0,400,300);
    ctx.beginPath();

    var xstart = parseFloat(xmin.val());
    var xend = parseFloat(xmax.val());
    
    var yvalues = [];
    
    //tries to graph function, then displays either graph or relevant error
    try{
        var equat = calculator.parse(input.val());
        
        //populates yvalues with numbers, finds max and min values of y to aid scaling
        var ymax = Number.MIN_VALUE;
        var ymin = Number.MAX_VALUE;
        for(var x1=0; x1<=graph.width(); x1++) {
            var y1 = calculator.evaluate(equat,{'x':fromX(x1,xstart,xend,graph)});
            yvalues.push(y1);
            ymax = Math.max(ymax,y1);
            ymin = Math.min(ymin,y1);
        }
        
        //creates padding so graph isn't running off top/bottom of screen
        var padding = 0.1*(ymax-ymin);
        ymax += padding;
        ymin -= padding;
        
        //creates path of graph from calculated values
        for(var x2=0; x2<=graph.width(); x2++) {
            var y2 = toY(yvalues[x2],ymin,ymax,graph);
            ctx.lineTo(x2,y2);
            ctx.moveTo(x2,y2);
        }
        
        //draws graph
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#000000';
        ctx.stroke();
    }
    catch(err){
        
        //displays relevant error message
        ctx.fillStyle = "black";
        ctx.font = "14px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(err,200,200);   
    }


}


//Functions used to scale x and y values

function fromX(x,xmin,xmax, graph) {
    return x*(xmax-xmin)/graph.width()+xmin;
}

function toY(y,ymin,ymax, graph) {
    return (ymax-y)*graph.height()/(ymax-ymin);
}

function toX(x,xmin,xmax, graph) {
    return (x-xmin)*graph.width()/(xmax-xmin);
}