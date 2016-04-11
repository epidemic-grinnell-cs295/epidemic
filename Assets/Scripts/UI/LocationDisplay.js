
var home : Location;
var sleep : Location;

var healthyStr : String;
var sickStr    : String;

var healthyText : UnityEngine.UI.Text;
var sickText : UnityEngine.UI.Text;

function Start () {
  healthyText.text = "0";
  sickText.text = "0";
}

function Update () {
  var healthy : int;
  var sick : int;
  if(sleep) {
    sick = home.infected + sleep.infected;
    healthy = home.population + sleep.population - sick;
  }
  else {
    sick = home.infected;
    healthy = home.population - sick;
  }
  healthyText.text = String.Format("{0}", healthy);
  sickText.text = String.Format("{0}", sick);
}