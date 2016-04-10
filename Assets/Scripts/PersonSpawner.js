/*
PersonSpawner.js

Generates all the person objects.

The spawner makes people, and then does nothing while the game runs.
*/

var personPrefab : Person;

var population = 10;
var initialInfected = 2;

// Awake() is like Start(), but it happens before all start functions. We make 
// all the people in Awake() so that if a script's Start() function tries to
// find a person, that person exists.
function Awake() {
  var person : Person;

  // make the first population-1 people
	for (var i : int = 1; i <= population-initialInfected; i++) {
		person = Instantiate(personPrefab);
    person.name = "Person " + i;
    person.index = i;
    person.health = Health.susceptible;
    person.transform.parent = this.transform;  
	}

// make initialInfected-1 infected people, last infected is the prefab
  for (var j : int = 1; j < initialInfected; j++) {
		person = Instantiate(personPrefab);
    	person.name = "Person " + (i+j-1);
    	person.index = (i+j-1);
    	person.health = Health.infected;
    	person.transform.parent = this.transform;  
	}

// the prefab person turns into the last person

  personPrefab.name = "Person " + (population);
  personPrefab.index = population;
  personPrefab.health = Health.infected;
  personPrefab.transform.parent = this.transform;  
  personPrefab.transform.SetAsLastSibling();

}
