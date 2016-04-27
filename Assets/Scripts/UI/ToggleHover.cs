using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class ToggleHover : MonoBehaviour {

	public GameObject newSprite;
	private Vector3 currentSpritePosition;
	public Text text;
	public Text hideText;
	public GameObject hideSprite;
	public string popupText;

	// Use this for initialization
	void Start () {
		newSprite.GetComponent<Renderer> ().enabled = false;
	}

	// Update is called once per frame
	void Update () {

	}

	public void Enter () {
		Debug.Log ("Hovering over now");
		newSprite.GetComponent<Renderer>().enabled = true;
		text.text = popupText;
		hideText.enabled = false;
		hideSprite.GetComponent<Renderer> ().enabled = false;
	}
	public void Exit () {
		Debug.Log ("Not hovering");
		newSprite.GetComponent<Renderer> ().enabled = false;
		text.text = "";
		hideText.enabled = true;
		hideSprite.GetComponent<Renderer> ().enabled = true;
	}
}
