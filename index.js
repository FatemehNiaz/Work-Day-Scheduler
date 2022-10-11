$(function () {});
//we are going to declare a couple of variables
//1- We need a variable that represent today
//2- and a variable that reperesent the current time
//3- we need arrays, they kind of variables but we can store multiple things inside it, 
//think of it as a list, list of differet elements,this arrayis going to contain the time slot
//we need to store the time and the task that the user does in that time. 
//We are going to store an object here. An object allow us to do multiple things.
//In this case each object will be a hour like 9AM for example and the task that you are doing at that time.

var today = moment().format("dddd, MMMM Do");
var currentTime = moment().format("H A");
var schedule = [
  { time: "9 AM", task: "" },
  { time: "10 AM", task: "" },
  { time: "11 AM", task: "" },
  { time: "12 PM", task: "" },
  { time: "1 PM", task: "" },
  { time: "2 PM", task: "" },
  { time: "3 PM", task: "" },
  { time: "4 PM", task: "" },
  { time: "5 PM", task: "" },
];
//Local storage is a storage on your browser, in this way when you add a task to your schedule 
//and you close your browser and you open it later,everthing is still there
//this line of code is getting the schedul from local storage
var scheduleStorage = JSON.parse(localStorage.getItem("schedule"));
//With the if statement, we're going to check if there was a schedule that was saved on your local storage
if (scheduleStorage) {
  schedule = scheduleStorage;
}


//the class "container" in the HTML file is where the time slot or time blocks are going to go
//and the id of "currentDay" that's where the day suppose tobe or go, on the top where it says for example September, 8th
//next line is going to find the id of currentDay in HTML and we are going to alter the text of that elements by using that twxt
//we are going to use the forEach, to get all the objects in the schedule array 


$("#currentDay").text(today);
schedule.forEach(function (timeBlock, index) {
  //We are going to write and function that for each time block add the boxes infront of each time to inter the task
  //we are going to write it for both the time and the tak
  var time = timeBlock.time;
  var task = timeBlock.task;
  //We need to creat two variable, one for entry and one for currentTime

  var entry = moment(time, "H A");
  var current = moment(currentTime, "H A");
  var color = "";  
  if (entry.isBefore(current) === true) {
    color = "past";
  } else if(entry.isAfter(current) === true){
    color="future";
  } else {
    color="present";
  }
  var row="<div id='"+index+"'class='time-block'>";
  row+="<div class='row input-group no-gutters'>"
  row+="<div class='hour col-lg-1 '>"+time+"</div>";
  row+="<textarea class='col-lg-10 form-control "+color+"'>"+schedule[index].task+"</textarea>";
  row+="<div class='col-lg-1 input-group-append'>";
  row+="<button type='submit' class='btn-block saveBtn'><i class='fas fa-save'></i></button>";
  row+="</div>";
  row+="</div>";
  //We are going to append the row to that container
  $(".container").append(row);
});

$(".saveBtn").on("click",function(){
  var index= parseInt($(this).closest(".time-block").attr("id"));
  var taskEntry= $(this).parent().siblings("textarea").val();
 schedule[index].task=taskEntry;
 localStorage.setItem("schedule",JSON.stringify(schedule));
})