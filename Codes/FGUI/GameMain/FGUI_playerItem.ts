/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_hpBar from "./FGUI_hpBar";

export default class FGUI_playerItem extends fgui.GComponent {

	public m_state:fgui.Controller;
	public m_nameTxt:fgui.GTextField;
	public m_XX:fgui.GTextField;
	public m_hp:FGUI_hpBar;
	public m_experienceTxt:fgui.GTextField;
	public static URL:string = "ui://kk7g5mmme7q21an";

	public static createInstance():FGUI_playerItem {
		return <FGUI_playerItem>(fgui.UIPackage.createObject("GameMain", "playerItem"));
	}

	protected onConstruct():void {
		this.m_state = this.getControllerAt(0);
		this.m_nameTxt = <fgui.GTextField>(this.getChildAt(1));
		this.m_XX = <fgui.GTextField>(this.getChildAt(2));
		this.m_hp = <FGUI_hpBar>(this.getChildAt(3));
		this.m_experienceTxt = <fgui.GTextField>(this.getChildAt(7));
	}
}