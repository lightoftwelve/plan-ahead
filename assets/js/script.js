$(document).ready(function () {
  var today = dayjs();
  $('#currentDay').text(today.format('dddd MMM D, YYYY'));

  $(function () {
    var timeBlocksContainer = $('#timeBlocks');

    var workHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];

    workHours.forEach(function (hour) {
      var timeBlock = $('<div>').addClass('row time-block').attr('data-hour', hour);

      var timeLabel = $('<div>').addClass('col-2 col-md-1 hour text-center py-3');
      timeLabel.text(hour <= 12 ? hour + 'AM' : (hour - 12) + 'PM');

      var entrySpace = $('<textArea>').addClass('col-8 col-md-10 description').attr('rows', '3');

      var saveBtn = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save');
      var saveIcon = $('<i>').addClass('fas fa-save').attr('aria-hidden', 'true');
      saveBtn.append(saveIcon);

      timeBlock.append(timeLabel, entrySpace, saveBtn);
      timeBlocksContainer.append(timeBlock);
    });
  });
});


// define workhours
// define what they make
/*
<div id="hour-11" class="row time-block future">
  <div class="col-2 col-md-1 hour text-center py-3">11AM</div>
  <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
  <button class="btn saveBtn col-2 col-md-1" aria-label="save">
    <i class="fas fa-save" aria-hidden="true"></i>
  </button>
</div> */