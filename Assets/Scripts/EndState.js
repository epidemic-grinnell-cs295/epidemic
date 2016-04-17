
var totalpopulation : int;
var healthy : int;
var winText	 : UnityEngine.UI.Text;
var clock      : WorldClock;

function Awake () {
	healthy = 0;
	winText.color = UnityEngine.Color.clear;
}

function Update () {
	
}

function LateUpdate () {
	Debug.Log ("Healthy = " + healthy + ", Total = " + totalpopulation);
	if (healthy == totalpopulation && clock.day > 1)
	{
		EndGame();
	}
	else {
		healthy = 0;
	}
}

function EndGame() {
	winText.color = UnityEngine.Color.black;
	//clock.pauseTime(); 
}

function report(health : Health) {
	if (health == Health.susceptible) {
		healthy ++;
	}
	if (health == Health.recovered) {
		healthy ++;
	}
}