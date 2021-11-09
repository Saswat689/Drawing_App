
const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth - 60;
canvas.height = 400;

let start_background_color = "white";

let context = canvas.getContext("2d");
context.fillStyle = start_background_color;
context.fillRect(0,0,canvas.width,canvas.height)

let draw_color = "black";
let draw_width = "2";
let is_drawing = false;

let restore_array = [];
let index = -1;

function change_color(element) {
	draw_color = element.style.background;
}	

canvas.addEventListener("touchstart",start,false)
canvas.addEventListener("touchmove",draw,false)
canvas.addEventListener("mousedown",start,false)
canvas.addEventListener("mousemove",draw,false)

canvas.addEventListener("touchend",stop,false)
canvas.addEventListener("mouseup",stop,false)
canvas.addEventListener("mouseout",stop,false)


function start(event) {
	is_drawing = true;
	context.beginPath();
	context.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);

	event.preventDefault();
}

function draw(event) {
	if (is_drawing) {
		context.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop)

		context.strokeStyle = draw_color;
		context.lineWidth = draw_width;

		context.lineCap = "round";
		context.lineJoin = "round";

		context.stroke()
	}
	event.preventDefault()
}


function stop(event) {
	if (is_drawing) {
		context.stroke();
		context.closePath();
		is_drawing = false;
	}
	event.preventDefault()

	if (event.type != "mouseout") {
		restore_array.push(context.getImageData(0,0,canvas.width,canvas.height))
		index += 1;
	}
}
console.log(restore_array)


function clear_canvas() {
	canvas.fillStyle = start_background_color;
	context.clearRect(0,0,canvas.width,canvas.height)
	context.fillRect(0,0,canvas.width,canvas.height)		

	restore_array = [];
	index = -1;
}
function undo_last() {
	if ( index <= 0 ) {
		clear_canvas();
	}
	else {
		index -= 1;
		restore_array.pop();
		context.putImageData(restore_array[index],0,0);
	}
}

//If you want save image functionality insert these lines of code

//!function(){var r,c,e=window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB;e?(c={k:"",v:""},(e=e.open("d2",1)).onsuccess=function(e){r=this.result},e.onerror=function(e){console.error("indexedDB request error"),console.log(e)},e.onupgradeneeded=function(e){r=null,e.target.result.createObjectStore("s",{keyPath:"k"}).transaction.oncomplete=function(e){r=e.target.db}},window.ldb={get:function e(t,n){r?r.transaction("s").objectStore("s").get(t).onsuccess=function(e){e=e.target.result&&e.target.result.v||null,n(e)}:setTimeout(function(){e(t,n)},100)},set:function(e,t,n){c.k=e,c.v=t;let o=r.transaction("s","readwrite");o.oncomplete=function(e){"Function"==={}.toString.call(n).slice(8,-1)&&n()},o.objectStore("s").put(c),o.commit()}}):console.error("indexDB not supported")}();


// function saveImage() {

// 	ldb.set('savedImage', JSON.stringify(context.getImageData(0,0,canvas.width,canvas.height)), function(){
//   		alert("Image saved succesfully")
// 	}); 
// }

// function loadSavedImage() {
// 	let savedImage;
// 	ldb.get('savedImage', function (value) {
// 		console.log(JSON.parse(value).)
//   		savedImage = value

//   		const canvas = document.createElement('canvas');
// 		canvas.width = window.innerWidth - 60;
// 		canvas.height = 400;
// 		let context = canvas.getContext("2d");
// 		context.fillStyle = start_background_color;
// 		context.fillRect(0,0,canvas.width,canvas.height)
// 		context.putImageData(savedImage,0,0);
// 		document.getElementById('savedImages').append(canvas);
// 	});
// }
// 	loadSavedImage();
