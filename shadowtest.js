function shadowtest_main() {
	var canvas = document.getElementById('shadowtestcanvas');
	var ctx = canvas.getContext('2d');
	ctx.fillStyle = '#FF0000';
	ctx.shadowColor = '#000000';
	ctx.shadowBlur = 10;
	ctx.shadowOffsetX = 0;
	ctx.shadowOffsetY = 4;
	ctx.fillRect(10,10,40,30);	
}
