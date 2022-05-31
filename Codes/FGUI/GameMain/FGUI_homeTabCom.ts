/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_tabBut from "./FGUI_tabBut";
import FGUI_tabBut1 from "./FGUI_tabBut1";

export default class FGUI_homeTabCom extends fgui.GComponent {

	public m_c1:fgui.Controller;
	public m_shopBtn:FGUI_tabBut;
	public m_hunterBtn:FGUI_tabBut;
	public m_homeBtn:FGUI_tabBut;
	public m_ActionBtn:FGUI_tabBut1;
	public m_clanBtn:FGUI_tabBut;
	public static URL:string = "ui://kk7g5mmmbsf4180";

	public static createInstance():FGUI_homeTabCom {
		return <FGUI_homeTabCom>(fgui.UIPackage.createObject("GameMain", "homeTabCom"));
	}

	protected onConstruct():void {
		this.m_c1 = this.getControllerAt(0);
		this.m_shopBtn = <FGUI_tabBut>(this.getChildAt(2));
		this.m_hunterBtn = <FGUI_tabBut>(this.getChildAt(3));
		this.m_homeBtn = <FGUI_tabBut>(this.getChildAt(4));
		this.m_ActionBtn = <FGUI_tabBut1>(this.getChildAt(5));
		this.m_clanBtn = <FGUI_tabBut>(this.getChildAt(6));
	}
}