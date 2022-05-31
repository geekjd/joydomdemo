/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_BeginButton extends fgui.GButton {

	public m_lab_num:fgui.GTextField;
	public static URL:string = "ui://kk7g5mmmk2ej1rm";

	public static createInstance():FGUI_BeginButton {
		return <FGUI_BeginButton>(fgui.UIPackage.createObject("GameMain", "BeginButton"));
	}

	protected onConstruct():void {
		this.m_lab_num = <fgui.GTextField>(this.getChildAt(3));
	}
}