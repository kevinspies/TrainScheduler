
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDcOFGtBdWYmASXhtwb_aB6t_FWA2YlyGY",
    authDomain: "traindb-a0866.firebaseapp.com",
    databaseURL: "https://traindb-a0866.firebaseio.com",
    projectId: "traindb-a0866",
    storageBucket: "traindb-a0866.appspot.com",
    messagingSenderId: "602272054340",
    appId: "1:602272054340:web:e5edc7ecbaa1db6c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

//Button for adding a new Train!
$("#submit").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#train-name-entry").val().trim();
    var trainDestination = $("#destination-entry").val().trim();
    // var trainFirst = moment($("#first-train-entry").val().trim(), "HH:mm").format("HH:mm");
    var trainFirst = $("#first-train-entry").val().trim();
    var trainFreq = $("#frequency-entry").val().trim();

    // Creates local "temporary" object for holding employee data
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        start: trainFirst,
        freq: trainFreq
    };

    // Uploads employee data to the database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.freq);

    // Clears all of the text-boxes
    $("#train-name-entry").val("");
    $("#destination-entry").val("");
    $("#first-train-entry").val("");
    $("#frequency-entry").val("");

    console.log("Train successfully added");
});


//Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainFirst = childSnapshot.val().start;
    var trainFreq = childSnapshot.val().freq;
    console.log("first train left at: " + trainFirst);

    // Employee Info
    console.log(trainName + "train name added to db!");
    console.log(trainDestination + "train destination added to db!");
    console.log(trainFirst + "first train time added to db!");
    console.log(trainFreq + "train frequency added to db!");


    //math
    //--------------------------------------------------------------------------------
    // calculate next arrival
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
    // first train time (user input)
    // var firstTrainTime = $("#first-train-entry").val().trim(); this is just trainFirst, i already have
    console.log("first train time is: " + trainFirst);
    //now calculate the difference between their first train time, and the current time
    //this will tell you how long the train has been traveling for so far today
    //we'll call that amount of time timeTraveled. now do timeTraveled%frequency
    //to get number of minutes unntil arrival
    // Difference between the times
    // var timeTraveled = moment().diff(moment(firstTrainTime, "HH:mm"), "minutes");
    var timeTraveled = moment().diff(moment(trainFirst, "HH:mm"), "minutes");
    console.log("time traveled so far today: " + timeTraveled);
    // Time apart (remainder)
    var tRemainder = timeTraveled % trainFreq;
    console.log(tRemainder);
    // Minute Until Train
    var tMinutesTillTrain = trainFreq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    // Next Train

    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("HH:mm a");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));
    //
    // var nextArrival = moment.unix(nextTrain).format("hh:mm");
    // console.log(nextArrival);

    // Calculate minutes away!
    // var minutesAway = moment().diff(moment(trainFirst, "X"), "months");
    // console.log(minutesAway);

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainFreq),
        $("<td>").text(nextTrain),
        $("<td>").text(tMinutesTillTrain)
    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);

});