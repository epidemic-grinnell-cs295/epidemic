/*
DebugWorldClockDisplay.js

Updated time string. Only meant for simple debugging.
*/

var clock : WorldClock;
var MyFont : Font;

function Start () {
  clock = this.GetComponent.<WorldClock>();
}

function OnGUI () {
  var largeFont = new GUIStyle();
  largeFont.fontSize = 19;
  largeFont.normal.textColor = Color.white;
  GUI.skin.font = MyFont;
  var timeText = String.Format("Day {0} | {1}", clock.day, clock.clockStr);
  GUI.Label (Rect (810, 50, 200, 200), timeText, largeFont);
}
