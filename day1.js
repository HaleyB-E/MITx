/*
    calculate: evaluate the value of an arithmetic expression
*/
function calculate(text) {
    var pattern = /\d+|\+|\-|\/|\*|\(|\)/g;
    var tokens = text.match(pattern);
    try{
        var val = evaluation(tokens);
        return String(val);
    }
    catch(err){
        return "ill-formed expression: " + err.message;
    }
}


/* 
    read_operand: attempts to interpret first item in tokens as an int
*/
function read_operand(tokens){
    if (tokens.length === 0) throw new Error("missing operand");
    var token = tokens.shift();
    var num = parseInt(token, 10);
    if(isNaN(num)) throw new Error("number expected");
    return num;
}

/*
    evaluation: performs mathematical operations represented by array of tokens
*/
function evaluation(tokens){ 
    var result = read_operand(tokens);
    while (tokens.length > 0){
        var operator = tokens.shift();     
        var toMath = read_operand(tokens);
        
        switch(operator){
            case '+':
                result+= toMath;
                break;
            case '-':
                result-= toMath;
                break;
            case '*':
                result*= toMath;
                break;
            case '/':
                result/= toMath;
                break;
            default:
                throw new Error("unrecognized operator");
        }
    }
    return result;
}




function setup_calc(div){
    var input = $('<input></input>',{type: "text", size: 50});
    var output = $('<div></div>');
    var button = $('<button>Calculate</button>');
    button.bind("click",function () {
        output.text(String(calculate(input.val())));
    });
    
    $(div).append(input,button,output);
}

$(document).ready(function (){
    $('.calculator').each(function (){
        //'this' refers to the <div> with class calculator
        setup_calc(this);
    });
});