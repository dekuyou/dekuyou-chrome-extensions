

var background = chrome.extension.getBackgroundPage();
document.addEventListener('DOMContentLoaded', function () {
	restore_options();
	document.getElementById("ver").innerHTML = background.chrome.extension.getVersion();

	document.getElementById("save_interval").addEventListener('click', save_interval);
	document.getElementById("save_badge_options").addEventListener('click', save_badge_options);
	document.getElementById("save_hide_options").addEventListener('click', save_hide_options);
	document.getElementById("height_options").addEventListener('click', height_options);


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

function save_badge_options(){

    localStorage["nounread"] = document.getElementById("t1").value;
    localStorage["unread"] = document.getElementById("t2").value;
	viewStatus("status_badge","Options Saved.");

	
}

function save_hide_options(){

    localStorage["0badge"] = document.getElementById("h1").checked;
    localStorage["checkingbadge"] = document.getElementById("h2").checked;
	viewStatus("status_hide","Options Saved.");

	
}


function save_nomailicongrey_options(){

    localStorage["nomailicongrey"] = document.getElementById("g1").checked;
	viewStatus("status_nomailicon","Options Saved.");

	
}

function save_sound_options(){

    localStorage["usesound"] = document.getElementById("s1").checked;
	viewStatus("status_sound","Options Saved.");

	
}



function height_options(){

    localStorage["height"] = document.getElementById("height1").checked;
	viewStatus("status_height","Options Saved.");

	
}




function domain_Initialization(){
    //
	localStorage.removeItem("domain");
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

	if(( localStorage["0badge"] || "" )+"" == "true"){
		document.getElementById("h1").checked = true;
	}
	if(( localStorage["checkingbadge"] || "" )+"" == "true"){
		document.getElementById("h2").checked = true;
	}
	if(( localStorage["height"] || "" )+"" == "true"){
		document.getElementById("height1").checked = true;
	}	
	if(( localStorage["io"] || "" )+"" == "true"){
		document.getElementById("io1").checked = true;
	}	

}


