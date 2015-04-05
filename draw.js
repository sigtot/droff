// Define the canvas element
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var cursor = document.getElementById("cursor");

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

// Writing to Firebase


// Setting initial conditions
ref.set({
      drawing2: {

      }
});

var drawRef = ref.child("drawing2");

drawRef.on("child_added", function(snapshot) {
      var message = snapshot.val();
      context.beginPath();
      for (var i = 0; i < message.lineX.length; i++) {
            if(i >= 1){
                  var xMid = message.lineX[i - 1] + (message.lineX[i] - message.lineX[i - 1]) / 2;
                  var yMid = message.lineY[i - 1] + (message.lineY[i] - message.lineY[i - 1]) / 2;
                  context.quadraticCurveTo(message.lineX[i - 1], message.lineY[i - 1], xMid, yMid)
            }else{
                 context.lineTo(message.lineX[i], message.lineY[i]);
            }  
            console.log(message.lineX[i]);
            console.log(message.lineY[i]);
      };
      context.lineWidth = strokeWidth;
      context.strokeStyle = strokeColor;
      context.stroke();
});



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
      drawRef.push({
                  lineX: xCor,
                  lineY: yCor
      });
      mouseIsDown = false;
}

window.onmouseup = function(event){
      if(mouseIsOut){
            mouseIsDown = false;
      }
}

canvas.onmousemove = function(event){
      // Adds the new coordinate to the line array and redraws the line
      moveCursor(event);
      if(!mouseIsDown) return;
      draw(event);
      return false;
}

canvas.onmouseout = function(event){
      // Executed when mouse leaves canvas
      // Stops drawing when mouse leaves canvas
      if(mouseIsDown){
            draw(event);
      }
      mouseIsOut = true;
      toggleCursor();
}

canvas.onmouseenter = function(event){
      mouseIsOut = false;
      toggleCursor();
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
			context.quadraticCurveTo(xCor[i - 1], yCor[i - 1], xMid, yMid)
		}else{
	           context.lineTo(xCor[i], yCor[i]);
		}	
	};

	// Update settings and stroke
	context.lineWidth = strokeWidth;
	context.strokeStyle = strokeColor;
	context.stroke();

      if(mouseIsOut){
            return;
      }
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

function moveCursor(event){
      cursor.style.left = event.x + 2 + "px";
      cursor.style.top = event.y + 2 + "px";
}

function toggleCursor(){
      if(mouseIsOut){
            cursor.style.display = "none";
      }else{
            cursor.style.display = "block";
      }
}