// Define the canvas element
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

// Define initial settings
var bgColor = "white";
var strokeColor = "black";
var strokeWidth = 5;

// Set initial settings
context.fillStyle = bgColor;
context.strokeStyle = strokeColor;
context.lineWidth = strokeWidth;
context.lineJoin = "round";
context.lineCap = "round";

context.fillRect(0,0,w,h); // Draw the background
context.fillStyle = strokeColor; // Set the fill to the same color as the stroke

// Other variables
var w = canvas.width;
var h = canvas.height;
var mouseIsDown = false;
var xCor = [];
var yCor = [];

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

canvas.onmousemove = function(event){
      // Adds the new coordinate to the line array and redraws the line
      if(!mouseIsDown) return;
      draw(event);
      return false;
}

canvas.onmouseout = function(event){
      // Executed when mouse leaves canvas
      // Stops drawing when mouse leaves canvas
      if(mouseIsDown){draw(event)};
      mouseIsDown = false;
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
            context.lineTo(xCor[i], yCor[i]);
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
            context.fillRect(x, y, strokeWidth, strokeWidth);
      }
}