/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_getCardCom from "./FGUI_getCardCom";

export default class FGUI_getCardBoardCom extends fgui.GComponent {

	public m_playVedio:FGUI_getCardCom;
	public m_payGem:fgui.GComponent;
	public m_txt1:fgui.GTextField;
	public m_closeBtn:fgui.GButton;
	public static URL:string = "ui://kk7g5mmmfowl1ce";

	public static createInstance():FGUI_getCardBoardCom {
		return <FGUI_getCardBoardCom>(fgui.UIPackage.createObject("GameMain", "getCardBoardCom"));
	}

	protected onConstruct():void {
		this.m_playVedio = <FGUI_getCardCom>(this.getChildAt(2));
		this.m_payGem = <fgui.GComponent>(this.getChildAt(3));
		this.m_txt1 = <fgui.GTextField>(this.getChildAt(4));
		this.m_closeBtn = <fgui.GButton>(this.getChildAt(5));
	}
}