function updateTimeSaved() {
  // get old time
  var sheetActive = SpreadsheetApp.openById("1an4ci16-wbglDrEoCTiViwJIgJXH2ba1ve0iWnQzIm4");
  var sheet = sheetActive.getSheetByName("Sheet2");
  var saved = sheet.getRange(1, 2).getValue();
  var today = new Date();
  var date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + ' ' + time;

  saved = Number(saved + 0.5);  // increment time by 30 minutes
  sheet.getRange(1, 2).setValue(saved);  // write new value
  sheet.getRange(2, 2).setValue(dateTime);
  console.log('This automation has saved: ', saved, ' hours!');
}