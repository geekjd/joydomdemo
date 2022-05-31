/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_SelectMode from "./FGUI_SelectMode";

export default class FGUI_SelectModePlan extends fgui.GComponent {

	public m_Mask:fgui.GLoader;
	public m_SelectMode:FGUI_SelectMode;
	public m_Colser:fgui.GButton;
	public m_t0:fgui.Transition;
	public m_t2:fgui.Transition;
	public static URL:string = "ui://kk7g5mmmp6f51d8";

	public static createInstance():FGUI_SelectModePlan {
		return <FGUI_SelectModePlan>(fgui.UIPackage.createObject("GameMain", "SelectModePlan"));
	}

	protected onConstruct():void {
		this.m_Mask = <fgui.GLoader>(this.getChildAt(0));
		this.m_SelectMode = <FGUI_SelectMode>(this.getChildAt(1));
		this.m_Colser = <fgui.GButton>(this.getChildAt(2));
		this.m_t0 = this.getTransitionAt(0);
		this.m_t2 = this.getTransitionAt(1);
	}
}