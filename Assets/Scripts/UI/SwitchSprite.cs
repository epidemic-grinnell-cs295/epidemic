using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class SwitchSprite : MonoBehaviour {


	public Sprite muteSprite;
	public Sprite unmuteSprite;
	public bool muted;
	public AudioSource BGM;
	public Button button;

	// Use this for initialization
	void Start () {
		button = GetComponent<Button>();
		muted = false;
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	public void OnClick () {
		if (muted == false) {
			button.image.sprite = muteSprite;
			muted = true;
			BGM.Pause();
		}
		if (muted == true) {
			button.image.sprite = unmuteSprite;
			muted = false;
			BGM.UnPause();
		}
	}
}
