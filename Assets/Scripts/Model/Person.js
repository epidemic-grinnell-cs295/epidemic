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

// sickness variables
var interactedCount : int;     // total number of people interacted
var infectedCount	   : int;    // number of those that were sick

// traveling
var schedule     : Schedule;
var currentLoc   : Location;
var travelTime   : int;
var cooldownTime : int;
var traveling : boolean;
var cooldown : boolean;

function Start () {
  schedule = generateSchedule();
  clock    = GameObject.Find("World Clock").GetComponent(WorldClock);
  interactedCount = 0;
  infectedCount = 0;
  traveling = false;
  cooldown = false;
  currentLoc = scheduledLocation();
  goToCurrentLocation();
}

function Update () {
  // traveling
  if (traveling && clock.time < travelTime) {
    // do nothing
  }
  // done traveling
  else if (traveling && clock.time >= travelTime) {
    traveling = false; 
    goToCurrentLocation();
  }
  // recovering from travel
  else if (cooldown && clock.time < cooldownTime) {
    checkHealth();
  }
  // cooldown done
  else if (cooldown && clock.time >= cooldownTime) {
    cooldown = false;
    checkHealth();
  }
  // otherwise if might be time to go somewhere else, but only if the current
  // location is not quarantined
  else if (!currentLoc.quarantine) {
    // at work, decide to go to hospital, hospital is open
    if (currentLoc.appointments && health == Health.infected 
        && !hospitalLoc.quarantine && Random.Range(0,100) < 1) {
        leaveCurrentLocation();
        currentLoc = hospitalLoc;
        travelTime = clock.time + 30*60;
        cooldownTime = travelTime + 20*60;
        traveling = true;
        cooldown = true;
    }
    // at hospital, decide to stay longer
    else if (currentLoc.kind == LocKind.Hospital && health == Health.infected 
        && Random.Range(0,200) < 199) {
      checkHealth();
    }
    // check if its time to move on
    else {
      var loc = scheduledLocation();
      // if it's time to move on, and no quarantine
      if(loc != currentLoc && !loc.quarantine && !currentLoc.quarantine) {
        leaveCurrentLocation();
        if (currentLoc.kind == LocKind.Sleep || loc.kind == LocKind.Sleep) {
          currentLoc = loc;
          travelTime = clock.time;
          cooldownTime = travelTime + 10*60;
          traveling = false;
          cooldown = true;
          goToCurrentLocation();
        }
        else {
          currentLoc = loc;
          travelTime = clock.time + 20*60;
          cooldownTime = travelTime + 10*60;
          traveling = true;
          cooldown = true;
        }
      }
      else {
        checkHealth();
      }
    }
  }
  // if quarantined, stay put
  else {
    checkHealth();
  }
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
  Debug.Log(this.name+" travels to "+currentLoc.name+" at time "+clock.clockStr);
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

