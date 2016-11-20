// 初始数据，几种功能

// 初始数据
var chess = $("#chess")[0];
var context = chess.getContext("2d");
var me = true;
var chessBoard = []; //棋盘数据
var newGame = $("button");

// 初始化
$(function() {
	init();
});

function init() {
	// 初始化
	me = true;
	over = false;
	// forMobile();
	forMobile()
	eachWins();			//	赢法计算清空
	drawChessBoard();	//	初始化棋盘
	checkChessBoard();	//	棋盘数据初始化
}

newGame.click(function() {
	init();
});



// 初始化 棋盘
function drawChessBoard() {
	context.clearRect(0, 0, container, container)
	context.beginPath();

	for (var i = 0; i < 15; i++) {
		context.moveTo(cellSpace + i * cellWidth, cellSpace);
		context.lineTo(cellSpace + i * cellWidth, container - cellSpace);
		context.moveTo(cellSpace, cellSpace + i * cellWidth);
		context.lineTo(container - cellSpace, cellSpace + i * cellWidth);
	}


	context.strokeStyle = "#bfbfbf";
	context.stroke();
	context.closePath();
}
// 棋子
function oneStep(i, j, me) {
	context.beginPath();
	// 画棋子
	context.arc(cellSpace + i * cellWidth, cellSpace + j * cellWidth, cell, 2 * Math.PI, false);
	// 渐变颜色
	var gradient = context.createRadialGradient(cellSpace + i * cellWidth , cellSpace + j * cellWidth , cell, cellSpace + i * cellWidth , cellSpace + j * cellWidth , 0);
	// 判断黑白
	if (me) {
		gradient.addColorStop(0, "#0a0a0a");
		gradient.addColorStop(1, "#636766");
	} else {
		gradient.addColorStop(0, "#d1d1d1");
		gradient.addColorStop(1, "#f9f9f9");
	}
	// 设置颜色
	context.fillStyle = gradient;
	// 画
	context.fill();
	context.closePath();

}
// 下棋
chess.onclick = function(e) {
		// 结束了 或者 me=false 不执行
		if (over || !me) {
			return false;
		}
		// 找点
		var x = e.offsetX;
		var y = e.offsetY;
		var i = Math.floor(x / cellWidth);
		var j = Math.floor(y / cellWidth);

		if (chessBoard[i][j] == 0) {
			oneStep(i, j, me);
			chessBoard[i][j] = 1;
			// 落子之后各种计算
			for (var k = 0; k < count; k++) {
				if (wins[i][j][k]) {
					myWin[k]++;
					computerWin[k] = 999;
					if (myWin[k] == 5) {
						layer.msg('You Win', {
							icon: 6,
							time: 2000,
							offset:[container/2] // 只定义top
						});
						over = true;
					}
				}
			}
			if (!over) {
				me = !me;
				computerAI();
			}
		}
	}
	// 初始化所有的点
	// 0 表示此点可以落子
function checkChessBoard() {
	for (var i = 0; i < 15; i++) {
		chessBoard[i] = [];
		for (var j = 0; j < 15; j++) {
			chessBoard[i][j] = 0;
		}
	}
}