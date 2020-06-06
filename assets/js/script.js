
const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
startScreen.addEventListener('click', start);

let player = {
	speed: 5,
	score: 0
};

let keys = {
	ArrowUp: false,
	ArrowRight: false,
	ArrowLeft: false,
	ArrowDown: false,
}

function keyDown(e) {
	e.preventDefault();
	keys[e.key] = true;
}

function keyUp(e) {
	e.preventDefault();
	keys[e.key] = false;
}

function isCollide(a, b){
	aRect = a.getBoundingClientRect();
	bRect = b.getBoundingClientRect();

	return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right) )
}

function moveLines(){
	let lines = document.querySelectorAll('.lines');

	lines.forEach(function(item){

		if (item.y >= 700) {
			item.y -= 750;
		}

		item.y += player.speed;
		item.style.top = item.y + "px";
	})
}

function endGame() {
	player.start = false;
	startScreen.classList.remove('hide');
	let finalScore = player.score - 1;
	startScreen.innerHTML = `Game Over <br> Your final score is ${finalScore} <br> Press Here to restart the game`
}

function moveEnemy(car){
	let enemy = document.querySelectorAll('.enemy');

	enemy.forEach(function(item){

		if (isCollide(car, item)){
			endGame();
		}

		if (item.y >= 750) {
			item.y = -300;
			item.style.left = Math.floor(Math.random() * 350) + "px";
		}

		item.y += player.speed;
		item.style.top = item.y+"px";
	})
}


function gamePlay() {

	let car = document.querySelector('.car');

	let road = gameArea.getBoundingClientRect();

	if (player.start) {

		moveLines();
		moveEnemy(car);

		window.requestAnimationFrame(gamePlay);

		if (keys.ArrowUp && player.y > (road.top + 70)) { 
			player.y -= player.speed; 
		}
		if (keys.ArrowDown && player.y < (road.bottom - 70)) { 
			player.y += player.speed; 
		}
		if (keys.ArrowLeft && player.x > 0 ) { 
			player.x -= player.speed; 
		}
		if (keys.ArrowRight && player.x < (road.width - 50) ) { 
			player.x += player.speed; 
		}

		car.style.top = player.y +"px";
		car.style.left = player.x +"px";

		player.score++;
		score.innerText = "score: "+ player.score;
	}
}

function start(){
	
	startScreen.classList.add('hide');
	gameArea.innerHTML  = "";
	
	player.start = true;
	player.score = 0;
	
	window.requestAnimationFrame(gamePlay);

	for ( let i = 0; i < 5; i++){
		let roadLine = document.createElement('div');
		roadLine.setAttribute('class', 'lines');
		roadLine.y = (i*150);
		roadLine.style.top = roadLine.y+"px";
		gameArea.appendChild(roadLine);
	}	

	let car = document.createElement('div');
	car.setAttribute('class', 'car');
	
	gameArea.appendChild(car);

	player.x = car.offsetLeft;
	player.y = car.offsetTop;


	for ( let i = 0; i < 3; i++){
		let enemyCar = document.createElement('div');
		enemyCar.setAttribute('class', 'enemy');
		enemyCar.y = ((i + 1) * 350) * -1 ;
		enemyCar.style.top = enemyCar.y+"px";
		enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
		gameArea.appendChild(enemyCar);
	}



}
