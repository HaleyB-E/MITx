var sys = require("sys"),
url = require("url"),
my_http = require("http");  
my_http.createServer(function(request,response){  
    response.writeHeader(200, {"Content-Type": "text/plain",
                              'Access-Control-Allow-Origin': '*'});  
    
    var result = checkAnswer( parseInt(url.parse(request.url, true).query.questionNum), parseInt(url.parse(request.url, true).query.answerNum));
    response.write(String(result));
    response.end();  
}).listen(8080);  
sys.puts("Server Running on 8080"); 


var solutionIndex = [0, 0];

function checkAnswer(questionNum, answerNum) {    
    return (answerNum === (solutionIndex[questionNum]));
}