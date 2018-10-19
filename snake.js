var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var grid = 16;
var count = 0;
var snake = {
	x: 160,
	y: 160,
	dx: grid,
	dy: 0,
	score: 0,
	cells: [],
	maxCells: 1
};
var apple = {
	x:320,
	y:320
};

function getRandomInt(min,max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function loop() {
	requestAnimationFrame(loop);

	if (++count < 4) {
		return;
						}
	count = 0;
	context.clearRect(0,0,canvas.width,canvas.height);

	snake.x += snake.dx;
	snake.y += snake.dy;

	if (snake.x < 0) {
		snake.x = canvas.width - grid;
	}
	else if(snake.x >= canvas.width) {
		snake.x = 0;
	}
	else if (snake.y < 0) {
		snake.y = canvas.width - grid;
	} 
	else if (snake.x >= canvas.width) {
		snake.y = 0;
	}

//kiểm tra con rắn ở đâu. Mặt trước con rắn luôn là đâu
snake.cells.unshift({x: snake.x, y: snake.y});

//xóa thức ăn
if (snake.cells.length > snake.maxCells) {
	snake.cells.pop();
}

//Tạo điểm:
	context.fillStyle = "black";
    context.font = "16px Comic Sans MS";
    context.fillText("Score: " + snake.score, 20, 20);

//vẽ quả táo
context.fillStyle = 'red';
context.fillRect(apple.x,apple.y,grid-1,grid-1);


//vẽ rắn
context.fillStyle = "#CD853F";
snake.cells.forEach(function(cell,index) {
	context.fillRect(cell.x,cell.y,grid-1,grid-1);
//con rắn ăn quả táo
if (cell.x === apple.x && cell.y === apple.y) {
	snake.maxCells++;
	apple.x = getRandomInt(0, 25) * grid;
	apple.y = getRandomInt(0, 25) * grid;	
	snake.score++;
}

	//Kiểm tra va chạm
	for (var i = index + 1; i < snake.cells.length; i++) {
                // khi va chạm sẽ reset game
                if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                    snake.x = 160;
                    snake.y = 160;
                    snake.cells = [];
                    snake.maxCells = 4;
                    snake.dx = grid;
                    snake.dy = 0;
                    apple.x = getRandomInt(0, 25) * grid;
                    apple.y = getRandomInt(0, 25) * grid;
                    snake.score = 0;

                }
            }

       });
 }

function move(event) {
	if (event.which === 39 && snake.dx === 0) {
		snake.dx = grid;
		snake.dy = 0;
	} else if (event.which === 37 && snake.dx === 0) {
		snake.dx = -grid;
		snake.dy = 0;
	} else if (event.which === 38 && snake.dy === 0) {
		snake.dy = -grid;
		snake.dx = 0;
	} else if (event.which === 40 && snake.dy === 0) {
		snake.dy = grid;
		snake.dx = 0;
	} else if (event.which === 68 && snake.dx === 0) {
		snake.dx = grid;
		snake.dy = 0;
	} else if (event.which === 65 && snake.dx === 0) {
		snake.dx = -grid;
		snake.dy = 0;
	} else if (event.which === 87 && snake.dy === 0) {
		snake.dy = -grid;
		snake.dx = 0;
	} else if (event.which === 83 && snake.dy === 0) {
		snake.dy = grid;
		snake.dx = 0;
	}
}

requestAnimationFrame(loop);

