/*--------------------------------------------
			Variabler
---------------------------------------------*/

/* Elementer*/
// Login og signup
var loginUser   		= document.getElementById("loginUser");
var loginPass   		= document.getElementById("loginPass");
var loginSubmit 		= document.getElementById("loginSubmit");
var signUpUser  		= document.getElementById("signUpUser");
var signUpEmail  		= document.getElementById("signUpEmail");
var signUpPass  		= document.getElementById("signUpPass");
var signUpSubmit		= document.getElementById("signUpSubmit");
var enterGuest			= document.getElementById("enterGuest");
var loginContainer		= document.getElementById("loginContainer");
var orGuest				= document.getElementById("orGuest");
var splash				= document.getElementById("splash");
var app 				= document.getElementById("app");
var loggedInText		= document.getElementById("loggedInText");

// Brush settings
var preview 		= document.getElementById("preview");
var brushSizeRange 	= document.getElementById("brushSizeRange");
var settingButtons 	= document.getElementById("settingButtons");
var settingButton 	= document.getElementsByClassName("settingButton");

/* Arrayer */
var colors = [
	"#000000", "#212121", "#616161", 
	"#BDBDBD", "#F5F5F5", "#FFFFFF",
	"#F44336", "#E91E63", "#9C27B0", 
	"#673AB7", "#3F51B5", "#2196F3", 
	"#03A9F4", "#00BCD4", "#009688", 
	"#4CAF50", "#8BC34A", "#CDDC39", 
	"#FFEB3B", "#FFC107", "#FF9800", 
	"#FF5722", "#795548", "#607D8B"];

/* Booleans */
// Global variables uten verdi
var colorButtons;
var signUpPassReady, signUpUserReady, signUpEmailReady, loginUserReady, loginPassReady;

/* Tall og verdier */

/* Andre variabler */
var ref = new Firebase("https://droff.firebaseio.com/");



/*--------------------------------------------
		Onload functions og snippets
---------------------------------------------*/

// Tilfeldig tall mellom min, max
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Validere emails
function validateEmail(email) {
	var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	return re.test(email);
}

// Finne cookie etter navn
function getCookie(cName){
    var i,x,y,ARRcookies=document.cookie.split(";");

    for (i=0;i<ARRcookies.length;i++)
    {
        x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
        y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
        x=x.replace(/^\s+|\s+$/g,"");
        if (x==cName)
        {
            return unescape(y);
        }
    }
}

// Resume session
function resumeSession(){
	var currentCookie = getCookie("sessioncookie");
	if(currentCookie){
		// There is a cookie
		var cookieSplit = currentCookie.split(",");

		var user = cookieSplit[0];
		var token = cookieSplit[1];

		// Check if the cookie has a corresponding session
		$.ajax({
		type: "POST",
		url: "resumesession.php",
		data: { username: user, token: token}
		}).done(function( msg ) {
		var msgSplit = msg.split(",");
		if(msg == "success"){
			// User is logged in
			loginPage();
		}else{
			// User is not logged in
			if(msg == "fail"){
				loggedInText.innerHTML = "Not logged in";
			}else{
				loggedInText.innerHTML= msg;
			}
		}
		});

	}else{
		// No current session
	}
}


// Lag fargeelementene
function makeColors(){
	colorButtons = "<div class='settingButton current'></div> ";
	for (var i = 1; i < colors.length; i++) {
		colorButtons += "<div class='settingButton'></div> "
	};
	settingButtons.innerHTML = colorButtons;
}

// Fargelegg! 
function setColors(){
	for (var i = 0; i < settingButton.length; i++) {
		settingButton[i].style.background = colors[i];
	};
}

// Kjører når alt loader
window.onload = makeColors(), setColors(), resumeSession();

// Jquery :D
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

// Endre størrelsen på brushen
brushSizeRange.oninput 	= brushSizeChange;
brushSizeRange.onchange = brushSizeChange;
function brushSizeChange(){
	// Gjør om fra 0-100 til 0-50
	var brushSize = brushSizeRange.value / 2; 

	// Brush size kan ikke bli 0 eller mindre
	if(brushSize <= 0){
		brushSize = 1;
	}

	// Send input data til canvas
	strokeWidth = brushSize;

	// Endre størrelse på preview
	preview.style.height = brushSize + 1 + "px";
	preview.style.width = brushSize + 1 + "px";

	// Endre størrelse på cursor
	cursor.style.height = brushSize + 1 + "px";
	cursor.style.width = brushSize + 1 + "px";
}

// Sign up feltene oppfyller kriteriene
signUpUser.oninput 	= checkSignUpFields;
signUpEmail.oninput = checkSignUpFields;
signUpPass.oninput 	= checkSignUpFields;
function checkSignUpFields(){
	// Brukernavn er gyldig
    if(signUpUser.value.length > 0){
        signUpUserReady = true;
    }else{
        signUpUserReady = false;
    }

    // Email gyldig
	if(validateEmail(signUpEmail.value)){
		signUpEmailReady = true;
    }else{
        signUpEmailReady = false;
	}


    // Passord er gyldig
    if(signUpPass.value.length > 4){
        signUpPassReady = true;
    }else{
        signUpPassReady = false;
    }

    // Godta sign up hvis brukernavn, email og passord er gyldig
    if(signUpUserReady && signUpEmailReady && signUpPassReady){
        signUpSubmit.className = "ready";
    }else{
        signUpSubmit.className = "";
    }
}

