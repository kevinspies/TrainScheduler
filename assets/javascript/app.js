
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
    var trainFirst = moment($("#first-train-entry").val().trim(), "MM/DD/YYYY").format("X");
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
    console.log(newTrain.frew);

    console.log("Train successfully added");

    // Clears all of the text-boxes
    $("#train-name-entry").val("");
    $("#destination-entry").val("");
    $("#first-train-entry").val("");
    $("#frequency-entry").val("");
});


//Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainFirst = childSnapshot.val().start;
    var trainFreq = childSnapshot.val().freq;

    // Employee Info
    console.log(trainName + "train name added to db!");
    console.log(trainDestination + "train destination added to db!");
    console.log(trainFirst + "first train time added to db!");
    console.log(trainFreq + "train frequency added to db!");

    // Prettify the train start
    var trainStartPretty = moment.unix(trainFirst).format("HH/mm");

    // Calculate the months worked using hardcore math
    // To calculate the months worked
    //calculate all my needed results here!!!
    var nextArrive = moment().diff(moment(trainFirst, "X"), "months");
    console.log(nextArrive);

    // Calculate the total billed rate
    var empBilled = empMonths * empRate;
    console.log(empBilled);

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(empName),
        $("<td>").text(empRole),
        $("<td>").text(trainStartPretty),
        $("<td>").text(empMonths),
        $("<td>").text(empRate),
        $("<td>").text(empBilled)
    );

    // Append the new row to the table
    $("#employee-table > tbody").append(newRow);
});