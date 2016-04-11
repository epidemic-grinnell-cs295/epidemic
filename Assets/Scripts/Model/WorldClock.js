/*
WorldClock.js

Keep track of in game time.

day is an integer for the current day.

time is the current second of the game day. There are 24*60*60=86400 seconds in 
  a day. When the day counter rolls over time resets to 0 seconds.

clockStr is a string in the form ‘12:34 PM’ that  is updated every game second.
*/

/*
The game clock runs at a multiple of real time. Because night time is boring,
the hours from 12am to 6am can be set to run faster than the rest of the day.

Let's say we want 24 game hours to pass in 1 minute. So we want 24*60=1440 game
minutes per minute. But we can make the day go a little slower, and the night
go a little faster.
18 hours, 18*60=1080 game min, in .9 real minute, 1080/.9=1200 game min per min
 6 hours,  6*60= 360 game min, in .1 real minute,  360/.1=3600 game min per min
It seems pretty reasonable to have the night go 3x faster than the day, so
we'll stick with that. We're actually going to count the day in seconds, so
remember that it's equivalent to say that there are 1200 game seconds per second
during the day. 
*/

// the number of seconds in a day, to avoid magic numbers
private var secsPerDay : int = 24*60*60; // 24 hours in a day
private var dayStart   : int =  6*60*60; // day starts at 6am
private var nightStart : int =        0; // night starts at 12am

var daySpeed   : int = 1200;
var nightSpeed : int = daySpeed*3; 

// track the day, and the number of seconds that have passed for the current day
var day  : int;
var time : int;
var clockStr : String;

function Start () {
  day  = 1;
  time = dayStart;
  clockStr = clockString();
}

function Update () {
  nightSpeed = daySpeed*3;
  clockStr = clockString();
  // get the real time that has passed, aplly multiple and add to second count.
  // go at night speed
  if (time >= nightStart && time < dayStart) {
    time += Time.deltaTime*nightSpeed;
    daytime = false;
  }
  // go at day speed
  else {
    time += Time.deltaTime*daySpeed;
    daytime = true;
  }
  // if we have overflowed into a new day, increment the day counter
  if (time > secsPerDay) {
    day++;
    time = time % secsPerDay;
  }
}

private function clockString () : String {
  var res : String;
  var minute = Mathf.FloorToInt(time/60)   % 60;
  var hour   = Mathf.FloorToInt(time/3600) % 24;
  var minuteStr = minute.ToString(":00");
  if (hour ==  0)     { return "12" + minuteStr + " AM"; }
  if (hour == 12)     { return "12" + minuteStr + " PM"; }
  else if (hour < 12) { return hour.ToString("00") + minuteStr + " AM"; }
  else                { return (hour % 12).ToString("00") + minuteStr + " PM"; }
}

// input an hour (0-23) and a minute (0-59), return corresponding game second
function timeInSeconds (hour : int, min : int) {
   return (hour*3600) + (min*60);
}
