/*
DebugLocationDisplay.js

Status string for each location, displayed in a column. Only meant for simple
debugging.
*/

var loc : Location;

function Start () {
  loc = this.GetComponent.<Location>();
}

function OnGUI () {
  var statusText = String.Format ("{0}: {1}", loc.name, loc.population);
//  GUI.Label (Rect (100, (loc.index * 20), 100, 30), statusText);
}
