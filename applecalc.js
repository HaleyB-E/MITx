

$(document).ready(function (){
    $('.numbutton,.decimal').on("click",function (){
        var current = $('.entry').val()
        $('.entry').val(current + $(this).text());     
    });
    
    $('.mathbutton').on("click",function (){
        var current = $('.entry').val();
        $('.entry').val(current + $(this).data("operation"));     
    });
    
    $('.equals').on("click",function (){
        var input = $('.entry').val();
        $('.entry').val((String(calculate(input))));
    });
    
    $('.clear').on("click",function (){
        $('.entry').val("");
    });
});


function calculate(text) {
    var pattern = /\d*[.]*\d+|\+|\-|\/|\*|\(|\)/g;
    var tokens = text.match(pattern);
    try{
        var val = evaluation(tokens, false);
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
    
    //test for beginning of parenthetical subexpression
    if (token == "("){
        return evaluation(tokens, true);
    }

    //test for negative sign
    if (token == "-"){
        token = token + tokens.shift();
    }
    
    var num = parseFloat(token, 10);
    if(isNaN(num)) throw new Error("number expected");
    return num;
}

/*
    evaluation: performs mathematical operations represented by array of tokens
        boolean "true" indicates evaluating parentheses
*/
function evaluation(tokens, parentheses){ 
    var result = read_operand(tokens);
    while (tokens.length > 0){
        var operator = tokens.shift();
        if (operator == ")"){
            if (parentheses){
                return result;
            }
            throw new Error("unclosed parenthesis (right)");
        }
        
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
    if (parentheses) throw new Error("unclosed parenthesis (left)");
    return result;
}