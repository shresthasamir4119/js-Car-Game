var MAIN_WIDTH = 500;
var MAIN_HEIGHT = 700;
var parentDiv = document.getElementById('game');

function road(parentDiv){
	this.parentDiv = parentDiv;
	parentDiv.style.width = MAIN_WIDTH+'px';
	parentDiv.style.height = MAIN_HEIGHT+'px';
	parentDiv.style.overflow = 'hidden';
	parentDiv.style.background = 'red';
	this.create = function(){
		console.log(this.parentDiv);
		var div = document.createElement('div');
		parentDiv.appendChild('div');
		div.style.height = 3*MAIN_HEIGHT+'px';
		div.style.width = '100%';
		div.style.background = 'blue';

	}
}
var game = new road(parentDiv).create();