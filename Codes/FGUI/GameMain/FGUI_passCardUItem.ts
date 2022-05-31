/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_passCardPlusItem from "./FGUI_passCardPlusItem";
import FGUI_passCardFreeItem from "./FGUI_passCardFreeItem";

export default class FGUI_passCardUItem extends fgui.GComponent {

	public m_plus:FGUI_passCardPlusItem;
	public m_free:FGUI_passCardFreeItem;
	public m_lvbg:fgui.GImage;
	public m_cardLvTxt:fgui.GTextField;
	public static URL:string = "ui://kk7g5mmmau8i1bg";

	public static createInstance():FGUI_passCardUItem {
		return <FGUI_passCardUItem>(fgui.UIPackage.createObject("GameMain", "passCardUItem"));
	}

	protected onConstruct():void {
		this.m_plus = <FGUI_passCardPlusItem>(this.getChildAt(1));
		this.m_free = <FGUI_passCardFreeItem>(this.getChildAt(3));
		this.m_lvbg = <fgui.GImage>(this.getChildAt(4));
		this.m_cardLvTxt = <fgui.GTextField>(this.getChildAt(5));
	}
}