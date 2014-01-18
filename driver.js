var forward;
var backwards;
var left;
var right;

Leap.loop(function(obj) {
	var hands = obj.hands;
	if(hands.length == 1 && hands[0].valid) {
		var hand = hands[0];
		console.log(hand.stabilizedPalmPosition[0] + ", " + hand.stabilizedPalmPosition[1] + ", " + hand.stabilizedPalmPosition[2]);
	}
});