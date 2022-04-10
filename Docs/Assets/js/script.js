/*## User Story

AS AN employee with a busy schedule
I WANT to add important events to a daily planner
SO THAT I can manage my time effectively
```

## Acceptance Criteria

GIVEN I am using a daily planner to create a schedule
WHEN I open the planner
THEN the current day is displayed at the top of the calendar
WHEN I scroll down
THEN I am presented with timeblocks for standard business hours
WHEN I view the timeblocks for that day
THEN each timeblock is color coded to indicate whether it is in the past, present, or future
WHEN I click into a timeblock
THEN I can enter an event
WHEN I click the save button for that timeblock
THEN the text for that event is saved in local storage
WHEN I refresh the page
THEN the saved events persist*/


Assign value of date
let todayDate = moment().format('dddd, MMM Do YYYY, HH');

Format date displayed to include hour (0900AM to 0700PM)
$("#currentDay").html(todayDate + "00");


Initialize when ready//// this works also $(function() {
$(document).ready(function () {
        //Retrieve local storage data if present
        $("#9-hour .task").val(localStorage.getItem("9-AM"));
        $("#10-hour .task").val(localStorage.getItem("10-AM"));
        $("#11-hour .task").val(localStorage.getItem("11-AM"));
        $("#12-hour .task").val(localStorage.getItem("12-PM"));
        $("#1-hour .task").val(localStorage.getItem("1-PM"));
        $("#2-hour .task").val(localStorage.getItem("2-PM"));
        $("#3-hour .task").val(localStorage.getItem("3-PM"));
        $("#4-hour .task").val(localStorage.getItem("4-PM"));
        $("#5-hour .task").val(localStorage.getItem("5-PM"));
        $("#6-hour .task").val(localStorage.getItem("6-PM"));
        $("#7-hour .task").val(localStorage.getItem("7-PM"));
    
    Save-button click.event listener 
    $(".save-button").on("click", function () {
        Get nearby values of the description in JQuery
        let task//+project+// = $(this).siblings(".task").val();
        let hour = $(this).parent().attr("id");

        Save task to local storage
        localStorage.setItem(hour, task);
    })
   
    Begin hourKeeper function
    function hourKeeper() {

        Get the current hour
    ,    let currentHour = moment().hour();

        Loop over the hour blocks
        $(".hour-block").each(function () {
            let hourBlock = parseInt($(this).attr("id").split("-hour")[0]);

            Compare hour block to current hour
            if (hourBlock < currentHour) {
                Set background for past hour block
                $(this).removeClass("future");
                $(this).removeClass("present");
                $(this).addClass("past");
            }
            else if (hourBlock === currentHour) {
                Set background for tasks current hour block
                $(this).removeClass("past");
                $(this).removeClass("future");
                $(this).addClass("present");
            }
            else {
                Set background for future hour blocks
                $(this).removeClass("present");
                $(this).removeClass("past");
                $(this).addClass("future");

            }
        });
    }
Initialize hourKeeper
    hourKeeper();
})
