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

// set everything
function Awake () {
  population    = 0;
  infected      = 0;
  deltaPop      = 0;
  deltaInfected = 0;
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
}

function checkOut (health : Health) {
  deltaPop--;
  if (health == Health.infected) {
    deltaInfected--;
  }
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
