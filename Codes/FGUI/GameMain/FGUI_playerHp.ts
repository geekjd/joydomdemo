/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_hpBar from "./FGUI_hpBar";

export default class FGUI_playerHp extends fgui.GComponent {

	public m_Crown:fgui.GImage;
	public m_nameTxt:fgui.GTextField;
	public m_lvlTxt:fgui.GTextField;
	public m_hp:FGUI_hpBar;
	public static URL:string = "ui://kk7g5mmmorqz1aw";

	public static createInstance():FGUI_playerHp {
		return <FGUI_playerHp>(fgui.UIPackage.createObject("GameMain", "playerHp"));
	}

	protected onConstruct():void {
		this.m_Crown = <fgui.GImage>(this.getChildAt(0));
		this.m_nameTxt = <fgui.GTextField>(this.getChildAt(2));
		this.m_lvlTxt = <fgui.GTextField>(this.getChildAt(3));
		this.m_hp = <FGUI_hpBar>(this.getChildAt(4));
	}
}