// Login feltene oppfyller kriteriene
loginUser.oninput = checkLoginFields;
loginPass.oninput = checkLoginFields;
function checkLoginFields(){
    if(loginUser.value.length > 0){
        loginUserReady = true;
    }else{
        loginUserReady = false;
    }
    if(loginPass.value.length > 4){
        loginPassReady = true;
    }else{
        loginPassReady = false;
    }

    if(loginUserReady && loginPassReady){
        loginSubmit.className = "ready";
    }else{
        loginSubmit.className = "";
    }
}

// Sign up
signUpSubmit.onclick = signUp;
function signUp(){
	if(signUpUserReady && signUpPassReady && signUpEmailReady){
	    signUpSubmit.innerHTML = "Signing Up...";
	    var finishedRequest = false;
	    // Ajax kode for å sende data til databasen i real time
	    $.ajax({
	        type: "POST",
	        url: "signup.php",
	        data: { username: signUpUser.value, email: signUpEmail.value, password: signUpPass.value}
	        }).done(function( msg ) {
	        if(msg == "success"){
	            alert("Welcome " + signUpUser.value);
	            createSession(signUpUser.value);
	        }else{
	        	// Brukernavnet finnes
	            if(msg == "userExists"){
	            	signUpUser.className = "signUpInput error";
	            	return;
	            }

	            // Emailen finnes
	            if(msg == "emailExists"){
	            	alert("email is taken");
	            	return;
	            }

	            // Både brukernavn og mail finnes
	            if(msg == "bothExist"){
	            	alert("A user with this username and email already exists, try logging in or request a password reset.");
	            	return;
	            }

	            // Error
	            if(msg == "fail"){
	            	alert("Somthing went wrong, try again");
	            	return;
	            }

	            // Ukjent error
	            alert("Something went wrong, try again");
	        }
	        signUpSubmit.innerHTML = "Sign Up";
	        finishedRequest = true;
	    });
		if(finishedRequest = true){
			signUpSubmit.innerHTML = "Sign Up";
		}
		setTimeout(
			function(){ 
				signUpSubmit.innerHTML = "Sign Up";
			},
		3000);
	}
}

// Login
loginSubmit.onclick = login;
function login(){
	if(loginUserReady && loginPassReady){
		loginSubmit.innerHTML = "Logging in...";

		// Ajax code to send data to database instantly
		$.ajax({
			type: "POST",
			url: "login.php",
			data: { username: loginUser.value, password: loginPass.value }
			}).done(function( msg ) {
			var msgSplit = msg.split(",");
			if(msgSplit[0] == "success"){
				// Successfully logged in
				createSession(msgSplit[1]);

				app.style.opacity = "100";
				app.style.pointerEvents = "all";

				splash.style.opacity = "0";
				splash.style.pointerEvents = "none";
			}else{
				if(msg == "fail"){
					alert("Wrong username or password, try again");
				}else{
					alert("Something went wrong, try again");
				}
			}
			loginSubmit.innerHTML = "Login";
		});
	}
}

// Sjekk om enter presses inne i forms
document.onkeypress = enterCheck;
function enterCheck(event){
	// Enter ble presset
	if(event.keyCode == 13){
		// Brukeren logger inn
		if(event.target.id == "loginUser" || event.target.id == "loginPass"){
			login();
		}

		// Brukeren signer opp
		if(event.target.id == "signUpUser" || event.target.id == "signUpEmail" || event.target.id == "signUpPass"){
			signUp();
		}
	}
}

enterGuest.onclick = function(){
	createSession("guest");
}
function createSession(user){
	$.ajax({
		type: "POST",
		url: "createsession.php",
		data: { username: user }
		}).done(function( msg ) {
		var msgSplit = msg.split(",");
		if(msgSplit[0] == "success"){
			// Set the time
			var now = new Date();
			var time = now.getTime();
			time += 200000 * 3600 * 1000;
			now.setTime(time);

			// Create the cookie
			document.cookie = 
			'sessioncookie=' + user + "," + msgSplit[1] + 
			'; expires=' + now.toUTCString() + 
			'; path=/';

			// Throw login page
			loginPage();
		}else{
			if(msg == "fail"){
				alert("error");
			}else{
				alert(msg);
			}
		}
		/*// Fjern metadata etter semicolon
		var cookieValue = document.cookie.split(";");

		// Del opp cookie i user og token
		var cookieSplit = cookieValue[0].split(",");
		alert(cookieSplit[0] + " " + cookieSplit[1]);*/
	});
}

function loginPage(){
	//loginContainer.style.top = "-600px";
	//orGuest.style.top = "-200px";
}