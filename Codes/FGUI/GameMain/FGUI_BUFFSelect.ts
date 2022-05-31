/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_BUFFInfo from "./FGUI_BUFFInfo";

export default class FGUI_BUFFSelect extends fgui.GComponent {

	public m_bg:fgui.GGraph;
	public m_buffList:fgui.GList;
	public m_info:FGUI_BUFFInfo;
	public static URL:string = "ui://kk7g5mmmn1zd1g2";

	public static createInstance():FGUI_BUFFSelect {
		return <FGUI_BUFFSelect>(fgui.UIPackage.createObject("GameMain", "BUFFSelect"));
	}

	protected onConstruct():void {
		this.m_bg = <fgui.GGraph>(this.getChildAt(0));
		this.m_buffList = <fgui.GList>(this.getChildAt(2));
		this.m_info = <FGUI_BUFFInfo>(this.getChildAt(4));
	}
}