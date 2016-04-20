using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class Mute : MonoBehaviour {

	bool muted;
	public AudioSource BGM;
	public Toggle toggle;

	// Use this for initialization
	void Start () {
		muted = false;
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	public void mute () {
		if (toggle.isOn) {
			BGM.mute = true;
		} else {
			BGM.mute = false;
		}
	}
}
