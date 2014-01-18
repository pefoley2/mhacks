 var my_controller = new Leap.Controller({enableGestures: true});

 my_controller.on('frame', function(frame_instance){

 	$("#fingerCount").text(frame_instance.fingers.count);
 	$("#handCount").text(frame_instance.hands.count);
 });

 my_controller.on('connect', function(){
    setInterval(function(){
      var frame = my_controller.frame();
    }, 500);
  });

  my_controller.connect();