/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_hpBar extends fgui.GProgressBar {

	public m_HPNum:fgui.GTextField;
	public static URL:string = "ui://kk7g5mmmorqz1av";

	public static createInstance():FGUI_hpBar {
		return <FGUI_hpBar>(fgui.UIPackage.createObject("GameMain", "hpBar"));
	}

	protected onConstruct():void {
		this.m_HPNum = <fgui.GTextField>(this.getChildAt(2));
	}
}