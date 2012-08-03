
var tmpsubd ="";

var nounread = [0,0,0];
var unread = [255,0,0];
var newmsg = [255,0,0];

chrome.extension.getVersion = function() { 
  if (!chrome.extension.version_) { 
    var xhr = new XMLHttpRequest(); 
    xhr.open("GET", chrome.extension.getURL('manifest.json'), false); 
    xhr.onreadystatechange = function() { 
      if (this.readyState == 4) { 
        var manifest = JSON.parse(this.responseText); 
        chrome.extension.version_ = manifest.version; 
      } 
   }; 
   xhr.send(); 
 } 
 return chrome.extension.version_; 
}


document.addEventListener('DOMContentLoaded', function () {
	
	var old_ver = ( localStorage["version"] || "" ).split(".");
	var new_ver = (chrome.extension.getVersion() + "").split(".");
	
	if(old_ver[0]+'.'+old_ver[1]+'.'+old_ver[2] != new_ver[0]+'.'+new_ver[1]+'.'+new_ver[2]){
		chrome.tabs.getAllInWindow(undefined, function(tabs) {
			for (var i = 0, tab; tab = tabs[i]; i++) {
				var str = tab.url;
				if (str.match('dekuyou.ddo.jp/knowledge/')) { 
					chrome.tabs.update(tab.id, {selected: true});
					return;
				}
			}
			chrome.tabs.create({url:'http://dekuyou.ddo.jp/knowledge/?chrome/extensions'});
		});
		
		localStorage["version"] = chrome.extension.getVersion();
		
		// 255, 0, 0 red
		chrome.browserAction.setBadgeText({text:"new!"});
		chrome.browserAction.setBadgeBackgroundColor({color:[0,255,255, 255]});
		
	}
	
	start();
}, false);

var intervalId;
function start(){
	interval = (localStorage['interval'] || "");
	if( interval.match( /[^0-9]+/ ) || interval == '' ) {
		interval = localStorage["interval"] = '60';
	}
	if(interval == '0'){return;}
	if(interval < 30){interval = 30;} 
	
	intervalId = setInterval( function(){
		getYmail_jp_ddo_dekuyou();
	}
	, interval*1000); // 1*1000 = 1s


}

function stop(){
	clearInterval(intervalId);
	start();
}


