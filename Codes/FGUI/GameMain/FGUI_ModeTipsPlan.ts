/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_ModeTips from "./FGUI_ModeTips";

export default class FGUI_ModeTipsPlan extends fgui.GComponent {

	public m_Mask:fgui.GLoader;
	public m_ModeTips:FGUI_ModeTips;
	public m_t0:fgui.Transition;
	public static URL:string = "ui://kk7g5mmmh7p81dc";

	public static createInstance():FGUI_ModeTipsPlan {
		return <FGUI_ModeTipsPlan>(fgui.UIPackage.createObject("GameMain", "ModeTipsPlan"));
	}

	protected onConstruct():void {
		this.m_Mask = <fgui.GLoader>(this.getChildAt(0));
		this.m_ModeTips = <FGUI_ModeTips>(this.getChildAt(1));
		this.m_t0 = this.getTransitionAt(0);
	}
}