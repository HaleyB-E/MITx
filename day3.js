
function test_clear(){
    var JQcanvas = $('#test:first');
    var DOMcanvas = JQcanvas[0];
    var ctx = DOMcanvas.getContext('2d');
    
    ctx.clearRect(0,0,JQcanvas.width(),JQcanvas.height());    //x, y, w, h
}

function test_line(){
    var JQcanvas = $('#test:first');
    var DOMcanvas = JQcanvas[0];
    var ctx = DOMcanvas.getContext('2d');
    
    ctx.beginPath();
    ctx.moveTo(50,50);
    ctx.lineTo(150, 50);
    ctx.lineTo(150,150);
    ctx.lineTo(50, 150);
    ctx.lineTo(50,50);
    ctx.lineWidth = 10;
    ctx.strokeStyle = "red";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    
    ctx.fillStyle = "black";
    ctx.fill()
    
    ctx.stroke();
    
}

function test_rect(){
    var JQcanvas = $('#test:first');
    var DOMcanvas = JQcanvas[0];
    var ctx = DOMcanvas.getContext('2d');
    
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.fillRect(25,25,100,100);
    ctx.fillStyle = "blue";
    ctx.fillRect(75,75,100,100);
    
}

function test_smiley(){
    var JQcanvas = $('#test:first');
    var DOMcanvas = JQcanvas[0];
    var ctx = DOMcanvas.getContext('2d');
    
    ctx.beginPath();
    ctx.arc(100,100,75,0,2*Math.PI); //centerx, centery, radius,startangle,endangle (rel to x axis, clockwise)
    ctx.fillStyle = "yellow";
    ctx.fill();
    
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(100,100,25,7*Math.PI / 4, 9 * Math.PI / 4);
    ctx.lineWidth = 3;
    ctx.stroke();
    
    
}