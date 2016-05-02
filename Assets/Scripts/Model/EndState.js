
var totalpopulation : int;
var healthy : int;
var clock      : WorldClock;
var bgSprite : GameObject;
var animatorWin : UnityEngine.Animator;
var animatorLoseMoney : UnityEngine.Animator;
var animatorLoseHappiness : UnityEngine.Animator;

function Awake () {
	healthy = 0;
	animatorWin.speed = 0;
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
	animatorWin.speed = 5;
	bgSprite.GetComponent.<Renderer>().enabled = true;
	Debug.Log("Win Game");

}

function LoseGameMoney() {
	clock.daySpeed = 0;
	bgSprite.GetComponent.<Renderer>().enabled = true;
	Debug.Log("Lose Game Money");
}

function LoseGameHappiness() {
	clock.daySpeed = 0;
	bgSprite.GetComponent.<Renderer>().enabled = true;
	Debug.Log("Lose Game Happiness");
}

function report(health : Health) {
	if (health == Health.susceptible) {
		healthy ++;
	}
	if (health == Health.recovered) {
		healthy ++;
	}
}