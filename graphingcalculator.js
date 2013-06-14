
$(document).ready(function(){
    $('.graphcalc').each(function(){
        setup_calc(this);
    });
});

function setup_calc(div) {
    
    //sets up graph
    
    var graph = $('<canvas width="400" height="300">test</canvas>', {id: 'canvas'});
    var input = $('<input></input>',{type: 'text', id: 'input1'});
    var xmin = $('<input></input>',{type: 'text', id: 'input2'});
    var xmax = $('<input></input>',{type: 'text', id: 'input2'});
    var plot = $('<button class="smallbutton">Plot</button>');

    var text0 = $('<text>f(x): </text>');
    var text1 = $('<text>min x: </text>');
    var text2 = $('<text>max x: </text>');
    plot.bind("click", function(){
        graphFunct(graph,input,xmin,xmax);
    });
    var graphDiv = $('<div></div>');
    var equationDiv = $('<div></div>');
    var xDiv = $('<div></div>');
    var buttonDiv = $('<div></div>');
    
    //sets up calculator
    
    var row1 = $('<div></div>', {class: 'row', id: 'row1'});
    row1.append('<button class="smallbutton numbutton">x</button>');
    row1.append('<button class="smallbutton">??</button>');
    row1.append('<button class="smallbutton">??</button>');
    row1.append('<button class="smallbutton">??</button>');

    var row2 = $('<div></div>', {class: 'row', id: 'row2'});
    row2.append('<button class="smallbutton clear">C</button>');
    row2.append('<button class="smallbutton">&#177;</button>');
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
    
    
    graphDiv.append(graph);
    equationDiv.append(text0, input);
    xDiv.append(text1, xmin,text2, xmax);
    buttonDiv.append(plot);
    
    $(div).append(graphDiv,equationDiv,xDiv,buttonDiv, row1, row2, row3, row4, row5, row6);
    
    //sets up button behavior
    $('.numbutton,.decimal').on("click",function (){
        var current = $('#input1').val();
        $('#input1').val(current + $(this).text());     
    });
    $('.mathbutton').on("click",function (){
        var current = $('#input1').val();
        $('#input1').val(current + $(this).data("operation"));     
    });
    $('.equals').on("click",function (){
        var input = $('#input1').val();
        $('#input1').val((String(calculate(input))));
    });
    $('.clear').on("click",function (){
        $('#input1').val("");
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
    
    try{
        var equat = calculator.parse(input.val());
        var ymax = -1000;
        var ymin = 1000;
        for(var x1=0; x1<=graph.width(); x1++) {
            var y1 = calculator.evaluate(equat,{'x':fromX(x1,xstart,xend,graph)});
            yvalues.push(y1);
            ymax = Math.max(ymax,y1);
            ymin = Math.min(ymin,y1);
        }
        var padding = 0.1*(ymax-ymin);
        ymax += padding;

        ymin -= padding;
        for(var x2=0; x2<=graph.width(); x2++) {
            var y2 = toY(yvalues[x2],ymin,ymax,graph);
            ctx.lineTo(x2,y2);
            ctx.moveTo(x2,y2);
        }
    }
    catch(err){
        ctx.fillStyle = "black";
        ctx.font = "14px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(err,200,200);   
    }
    
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#000000';
    ctx.stroke();
    
}

function fromX(x,xmin,xmax, graph) {
    return x*(xmax-xmin)/graph.width()+xmin;
}

function toY(y,ymin,ymax, graph) {
    return (ymax-y)*graph.height()/(ymax-ymin);
}

function toX(x,xmin,xmax, graph) {
    return (x-xmin)*graph.width()/(xmax-xmin);
}