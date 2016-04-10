
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
  	healthy = home.susceptible + home.recovered + sleep.susceptible + sleep.recovered;
    sick = home.infected + sleep.infected;
  }
  else {
    healthy = home.susceptible + home.recovered;
    sick = home.infected;
  }
  healthyText.text = String.Format("{0}", healthy);
  sickText.text = String.Format("{0}", sick);
}