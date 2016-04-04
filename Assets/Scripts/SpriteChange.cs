using UnityEngine;
using System.Collections;
using UnityEngine.EventSystems;  
using UnityEngine.UI;
//, IPointerEnterHandler, IPointerExitHandler

public class SpriteChange : MonoBehaviour  {

	//public Sprite newSprite;
	//public Sprite oldSprite;
	public GameObject newObj;
	private Vector3 currentSpritePosition;

	//public void OnPointerEnter(PointerEventData eventData)
	//{
	//	GetComponent<SpriteRenderer>().sprite = newSprite;
	//}

	//public void OnPointerExit(PointerEventData eventData)
	//{
	//	GetComponent<SpriteRenderer>().sprite = oldSprite;
	//}

	void OnMouseEnter(){
		//getting the current position of the current sprite if ever it can move;
		currentSpritePosition = transform.position;

		//then make it invisible
		GetComponent<SpriteRenderer>().enabled = false;

		//give the new sprite the position of the latter
		newObj.transform.position = currentSpritePosition;

		//then make it visible
		newObj.GetComponent<SpriteRenderer>().enabled = true;
	}

	void OnMouseExit(){
		//just the reverse process
		GetComponent<SpriteRenderer>().enabled = true;
		newObj.GetComponent<SpriteRenderer>().enabled = false;
	}

	// Use this for initialization
	void Start () {

	}

	// Update is called once per frame
	void Update () {

	}
}
