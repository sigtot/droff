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
var splash				= document.getElementById("splashE");
var app 				= document.getElementById("appE");
var user 				= document.getElementById("userE");
var finding 			= document.getElementById("findingE");
var loggedInText		= document.getElementById("loggedInText");
var userNameContainer	= document.getElementById("userNameContainer");
var userNameMenu		= document.getElementById("userName");
var tinyAvatar			= document.getElementById("tinyAvatar");
var userMenu 			= document.getElementById("userMenu");
var notDropDown			= document.getElementById("notDropDown");
var menuFriends			= document.getElementById("menuFriends");
var menuDroffs			= document.getElementById("menuDroffs");
var menuSettings		= document.getElementById("menuSettings");
var menuLogout			= document.getElementById("menuLogout");

// Brush settings
var preview 		= document.getElementById("preview");
var brushSizeRange 	= document.getElementById("brushSizeRange");
var settingButtons 	= document.getElementById("settingButtons");
var settingButton 	= document.getElementsByClassName("settingButton");

// User page
var strangerIcon 		= document.getElementById("strangerIcon");
var fileInput 			= document.getElementById("fileInput");
var settingsAvatar 		= document.getElementById("settingsAvatar");
var loading 			= document.getElementById("loading");

var deleteAccountButton = document.getElementById("deleteButton");
var deleteAccountDiv	= document.getElementById("deleteAccount");
var confirmDelete 		= document.getElementById("confirmDelete");
var deleteAccountCancel = document.getElementById("cancelDelete");
var deletePass			= document.getElementById("deletePass");

var oldPass				= document.getElementById("oldPass");
var newPass				= document.getElementById("newPass");
var changePass			= document.getElementById("changePass");

var emailPass			= document.getElementById("emailPass");
var newEmail			= document.getElementById("newEmail");
var changeEmail			= document.getElementById("changeEmail");
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
var polling = false;

// Global variables uten verdi
var colorButtons;
var signUpPassReady, signUpUserReady, signUpEmailReady, loginUserReady, loginPassReady;
var badUser, badEmail;

/* Tall og verdier */

var loggedInUser = "Not logged in";
var currentFirebase = "p";

/* Andre variabler */

var ref = new Firebase("https://droff.firebaseio.com/");
var drawRef = ref.child("p");
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

// Sletter cookies
function deleteCookie(cName) {
	// Sett expiration date til fortiden
	document.cookie = cName + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
}

// Legg til js
function addJsFile(filename){
	var fileref=document.createElement('script');
	fileref.setAttribute("type","text/javascript");
	fileref.setAttribute("src", filename);
	document.getElementsByTagName("head")[0].appendChild(fileref);
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
		if(msgSplit[0] == "success"){
			// User is logged in
			loginPage();
			if(msgSplit[1]){
				settingsAvatar.src 	= "img/avatar/" + msgSplit[1];
				tinyAvatar.src 		= "img/avatar/" + msgSplit[1];
			}
		}else{
			// User is not logged in
			if(msg == "fail"){
				logOut();
			}else{
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

function checkUserName(){
	if(userNameMenu.innerHTML == "Not logged in"){
		userNameContainer.className = "";
	}else{
		userNameContainer.className = "enabled";
	}
}

// Kjører når alt loader
window.onload = makeColors(), setColors(), resumeSession(), checkUrl(), checkUserName();

/*--------------------------------------------
				Funksjonalitet
---------------------------------------------*/

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

    // Fiks røde felt
    if(signUpUser.value != badUser){
		signUpUser.className = "signUpInput";
	}else{
		signUpUser.className = "signUpInput error";
	}
	if(signUpEmail.value != badEmail){
		signUpEmail.className = "signUpInput";
	}else{
		signUpEmail.className = "signUpInput error";
	}
}

// Login feltene oppfyller kriteriene
loginUser.oninput = checkLoginFields;
loginPass.oninput = checkLoginFields;
function checkLoginFields(){
	loginUser.className ="loginInput";
	loginPass.className ="loginInput";

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
	        	// Brukeren ble signet opp
	            createSession(signUpUser.value);
	            loginPage();
	        }else{
	        	// Brukernavnet finnes
	            if(msg == "userExists"){
	            	signUpUser.className = "signUpInput error";
	            	badUser = signUpUser.value;
	            	return;
	            }

	            // Emailen finnes
	            if(msg == "emailExists"){
	            	signUpEmail.className = "signUpInput error";
	            	badEmail = signUpEmail.value;
	            	return;
	            }

	            // Både brukernavn og mail finnes
	            if(msg == "bothExist"){
	            	signUpUser.className = "signUpInput error";
					signUpEmail.className = "signUpInput error";
	            	return;
	            }

	            // Error
	            if(msg == "fail"){
	            	alert("Something went wrong, try again");
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

				if(msgSplit[2]){
					settingsAvatar.src 	= "img/avatar/" + msgSplit[2];
					tinyAvatar.src 		= "img/avatar/" + msgSplit[2];
				}

				loginPage();
				
			}else{
				if(msg == "fail"){
					loginUser.className ="loginInput error";
					loginPass.className ="loginInput error";
				}else{
					alert("Something went wrong, try again");
				}
			}
			loginSubmit.innerHTML = "Login";
		});
	}
}

