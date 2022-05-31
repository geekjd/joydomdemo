/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_SetCom extends fgui.GButton {

	public m_ui:fgui.GLoader;
	public static URL:string = "ui://kk7g5mmmp4ua1im";

	public static createInstance():FGUI_SetCom {
		return <FGUI_SetCom>(fgui.UIPackage.createObject("GameMain", "SetCom"));
	}

	protected onConstruct():void {
		this.m_ui = <fgui.GLoader>(this.getChildAt(1));
	}
}