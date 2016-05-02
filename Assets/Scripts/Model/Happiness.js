/* 
Game Object			Cost
----------------------------
quarantine			-5
close work			-5
AI gets sick		-5
AI gets better		+5 
*/

var slider : UnityEngine.UI.Slider;
var happiness : int;
var happinessText : UnityEngine.UI.Text;
var newDay	: boolean;
var clock      : WorldClock;


//Toggles
var quarantineHomeToggle1   : UnityEngine.UI.Toggle;
var quarantineHomeToggle2   : UnityEngine.UI.Toggle;
var closeToggle				: UnityEngine.UI.Toggle;
var quarantineHospitalToggle	: UnityEngine.UI.Toggle;

function Start () {
	happiness = 100;
	slider.value = happiness;
	newDay = false;
	clock = GameObject.Find("World Clock").GetComponent(WorldClock);
}

function Update () {
	var time = clock.time;
	slider.value = happiness;
	if (time > 28000 && time < 29000 && newDay) {	
    	quarantineH1Cost();		//charge for decisions everyday around 8
    	quarantineH2Cost();
    	quarantineHospitalCost();
    	closeCost();
    	newDay = false;}
    else if (time > 30000) { newDay = true; }
	 
}

function quarantineH1Cost (){
	if (this.quarantineHomeToggle1.isOn) {happiness -=5;}
}

function quarantineH2Cost (){
	if (this.quarantineHomeToggle2.isOn) {happiness -=5;}
}

function quarantineHospitalCost(){
	if (this.quarantineHospitalToggle.isOn) {happiness -=5;}
}

function closeCost(){
	if (this.closeToggle.isOn) {happiness -=5;}
}

function sickCost(){
	happiness -=5; //this works but decrements every frame
}

function recoveredCost(){
	happiness +=10;
}