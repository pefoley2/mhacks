Leap.loop(function(obj) {
	$("#fingerCount").text(obj.fingers.length);
	$("#handCount").text(obj.hands.length);
});