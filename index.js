$(function () {});
var today = moment().format("dddd, MMMM Do");
var currentTime = moment().format("H A");
var schedule = [
  { time: "9 AM", task: "" },
  { time: "10 AM", task: "" },
  { time: "11 AM", task: "" },
  { time: "12 AM", task: "" },
  { time: "1 PM", task: "" },
  { time: "2 PM", task: "" },
  { time: "3 PM", task: "" },
  { time: "4 PM", task: "" },
  { time: "5 PM", task: "" },
];
var scheduleStorage = JSON.parse(localStorage.getItem("schedule"));
if (scheduleStorage) {
  schedule = scheduleStorage;
}

$("#currentDay").text(today);
schedule.forEach(function (timeBlock, index) {
  var time = timeBlock.time;
  var task = timeBlock.task;
  var entry = moment(time, "H A");
  var current = moment(currentTime, "H A");
  var color = "";
  if (entry.isBefore(current) === true) {
    color = "grey";
  } else if(entry.isAfter(current) === true){
    color="green";
  } else {
    color="red";
  }
  var row="<div>";
  row+="<div>"+time+"</div>";
  row+="<textarea></textarea>";
  row+="<div>";
  row+="<button type='submit' class='btn-block'><i class='fa-regular fa-floppy-disk'></i></button>";
  row+="</div>";
  row+="</div>";
  $(".container").append(row);
});
