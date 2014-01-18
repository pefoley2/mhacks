var forward = 0;
var backward = 0;
var left = 0;
var right = 0;

var up = 0;
var down = 0;


var mode = "None";

var tolerance = 40;

var c = $("#visualization")[0].getContext('2d');


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
		
        if(hand.palmVelocity[2] > 200 && obj.fingers.length === 0 && forward > 0) {
            mode = "Punch";
		} else if((1 - Math.abs(hand.palmNormal[0])) < 0.2) {
            mode = "Shoot";
		} else {
            mode = "None";
		}
		
	} else {
        forward = 0;
        backward = 0;
        left = 0;
        right = 0;
        up = 0;
        down = 0;
        mode = "None";
    }
    
    
	$("#forward").text("Forward: " + forward);
	$("#backward").text("Backward: " + backward);
	$("#left").text("Left: " + left);
	$("#right").text("Right: " + right);
	$("#up").text("Up: " + up);
	$("#down").text("Down: " + down);
	$("#mode").text("Action: " + mode);
	
	

	c.clearRect(0, 0, 500, 400);
	c.fillStyle = "#000000";
	var swidth = 100 + (up/2) - (down*2);
	var sheight = swidth;
	var sx = 250 - (swidth/2) - left + right;
	var sy = 200 - (sheight/2) - (forward*2) + backward;
	c.fillRect(sx, sy, swidth, sheight);
	

});

