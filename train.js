  var config = {
    apiKey: "AIzaSyBg6DPAQ5PxJ-8zZu5gRnPPjGvd7XsJ0Ss",
    authDomain: "train-station-935b6.firebaseapp.com",
    databaseURL: "https://train-station-935b6.firebaseio.com",
    storageBucket: "train-station-935b6.appspot.com",
    messagingSenderId: "943735859652"
  };
  firebase.initializeApp(config);

  var trainArray = []
  var database = firebase.database();
  var listCount = 0;

  database.ref().on("value", function(snapshot){
	if (snapshot.val()) {
		trainArray = snapshot.val().trains;
		var allTrains = snapshot.val().trains;
	}  	
	else {
		trainArray = [];
  }
});
  $("#submit").on("click", function(){
  	event.preventDefault();
  	console.log("button works")
  	var newTrain = {
  		name: $("#trainInput").val(),
  		destination: $("#destinationInput").val(),
  		frequency: $("#frequencyInput").val(),
  		time: $("#timeInput").val(),
  		minutesAway: $("#minutesInput").val(),
  	}
  	console.log(newTrain);
  	trainArray.push(newTrain);
  	console.log(trainArray);
  	addToList();
  });

   database.ref().set({
        trains: trainArray,
      });
//update this code to not include the <td> it is cleaner that way
  function addToList() {
  	for (var i = 0; i < trainArray.length; i++){
  		$(newTable).empty();
  		var newTable = $("<tr>");
  		$(newTable).append("<td>" + trainArray[i].name + "</td>");
  		$(newTable).append("<td>" + trainArray[i].destination + "</td>");
  		$(newTable).append("<td>" + trainArray[i].frequency + "</td>");
  		$(newTable).append("<td>" + trainArray[i].time + "</td>");
  		$(newTable).append("<td>" + trainArray[i].minutesAway + "</td>");
  		$(".appendHere").append(newTable);
  	}
  }