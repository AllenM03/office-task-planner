//clock functions

function currentTime() {
    var date = new Date(); /* creating object of Date class */
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    hour = updateTime(hour);
    min = updateTime(min);
    sec = updateTime(sec);
    document.getElementById("clock").innerText = hour + " : " + min + " : " + sec; /* adding time to the div */
      var t = setTimeout(function(){ currentTime() }, 1000); /* setting timer */
  }
  
  function updateTime(k) {
    if (k < 10) {
      return "0" + k;
    }
    else {
      return k;
    }
  }
  
  currentTime(); /* calling currentTime() function to initiate the process */
  
  
  //Global declaration constants
  const timeBlockEl = $('.timeblock');
  const buttonEl = $('.btn');
  
  //counts the timeblocks in the HTML file and would be used in the for loops
  const blockCount = timeBlockEl.children().length;
  
  //Adds the date to the jumbotron
  function setDate() {
      var timeDisplay = moment();
      $('#currentDay').text(timeDisplay.format("dddd, MMMM Do YYYY"));   
  }
  
  //Sets background color of the timeblocks depending on the current time
  function checkTimeBlock() {    
      var currentHour = moment().format('MM-DD-YYYY hh:mm A');
      var timeBlock = '';
      var timeBlockID = '';
  
      for (var i = 0; i < blockCount; i++) {
          //retrieves id of the textarea and makes it a datetime string value
          timeBlockID = $(".timeblock div textarea").eq(i).attr("id");
          timeBlock = moment(moment().format('MM-DD-YYYY')+' '+moment(timeBlockID,'hA').format('hh:mm A'),'MM-DD-YYYY hh:mm A');
          timeBlock = checkTimeDiff(currentHour, timeBlock);
  
          if (timeBlock < 0) {
              //timeblocks greater than current time changes to green
              $(`#${timeBlockID}`).addClass('bg-success');
          } else if (timeBlock > 1) {
              //timeblocks less than current time changes to gray
              $(`#${timeBlockID}`).addClass('bg-secondary');
          } else {
              //timeblocks equal to current time changes to red
              $(`#${timeBlockID}`).addClass('bg-danger');
          }
      }
  }
  
  //function for comparing the present time with the timeblock and shows their difference in hours
  function checkTimeDiff(currentHour, timeBlock) {
      var timeDiff = 0;
      var timeDiff = moment(currentHour,'MM-DD-YYYY h:mm A').diff(timeBlock, 'hours',true);
      return timeDiff;
  }
  
  //loads the events stored in localStorage
  function printSavedSched() {
      var textArea = '';
      var storedVal = '';
      var currDate =  moment().format('MM-DD-YYYY');
  
      //check all timeblocks if there's a similar key in localStorage
      for (var i = 0; i < blockCount; i++) {
          textArea = $(".timeblock div textarea").eq(i).attr("id");
          //use value of currentdate and timeBlock as search selector
          storedVal = localStorage.getItem(`${currDate} ${textArea}`);
  
      //if it is found, load it to textArea
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
  
  //function runs these commands when the page has finished loading
  function init() {
      setDate();
      checkTimeBlock();
      printSavedSched();    
  }
  
  $(init());