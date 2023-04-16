// Declare variables
// Date & Time variables
let Today = $('#CurrentDay');
let Time = $('#CurrentTime')
// Save button
let SaveBtn = $('.saveBtn')
// Delete button
let DeleteBtn = $('#DeleteBtn')
// Time block
let TimeBlock = $('.time-block')
// Confirmation message
let ConfirmMsg = $('#Confirm-Message')

$(function () {

  function SaveText() {
  SaveBtn.on('click', function() {
      // Use DOM manipulation to get required elements
      let Key = $(this).parent().attr('id');
      let Value = $(this).siblings('.description').val();
      // Write values to localStorage
      localStorage.setItem(Key, Value)
      // Set confirmation message
      ConfirmMsg.text('Succesfully added to localStorage ✅')
    });
  }

  // Set current hour for comparison
  CurrentHour = dayjs().format('H')

  // Set format depending on the current time
  function SetTimeFormat() {
    TimeBlock.each(function() {
      const BlockHourId = (this.id)
      if(BlockHourId < CurrentHour) {
        $(this).toggleClass('past')
      } else if (BlockHourId === CurrentHour) {
        $(this).toggleClass('present')
      } else if (BlockHourId > CurrentHour) {
        $(this).toggleClass('future')
      }
    })
  }

  // Update the time block format when hour changes
  function RefreshFormat() {
    TimeBlock.each(function() {
      const BlockHourId = parseInt(this.id)
      if(BlockHourId < CurrentHour) {
        $(this).removeClass('future present').addClass('past')
      } else if (BlockHourId === CurrentHour) {
        $(this).removeClass('past future').addClass('present')
      } else if(BlockHourId > CurrentHour) {
        $(this).removeClass('past present').addClass('future')
      }
    })
  }

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

TimeBlock.each(function() {
  const Key = $(this).attr('id');
  const Value = localStorage.getItem(Key);
  $(this).children('.descripton').val(Value)
})

  // TODO: Add event listener to erase all records from localStorage


// Add code to display the current date in the header of the page.
Today.text(dayjs().format('dddd, MMMM DD[th]'));
Time.text(dayjs().format('HH:ss'))

SaveText()
SetTimeFormat()
RefreshFormat()
});
