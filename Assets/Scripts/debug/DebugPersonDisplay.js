/*
DebugPersonDisplay.js

Status string for each person, displayed in a column. Only meant for simple
debugging.
*/

var person : Person;

function Start () {
  person = this.GetComponent.<Person>();
}

function OnGUI () {
 // var statusText = String.Format ("{0} \t\t at {1,-20} \t feeling {2}", 
   //                               person.name, person.schedule.loc.name, person.health);
 // GUI.Label (Rect (300, (person.index * 20), 1000, 300), statusText);
}
