/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_D_refreshDiamond from "./FGUI_D_refreshDiamond";

export default class FGUI_DiamontemComp extends fgui.GComponent {

	public m_commodityItemList:fgui.GList;
	public m_diaWatchBtn:FGUI_D_refreshDiamond;
	public static URL:string = "ui://kk7g5mmmngfc18b";

	public static createInstance():FGUI_DiamontemComp {
		return <FGUI_DiamontemComp>(fgui.UIPackage.createObject("GameMain", "DiamontemComp"));
	}

	protected onConstruct():void {
		this.m_commodityItemList = <fgui.GList>(this.getChildAt(2));
		this.m_diaWatchBtn = <FGUI_D_refreshDiamond>(this.getChildAt(3));
	}
}