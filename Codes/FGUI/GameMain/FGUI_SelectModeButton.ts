/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_SelectModeButton extends fgui.GButton {

	public m_TipsTxt:fgui.GTextField;
	public m_t0:fgui.Transition;
	public static URL:string = "ui://kk7g5mmmp6f51da";

	public static createInstance():FGUI_SelectModeButton {
		return <FGUI_SelectModeButton>(fgui.UIPackage.createObject("GameMain", "SelectModeButton"));
	}

	protected onConstruct():void {
		this.m_TipsTxt = <fgui.GTextField>(this.getChildAt(2));
		this.m_t0 = this.getTransitionAt(0);
	}
}