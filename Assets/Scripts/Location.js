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

//Boolean treatment options
var handwashing : boolean;
var treatment1 	: boolean;
var treatment2 	: boolean;
var treatment3	: boolean;
private var hand_ON		: boolean; 	//temp variables to fix problems..
private var T1_ON		: boolean;
private var T2_ON		: boolean;
private var T3_ON		: boolean;

function Awake () {
DontDestroyOnLoad(this);
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

	switch (kind) {
      case LocKind.Home:
      	if (handwashing && !hand_ON) 	{
      		this.infectionCoefficient -= 0.2;
      		hand_ON = true;}  //this works but is not that nice...
      	if (treatment1 && !T1_ON)		{
      		this.recoveryCoefficient += 0.05;
      		T1_ON = true;}
      	if (treatment2 && !T2_ON)		{
      		this.recoveryCoefficient += 0.05;
      		T2_ON = true;}
      	if (treatment3 && !T3_ON)		{
      		this.recoveryCoefficient += 0.15;
      		T3_ON = true;}
        break;
      case LocKind.Work:
      	if (handwashing && !hand_ON) 	{
      		this.infectionCoefficient -= 0.2;
      		hand_ON = true;}  //this works but is not that nice...
      	if (treatment1 && !T1_ON)		{
      		this.recoveryCoefficient += 0.05;
      		T1_ON = true;}
      	if (treatment2 && !T2_ON)		{
      		this.recoveryCoefficient += 0.05;
      		T2_ON = true;}
      	if (treatment3 && !T3_ON)		{
      		this.recoveryCoefficient += 0.15;
      		T3_ON = true;}
        break;
      case LocKind.School:
      	if (handwashing && !hand_ON) 	{
      		this.infectionCoefficient -= 0.2;
      		hand_ON = true;}  //this works but is not that nice...
      	if (treatment1 && !T1_ON)		{
      		this.recoveryCoefficient += 0.05;
      		T1_ON = true;}
      	if (treatment2 && !T2_ON)		{
      		this.recoveryCoefficient += 0.05;
      		T2_ON = true;}
      	if (treatment3 && !T3_ON)		{
      		this.recoveryCoefficient += 0.15;
      		T3_ON = true;}
      case LocKind.Hospital:
      	if (handwashing && !hand_ON) 	{
      		this.infectionCoefficient -= 0.2;
      		hand_ON = true;}  //this works but is not that nice...
      	if (treatment1 && !T1_ON)		{
      		this.recoveryCoefficient += 0.05;
      		T1_ON = true;}
      	if (treatment2 && !T2_ON)		{
      		this.recoveryCoefficient += 0.05;
      		T2_ON = true;}
      	if (treatment3 && !T3_ON)		{
      		this.recoveryCoefficient += 0.15;
      		T3_ON = true;}
        break;
      case LocKind.Sleep:
        break;
      case LocKind.Travel:
        break;
      default:
        Debug.LogError("Invalid location kind, can't finish instantiation");
        break;
   }//switch	
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

function checkIn (health : Health) {
  deltaArrive++;
  //alter location and global health variables
  if (health == Health.susceptible)    { susceptible++; }
  else if (health == Health.infected)  { deltaInfected++; }
  else if (health == Health.recovered) { recovered++; }
}

function checkOut (health : Health, ratioSick : float) {
  deltaLeave++;
  //alter location and global health variables, define probability, return sickness status
  if (health == Health.susceptible)    { 
  	susceptible--; 
  	probability = ratioSick*(this.infectionCoefficient);
  	if (Random.Range(0,100)<probability*100) {return 1;}
	}
  else if (health == Health.infected)  {
  	deltaInfectedLeave++; 
  	probability = ratioSick*(this.recoveryCoefficient);
  	if (Random.Range(0,100)<probability*100) {return 2;}
	}
  else if (health == Health.recovered) {
  	recovered--; 
	}

 

  Debug.Log("Ratio = " + ratioSick + "Probability = " + probability + " Location " + this.name);
}
 