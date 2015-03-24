// Define the canvas element
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

// Define initial settings
var bgColor = "#fff";
var strokeColor = "black";
var strokeWidth = 5;

// Other variables
var w = canvas.width;
var h = canvas.height;
var mouseIsDown = false;
var mouseIsOut = true;
var xCor = [];
var yCor = [];

// Set initial settings
context.fillStyle = bgColor;
context.strokeStyle = strokeColor;
context.lineWidth = strokeWidth;
context.lineJoin = "round";
context.lineCap = "round";

context.fillRect(0,0,w,h); // Draw the background
context.fillStyle = strokeColor; // Set the fill to the same color as the stroke


canvas.onmousedown = function(event){
      //Starts drawing
      xCor = []; // Reset the xCor array
      yCor = []; // Reset the yCor array
      draw(event);
      mouseIsDown = true;
}
canvas.onmouseup = function(event){
      // Stops drawing
      if(mouseIsDown) mouseClick(event);
      mouseIsDown = false;
}

window.onmouseup = function(event){
      if(mouseIsOut){
            mouseIsDown = false;
      }
}

canvas.onmousemove = function(event){
      // Adds the new coordinate to the line array and redraws the line
      if(!mouseIsDown) return;
      draw(event);
      return false;
}

canvas.onmouseout = function(event){
      // Executed when mouse leaves canvas
      // Stops drawing when mouse leaves canvas
      mouseIsOut = true;
}

canvas.onmouseenter = function(event){
      mouseIsOut = false;
}

function draw(event){
	// Get coordinates and add it to the line array
	var x = event.x;
	var y = event.y;
	x -= canvas.offsetLeft;
	y -= canvas.offsetTop;
	xCor.push(x);
	yCor.push(y);

	// Draw the line
	context.beginPath();
	for (var i = 0; i < xCor.length; i++) {
		if(i >= 1){
			var xMid = xCor[i - 1] + (xCor[i] - xCor[i - 1]) / 2;
			var yMid = yCor[i - 1] + (yCor[i] - yCor[i - 1]) / 2;
			context.quadraticCurveTo(xCor[i -1], yCor[i -1], xMid, yMid)
		}else{
	    context.lineTo(xCor[i], yCor[i]);
		}	
	};

	// Update settings and stroke
	context.lineWidth = strokeWidth;
	context.strokeStyle = strokeColor;
	context.stroke();
}

function mouseClick(event){
      // Executed when mouse is released inside canvas
      // Get coordinates
      if(xCor.length <= 1){
            var x = event.x;
            var y = event.y;
            x -= canvas.offsetLeft;
            y -= canvas.offsetTop;
            context.arc(x, y, 1, 0, 2 * Math.PI);
            context.stroke();
      }
}