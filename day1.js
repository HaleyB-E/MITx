/*
    calculate: evaluate the value of an arithmetic expression
*/
function calculate() {
    var input = $('#text1:first');  //get input field from DOM
    var val = input.val();
    var out = $('#text1_out:first');
    out.text(val);
}