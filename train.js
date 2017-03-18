var config = {
  apiKey: "AIzaSyBg6DPAQ5PxJ-8zZu5gRnPPjGvd7XsJ0Ss",
  authDomain: "train-station-935b6.firebaseapp.com",
  databaseURL: "https://train-station-935b6.firebaseio.com",
  storageBucket: "train-station-935b6.appspot.com",
  messagingSenderId: "943735859652"
};

firebase.initializeApp(config);

var database = firebase.database();

database.ref().on("child_added", function(snapshot){
  var newTable = $("<tr>");
  $(newTable).append($('<td>').text(snapshot.val().name));
  $(newTable).append($('<td>').text(snapshot.val().destination));
  $(newTable).append($('<td>').text(snapshot.val().frequency));
  $(newTable).append($('<td>').text(snapshot.val().time));
  $(newTable).append($('<td>').text(snapshot.val().minutesAway));
  $(".appendHere").append(newTable);
});

$("#submit").on("click", function(){
	event.preventDefault();
	var newTrain = {
		name: $("#trainInput").val(),
		destination: $("#destinationInput").val(),
		frequency: $("#frequencyInput").val(),
		time: $("#timeInput").val(),
		minutesAway: $("#minutesInput").val(),
  }
  database.ref().push({
    name: newTrain.name,
    destination: newTrain.destination,
    frequency: newTrain.frequency,
    time: newTrain.time,
    minutesAway: newTrain.minutesAway
  });
});

//update this code to not include the <td> it is cleaner that way
//create train element (create the tags)
//create a train table (takes an array and spits out the tags)
//refresh train table ()
//each functions takes in 1 input and spits out an output, 1:1 input/output

  //make addToList take in an object to make it smoother
  //instead of database set use database push, this will push automically
  //instead of on value use on database child added