using UnityEngine;
using System.Collections;
using UnityEngine.EventSystems;  
using UnityEngine.UI;

public class MouseHover : MonoBehaviour, IPointerEnterHandler, IPointerExitHandler  {

	public Text myText;

	public void OnPointerEnter(PointerEventData eventData)
	{
		myText.color = new Color(0F,0.74F,0.84F,1F);
	}

	public void OnPointerExit(PointerEventData eventData)
	{
		myText.color = new Color(0.18F,0.18F,0.18F,1F);
	}

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
