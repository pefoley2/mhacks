 var my_controller = new Leap.Controller({enableGestures: true});

 my_controller.on('frame', function(frame_instance){

 	$("#fingerCount").text(frame_instance.fingers.length);
 	$("#handCount").text(frame_instance.hands.length);

 });

 my_controller.on('connect', function(){
    setInterval(function(){
      var frame = my_controller.frame();
    }, 500);
    alert("Connected");
  });

  my_controller.connect();