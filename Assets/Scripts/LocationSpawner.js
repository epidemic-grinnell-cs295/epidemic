/*
LocationSpawner.js

Generates all of the location objects. The spawner makes locations, and then 
does nothing while the game runs.

Sets initial infection and recovery coefficients for each type of location. 
While all locations of a given type begin with the same values, individual values
can change as the game progresses.
*/

var locationPrefab : Location;

var numHomes      = 2;
var numWorks      = 1;
var numSchools    = 0;
var numHospitals  = 1;

private var locationCount;

// Awake() is like Start(), but it happens before all start functions. We make 
// all the locations in Awake() so that if a script's Start() function tries to
// find a location, that location will already exist.
function Awake () {
  // there are no locations yet
  locationCount = 0;
  // general locations
  makeLocations(numHomes, LocKind.Home, 5.7);
  makeLocations(numWorks, LocKind.Work, 2.5);
  makeLocations(numSchools, LocKind.School, -1);
  makeLocations(numHospitals, LocKind.Hospital, -4.1);

  // special sleep location
  var loc : Location;
  loc = Instantiate(locationPrefab);
  loc.name = "Sleep";
  loc.kind = LocKind.Sleep;
  loc.index = ++locationCount;
  loc.infectionCoefficient = 0.01;
  loc.recoveryCoefficient = 0.05;
  loc.transform.parent = this.transform;  
  loc.transform.SetAsFirstSibling();

  // make the prefab the travel location
  locationPrefab.name = "Travel";
  locationPrefab.kind = LocKind.Travel;
  locationPrefab.index = ++locationCount;
  loc.infectionCoefficient = 0.01;
  loc.recoveryCoefficient = 0.01;
  locationPrefab.transform.parent = this.transform;
}

//make specified number of homes, work, hospitals, schools.
function makeLocations(num : int, kind : LocKind, ypos : int) {
  var i : int;
  var loc : Location;
  for (i = 1; i <= num; i++) {
    loc = Instantiate(locationPrefab, 
                      new Vector3(((i * 6.0F) - 15), ypos, 0), 
                      Quaternion.identity);
    loc.index = ++locationCount;
    loc.name = kind + " " + i;
    loc.transform.parent = this.transform;
    loc.kind = kind;
    //set infection and recovery coefficients based on location type
    switch (kind) {
      case LocKind.Home:
        loc.infectionCoefficient = 0.6;
   	  	loc.recoveryCoefficient = 0.01;
        break;
      case LocKind.Work:
        loc.infectionCoefficient = 0.75;
   	  	loc.recoveryCoefficient = 0.01;
        break;
      case LocKind.School:
        loc.infectionCoefficient = 0.75;
   		loc.recoveryCoefficient = 0.01;
        break;
      case LocKind.Hospital:
        loc.infectionCoefficient = 0.1;
   		loc.recoveryCoefficient = 0.75; 
        break;
      default:
        Debug.LogError("Invalid location kind, can't finish instantiation");
        break;
    } //switch
  }//for loop
}//function

