/*
    calculate: evaluate the value of an arithmetic expression
    try {
       val = evaluate(tokens)
      if tokens isn’t empty, throw an error “ill-formed expression”
       return String(val)
    } catch (err) {
       return err;   // error message will be printed as the answer
    }
*/
function calculate(text) {
    var pattern = /\d+|\+|\-|\/|\*|\(|\)/g;
    var tokens = text.match(pattern);
    //return JSON.stringify(tokens);
    try{
        var val = evaluation(tokens);
        if (tokens.length !== 0) throw "ill-formed expression"; //THIS SEEMS INCORRECT BECAUSE STRING NEVER APPEARS
        return String(val);
    }
    catch(err){
        return "ill-formed expression!";
    }
}


/* 
    read_operand: attempts to interpret first item in tokens as an int
*/
function read_operand(tokens){
    var num = tokens.shift();
    try{
        num = parseInt(num, 10);
        if(isNaN(num)) throw "number expected";     //THIS SEEMS INCORRECT BECAUSE THE STRING NEVER DOES ANYTHING
    }
    catch(err){
        return "number expected!";
    }
    return num;
}

/*
    evaluation: performs mathematical operations represented by array of tokens
*/
function evaluation(tokens){ 
    if (tokens.length === 0){
        throw "missing operand";
    }   
    var result = read_operand(tokens);
    while (tokens.length > 0){
        var operator = tokens.shift();

        if (tokens.length === 0){
            throw "missing operand";
        }
        
        var temp = read_operand(tokens);
        
        switch(operator){
            case '+':
                result+= temp;
                break;
            case '-':
                result-= temp;
                break;
            case '*':
                result*= temp;
                break;
            case '/':
                result/= temp;
                break;
            default:
                throw "unrecognized operator";
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