/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_D_refreshGold from "./FGUI_D_refreshGold";

export default class FGUI_GoldComp extends fgui.GComponent {

	public m_goldListItem:fgui.GList;
	public m_goldWatchBtn:FGUI_D_refreshGold;
	public static URL:string = "ui://kk7g5mmmngfc18g";

	public static createInstance():FGUI_GoldComp {
		return <FGUI_GoldComp>(fgui.UIPackage.createObject("GameMain", "GoldComp"));
	}

	protected onConstruct():void {
		this.m_goldListItem = <fgui.GList>(this.getChildAt(1));
		this.m_goldWatchBtn = <FGUI_D_refreshGold>(this.getChildAt(2));
	}
}