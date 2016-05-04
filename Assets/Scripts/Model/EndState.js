
var totalpopulation : int;
var healthy : int;
var clock      : WorldClock;
var bgSprite : GameObject;
var animatorWin : GameObject;
var animatorLoseMoney : GameObject;
var animatorLoseHappiness : GameObject;

function Awake () {
	healthy = 0;
	animatorWin.GetComponent.<Renderer>().enabled = false;
	animatorWin.GetComponent.<Animator>().speed = 0;
	animatorLoseMoney.GetComponent.<Renderer>().enabled = false;
	animatorLoseMoney.GetComponent.<Animator>().speed = 0;
	animatorLoseHappiness.GetComponent.<Renderer>().enabled = false;
	animatorLoseHappiness.GetComponent.<Animator>().speed = 0;
	bgSprite.GetComponent.<Renderer>().enabled = false;
}

function Start () {
	
}

function Update () {
	
}

function LateUpdate () {
	//Debug.Log ("Healthy = " + healthy + ", Total = " + totalpopulation);
	if (healthy == totalpopulation )
	{
		WinGame();
	}
	healthy = 0;
}

function WinGame() {
	clock.daySpeed = 0;
	animatorWin.GetComponent.<Renderer>().enabled = true;
	animatorWin.GetComponent.<Animator>().speed = 5;
	bgSprite.GetComponent.<Renderer>().enabled = true;

}

function LoseGameMoney() {
	clock.daySpeed = 0;
	animatorLoseMoney.GetComponent.<Renderer>().enabled = true;
	animatorLoseMoney.GetComponent.<Animator>().speed = 5;
	bgSprite.GetComponent.<Renderer>().enabled = true;
}

function LoseGameHappiness() {
	clock.daySpeed = 0;
	animatorLoseHappiness.GetComponent.<Renderer>().enabled = true;
	animatorLoseHappiness.GetComponent.<Animator>().speed = 5;
	bgSprite.GetComponent.<Renderer>().enabled = true;
}

function report(health : Health) {
	if (health == Health.susceptible) {
		healthy ++;
	}
	if (health == Health.recovered) {
		healthy ++;
	}
}