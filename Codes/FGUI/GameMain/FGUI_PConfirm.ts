/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_confirmBoardCom from "./FGUI_confirmBoardCom";

export default class FGUI_PConfirm extends fgui.GComponent {

	public m_confirmBoard:FGUI_confirmBoardCom;
	public static URL:string = "ui://kk7g5mmmfowl1cf";

	public static createInstance():FGUI_PConfirm {
		return <FGUI_PConfirm>(fgui.UIPackage.createObject("GameMain", "PConfirm"));
	}

	protected onConstruct():void {
		this.m_confirmBoard = <FGUI_confirmBoardCom>(this.getChildAt(1));
	}
}