function getYmail_jp_ddo_dekuyou(check){



	try{
		if(( localStorage["checkingbadge"] || "" )+"" != "true"){

			chrome.browserAction.setBadgeText({text:"...."});
		}
		subdomain = (localStorage["subdomain"] || "");
		

		var xmlhttp = new window.XMLHttpRequest();
		
		xmlhttp.open("GET","http://m.mail.yahoo.co.jp/" + "ipn/", false);
		xmlhttp.setRequestHeader('Content-Type', 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8');
		
		xmlhttp.onreadystatechange=function(){
			if(xmlhttp.readyState == 4) {
//				console.log(xmlhttp.status);
//				console.log(xmlhttp.responseText);
				
				var text = xmlhttp.responseText;
			
		
				if(text == ''){
			
					throw new Error("xmlhttp.responseText is null.");
		
		
				}else{
					localStorage["bodytext"] = text;
			
					if(text.indexOf('class="mailBox"') <0){
						throw new Error("xmlhttp.responseText is no folders.");
					}
			
				}

	// unread msg
	var startA = text.indexOf("fid=Inbox");


	var midoku = text.substring(text.indexOf("icnBg", startA), text.indexOf("</li", startA));

	var midokusuunohajimari;
	var midokuB;
	
	if(midoku.indexOf("rightModule") < 0){
		midokuB = '0';
		
	}else{
		midoku = midoku.substring(midoku.indexOf("rightModule"), midoku.indexOf("</div",midoku.indexOf("rightModule")));

		
		midokusuunohajimari = midoku.search('[0-9]');

		midokuB = midoku.substring(midokusuunohajimari);
	}

	
	// msgid

	var idBadge = "";

	
	try{
		var hyouji = parseInt(midokuB);
		if(isNaN(hyouji)){
			hyouji = '0';
		}
		
		// color seting
		if ((localStorage["nounread"] || "") != ""){
			nounread = hex2RGB(localStorage["nounread"]);
		}
//		if ((localStorage["newmsg"] || "") != ""){
//			newmsg = hex2RGB(localStorage["newmsg"]);
//		}
		if ((localStorage["unread"] || "") != ""){
			unread = hex2RGB(localStorage["unread"]);
		}
		// color seting
		
		
		if (hyouji == '0'){
			if(( localStorage["nomailicongrey"] || "" )+"" == "true"){
//				chrome.browserAction.setIcon({path:'windows-live-logo_grey.png'});
			}else{
//				chrome.browserAction.setIcon({path:'windows-live-logo.png'});
			}
			if(( localStorage["0badge"] || "" )+"" == "true"){
				chrome.browserAction.setBadgeText({text:''});
			}else{
				chrome.browserAction.setBadgeText({text:''+hyouji});
				chrome.browserAction.setBadgeBackgroundColor({color:[nounread[0],nounread[1],nounread[2], 255]});
			}
		}else{

		// 255, 0, 0 red
				chrome.browserAction.setBadgeText({text:"" + hyouji});
				chrome.browserAction.setBadgeBackgroundColor({color:[unread[0],unread[1],unread[2], 255]});


				}
	}catch(e2){
		console.log("HTML parse error:" + e2);
		
		chrome.browserAction.setBadgeText({text:'xxxx'});
		chrome.browserAction.setBadgeBackgroundColor({color:[128, 128, 128, 255]});

	}


			}
		};
		xmlhttp.send(null);

	}catch(e){
		console.log("xmlhttp.responseText is ???:" + e); 

		
		chrome.browserAction.setBadgeText({text:'?'});
		chrome.browserAction.setBadgeBackgroundColor({color:[128, 128, 128, 255]});

		
		return;
	}
	

}




function goToYmail() {
	chrome.tabs.getAllInWindow(undefined, function(tabs) {
		for (var i = 0, tab; tab = tabs[i]; i++) {
			var str = tab.url;
			if (str.match('login.yahoo.co.jp')) { 
				chrome.tabs.update(tab.id, {selected: true});
				return;
			}
		}
		chrome.tabs.create({url:'https://login.yahoo.co.jp/config/login_verify2?.src=ym'});
	});
}


function foo() { alert("bar"); }




var tab_id;


function  loginYmail(){

	console.log("Yahoo!Mail");
	
	chrome.tabs.getAllInWindow(undefined, function(tabs) {
		for (var i = 0, tab; tab = tabs[i]; i++) {
			var str = tab.url;
			if (str.match('login.yahoo.co.jp/')) { 
				console.log("tab selected : true");
				chrome.tabs.update(tab.id, {selected: true});
				chrome.tabs.executeScript(tab.id, {code: 'window.location.reload()'});
				return;
			}else if(str.match('login.yahoo.co.jp/')) { 
				chrome.tabs.update(tab.id, {selected: true});
				return;
			}
		}
		console.log("create new tab.");
		chrome.tabs.create({url:'http://mail.yahoo.co.jp/', selected:true }, function(tab) {
			tab_id = tab.id;
		});	
	});
	
 	
}




function hex2RGB(hex){
	var s=hex;
    var t = {
        "0":0,"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,
        "A":10,"B":11,"C":12,"D":13,"E":14,"F":15,
        "a":10,"b":11,"c":12,"d":13,"e":14,"f":15};
    var r=0, g=0, b=0;
    if(s.search(/#[0-9a-fA-F]{6}$/) == 0) {
        r = t[s.charAt(1)]*16+t[s.charAt(2)];
        g = t[s.charAt(3)]*16+t[s.charAt(4)];
        b = t[s.charAt(5)]*16+t[s.charAt(6)];
    }else{
		throw new Error("color seting fail.");
	}
	
	return [(r || 0),(g || 0),(b || 0)];
 
}




