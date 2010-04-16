

var drag =false;
var xx = 0;
var yy = 0;

window.addEventListener('mousedown', function(e) {
		drag = true;
		xx = getMousePosition(e).x;
		yy = getMousePosition(e).y;
}, false);

window.addEventListener('mousemove', function(e) {
	if(drag){

		window.scroll(getMousePosition(e).x - xx ,yy - getMousePosition(e).y);
	}
}, false);

	
window.addEventListener('mouseup', function(e) {
	drag = false;
	xx = 0;
	yy = 0;

}, false);



function getMousePosition(e) {
	var obj = new Object();
	 
	if(e) {
		obj.x = e.pageX;
		obj.y = e.pageY;
	}else {
		obj.x = event.x + document.body.scrollLeft;
		obj.y = event.y + document.body.scrollTop;
	}
	 
	return obj;
}

