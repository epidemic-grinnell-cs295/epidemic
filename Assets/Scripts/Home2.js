/*
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

var index : int; // each location has an index between 1 and number of locations
var kind : LocKind;
var population  : int;
var susceptible : int;
var infected    : int;
var recovered   : int;
var deltaArrive	: int;      //  keep track of how many people leave/arrive at 
var deltaLeave	: int;		//  a location durring a frame and if they are sick
var deltaInfected: int;
var deltaInfectedLeave: int;
var infectionCoefficient: float;
var recoveryCoefficient: float;
var ratioSick : float;
var probability: float;
var quarantine	: boolean = false;


//Boolean treatment options - used in check boxes on the side (not gameplay)
/*
public var handwashing : boolean = false;
var treatment1 	: boolean = false;
var treatment2 	: boolean = false;
var treatment3	: boolean = false;
private var hand	: int; 	//temp variables to fix problems..
private var T1		: int;
private var T2		: int;
private var T3		: int; */


function Awake () {
  population  = 0;
  susceptible = 0;
  infected    = 0;
  recovered   = 0;
  deltaArrive = 0;
  deltaLeave  = 0;
  deltaInfected = 0;
  deltaInfectedLeave = 0;
}


function Update (){

/* checkboxes that can be used in the non-game display

	if (handwashing) {hand = 1;}
	else {hand = 0;}
	if (treatment1) {T1 = 1;}
	else {T1 = 0;}
	if (treatment2) {T2 = 1;}
	else {T2 = 0;}
	if (treatment3) {T3 = 1;}
	else {T3 = 0;}

	switch (kind) {
      case LocKind.Home:
      	this.infectionCoefficient = 0.6 - hand*0.2;
		this.recoveryCoefficient = 0.01 + T1*0.05 + T2*0.10 + T3*0.15;
		break;
      case LocKind.Work:
      	this.infectionCoefficient = 0.75 - hand*0.2;
		this.recoveryCoefficient = 0.01 + T1*0.05 + T2*0.10 + T3*0.15;
		break;
      case LocKind.School:
      	this.infectionCoefficient = 0.75 - hand*0.2;
		this.recoveryCoefficient = 0.01 + T1*0.05 + T2*0.10 + T3*0.15;
		break;
      case LocKind.Hospital:
		this.infectionCoefficient = 0.1 - hand*0.2;
		this.recoveryCoefficient = 0.01 + T1*0.05 + T2*0.05 + T3*0.15;
        break;
      case LocKind.Sleep:
        break;
      case LocKind.Travel:
        break;
      default:
        Debug.LogError("Invalid location kind, can't finish instantiation");
        break;
   }//switch	 */
}//function

function LateUpdate () {
  population += deltaArrive;
  population -= deltaLeave;
  infected += deltaInfected;
  infected -= deltaInfectedLeave;
  deltaArrive =0;
  deltaLeave=0;
  deltaInfected=0;
  deltaInfectedLeave=0;
}

function getBetter(){
  switch (kind) {
      case LocKind.Home:
		this.recoveryCoefficient = 0.2;
		break;
      case LocKind.Work:
		this.recoveryCoefficient = 0.3;
		break;
      case LocKind.School:
		this.recoveryCoefficient = 0.3;
		break;
      case LocKind.Hospital:
		this.recoveryCoefficient = 0.7;
        break;
      case LocKind.Sleep:
        break;
      case LocKind.Travel:
        break;
      default:
        Debug.LogError("Invalid location kind, can't finish instantiation");
        break;
  }
}

function quarantineLoc(){
  this.quarantine = true;
}

function checkIn (health : Health) {
  deltaArrive++;
  //alter location and global health variables
  if (health == Health.susceptible)    { susceptible++; }
  else if (health == Health.infected)  { deltaInfected++; }
  else if (health == Health.recovered) { recovered++; }
}

function checkOut (health : Health, ratioSick : float) {
  if (!this.quarantine) {deltaLeave++;}
  //alter location and global health variables, define probability, return sickness status
  if (health == Health.susceptible)    { 
  	if (!this.quarantine) {susceptible--;}
  	probability = ratioSick*(this.infectionCoefficient);
  	if (Random.Range(0,100)<probability*100) {return 1;}
	}
  else if (health == Health.infected)  {
  	if (!this.quarantine) {deltaInfectedLeave++;}
  	probability = ratioSick*(this.recoveryCoefficient);
  	if (Random.Range(0,100)<probability*100) {return 2;}
	}
  else if (health == Health.recovered) {
  	if(!this.quarantine) {recovered--;}

	}

 

  Debug.Log("Ratio = " + ratioSick + "Probability = " + probability + " Location " + this.name);
}