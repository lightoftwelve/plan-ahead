$(document).ready(function () {
  // get the current date from the dayjs library
  var today = dayjs();
  $('#currentDay').text(today.format('dddd MMM D, YYYY'));

  var timeBlocksContainer = $('#timeBlocks');
  var workHours = [9, 10, 11, 12, 13, 14, 15, 16, 17]; // defining work hours
  var currentHour = dayjs().hour(); // current hour from the dayjs library

  workHours.forEach(function (hour) {
    // dynamically modified containers for the scheduler
    var timeBlock = $('<div>').addClass('row time-block').attr('data-hour', hour);
    var timeLabel = $('<div>').addClass('col-2 col-md-1 hour text-center py-3');
    var hourText = hour < 12 ? hour + 'AM' : (hour === 12 ? hour + 'PM' : (hour - 12) + 'PM'); // formats the hour text based on AM or PM
    timeLabel.text(hourText);
    var entrySpace = $('<textarea>').addClass('col-8 col-md-9 description').attr('rows', '3');
    var saveBtn = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save');
    var saveIcon = $('<i>').addClass('fas fa-save').attr('aria-hidden', 'true');
    saveBtn.append(saveIcon);

    //added a refresh button to clear text area and localStorage for each note
    var refreshCache = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'refresh');
    var refreshIcon = $('<i>').addClass('fas fa-sync-alt').attr('aria-hidden', 'true');
    refreshCache.append(refreshIcon);

    // appends the timelabel, text area, save and refresh button to the time block
    timeBlock.append(timeLabel, entrySpace, saveBtn, refreshCache);
    // appends time block to timeblocks container
    timeBlocksContainer.append(timeBlock);

    // add appropriate classes to the timeblock based on the current hour
    if (hour === currentHour) {
      timeBlock.addClass('present');
    } else if (hour > currentHour) {
      timeBlock.addClass('future');
    } else {
      timeBlock.addClass('past');
    }

    // retrieves notes from localStorage and populates the entry space
    var note = localStorage.getItem(hourText);
    if (note) {
      entrySpace.val(note);
    }

    // save button click event
    saveBtn.on('click', function () {
      var note = entrySpace.val(); // get the note value from the textarea
      localStorage.setItem(hourText, note); // stores the note in localStorage with the hourText as the key
    });

    // refresh button click event
    refreshCache.on('click', function () {
      localStorage.removeItem(hourText); // removes the note from localStorage
      entrySpace.val(''); // clear the textarea by setting the value to an empty string
    });
  });
});