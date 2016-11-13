var chess = document.getElementById('chess');
var content = chess.getContext('2d');

var self = true;
var chessBoard = [];
var over = false;

//judge win
var wins = [];

// 赢法统计数组
var selfWin = [];
var aiWin = [];

for (var i=0; i<15; i++) {
	chessBoard[i] = [];
	for(var j=0; j<15; j++){
		chessBoard[i][j] = 0;
	}
}

for(var i =0; i <15 ;i++){
	wins[i] = [];
	for(var j=0; j<15; j++){
		wins[i][j] = [];
	}
}

var count = 0;
//heng xian
for(var i= 0; i<15; i++){
	for(var j=0; j<11; j++){
		for(var k=0; k<5; k++){
			wins[i][j+k][count] = true;
		}
		count++;
	}
}
//shu xian
for(var i= 0; i<15; i++){
	for(var j=0; j<11; j++){
		for(var k=0; k<5; k++){
			wins[j+k][i][count] = true;
		}
		count++;
	}
}

//xie xian
for(var i= 0; i<11; i++){
	for(var j=0; j<11; j++){
		for(var k=0; k<5; k++){
			wins[i+k][j+k][count] = true;
		}
		count++;
	}
}

//fan xie xian
for(var i= 0; i<11; i++){
	for(var j=14; j>3; j--){
		for(var k=0; k<5; k++){
			wins[i+k][j-k][count] = true;
		}
		count++;
	}
}

for(var i=0; i<count; i++){
	selfWin[i] = 0;
	aiWin[i] = 0;
}


var drawBox = function() {
	content.strokeStyle="#BFBFBF";
	for(var i=0;i<15; i++){
		//print vertical lines
		content.moveTo(15 + i*30, 15);
		content.lineTo(15 + i*30, 435);
		content.stroke();
	    //print horizontal lines
	    content.moveTo(15, 15 + i*30);
		content.lineTo(435, 15 + i*30);
		content.stroke();
	}
}

var oneStep = function  (i, j ,self) {
	//print the circle chess pieces
	content.beginPath();
	content.arc(15 + i*30, 15 + j*30, 13, 0, 2 * Math.PI);
	content.closePath();

	var gradient = content.createRadialGradient(15 + i*30 + 2, 15 + j*30 -2 , 13, 15 + i*30 + 2, 15 + j*30 -2, 0);
	if (self) {
	gradient.addColorStop(0, "#0A0A0A");
	gradient.addColorStop(1, "#636766");
	} else {
	gradient.addColorStop(0, "#D1D1D1");
	gradient.addColorStop(1, "#F9F9F9");
	}
	content.fillStyle = gradient;
	content.fill();
}

drawBox();
// oneStep(0, 0, true);
// oneStep(1, 1, false);

chess.onclick = function(e) {
	if(over || !self){
		return;
	}

	var x = e.offsetX;
	var y = e.offsetY;
	var i = Math.floor(x / 30);
	var j = Math.floor(y / 30);
	if(chessBoard[i][j] == 0 ){
		oneStep(i, j, self);
		chessBoard[i][j] = 1;

		for(var k=0; k<count; k++){
			if(wins[i][j][k]){
				selfWin[k]++;		
				if(selfWin[k] == 5){
				window.alert("6666666 You Win!");
				over = true;
				}		
			}
		}
		
		if(!over){
			self = !self; 
			AI();
		}
	}
}

var AI = function() {
	var myScore = [];
	var aiScore = [];
	var max = 0;
	var u = 0, v = 0;
	for(var i=0; i<15; i++){
		myScore[i] = [];
		aiScore[i] = [];
		for(var j=0; j<15; j++){
			myScore[i][j] = 0;
			aiScore[i][j] = 0;
		}
	}
	for(var i=0; i<15; i++){
		for(var j=0; j<15; j++){
			if(chessBoard[i][j] == 0){
				for(var k=0; k<count; k++){
					if(wins[i][j][k]){
						if(selfWin[k] == 1){
							myScore[i][j] += 200;
						} else if(selfWin[k] == 2){
							myScore[i][j] += 400;
						} else if(selfWin[k] == 3){
							myScore[i][j] += 2000; 
						} else if(selfWin[k] == 4){
							myScore[i][j] += 10000;
						}
						if(aiWin[k] == 1){
							aiScore[i][j] += 400;
						} else if(aiWin[k] == 2){
							aiScore[i][j] += 800;
						} else if(aiWin[k] == 3){
							aiScore[i][j] += 2000; 
						} else if(aiWin[k] == 4){
							aiScore[i][j] += 20000;
						}
					}
				}
				if(myScore[i][j] > max){
					max = myScore[i][j];
					u = i;
					v = j;
				} else if(myScore[i][j] == max){
					if(aiScore[i][j] > aiScore[u][v]){
						u = i;
						v = j;	
					}
				}
				if(aiScore[i][j] > max){
					max = aiScore[i][j];
					u = i;
					v = j;
				} else if(aiScore[i][j] == max){
					if(myScore[i][j]  > myScore[u][v]){
						u = i;
						v = j;	
					}
				}		
			}
		}		
	}
	oneStep(u, v, false);
	chessBoard[u][v] = 2;
	for(var k=0; k<count; k++){
		if(wins[u][v][k]){
			aiWin[k]++;		
			if(aiWin[k] == 5){
			document.getElementById('light').style.display='block';
			document.getElementById('fade').style.display='block';
			over = true;
			reStrat();
			}		
		}
	}
	if(!over){
		self = !self; 
	}

}

// window.onload = function(){
// 	newGame();
// 	drawBox();
// }
// var reStrat = function() {
// 	self = true;
// 	newGame();
// 	drawBox();
// }
