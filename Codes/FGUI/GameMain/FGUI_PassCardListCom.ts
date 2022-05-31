/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_rodCom from "./FGUI_rodCom";

export default class FGUI_PassCardListCom extends fgui.GComponent {

	public m_cardList:fgui.GList;
	public m_rod:FGUI_rodCom;
	public static URL:string = "ui://kk7g5mmmnigj1f0";

	public static createInstance():FGUI_PassCardListCom {
		return <FGUI_PassCardListCom>(fgui.UIPackage.createObject("GameMain", "PassCardListCom"));
	}

	protected onConstruct():void {
		this.m_cardList = <fgui.GList>(this.getChildAt(1));
		this.m_rod = <FGUI_rodCom>(this.getChildAt(11));
	}
}