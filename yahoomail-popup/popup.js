

var background = chrome.extension.getBackgroundPage();
var localurl;

document.addEventListener('DOMContentLoaded', function () {



	iframe = document.createElement("iframe");
	iframe.width = "325";
	iframe.height = "0"

	document.getElementById("body").appendChild(iframe);

	iframedoc = iframe.contentDocument;
	
	iframedoc.writeln('<body ></body>');

	// addBody();

	
	var xmlhttp = new window.XMLHttpRequest();
	
		xmlhttp.open("GET",'http://m.mail.yahoo.co.jp/cl',false);
		xmlhttp.setRequestHeader('Content-Type', 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8');

		try{
			xmlhttp.onreadystatechange = function() { 
				if (this.readyState == 4) { 
					var text = this.responseText; 
					if(text.indexOf('class="mailBox"') > 0){

						addBody();
						return;
					}else{

						background.loginYmail();
						return;
					}
				} 
			}; 
		
		
			xmlhttp.send(null);
			
			

		}catch(e3){
			console.log('xmlhttp.responseText is ???:' + localStorage['domain'] + 'cl/:' + e3); 		
		}
	


}, false);
var interval='';



function addBody(localurl2){


	iframedoc.location.href= 'http://m.mg.mail.yahoo.co.jp/cl';

	iframe.onload = function () {
		intervalId = setInterval(function () {
				viwe();
			}
			, 1); // 1*1000 = 1s
	}
	
	
	
}

var intervalId;
var iframe;
var i=0;
var heightPopup;
function viwe(){
	i=i+20;
	iframe.height = i + "";
	
	if(( localStorage["height"] || "" )+"" == "true"){
		heightPopup = '400';
	}else{
		heightPopup = '480';
	}
	if(i >heightPopup){
		clearInterval(intervalId);
		document.getElementById("load").innerHTML = "<img src=window_open.gif label='update Twitter.' id='open_window' >";
		document.getElementById("open_window").addEventListener('click', openWindow);

	}
}

function openWindow(){

	window.open('http://m.mg.mail.yahoo.co.jp/cl'  , 'Y!メール', 'width=325, height='+heightPopup+', menubar=no, toolbar=no, scrollbars=yes');


}

