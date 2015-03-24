$("#drawCanvas").click(function(evt){
	var x = evt.pageX - $('#drawCanvas').offset().left
	var y = evt.pageY - $('#drawCanvas').offset().top
	//alert(x + " " + y);
	$("#drawCanvas").append("<polyline points='" + x + "," + y + " 50,100 60,110' fill='none' stroke='red' stroke-width='3' />");
	$("#svgContainer").html($("#svgContainer").html());
});

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

context.beginPath();
      context.moveTo(100, 20);

      // line 1
      context.lineTo(200, 160);

      // quadratic curve
      context.quadraticCurveTo(230, 200, 250, 120);

      // bezier curve
      context.bezierCurveTo(290, -40, 300, 200, 400, 150);

      // line 2
      context.lineTo(500, 90);

      context.lineWidth = 5;
      context.strokeStyle = 'blue';
      context.stroke();