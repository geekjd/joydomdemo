/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_refreshBtn from "./FGUI_refreshBtn";

export default class FGUI_EverydayDiscountComp extends fgui.GComponent {

	public m_timeLabel:fgui.GTextField;
	public m_EverydayDiscountList:fgui.GList;
	public m_refreshBtn:FGUI_refreshBtn;
	public static URL:string = "ui://kk7g5mmmq21s186";

	public static createInstance():FGUI_EverydayDiscountComp {
		return <FGUI_EverydayDiscountComp>(fgui.UIPackage.createObject("GameMain", "EverydayDiscountComp"));
	}

	protected onConstruct():void {
		this.m_timeLabel = <fgui.GTextField>(this.getChildAt(4));
		this.m_EverydayDiscountList = <fgui.GList>(this.getChildAt(5));
		this.m_refreshBtn = <FGUI_refreshBtn>(this.getChildAt(6));
	}
}