// Sjekk for keypress
document.onkeyup = enterCheck;
function enterCheck(event){
	// Enter ble presset
	if(event.keyCode == 13){
		// Sjekk om enter presses inne i forms
		// Brukeren logger inn
		if(event.target.id == "loginUser" || event.target.id == "loginPass"){
			login();
		}

		// Brukeren signer opp
		if(event.target.id == "signUpUser" || event.target.id == "signUpEmail" || event.target.id == "signUpPass"){
			signUp();
		}
	}

	if(event.keyCode == 27){
		hideUserNameMenu();
	}
}

// Start en session
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
			}
		}
		/*// Fjern metadata etter semicolon
		var cookieValue = document.cookie.split(";");

		// Del opp cookie i user og token
		var cookieSplit = cookieValue[0].split(",");
		alert(cookieSplit[0] + " " + cookieSplit[1]);*/
	});
}

// Add to matchmaking queue
strangerIcon.onclick = function(){
	startGame("duo");
}

function startGame(gameMode){
	var currentCookie = getCookie("sessioncookie");
	if(currentCookie){
		// There is a cookie
		var cookieSplit = currentCookie.split(",");

		var user = cookieSplit[0];
		var token = cookieSplit[1];

		// Check if the cookie has a corresponding session
		$.ajax({
		type: "POST",
		url: "startgame.php",
		data: {token: token, gamemode: gameMode, user: user}
		}).done(function( msg ) {
		var msgSplit = msg.split(",");
		if(msgSplit[0] == "success"){
			// There is a session - game starts right away
			//alert("gameid is " + msgSplit[1]);

			//ref.set({msgSplit[1]});

			ref.child(msgSplit[1]).set({
				placeholder: "placeholder2"
			});
			drawRef = new Firebase("https://droff.firebaseio.com/" + msgSplit[1]);
			currentFirebase = msgSplit[1];
			window.location.hash = "#app";

			// Add draw.js
			addJsFile("draw.js");
		}else{
			// There is no session - has to poll for another player
			if(msg == "poll"){
				window.location.hash = "#finding";
				poll();
				polling = true;
			}else{
			}
		}
		});

	}else{
		// No current session
	}
}

setInterval(function(){ 
	if(polling == true){
		poll();
	}
}, 10000);

// Poll for avaliable game
function poll(){
	var currentCookie = getCookie("sessioncookie");
	if(currentCookie){
		// There is a cookie
		var cookieSplit = currentCookie.split(",");

		var user = cookieSplit[0];
		var token = cookieSplit[1];

		// Check if the cookie has a corresponding session
		$.ajax({
		type: "POST",
		url: "poll.php",
		data: {user: user}
		}).done(function( msg ) {
		var msgSplit = msg.split(",");
		if(msgSplit[0] == "matched"){
			// Matched!
			//alert("Matched with gameid " + msgSplit[1]);
			//ref.set({msgSplit[1]});
			ref.child(msgSplit[1]).set({
				placeholder: "placeholder"
			});
			drawRef = new Firebase("https://droff.firebaseio.com/" + msgSplit[1]);
			window.location.hash = "#app";
			polling = false;

			// Add draw.js
			addJsFile("draw.js");
		}else{
			// Still waiting
			if(msg == "fail"){
				alert("waiting");
			}else{
			}
		}
		});

	}else{
		// No current session
	}
}


// There is a user logged in
function loginPage(){
	//loginContainer.style.top = "-600px";
	//orGuest.style.top = "-200px";

	// Get the current logged in username
	var currentCookie = getCookie("sessioncookie");
	loggedInUser = currentCookie.split(",")[0];

	window.location.hash = "user";
	userNameMenu.innerHTML = loggedInUser;
	checkUserName();
}

