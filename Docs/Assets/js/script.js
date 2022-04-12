// //Assign value of date
// let todayDate = moment().format('dddd, MMM Do YYYY, HH');

// //Format date displayed to include hour (0900AM to 0700PM)
// $("#currentDay").html(todayDate + "00");


// //Initialize when ready//// this works also 
// //$(document).ready(function () {
//         //Retrieve local storage data if present
// $(function() {
//         $("#9-hour .task").val(localStorage.getItem("9-AM"));
//         $("#10-hour .task").val(localStorage.getItem("10-AM"));
//         $("#11-hour .task").val(localStorage.getItem("11-AM"));
//         $("#12-hour .task").val(localStorage.getItem("12-PM"));
//         $("#1-hour .task").val(localStorage.getItem("1-PM"));
//         $("#2-hour .task").val(localStorage.getItem("2-PM"));
//         $("#3-hour .task").val(localStorage.getItem("3-PM"));
//         $("#4-hour .task").val(localStorage.getItem("4-PM"));
//         $("#5-hour .task").val(localStorage.getItem("5-PM"));
//         $("#6-hour .task").val(localStorage.getItem("6-PM"));
//         $("#7-hour .task").val(localStorage.getItem("7-PM"));
    
//     //Save-button click.event listener 
//     $(".save-button").on("click", function () {
//         //Get nearby values of the description in JQuery
//         let hour = $(this).parent().attr("id");

//         //Save task to local storage
//         localStorage.setItem(hour, task);
//     })
   
//     //Begin hourKeeper function
//     function hourKeeper() {

//         //Get the current hour
//         let currentHour = moment().hour();

//         //SetLoop over the hour blocks
//         $(".hour-block").each(function () {
//             let hourBlock = parseInt($(this).attr("id").split("-hour")[0]);

//             //Compare hour block to current hour
//             if (hourBlock < currentHour) {
//                 //Set background for past hour block
//                 $(this).removeClass("future");
//                 $(this).removeClass("present");
//                 $(this).addClass("past");
//             }
//             else if (hourBlock === currentHour) {
//                 //Set background for tasks current hour block
//                 $(this).removeClass("past");
//                 $(this).removeClass("future");
//                 $(this).addClass("present");
//             }
//             else {
//                 //Set background for future hour blocks
//                 $(this).removeClass("present");
//                 $(this).removeClass("past");
//                 $(this).addClass("future");
//             }
//         });
//     }
// Initialize hourKeeper
//     hourKeeper();
// })

//global variables
const timeBlockEl = $('.timeblock');
const buttonEl = $('.btn');

//counts the timeBlocks in the html file. This will also be used in the for loops in differnt functions
const blockCount = timeBlockEl.children().length;

//adds the date to the jumbotron
Date.prototype.addHours = function(h) {    
    this.setTime(this.getTime() + (h*60*60*1000)); 
    return this;   
 }
 // This function gets the current time and injects it into the DOM

 function updateClock() {
     // Gets the current time
     var now = new Date();