
var amount : float;
var MyFont : Font;
var moneyText : UnityEngine.UI.Text;

function Start () {
	amount = 20000.00;
	moneyText.text = "$" + amount;
}

function Update () {
	moneyText.text = "$" + amount;
}