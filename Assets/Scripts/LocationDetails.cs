using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class LocationDetails : MonoBehaviour {

	private int count;
	public Text countText; 

	// Use this for initialization
	void Start () {
		count = 0;
		SetCountText ();
	}
	
	// Update is called once per frame
	void Update () {
		count = count + 1;
		SetCountText ();
	}

	void SetCountText()
	{ 
		countText.text = "Count: " + count.ToString(); 
	}
}
