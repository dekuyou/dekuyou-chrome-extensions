
setTimeout("event()",3000);
function event(){
	if(	document.getElementById("maininput")){
		document.getElementById("vr-proto-header").style.height = 50+'px';// 72

		document.getElementById("maininput").addEventListener("focus",function(){
					//
					doFocus(document.getElementById("maininput"));
				},false);

		document.getElementById("maininput").addEventListener("blur",function(){
					//
					doBlur(document.getElementById("maininput"));
					
				},false);
	}else{
		setTimeout("event()",3000);
	}

}
		
		
		
//document.getElementById("sr_what").addEventListener("focus",function(){
//			//
//			doFocus(document.getElementById("sr_what"));
//		},true);

//document.getElementById("sr_what").addEventListener("blur",function(){
//			//
//			doBlur(document.getElementById("sr_what"));
//		},true);
		
//var SEARCH_WHO="sr_who";
//document.getElementById(SEARCH_WHO).addEventListener("focus",function(){
//			//
//			doFocus(document.getElementById(SEARCH_WHO));
//		},true);

//document.getElementById(SEARCH_WHO).addEventListener("blur",function(){
//			//
//			doBlur(document.getElementById(SEARCH_WHO));
//		},true);		
		
		
//var SEARCH_WHERE="sr_where";
//document.getElementById(SEARCH_WHERE).addEventListener("focus",function(){
//			//
//			doFocus(document.getElementById(SEARCH_WHERE));
//		},true);

//document.getElementById(SEARCH_WHERE).addEventListener("blur",function(){
//			//
//			doBlur(document.getElementById(SEARCH_WHERE));
//		},true);	

//var SEARCH_MINUS="sr_minusWords";
//document.getElementById(SEARCH_MINUS).addEventListener("focus",function(){
//			//
//			doFocus(document.getElementById(SEARCH_MINUS));
//		},true);

//document.getElementById(SEARCH_MINUS).addEventListener("blur",function(){
//			//
//			doBlur(document.getElementById(SEARCH_MINUS));
//		},true);			
				
function doFocus(el){
			var str = el.value.split(' ');
			var str1 = "";
			for(var i=0;i < str.length; i+=1){
				if(str[i].indexOf('"') < 0){
					str1 = str1 + str[i] + ' ';
				}else{
					break;
				}
			}
			el.value = str1;
}

function doBlur(el){
			var str = el.value.split(' ');
			var str1 = "";
			var str2 = "";
			for(var i=0;i < str.length; i+=1){
				if(str[i] !==''){
					str1 = str1 + str[i] + ' ';
					str2 = str2 + '"' + str[i] + '" ';
				}
			}
			el.value = str1 + str2;
}

