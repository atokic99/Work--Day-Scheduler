// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.


// Set the date at the top of the page
$("#currentDay").text(dayjs().format("dddd, MMMM D YYYY"));
for (let index = 8; index < 18; index++) {
  var timeparent = $('<div>')
  timeparent.addClass ('row time-block') .attr('id', 'hour-'+ index)
  var hourchild = $('<div>')
  .addClass ('col-2 col-md-1 hour text-center py-3') 
  .text(dayjs().hour(index).format('h A'))
  var textarea = $('<textarea>')
  textarea.addClass ('col-8 col-md-10 description') 
  var button = $('<button>')
  button.addClass (' btn saveBtn col-2 col-md-1') 
  .html (' <i class="fas fa-save" aria-hidden="true"></i>')
timeparent.append(hourchild) .append(textarea) .append(button)
$('.container-lg') .append(timeparent)
}
// Set the status of each time-block
$(".time-block").each(function() {
  var currentTime = dayjs().hour();
  var timeBlock = parseInt($(this).attr("id").split("-")[1]);
  console.log(timeBlock)
  console.log($(this).attr('id'))
  if (timeBlock < currentTime) {
    $(this).addClass("past");
  } else if (timeBlock === currentTime) {
    $(this).addClass("present");
  } else {
    $(this).addClass("future");
  }
});

// Load any saved data from localStorage
$(".description").each(function() {
  var timeBlock = $(this).parent().attr("id");
  var history = JSON.parse(localStorage.getItem('history'))
  if (history) {
    for (let index = 0; index < history.length; index++) {
      const element = history[index];
    if (timeBlock == element.time) {
      $(this).val(element.description)
    }  
    }
  }
});

// Save the data to localStorage on click
$(".saveBtn").on("click", function() {
  var timeBlock = $(this).parent().attr("id");
  var description = $(this).siblings(".description").val();
  var savedData = localStorage.getItem('history') ? JSON.parse(localStorage.getItem('history')) : []
  savedData.push({timeBlock,description})
  localStorage.setItem(JSON.stringify(savedData));

});

});
