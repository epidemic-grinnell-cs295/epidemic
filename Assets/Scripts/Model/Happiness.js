var slider : UnityEngine.UI.Slider;
var happiness : int;

function Start () {
	happiness = 100;
	slider.value = happiness;
}

function Update () {
	slider.value = happiness;
}