// Change page
window.onhashchange = checkUrl;
function checkUrl(){
	// Reset elements
	app.style.opacity = "0";
	app.style.pointerEvents = "none";

	user.style.opacity = "0";
	user.style.pointerEvents = "none";

	splash.style.opacity = "0";
	splash.style.pointerEvents = "none";
	
	finding.style.opacity = "0";
	finding.style.pointerEvents = "none";

	// Show element
	if(window.location.hash == "#app"){
		app.style.display = "block";
		// The display isn't animatable thus needs to trigger before the fading
		// A 0-time timeout fixes this
		setTimeout(function(){ noDisplay(app); }, 0);
	}

	if(window.location.hash == "#user"){
		user.style.display = "block";
		setTimeout(function(){ noDisplay(user); }, 0);
	}
	// Also show splash if there's no hash
	if(window.location.hash == "#splash" || window.location.hash == ""){
		splash.style.display = "block";
		setTimeout(function(){ noDisplay(splash); }, 0);
	}

	if(window.location.hash == "#finding"){
		finding.style.display = "block";
		setTimeout(function(){ noDisplay(finding); }, 0);
	}
}

function noDisplay(element){
	// Dont show unless true
	if(element.id != "appE"){
		app.style.display = "none";
	}else{
		app.style.opacity = "100";
		app.style.pointerEvents = "all";
	}

	// Dont show unless true
	if(element.id != "userE"){
		user.style.display = "none";
	}else{
		user.style.opacity = "100";
		user.style.pointerEvents = "all";
	}

	// Dont show unless true
	if(element.id != "splashE"){
		splash.style.display = "none";
	}else{
		splash.style.opacity = "100";
		splash.style.pointerEvents = "all";
	}

	// Dont show unless true
	if(element.id != "findingE"){
		finding.style.display = "none";
	}else{
		finding.style.opacity = "100";
		finding.style.pointerEvents = "all";
	}
}

toggleUserNameMenu = function(){
	if(userMenu.className.indexOf("visible") >= 0){
		userMenu.className = "dropDown box";
		notDropDown.className = "";
	}else{
		userMenu.className = "dropDown box visible";
		notDropDown.className = "visible";
	}
	//userMenu.className = "visible dropDown box";
}
userNameContainer.onclick = toggleUserNameMenu;
notDropDown.onclick = toggleUserNameMenu;

hideUserNameMenu = function(){
	if(userMenu.className.indexOf("visible") >= 0){
		toggleUserNameMenu();
	}
}

menuLogout.onclick = logOut;
function logOut(){
	// Hent cookie
	var currentCookie = getCookie("sessioncookie");
	if(currentCookie){
		// Cookie finnes
		var cookieSplit = currentCookie.split(",");
		var token = cookieSplit[1];

		// Fjern cookie fra DB
		$.ajax({
			type: "POST",
			url: "destroysession.php",
			data: {token: token} // Variable token sendes med navn "token" til php
			}).done(function( msg ) {
			// Done! Session finnes ikke lengre
			deleteCookie("sessioncookie");
			logOutPage();
		});
	}
}

function logOutPage(){
	window.location.hash = "splash";
	loggedInUser = "Not logged in";
	userNameMenu.innerHTML = loggedInUser;
	hideUserNameMenu();
	checkUserName();
}

fileInput.onchange = imageUpload;
function imageUpload(){
	if(fileInput.value != "") {
		loading.className = "initiated";

		var currentCookie = getCookie("sessioncookie");
		var cookieSplit = currentCookie.split(",");
		var token = cookieSplit[1];

		var file_data = $('#fileInput').prop("files")[0];   
		var form_data = new FormData();                  

		var extension = file_data.name.split('.').pop();

		form_data.append("file", file_data);
		form_data.append("token", token);
		form_data.append("extension", extension);
		$.ajax({
			url: "upload.php",
			dataType: "text",
			cache: false,
			contentType: false,
			processData: false,
			data: form_data,                         
			type: "post",
			success: function(msg){
				if(msg == "wrong"){
				}else{
					if(msg == "large"){
					}else{
					settingsAvatar.src 	= msg + "?" + new Date().getTime();
					tinyAvatar.src 		= msg + "?" + new Date().getTime();
					}
				}
			},
			complete: function(){
				// stop loading
				loading.className = "finished";
				setTimeout(function(){ 
					loading.className = "";
				},3000);
			}
		});
	}
	

	/*$.ajax({
		type: "POST",
		url: "upload.php",
		data: { token: token, name: fileInput.value} // Filen sendes til php
		}).done(function( msg ) {
		// Done! Session finnes ikke lengre
		
		if(msg == "uploaded"){
			alert("wow good");
		}else{
			alert(msg)
		}
		
	});*/
}

