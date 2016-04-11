
var clock    : WorldClock;
var animator : UnityEngine.Animator;

function Start () {
  clock = GameObject.Find("World Clock").GetComponent(WorldClock);
  animator.speed = 3;
}

function Update () {
  if(clock.daySpeed > 1200) {
    animator.speed = 9;
  }
  else if(clock.daySpeed > 0) {
    animator.speed = 3;
  }
  else {
    animator.speed = 0;
  }
}