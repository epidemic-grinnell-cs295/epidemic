/*
WorldClockSettings.js
Player can change the speed of the simulation. 

DoubleTime() – double the game speed.

halfTime() – half the game speed.

pauseTime() – Pause the game (speed = 0), and save the previous speed. If the 
  game is already paused, unpause by setting speed to saved speed.
*/

var clock : WorldClock;

private var paused : boolean;
private var savedSpeed : int;

function Start () {
  clock  = this.GetComponent.<WorldClock>();
  paused = false;
}

function doubleTime () {
  clock.daySpeed = clock.daySpeed*2;
  clock.nightSpeed = clock.daySpeed*3; 
}

function halfTime () {
  clock.daySpeed = clock.daySpeed/2;
  clock.nightSpeed = clock.daySpeed*3; 
}


function pauseTime () {
  if (paused) {
    clock.daySpeed = savedSpeed;
    clock.nightSpeed = clock.daySpeed*3; 
    paused = false;
  }
  else {
    savedSpeed = clock.daySpeed;
    clock.daySpeed = 0;
    clock.nightSpeed = 0;
    paused = true;
  }
}