deleteAccountButton.onclick = showDeleteForm;
function showDeleteForm(){
	deleteAccountDiv.className = "active";
}

deleteAccountCancel.onclick = hideDeleteForm;
function hideDeleteForm(){
	deleteAccountDiv.className = "";
}

deletePass.oninput = checkDeleteAccountField;
function checkDeleteAccountField(){
	if(deletePass.value.length > 0){
		confirmDelete.className = "active";
	}else{
		confirmDelete.className = "";
	}
}

oldPass.oninput = checkChangePassFields;
newPass.oninput = checkChangePassFields;
function checkChangePassFields(){
	if(oldPass.value.length > 0){
		var oldPassOk = true;
	}else{
		var oldPassOk = false;
	}

	if(newPass.value.length >= 5){
		var newPassOk = true;
	}else{
		var newPassOk = false;
	}

	if(oldPassOk && newPassOk){
		changePass.className = "active";
	}else{
		changePass.className = "";
	}
}

emailPass.oninput = checkChangeEmailFields;
newEmail.oninput = checkChangeEmailFields;
function checkChangeEmailFields(){
	if(emailPass.value.length > 0){
		var emailPassOk = true;
	}else{
		var emailPassOk = false;
	}

	if(validateEmail(newEmail.value)){
		var newEmailOk = true;
	}else{
		var newEmailOk = false;
	}

	if(emailPassOk && newEmailOk){
		changeEmail.className = "active";
	}else{
		changeEmail.className = "";
	}
}
changePass.onclick = changePassword;
function changePassword(){
	var currentCookie = getCookie("sessioncookie");
	if(currentCookie){
		// Cookie finnes
		var cookieSplit = currentCookie.split(",");

		changePass.innerHTML = "Changing password...";

		var newpass = newPass.value;
		var oldpass = oldPass.value;
		var token = cookieSplit[1];

		// Check if the old password is correct and the token has a corresponding session
		$.ajax({
		type: "POST",
		url: "changepassword.php",
		data: {newpass: newpass, oldpass: oldpass, token: token}
		}).done(function( msg ) {
		if(msg == "success"){
			// Password has changed
			alert("congratu-fucking-lations your password has been changed");
		}else{
			if(msg == "wrong"){
				oldPass.className = "fancyInput error";
			}else{
				// It failed
				alert("something went wrong");
			}
		}
		changePass.innerHTML = "Change password";
		});
	}else{
		// No cookie
	}
}

changeEmail.onclick = changeEmailFunction;
function changeEmailFunction(){
	var currentCookie = getCookie("sessioncookie");
	if(currentCookie){
		// Cookie finnes
		var cookieSplit = currentCookie.split(",");

		changeEmail.innerHTML = "Changing your email...";

		var token = cookieSplit[1];
		var pass = emailPass.value;
		var email = newEmail.value;
		
		$.ajax({
			type: "POST",
			url: "changeemail.php",
			data: {token: token, pass: pass, email: email}
			}).done(function( msg ) {
			if(msg == "success"){
				// Password has changed
				alert("congratu-fucking-lations your email has been changed");
			}else{
				if(msg == "wrong"){
					emailPass.className = "fancyInput error";
				}else{
					if(msg == "taken"){
						// Email is taken
						newEmail.className = "fancyInput error";
					}else{
						// It failed
						alert("something went wrong");
					}
				}
			}
			changeEmail.innerHTML = "Change email";
		});
	}else{
		// No cookie
	}
}

//confirmDelete.onclick = deleteUser;
function deleteUser(){
	var currentCookie = getCookie("sessioncookie");
	if(currentCookie){
		// Cookie finnes
		var cookieSplit = currentCookie.split(",");

		confirmDelete.innerHTML = "Deleting...";

		var token = cookieSplit[1];
		var pass = deletePass.value;
		
		$.ajax({
			type: "POST",
			url: "deleteuser.php",
			data: {token: token, pass: pass}
			}).done(function( msg ) {
			if(msg == "success"){
				// Password has changed
				goodBye();
			}else{
				if(msg == "wrong"){
					deletePass.className = "fancyInput error";
				}else{
					// It failed
					alert("something went wrong");
				}
			}
			confirmDelete.innerHTML = "Delete";
		});
	}else{
		// No cookie
	}
}

confirmDelete.onclick = goodBye;
function goodBye(){
	document.getElementById("goodBye").style.display = "block";
	setTimeout(function() {
		document.getElementById("goodBye").className = "active";
	}, 10);
	setTimeout(function() {window.close();}, 5000);
}