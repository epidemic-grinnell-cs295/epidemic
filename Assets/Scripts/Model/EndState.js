
var totalpopulation : int;
var healthy : int;
var winText	 : UnityEngine.UI.Text;
var clock      : WorldClock;
var bgSprite : Sprite;
var animator : UnityEngine.Animator;

function Awake () {
	healthy = 0;
	winText.color = UnityEngine.Color.clear;
	animator.speed = 0;
	//bgSprite.enabled = false;
}

function Start () {
	
}

function Update () {
	
}

function LateUpdate () {
	//Debug.Log ("Healthy = " + healthy + ", Total = " + totalpopulation);
	if (healthy == totalpopulation )
	{
		EndGame();
	}
	healthy = 0;
}

function EndGame() {
	clock.daySpeed = 0;
	animator.speed = 5;
	//bgSprite.enabled = true;

}

function report(health : Health) {
	if (health == Health.susceptible) {
		healthy ++;
	}
	if (health == Health.recovered) {
		healthy ++;
	}
}