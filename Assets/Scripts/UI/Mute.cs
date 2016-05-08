using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class Mute : MonoBehaviour {

	public AudioSource BGM;
	public Toggle toggle;

	public void mute () {
		if (toggle.isOn) {
			BGM.mute = true;
		} else {
			BGM.mute = false;
		}
	}
}
