// Maintain a supported Language List
var langList = ["en", "sw"];
// Get browser Language
var userLang = navigator.language || navigator.userLanguage;
// Extract Language (en-US => en)
userLang = userLang.substring(0, 2);
// Extract get variables
var getVars = {};
if(document.location.toString().indexOf('?') !== -1) {
    var query = document.location
                   .toString()
                   // get the query string
                   .replace(/^.*?\?/, '')
                   // and remove any existing hash string
                   .replace(/#.*$/, '')
                   .split('&');

    for(var i=0, l=query.length; i<l; i++) {
       var aux = decodeURIComponent(query[i]).split('=');
       getVars[aux[0]] = aux[1];
    }
}
// Get variable lang overrides default
if (getVars['lang'] && langList.includes(getVars['lang'])) {
	userLang = getVars['lang'];
}
// Call the function to set language
if (langList.includes(userLang)) {
	changeLang(userLang);
} else {
	// Set default to english if language not supported
	changeLang("en");
}


// function to change language
function changeLang(useLang) {
    langList.forEach((lang) => {
		var displayString = "none";
		if (useLang == lang) {
			displayString = "block";
		}
		var langElems = document.querySelectorAll('.' + lang);
        langElems.forEach((elem) => {
            elem.style.display = displayString;
        });
    });
	document.documentElement.setAttribute("lang", useLang);
}