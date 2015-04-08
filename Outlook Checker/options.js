
var background = chrome.extension.getBackgroundPage();

window.addEventListener('load', function(e) {
	restore_options();
	document.getElementById("ver").innerHTML = background.chrome.extension.getVersion();

	// button event bind 
	document.getElementById("save_interval").addEventListener('click', save_interval);
	document.getElementById("save_badge_options").addEventListener('click', save_badge_options);
	document.getElementById("save_sign").addEventListener('click', save_sign);
	document.getElementById("save_hide_options").addEventListener('click', save_hide_options);
	document.getElementById("save_nomailicongrey_options").addEventListener('click', save_nomailicongrey_options);
	document.getElementById("save_buttonicon_options").addEventListener('click', save_buttonicon_options);
	document.getElementById("sound_test").addEventListener('click', sound_test);
	document.getElementById("save_sound_options").addEventListener('click', save_sound_options);
	document.getElementById("save_desktopnotify_options").addEventListener('click', save_desktopnotify_options);
	document.getElementById("domain_Initialization").addEventListener('click', domain_Initialization);




	
}, false);




function save_interval() {
	var interval = document.getElementById("interval").value;
	if( interval.match( /[^0-9]+/ ) ) {
		viewStatus("status_interval", "enter a number.");
		return;
	}
	
    //
    localStorage["interval"] = interval;
	
	viewStatus("status_interval","Options Saved.");
	
	background.stop();
	
}
function save_sign(){
    localStorage["sign"] = (document.getElementById("sign").value || "");
	viewStatus("status_sign","Options Saved.");
}



function save_badge_options(){

    localStorage["nounread"] = document.getElementById("t1").value;
    localStorage["unread"] = document.getElementById("t2").value;
    localStorage["newmsg"] = document.getElementById("t3").value;
	viewStatus("status_badge","Options Saved.");

	
}

function save_hide_options(){

    localStorage["0badge"] = document.getElementById("h1").checked;
    localStorage["checkingbadge"] = document.getElementById("h2").checked;
	viewStatus("status_hide","Options Saved.");

	
}

function save_buttonicon_options(){
	if(document.getElementById("icon0").checked){
		localStorage["icon"] = '0';
		
	}else if(document.getElementById("icon1").checked){
		localStorage["icon"] = '1';
		
	}else if(document.getElementById("icon2").checked){
		localStorage["icon"] = '2';

	}else if(document.getElementById("icon3").checked){
		localStorage["icon"] = '3';	

	}else{
		 localStorage["icon"] = '0';
	}

	viewStatus("status_icon","Options Saved.");
	
	background.iconsetting();

}


function save_nomailicongrey_options(){

    localStorage["nomailicongrey"] = document.getElementById("g1").checked;
	viewStatus("status_nomailicon","Options Saved.");

	
}

function save_sound_options(){

    localStorage["usesound"] = document.getElementById("s1").checked;
	localStorage["soundpath"] = document.getElementById("soundpath").value;
	viewStatus("status_sound","Options Saved.");

	
}


function save_desktopnotify_options(){

    localStorage["usedesktopnotify"] = document.getElementById("dn1").checked;
	viewStatus("status_desktopnotify","Options Saved.");

	
}

function domain_Initialization(){
    //
	localStorage.removeItem("domain");
	localStorage.removeItem("subdomain");
	viewStatus("status_domain"," Initialized.");

	restore_options();

}

function viewStatus(str1,str2){
    //
    var status = document.getElementById(str1);
    status.innerHTML = str2;
    setTimeout(function() { status.innerHTML = ""; }, 1 * 1000);


}

function restore_options() {
    //
    document.getElementById("interval").value = ( localStorage["interval"] || "" );
    document.getElementById("t1").value = ( localStorage["nounread"] || "" );
    document.getElementById("t2").value = ( localStorage["unread"] || "" );
    document.getElementById("t3").value = ( localStorage["newmsg"] || "" );

	if(( localStorage["0badge"] || "" )+"" == "true"){
		document.getElementById("h1").checked = true;
	}
	if(( localStorage["checkingbadge"] || "" )+"" == "true"){
		document.getElementById("h2").checked = true;
	}
	
	if(( localStorage["nomailicongrey"] || "" )+"" == "true"){
		document.getElementById("g1").checked = true;
	}

	if(( localStorage["usesound"] || "" )+"" == "true"){
		document.getElementById("s1").checked = true;
	}
	
	if(( localStorage["usedesktopnotify"] || "" )+"" == "true"){
		document.getElementById("dn1").checked = true;
	}
	
//	if(( localStorage["oldicon"] || "" )+"" == "true"){
//		document.getElementById("icon2").checked = true;
//	}
	if(( localStorage["icon"] || "" )+"" == "1"){
		document.getElementById("icon1").checked = true;
	}else if(( localStorage["icon"] || "" )+"" == "2"){
		document.getElementById("icon2").checked = true;
	}else if(( localStorage["icon"] || "" )+"" == "3"){
		document.getElementById("icon3").checked = true;
	}
 

	
	
	
    document.getElementById("sign").value = ( localStorage["sign"] || "" );

    document.getElementById("domain").innerHTML = ( localStorage["domain"] || "" );
	
	document.getElementById("soundpath").value = ( localStorage["soundpath"] || "" );
	

}
function sound_test(){
//'newmsg1.mp3'
if (document.getElementById("soundpath").value === ""){
	file = 'newmsg1.mp3';
}else{
	file = document.getElementById("soundpath").value;
};
	background.ring_sound(file);
}