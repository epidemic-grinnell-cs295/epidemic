/*
Location.js

A specific location.

name – The name string for the location, like “School 2”.

Update() - executed at the begining of each frame.  Changes the coefficients if 
  the user/game has implemented treatments

LateUpdate() - executed at the begining of each frame after all Update() functions
  Changes the population values based off of movement durring Update().

checkIn(health) – Person calls when they arrive at the location. Lets the 
  location know that a new person has arrived, and if that person is healthy or 
  not.

checkOut() – Person calls when they leave the location. First lets the location 
  know that a person has left. Then checks to see if time at that location has 
  made the person more or less sick.
*/

// CUSTOMIZE
var kind : LocKind;
var infectionCoefficient: float;
var recoveryCoefficient: float;
var happiness  : Happiness;

// general status
var population    : int;
var infected      : int;
var deltaPop	  : int; 
var deltaInfected : int;

// policies
var quarantine	 : boolean;
var close		 : boolean;
var sanitization : boolean;
var appointments : boolean;
var experimental : boolean;

// gui buttons
var quarantineToggle   : UnityEngine.UI.Toggle;
var closeToggle        : UnityEngine.UI.Toggle;
var sanitizationToggle : UnityEngine.UI.Toggle;
var appointmentsToggle : UnityEngine.UI.Toggle;
var experimentalToggle : UnityEngine.UI.Toggle;

// positioning bloops in a location
// if a cell is true, it is empty
// if a cell is false, there is a sprite at the position
var bloopCells = new boolean[27];

// set everything
function Awake () {
  population    = 0;
  infected      = 0;
  deltaPop      = 0;
  deltaInfected = 0;
  // mark all sprite cells as empty
  for (var cell in bloopCells) {
    cell = true;
  }
}

function Update (){

}//function

function LateUpdate () {
  population   += deltaPop;
  infected     += deltaInfected;
  deltaPop      = 0;
  deltaInfected = 0;
}

function checkIn (health : Health) {
  deltaPop++;
  if (health == Health.infected) { 
    deltaInfected++; 
  }
  return fillFirstEmptyCell();
}

function checkOut (i : int, health : Health) {
  deltaPop--;
  if (health == Health.infected) {
    deltaInfected--;
  }
  resetFilledCell(i);
}

function updateHealth(health : Health, ratioSick : float) {

  var newHealth : Health;
  var coeff : float;
  var probability : float;

  if (health == Health.susceptible) { 
    coeff = this.infectionCoefficient;
    if (this.sanitization) {coeff -= .25;}
    if (this.experimental) {coeff += .25;}
    probability = ratioSick*coeff;
    if (Random.Range(0,100) < probability*100) {
      newHealth = Health.infected;
      happiness.sickCost();		//player looses happiness
      deltaInfected++;
    }
    else {
      newHealth = health;
    }
  }
  
  else if (health == Health.infected) {
    coeff = this.recoveryCoefficient;
    if (this.experimental) {coeff += .25;}
    probability = (1-ratioSick)*coeff;
    if (Random.Range(0,100) < probability*100) {
      newHealth = Health.recovered;
      happiness.recoveredCost(); 	//player gains happiness
      deltaInfected--;				
    }
    else {
      newHealth = health;
    }
  }

  else if (health == Health.recovered) {
    newHealth = health;
  }

  return newHealth;
}
 
function toggleQuarantine() {
  this.quarantine = this.quarantineToggle.isOn;
}

function toggleclose() {
  this.close = closeToggle.isOn;
  if(this.close && appointmentsToggle) {
    appointmentsToggle.isOn = false;
    this.appointments = false;
  }
}

function toggleSanitization() {
  this.sanitization = this.sanitizationToggle.isOn;
}

function toggleAppointments() {
  this.appointments = this.appointmentsToggle.isOn;
  if(this.appointments && closeToggle) {
    closeToggle.isOn = false;
    this.close = false;
  }
}
  
function toggleExperimental() {
  this.experimental = this.experimentalToggle.isOn;
}

// yo this function be borked. If more than 27 people
// go to a location then we assume all the extra people
// are piled up in cell 0. FIX THIS PLS.
function fillFirstEmptyCell () : int {
  for (var i : int; i < bloopCells.length; i++) {
    // if the cell is empty then fill it
    if (bloopCells[i]) {
      bloopCells[i] = false;
      return i;
    }
  }
  Debug.LogError("More than 27 people at location, code is borked.");
  return 0;
}

function resetFilledCell (i : int) {
  bloopCells[i] = true;
}

// take a bloopCell index, calculate the corresponding position 
// at the local scale (inside the square location sprite) and then
// translate the local position to an absolute world position
function spritePos (i : int) : Vector3 {
  var x = -140 + (35 * (i % 9));
  var y =   40 - (35 * (i / 9));
  var z = 100;
  return Vector3(x, y, z);
}
