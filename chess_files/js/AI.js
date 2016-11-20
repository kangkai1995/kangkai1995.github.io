// AI.js
// AI算法
var wins = [];
// 
var myWin = [];
var computerWin = [];
// 游戏结束？
var over = false;

// 计算所有赢法
// 初始化
for (var i = 0; i < 15; i++) {
	wins[i] = [];
	for (var j = 0; j < 15; j++) {
		wins[i][j] = [];
	}
}
//
var count = 0; // 有多少种赢法
// 竖线上
for (var i = 0; i < 15; i++) {
	for (var j = 0; j < 11; j++) {
		for (var k = 0; k < 5; k++) {
			wins[i][j + k][count] = true;
		}
		count++;
	}
}
// 横线上
for (var i = 0; i < 15; i++) {
	for (var j = 0; j < 11; j++) {
		for (var k = 0; k < 5; k++) {
			wins[j + k][i][count] = true;
		}
		count++;
	}
}
// 斜线上
for (var i = 0; i < 11; i++) {
	for (var j = 0; j < 11; j++) {
		for (var k = 0; k < 5; k++) {
			wins[i + k][j + k][count] = true;
		}
		count++;
	}
}
// 反斜线上
for (var i = 0; i < 11; i++) {
	for (var j = 14; j > 3; j--) {
		for (var k = 0; k < 5; k++) {
			wins[i + k][j - k][count] = true;
		}
		count++;
	}
}
// 玩家 计算机 每种赢法记录 
// 每种赢法 到5就赢
function eachWins() {

	for (var i = 0; i < count; i++) {
		myWin[i] = 0;
		computerWin[i] = 0;
	}
}

//AI算法 
function computerAI() {
	// 
	var myScore = [];
	var computerScore = [];
	var max = 0;
	var x = 0;
	var y = 0;
	// 根据score 判断落子
	for (var i = 0; i < 15; i++) {
		myScore[i] = [];
		computerScore[i] = [];
		for (var j = 0; j < 15; j++) {
			myScore[i][j] = 0;
			computerScore[i][j] = 0;
		}
	}
	// 
	for (var i = 0; i < 15; i++) {
		for (var j = 0; j < 15; j++) {
			if (chessBoard[i][j] == 0) { 		// 当前可落子
				for (var k = 0; k < count; k++) { // 每个点都在 多种赢法中
					if (wins[i][j][k]) { 		// 计算他在K赢法中的 重要性
						switch (myWin[k]) {
							case 1:
								myScore[i][j] += 200;
								break;
							case 2:
								myScore[i][j] += 400;
								break;
							case 3:
								myScore[i][j] += 2000;
								break;
							case 4:
								myScore[i][j] += 10000;
								break;
						}
						switch (computerWin[k]) {
							case 1:
								computerScore[i][j] += 220;
								break;
							case 2:
								computerScore[i][j] += 420;
								break;
							case 3:
								computerScore[i][j] += 2200;
								break;
							case 4:
								computerScore[i][j] += 20000;
								break;
						}
					}
				}
				// 玩家最重要的落点
				if (myScore[i][j] > max) {
					max = myScore[i][j];
					x = i;
					y = j;
				} else if (myScore == max) {
					if (computerScore[i][j] > computerScore[x][y]) { // 
						x = i;
						y = j;
					}
				}
				// AI最重要的落点
				if (computerScore[i][j] > max) {
					max = computerScore[i][j];
					x = i;
					y = j;
				} else if (computerScore == max) {
					if (myScore[i][j] > myScore[x][y]) {
						x = i;
						y = j;
					}
				}
			}
		}

	}//确定出分值最大的点 落子
	oneStep(x, y, false);
	chessBoard[x][y] = 2; // 等于几不重要 不等于0就行

	for (var k = 0; k < count; k++) {
		if (wins[x][y][k]) {	// 如果这个点 在某种方法中
			computerWin[k]++; 	// 这种方法 距离赢 更近了一步
			myWin[k] = 999; 	// 玩家不可能在这个赢法赢了  给>5的值就行
			if (computerWin[k] == 5) { // 某种赢法 凑够了5  即可召唤神龙
				layer.msg('You Lost',{
				icon:5,
				time:2000,
				offset:[container/2]   // 只定义top
				}); 
				over = true; // gameover
			}
		}
	}
	if (!over) { //没结束 换人下
		me = !me;
	}
}