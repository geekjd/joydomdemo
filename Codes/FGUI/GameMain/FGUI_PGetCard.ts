/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_getCardBoardCom from "./FGUI_getCardBoardCom";

export default class FGUI_PGetCard extends fgui.GComponent {

	public m_getCardBoard:FGUI_getCardBoardCom;
	public static URL:string = "ui://kk7g5mmmfowl1c9";

	public static createInstance():FGUI_PGetCard {
		return <FGUI_PGetCard>(fgui.UIPackage.createObject("GameMain", "PGetCard"));
	}

	protected onConstruct():void {
		this.m_getCardBoard = <FGUI_getCardBoardCom>(this.getChildAt(1));
	}
}