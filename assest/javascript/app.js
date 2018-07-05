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

//button to add trains
$("#add-train").on("click", function(event){ 

    event.preventDefault();

    //user input
    var trainName = $("#train-name").val().trim();
    var destitnation = $("#destination").val().trim();
    var firstTrain = $("#first-train").val().trim();
    var frequency = $("#frequency").val().trim();

    //holds the train information as and object 
    var newTrain ={
        name: trainName,
        arrival: destitnation,
        time: firstTrain,
        nextTrain: frequency
    };

  
    //upload train data to firebase
    database.ref().push(newTrain);

    alert("Train successfully added");

    console.log(newTrain.name);
    console.log(newTrain.arrival);
    console.log(newTrain.time);
    console.log(newTrain.nextTrain);

    //clear all of the input boxes
    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train").val("");
    $("#frequency").val("");
});