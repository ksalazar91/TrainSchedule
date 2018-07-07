// Initialize Firebase
var config = {
    apiKey: "AIzaSyCAgDu1fM9qWNLw4JIwvokuY9dBLNvnUNM",
    authDomain: "train-schedule-superhero.firebaseapp.com",
    databaseURL: "https://train-schedule-superhero.firebaseio.com",
    projectId: "train-schedule-superhero",
    storageBucket: "train-schedule-superhero.appspot.com",
    messagingSenderId: "1034553116990"
  };

  firebase.initializeApp(config);

var database = firebase.database();

var minutesAway;
var nextArrival;

function nextTrainArrival(frq, startTime){  
    
    var firstTimeConverted = moment(startTime, "HH:mm").subtract(1, "years");
 
    var currentTime = moment();
    
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    
    var tRemainder = diffTime % frq;
    
    minutesAway = frq - tRemainder;

    nextArrival = moment().add(minutesAway, "minutes");
}

//button to add trains
$("#add-train").on("click", function(event){ 

    event.preventDefault();

    //user input
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#first-train").val().trim();
    var frequency = $("#frequency").val().trim();

    //holds the train information as and object 
    var newTrain ={
        name: trainName,
        arrivalCity: destination,
        firstDeparture: firstTrain,
        nextTrain: frequency
    };

    //upload train data to firebase
    database.ref().push(newTrain);
    

    //alerts the user when the train is successfully add
    alert("Train successfully added");

    //clear all of the input boxes
    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train").val("");
    $("#frequency").val("");
});


// firebase event to add trainst to the data base and a table to html

database.ref().on("child_added", function(childSnapshot){
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().arrivalCity;
    var firstTrain = childSnapshot.val().firstDeparture;
    var frequency = childSnapshot.val().nextTrain;

    nextTrainArrival(frequency, firstTrain);

    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);
    console.log(minutesAway);
    console.log(nextArrival);

    // logins the first time the trains start to departure 
  

    // Create the new row
    var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(moment(nextArrival).format("hh:mm")),
    $("<td>").text(minutesAway)
    
  );

  // ppend the new row to the table
  $("#table > tbody").append(newRow);

});