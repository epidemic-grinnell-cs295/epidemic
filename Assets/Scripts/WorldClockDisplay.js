/*
WorldClockDisplay.js

Updates the HUD clock text every frame with the current value of 
WorldClock.clockStr.
*/

var clock : WorldClock;
var MyFont : Font;
var clockText : UnityEngine.UI.Text;

function Start () {
  clock = this.GetComponent.<WorldClock>();
  clockText.text = String.Format("Day {0} | {1}", clock.day, clock.clockStr);
}

function Update () {
clockText.text = String.Format("Day {0} | {1}", clock.day, clock.clockStr);
}


