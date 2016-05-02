/*
Person.js

A specific person. Each person has a schedule object, which tells them where 
they are and where they should go next.

Update() – person checks if they are in the right place. If they are, check if 
  they have interacted with new (potentially sick) people. If they need to go to 
  a new place, go to that place.

scheduledLocation()

leaveCurrentLocation() – Leave the current location, calls the location’s 
  checkOut() method. Determine health status based off of interactions and 
  coefficients.

goToCurrentLocation() – Go to the current location, call the location’s 
  checkIn() method. Trigger animation to move from current position to location.
*/

class Schedule {
  var morning : int;
  var midday : int;
  var evening : int;
  var sleep : int;
  function Schedule(morning, midday, evening, sleep) {
    this.morning = morning;
    this.midday = midday;
    this.evening = evening;
    this.sleep = sleep; 
  }
}

// CUSTOMIZE
var homeLoc  : Location;
var workLoc  : Location;
var sleepLoc : Location;
var hospitalLoc : Location;
var health   : Health;

var clock      : WorldClock;
var endState   : EndState;
var pause	   : boolean;

// sickness variables
var interactedCount : int;     // total number of people interacted
var infectedCount	   : int;    // number of those that were sick

// traveling
var schedule     : Schedule;
var currentLoc   : Location;
var loc			 : Location;
var waitTime=0;
var officePound  : boolean;

function Start () {
  schedule = generateSchedule();
  clock    = GameObject.Find("World Clock").GetComponent(WorldClock);
  interactedCount = 0;
  infectedCount = 0;
  officePound = false;

  currentLoc = scheduledLocation();
  loc = scheduledLocation();
  goToCurrentLocation();
  endState.report(health);
}

function Update () {
  var time = clock.time;
  loc = scheduledLocation();
  if (time >= schedule.evening) {officePound = false;}

  if (clock.daySpeed == 0){ /*do nothing*/ }

  else if (waitTime>0) { //To deal with issue of people moving too fast
  	checkHealth();
  	waitTime --; }

  else if (currentLoc.quarantine) {checkHealth();} //Can't move
  else if (time >= schedule.sleep && time < schedule.morning)	{sleepMovement();}
  else if (time >= schedule.morning && time < schedule.evening)	{middayMovement();}
  else if (time >= schedule.evening && time < schedule.sleep)	{eveningMovement();}

  endState.report(health);
}

 function sleepMovement(){
  //Go to sleep location unless in Hosptial
  if (currentLoc != loc && currentLoc.kind != LocKind.Hospital){ moveTo(loc, 200); }
  else {checkHealth();}
 }


function middayMovement(){

  switch (currentLoc.kind){
  case (LocKind.Hospital):
  	if(health == Health.infected) { moveTo(loc, 1); }
  	else { moveTo(loc, 2); }
  	break;

  case (LocKind.Sleep):
  case (LocKind.Home):
    if (currentLoc != loc){ moveTo(loc, 50);} //Move from home to work
  	else if (!hospitalLoc.quarantine && health == Health.infected) { moveTo(hospitalLoc, 1); }
  	else if (!hospitalLoc.quarantine) { moveTo(hospitalLoc, 1); } 
  	break;

  case (LocKind.Work):
   if (currentLoc.close) { moveTo(homeLoc, 10);}
   else if (currentLoc.appointments && !hospitalLoc.quarantine){
    	if(health == Health.infected) { moveTo(hospitalLoc, 3);}
    	else { moveTo(hospitalLoc, 1);}}
  	break;

  default:
  	checkHealth();
  	break;
  }
 }

 function eveningMovement(){
  //Hospital Movement
  if(currentLoc.kind == LocKind.Hospital && health == Health.infected)		 { moveTo(loc, 2); }
  else if (currentLoc.kind == LocKind.Hospital && health != Health.infected) { moveTo(loc, 1); }
  //Return home from work
  else if (currentLoc != loc)	{ moveTo(loc, 200); }
  else {checkHealth();}
 }

function moveTo(newLoc : Location, probability : int){
 waitTime = 10;
 if (Random.Range(0,200) < probability) { 
  leaveCurrentLocation();
  if (newLoc.close && !officePound) { 
  	poundOfficeDoor();
  	newLoc = homeLoc;}
  else if (newLoc.close && officePound) {newLoc = homeLoc;}
  currentLoc = newLoc;
  goToCurrentLocation();
  }
 }

 function poundOfficeDoor(){
  leaveCurrentLocation();
  officePound = true;
  //animation goes here
  Debug.Log("Pound on door");
  goToCurrentLocation();
 }

// Each person should have a semi-random schedule. Right now that means everyone
// goes between work and home, but they leave/arrive at different times and
// go to different houses and work places. 
function generateSchedule () {
  var range = Random.Range;
  
  var morning : int;
  var midday : int;
  var evening : int;
  var sleep : int;

  morning = clock.timeInSeconds(range(6,9),range(0,59));   // 6 to 9:59
  midday  = morning + range(30,91)*60;                     // 6:30 to 11:30
  evening = clock.timeInSeconds(range(15,18),range(0,30)); // 3 to 6:30
  sleep   = clock.timeInSeconds(range(20,23),range(0,59)); // 8 to 11:59

  return new Schedule(morning, midday, evening, sleep);
}

function scheduledLocation() {
  var time = clock.time;
  // sleeping, past midnight
  if (time < schedule.morning) { return sleepLoc; }
  // morning, at home
  if (time < schedule.midday)  { return homeLoc; }
  // midday, at work
  if (time < schedule.evening) { return workLoc; }
  // evening, at home
  if (time < schedule.sleep)   { return homeLoc; }
  // sleeping, before midnight
  return sleepLoc;
}

function leaveCurrentLocation() {
  currentLoc.checkOut(health);
}

function goToCurrentLocation () {
  currentLoc.checkIn(health);
  //Debug.Log(this.name+" travels to "+currentLoc.name+" at time "+clock.clockStr);
  interactedCount += currentLoc.population;
  infectedCount += currentLoc.infected;
}

function checkHealth () {
  interactedCount += currentLoc.deltaPop;
  infectedCount += currentLoc.deltaInfected;

  if (Random.Range(0,100) < (clock.daySpeed/1200)) {
    var ratio;
    if (interactedCount != 0) { 
      //multiple by 1.0f to convert infectedCount to a float
      ratio = infectedCount*1.0f / interactedCount;
    }
    else { 
      ratio = 0; 
    }
    health = currentLoc.updateHealth(health, ratio); 

    interactedCount = 0;
    infectedCount = 0;
  }

}

