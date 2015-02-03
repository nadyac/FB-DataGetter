// Log in through facebook
// There are three possible states for the login response:
//	1) Connected - user is logged into Fb and logged into the app
//	2) Not Authorized - user logged into FB but not the app or
//	3) Neither - the user is not logged into FB at all.
function statusChangeCallback(response) {
	if (response.status === 'connected') {
		welcome();
		extractData();
	} else if (response.status === 'not_authorized') {
		//the user is logged into FB, but not the app
		document.getElementById('status').innerHTML = 'Please log into this app.';
	} else {
		//The user is not logged into FB, so not sure if logged into app or not
		document.getElementById('status').innerHTML = 'Please log into Facebook';
	}
}

function checkLoginState() {
	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	});
}

//initialize all of the app fields to run the app
window.fbAsyncInit = function() {
	FB.init({
		appId : '300371836820467',
		cookie : true,//enable cookies to allow the server to access the session
		xfbml : true,//parse social plugins on this page
		version : 'v2.1' //use Graph API version 2.1
	});
}

//display a welcome greeting which comfirms the user has logged in 
function welcome() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function (response) {
        console.log('Successful login for: ' + response.name);
    });
}

//perform all the data extraction
function extractData() {
	FB.api('me?fields=movies{genre}', function(response) {
		console.log('movie genres : ' + response.data);
	});
}
