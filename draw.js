// Definer canvas elementet
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var cursor = document.getElementById("cursor");

// Definer grunninstillinger
var bgColor = "#fff";
var strokeColor = "black";
var strokeWidth = 5;

// Andre variabler
var w = canvas.width;
var h = canvas.height;
var mouseIsDown = false;
var mouseIsOut = true;
var xCor = [];
var yCor = [];

// Set grunninstillingene
context.fillStyle = bgColor;
context.strokeStyle = strokeColor;
context.lineWidth = strokeWidth;
context.lineJoin = "round";
context.lineCap = "round";

context.fillRect(0,0,w,h); // Tegn bakgrunnen
context.fillStyle = strokeColor; // Set fill til samme farge som stroke

canvas.onmousedown = function(event){
      // Begynner å tegne
      xCor = []; // Tilbakestill xCor arrayen
      yCor = []; // Tilbakestill yCor arrayen
      draw(event);
      mouseIsDown = true;
}
canvas.onmouseup = function(event){
      // Slutter å tegne
      if(mouseIsDown) mouseClick(event);
      mouseIsDown = false;
      drawRef.push({
            strokeWidth: strokeWidth,
            strokeColor: strokeColor,
            lineX: xCor,
            lineY: yCor
      });
}

window.onmouseup = function(event){
      if(mouseIsOut){
            mouseIsDown = false;
      }
}

canvas.onmousemove = function(event){
      // Legger til punktet i linjearrayen og tegner linja på nytt
      moveCursor(event);
      if(!mouseIsDown) return;
      draw(event);
      return false;
}

canvas.onmouseout = function(event){
      // Kjører når cursor går utenfor canvas
      // Slutt å tegne når cursor er utenfor canvas
      if(mouseIsDown){
            draw(event);
            drawRef.push({
                  strokeWidth: strokeWidth,
                  strokeColor: strokeColor,
                  lineX: xCor,
                  lineY: yCor
            });
      }
      mouseIsOut = true;
      toggleCursor();
}

canvas.onmouseenter = function(event){
	// Kjører når cursor er over canvas
      mouseIsOut = false;
      toggleCursor(); // Vis cursor
}

function draw(event){
	// Hent koordinater og legg til i linje arrayen
	var x = event.x;
	var y = event.y;
	x -= canvas.offsetLeft;
	y -= canvas.offsetTop;
	xCor.push(x);
	yCor.push(y);

	// Tegn linja
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

	// Oppdater settings og stroke
	context.lineWidth = strokeWidth;
	context.strokeStyle = strokeColor;
	context.stroke();

      if(mouseIsOut){
            return;
      }
}

function mouseClick(event){
      // Kjører når musen slippes inne i canvas
      // Hent koordinater
      if(xCor.length <= 1){
            var x = event.x;
            var y = event.y;
            x -= canvas.offsetLeft;
            y -= canvas.offsetTop;
            context.arc(x, y, 1, 0, 2 * Math.PI);
            context.stroke();
      }
}

// Flytt cursor
function moveCursor(event){
      cursor.style.left = event.x + 2 + "px";
      cursor.style.top = event.y + 2 + "px";
}

// Skru cursor av eller på
function toggleCursor(){
      if(mouseIsOut){
            cursor.style.display = "none";
      }else{
            cursor.style.display = "block";
      }
}

// Hør etter nye children i firebase
drawRef.on("child_added", function(snapshot) {
      var message = snapshot.val();
      context.beginPath();
      for (var i = 0; i < message.lineX.length; i++) {
            if(i >= 1){
                  var xMid = message.lineX[i - 1] + (message.lineX[i] - message.lineX[i - 1]) / 2;
                  var yMid = message.lineY[i - 1] + (message.lineY[i] - message.lineY[i - 1]) / 2;
                  context.quadraticCurveTo(message.lineX[i - 1], message.lineY[i - 1], xMid, yMid)
            }else{
                 context.arc(message.lineX, message.lineY, 1, 0, 2 * Math.PI);
            }  
      };
      context.lineWidth = message.strokeWidth;
      context.strokeStyle = message.strokeColor;
      context.stroke();
});