var forward = 0;
var backward = 0;
var left = 0;
var right = 0;

var up = 0;
var down = 0;


var mode = 0;

var tolerance = 40;

Leap.loop(function(obj) {
    var hands = obj.hands;
	if(hands.length == 1 && hands[0].valid) {
        var hand = hands[0];
        if(hand.stabilizedPalmPosition[0] > tolerance) {
            right = Math.abs(hand.stabilizedPalmPosition[0]);
		} else {
            right = 0;
		}
		
		if(hand.stabilizedPalmPosition[0] < -tolerance) {
            left = Math.abs(hand.stabilizedPalmPosition[0]);
		} else {
            left = 0;
		}
		
		if(hand.stabilizedPalmPosition[2] > tolerance) {
            backward = Math.abs(hand.stabilizedPalmPosition[2]);
		} else {
            backward = 0;
		}
		
		if(hand.stabilizedPalmPosition[2] < -tolerance/4) {
            forward = Math.abs(hand.stabilizedPalmPosition[2]);
		} else {
            forward = 0;
		}
		
		if(hand.stabilizedPalmPosition[1] > 150) {
            up = Math.abs(hand.stabilizedPalmPosition[1]);
		} else {
            up = 0;
		}
		
		if(hand.stabilizedPalmPosition[1] < 85) {
            down = Math.abs(60 - hand.stabilizedPalmPosition[1]);
		} else {
            down = 0;
		}
		
		
		
	} else {
        forward = 0;
        backward = 0;
        left = 0;
        right = 0;
        up = 0;
        down = 0;
    }
    
    mode = obj.fingers.length;
    
	$("#forward").text("Forward: " + forward);
	$("#backward").text("Backward: " + backward);
	$("#left").text("Left: " + left);
	$("#right").text("Right: " + right);
	$("#up").text("Up: " + up);
	$("#down").text("Down: " + down);
	$("#mode").text("Action Mode: " + mode);
	
	
	var c = $("#visualization");
	var ctx = c[0].getContext("2d");
	ctx.clearRect(0, 0, c.width(), c.height());
	ctx.fillStyle = "#000000";
	var swidth = 100 + (up/2) - (down*2);
	var sheight = swidth;
	var sx = (c.width()/2) - (swidth/2) - left + right;
	var sy = (c.height()/2) - (sheight/2) - (forward*2) + backward;
	ctx.fillRect(sx, sy, swidth, sheight);
});
