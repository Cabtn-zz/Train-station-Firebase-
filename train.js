var config = {
  apiKey: "AIzaSyBg6DPAQ5PxJ-8zZu5gRnPPjGvd7XsJ0Ss",
  authDomain: "train-station-935b6.firebaseapp.com",
  databaseURL: "https://train-station-935b6.firebaseio.com",
  storageBucket: "train-station-935b6.appspot.com",
  messagingSenderId: "943735859652"
};

firebase.initializeApp(config);

var database = firebase.database();

var inputTime;
var inputFrequency; 
var nextArrival
var tMinutesTillTrain;


database.ref().on("child_added", function(snapshot){
  var newTable = $("<tr>");
  $(newTable).append($('<td>').text(snapshot.val().name));
  $(newTable).append($('<td>').text(snapshot.val().destination));
  $(newTable).append($('<td>').text(snapshot.val().frequency + " minutes"));
  $(newTable).append($('<td>').text(snapshot.val().time));
  $(newTable).append($('<td>').text(snapshot.val().minutesAway + " minutes"));
  $(".appendHere").append(newTable);
});

$("#submit").on("click", function(){
	event.preventDefault();
  timeConverter();
	var newTrain = {
		name: $("#trainInput").val(),
		destination: $("#destinationInput").val(),
		frequency: $("#frequencyInput").val(),
		time: nextArrival,
		minutesAway: tMinutesTillTrain,
  }
  database.ref().push({
    name: newTrain.name,
    destination: newTrain.destination,
    frequency: newTrain.frequency,
    time: newTrain.time,
    minutesAway: newTrain.minutesAway,
  });
  
});

function timeConverter(){
    inputTime = $("#timeInput").val(); 
    inputFrequency = $("#frequencyInput").val();
    var firstTimeConverted = moment(inputTime, "hh:mm").subtract(1, "years");
    // Current Time
    var currentTime = moment();
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // Time apart (remainder)
    var tRemainder = diffTime % inputFrequency;
    // Minute Until Train
    tMinutesTillTrain = inputFrequency - tRemainder;
    // Next Train
    nextTrain = moment().add(tMinutesTillTrain, "minutes");
    nextArrival = moment(nextTrain).format("hh:mm A");
};
