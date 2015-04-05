var settingButtons = document.getElementById("settingButtons");

var preview = document.getElementById("preview");
var brushSizeRange = document.getElementById("brushSizeRange");

var colors = ["#000", "#212121", "#616161", "#BDBDBD", "#F5F5F5", "#fff","#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#795548", "#607D8B"]
var colorButtons;
var ref = new Firebase("https://droff.firebaseio.com/");

function makeColors(){
	colorButtons = "<div class='settingButton current'></div> ";
	for (var i = 1; i < colors.length; i++) {
		colorButtons += "<div class='settingButton'></div> "
	};
	settingButtons.innerHTML = colorButtons;
}

var settingButton = document.getElementsByClassName("settingButton");

function setColors(){
	for (var i = 0; i < settingButton.length; i++) {
		settingButton[i].style.background = colors[i];
	};
}

window.onload = makeColors(), setColors();

$("div").click(function() {
	var clickedClass = $(this).attr("class");
	if(clickedClass == "settingButton"){
		for (var i = 0; i < settingButton.length; i++) {
			settingButton[i].className = "settingButton";
		};
		this.className = "settingButton current";
		for (var i = 0; i < settingButton.length; i++) {
			if(settingButton[i].className == "settingButton current"){
				strokeColor = colors[i];
				preview.style.background = colors[i];
				cursor.style.background = colors[i];
			}
		};
	}
});

brushSizeRange.oninput 	= brushSizeChange;
brushSizeRange.onchange = brushSizeChange;

function brushSizeChange(){
	var brushSize = brushSizeRange.value / 2;
	if(brushSize <= 0){
		brushSize = 1;
	}
	strokeWidth = brushSize;

	preview.style.height = brushSize + 1 + "px";
	preview.style.width = brushSize + 1 + "px";

	cursor.style.height = brushSize + 1 + "px";
	cursor.style.width = brushSize + 1 + "px";


}