var forward = 0;
var left = 0;
var right = 0;
var up = 0;
var fist = 0;


var mode = "None";

var tolerance_xAxis = 30;
var tolerance_forward = 30;
var tolerance_up = 140;
var tolerance_shoot = 0.2;


//var c = $("#visualization")[0].getContext('2d');

var my_controller = new Leap.Controller({enableGestures: false});


 my_controller.on('connect', function(){
	setInterval(function(){
		var obj = my_controller.frame();
		
		    var hands = obj.hands;
	if (hands.length == 1 && hands[0].valid) {
        var hand = hands[0];
        if (hand.stabilizedPalmPosition[0] >= tolerance_xAxis) {
            right = Math.abs(hand.stabilizedPalmPosition[0]);
		} else {
            right = 0;
		}
		
		if (hand.stabilizedPalmPosition[0] <= -tolerance_xAxis) {
            left = Math.abs(hand.stabilizedPalmPosition[0]);
		} else {
            left = 0;
		}
		
		if (hand.stabilizedPalmPosition[2] < -tolerance_forward) {
            forward = Math.abs(hand.stabilizedPalmPosition[2]);
		} else {
            forward = 0;
		}
		
		if (hand.stabilizedPalmPosition[1] > tolerance_up) {
            up = Math.abs(hand.stabilizedPalmPosition[1]);
		} else {
            up = 0;
		}
		
		
		// forward and left/right don't interfere with each other (i.e. there's no reason to
		// go diagonally)
		var fw = Math.abs(hand.stabilizedPalmPosition[2]);
		var xa = Math.abs(hand.stabilizedPalmPosition[0]);
		if (fw > xa)	{
			left = 0;
			right = 0;
		} else	{
			forward = 0;
		}
		
		
        if ((1 - Math.abs(hand.palmNormal[0])) < tolerance_shoot) {
            mode = "Shoot";
		} else {
            mode = "None";
		}
		
		if (obj.fingers.length == 0)	{
			fist = 1;
			
			left = 0;
			right = 0;
			forward = 0;
			up = 0;
			mode = "None";
		} else	{
			fist = 0;
		}
	} else {
        forward = 0;
        left = 0;
        right = 0;
        up = 0;
        mode = "None";
    }
	
	}, 300);
});


my_controller.connect();