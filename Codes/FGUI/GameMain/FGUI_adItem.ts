/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_adProgressBar from "./FGUI_adProgressBar";

export default class FGUI_adItem extends fgui.GButton {

	public m_State:fgui.Controller;
	public m_adProgress:FGUI_adProgressBar;
	public m_getBtn:fgui.GButton;
	public m_taskCompleteTxt:fgui.GTextField;
	public m_b32:fgui.GLoader;
	public m_adImg:fgui.GLoader;
	public m_vivoUI:fgui.GLoader;
	public static URL:string = "ui://kk7g5mmmorqz1ba";

	public static createInstance():FGUI_adItem {
		return <FGUI_adItem>(fgui.UIPackage.createObject("GameMain", "adItem"));
	}

	protected onConstruct():void {
		this.m_State = this.getControllerAt(0);
		this.m_adProgress = <FGUI_adProgressBar>(this.getChildAt(1));
		this.m_getBtn = <fgui.GButton>(this.getChildAt(3));
		this.m_taskCompleteTxt = <fgui.GTextField>(this.getChildAt(4));
		this.m_b32 = <fgui.GLoader>(this.getChildAt(5));
		this.m_adImg = <fgui.GLoader>(this.getChildAt(6));
		this.m_vivoUI = <fgui.GLoader>(this.getChildAt(8));
	}
}