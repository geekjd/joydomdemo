/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_activePassCardBtn from "./FGUI_activePassCardBtn";
import FGUI_seasonCom from "./FGUI_seasonCom";

export default class FGUI_PPassCardTop extends fgui.GComponent {

	public m_topBg:fgui.GLoader;
	public m_txt1:fgui.GTextField;
	public m_seasonNum:fgui.GTextField;
	public m_activeBtn:FGUI_activePassCardBtn;
	public m_yijiesuo:FGUI_activePassCardBtn;
	public m_season:FGUI_seasonCom;
	public static URL:string = "ui://kk7g5mmmxo4z1bt";

	public static createInstance():FGUI_PPassCardTop {
		return <FGUI_PPassCardTop>(fgui.UIPackage.createObject("GameMain", "PPassCardTop"));
	}

	protected onConstruct():void {
		this.m_topBg = <fgui.GLoader>(this.getChildAt(0));
		this.m_txt1 = <fgui.GTextField>(this.getChildAt(2));
		this.m_seasonNum = <fgui.GTextField>(this.getChildAt(3));
		this.m_activeBtn = <FGUI_activePassCardBtn>(this.getChildAt(4));
		this.m_yijiesuo = <FGUI_activePassCardBtn>(this.getChildAt(5));
		this.m_season = <FGUI_seasonCom>(this.getChildAt(6));
	}
}