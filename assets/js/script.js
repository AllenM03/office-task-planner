// Used const for these as they are not changed
const timeBlockEl = $('.timeblock');
const buttonEl = $('.btn');
// counts the timeblocks in the HTML file and would be used in the for loops in several functions
const blockCount = timeBlockEl.children().length;

//Adds the date to the jumbotron
function setDate() {
    var timeDisplay = moment();
    $('#currentDay').text(timeDisplay.format("dddd, MMMM Do YYYY, hh:mm:ss"));
    
}

// sets background color of the timeblocks depending on the current time
function checkTimeBlock() {    
    var currentHour = moment().format('MM-DD-YYYY h:mm A');
    var timeBlock = '';
    var timeBlockID = '';

    for (var i = 0; i < blockCount; i++) {
        //get id of the textarea (child of the div in the class timeblock) and transform it as a datetime string value
        timeBlockID = $(".timeblock div textarea").eq(i).attr("id");
        timeBlock = moment(moment().format('MM-DD-YYYY')+' '+moment(timeBlockID,'hA').format('h:mm A'),'MM-DD-YYYY h:mm A');
        timeBlock = checkTimeDiff(currentHour, timeBlock);

        if (timeBlock < 0) {
            // for timeblocks greater than current time changes to green
            $(`#${timeBlockID}`).addClass('bg-success');
        } else if (timeBlock > 1) {
            // for timeblocks less than current time changes to gray
            $(`#${timeBlockID}`).addClass('bg-secondary');
        } else {
            // for timeblocks equal to current time changes to red
            $(`#${timeBlockID}`).addClass('bg-danger');
        }
    }
}

// function for comparing the current time with the timeblock and returns their difference in hours
function checkTimeDiff(currentHour, timeBlock) {
    var timeDiff = 0;
    // get difference of timeblock time to the current time in hours
    var timeDiff = moment(currentHour,'MM-DD-YYYY h:mm A').diff(timeBlock, 'hours',true);
    return timeDiff;
}

// loads the events stored in localStorage
function printSavedSched() {
    var textArea = '';
    var storedVal = '';
    var currDate =  moment().format('MM-DD-YYYY');

    // check all timeblocks (child of div that is a child of class timeblock) if there's a corresponding key in localStorage
    for (var i = 0; i < blockCount; i++) {
        textArea = $(".timeblock div textarea").eq(i).attr("id");
        // use value of currentdate and timeBlock as search selector
        storedVal = localStorage.getItem(`${currDate} ${textArea}`);

        // if it is found, load it to textArea
    if (storedVal) {
        $(`#${textArea}`).val(storedVal);
        }
    }
}

//saves task to local storage when user clicks the buttonEl
timeBlockEl.on('click', '.btn', function (event) {

    var timeBlock = $(event.target).attr('data-time');
    var currDate =  moment().format('MM-DD-YYYY');
    var textAreaValue = $(`#${timeBlock}`).val();
    localStorage.setItem(`${currDate} ${timeBlock}`, textAreaValue);
})

// do all of these when the page has finished loading
function init() {
    setDate();
    checkTimeBlock();
    printSavedSched();    
}

$(init());