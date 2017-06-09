var z = 1;
var colorMap = new Map();
var letterMap = new Map();
var gestureCount = 0;
var x;
var y;
var NumBlocks = Math.floor(Math.random() * 10) + 4;
var NumGesture = 0;
var NumWords = 0;
var n1 = 1;
var n2 = 1;
var actualMove = 0;
var w1 = 0.1,
	w2 = 0.5;
var previous_top = [];
var previous_left = [];
var color = ['red', 'blue', 'green', 'orange', 'yellow'];

function init() {
	for (var i = 0; i < NumBlocks; i++) {
		$('#block' + i).draggable({
			containment: '#container',
			start: function(event, ui) {
				$(this).css('z-index', ++z);
				var Startpos = $(this).position();
				previous_left[i] = Startpos.left;
				previous_top[i] = Startpos.top;
			},
			stop: function(event, ui) {
				var Stoppos = $(this).position();
				if (Stoppos.left != previous_left[i] || Stoppos.top != previous_top[i]) {
					actualMove++;
				}
			}
		});
	}
}

function initWriteToCSS() {
	var str = "<style>";
	for (var i = 0; i < NumBlocks; i++) {
		var x = Math.floor(Math.random() * 5);
		str += "#block" + i + " {width: 50px; height: 50px; background:" + color[x] + "; border:#000 solid 4px; cursor: move; position: absolute; z-index: 1; text-align: center; vertical-align: middle; line-height: 50px;}";
	}
	str += "</style>";
	document.write(str);
}

function applyDraggableToBlocks() {
	for (var i = 0; i < NumBlocks; i++) {
		$("#block" + i).draggable({});
	}
}

function initFlipColors() {
	for (var i = 0; i < NumBlocks; i++) {
		x = Math.floor(Math.random() * 5);
		colorMap.set('block' + i, color[x]);
	}
}

function initFlipLetters() {
	for (var i = 0; i < NumBlocks; i++) {
		y = Math.floor(Math.random() * 7);
		letterMap.set('block' + i, letters[y]);
	}
}

function flipBlock(box) {
	swapColor(box);
	swapLetter(box);
}

function swapColor(box) {
	var property = document.getElementById(box);
	var currentColor = property.style.backgroundColor;
	property.style.backgroundColor = colorMap.get(box);
	colorMap.set(box, currentColor);
}

function swapLetter(box) {
	var property = document.getElementById(box);
	var currentLetter = property.textContent || property.innerText;
	property.textContent = letterMap.get(box);
	letterMap.set(box, currentLetter);
}

function incrementGesture() {
	var property = document.getElementById('gestureCount');
	gestureCount++;
	property.innerText = gestureCount;
}

function instantiateDraggablePositions() {
	$(document).ready(function() {
		$(".draggable").draggable();
		$('.draggable').each(function(el) {
			var tLeft = Math.floor(Math.random() * 1140) + 1,
				tTop = Math.floor(Math.random() * 540) + 1;
			$(el).css({
				position: 'relative',
				left: 1140,
				top: 540
			});
		});
	});
}

function writeRandomBlocks() {
	var st = "";
	for (var i = 0; i < NumBlocks; i++) {
		var l = Math.floor(Math.random() * 7);
		var letters = ["A", "B", "C", "D", "E", "F", "G"];
		var tLeft = (Math.floor(Math.random() * 22.8) + 0.02) * 50,
			tTop = (Math.floor(Math.random() * 10.8) + 0.02) * 50;
		previous_left.push(tLeft);
		previous_top.push(tTop);
		st += "<div id =\"block" + i + "\" style=\"left:" + tLeft + "px; top:" + tTop + "px\" oncontextmenu=\"flipBlock(\'block" + i + "\');\">" + letters[l] + "</div>";
	}
	document.getElementById("container").innerHTML=st;
}

function addMenuEventListeners() {
	var menu = document.getElementById("selection");
	menu.addEventListener("click", function() {
		switch (menu.selectedIndex) {
			case 0:
				gate = 0;
				break;
			case 1:
				gate = 1;
				break;
			case 2:
				gate = 2;
				break;
			case 3:
				gate = 3;
				break;
		}
	})
	menu.selectedIndex = 0;
}

function addListenersForMetrics() {
	var br;
	var bm;
	var pn;
	var pp;
	var p;
	var te;
	var ie;
	document.getElementById("selection").addEventListener("click", function() {
		if (gate == 0) {
			bm = NumBlocks;
			br = NumBlocks;
			pn = 1;
			pp = 10;
			te = (br - actualMove) / (br - bm);
			ie = (w1 * NumWords + w2 * NumGesture) / bm;
			p = te / ie;
			document.getElementById("taskQ").innerHTML = "Please choose a task\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + "Bm" + bm + " Br" + br + " Pn" + pn + " P*" + pp + " TE" + te + " IE" + ie + " P" + p;
		} else if (gate == 1) {
			bm = n1 + n2;
			br = (n1 + n2) * (NumBlocks + 1) / 2;
			pn = 1;
			pp = 10;
			te = (br - actualMove) / (br - bm);
			ie = (w1 * NumWords + w2 * NumGesture) / bm;
			p = te / ie;
			document.getElementById("taskQ").innerHTML = "Please choose a task\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + "Bm" + bm + " Br" + br + " Pn" + pn + " P*" + pp + " TE" + te + " IE" + ie + " P" + p;
		} else if (gate == 2) {
			bm = NumBlocks;
			br = 1.5 * 2 * NumBlocks;
			pn = 2;
			pp = 20;
			te = (br - actualMove) / (br - bm);
			ie = (w1 * NumWords + w2 * NumGesture) / bm;
			p = te / ie;
			document.getElementById("taskQ").innerHTML = "Please choose a task\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + "Bm" + bm + " Br" + br + " Pn" + pn + " P*" + pp + " TE" + te + " IE" + ie + " P" + p;
		} else if (gate == 3) {
			bm = n1 + n2;
			br = n1 + factorial(n2 + 1) / Math.pow(2, n2);
			pn = 2;
			pp = 20;
			te = (br - actualMove) / (br - bm);
			ie = (w1 * NumWords + w2 * NumGesture) / bm;
			p = te / ie;
			document.getElementById("taskQ").innerHTML = "Please choose a task\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + "Bm" + bm + " Br" + br + " Pn" + pn + " P*" + pp + " TE" + te + " IE" + ie + " P" + p;
		}

		function factorial(x) {
			var c = 1;
			for (var i = 1; i <= x; i++) {
				c *= i;
			}
			return c;
		}
	});
}

function inputlength() {
	var x = document.getElementById("txt_instruction").value;
	if (x.length != 0) NumWords = (x.split(" ").length - 1) + 1;
	document.getElementById("numofwords").innerHTML = NumWords;
}

function movement() {
	document.getElementById("showmovement").innerHTML = actualMove;
}