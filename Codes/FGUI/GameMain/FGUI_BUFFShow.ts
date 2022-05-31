/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_BUFFInfo from "./FGUI_BUFFInfo";

export default class FGUI_BUFFShow extends fgui.GComponent {

	public m_bg:fgui.GLoader;
	public m_bg2:fgui.GLoader;
	public m_buffList:fgui.GList;
	public m_info:FGUI_BUFFInfo;
	public static URL:string = "ui://kk7g5mmmn1zd1g0";

	public static createInstance():FGUI_BUFFShow {
		return <FGUI_BUFFShow>(fgui.UIPackage.createObject("GameMain", "BUFFShow"));
	}

	protected onConstruct():void {
		this.m_bg = <fgui.GLoader>(this.getChildAt(0));
		this.m_bg2 = <fgui.GLoader>(this.getChildAt(1));
		this.m_buffList = <fgui.GList>(this.getChildAt(3));
		this.m_info = <FGUI_BUFFInfo>(this.getChildAt(5));
	}
}