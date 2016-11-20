// ForMobile
var container ;
var cellWidth ;
var cellSpace ;
var cell ;
function forMobile(){
documentWidth      = window.screen.availWidth;
	if (documentWidth > 500) {
		container = 450;
		cellWidth = 30;
		cellSpace = 15;
		cell = 13;
	}else{
		container = 0.9 * documentWidth;
		cellWidth = 0.067*container;
		cellSpace = 0.033*container;
		cell = 0.0289*container;
	}
	chess.width = container;	
	chess.height = container;	
}
