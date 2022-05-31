/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_adProgressBar extends fgui.GProgressBar {

	public m_ratio:fgui.GTextField;
	public static URL:string = "ui://kk7g5mmmorqz1bb";

	public static createInstance():FGUI_adProgressBar {
		return <FGUI_adProgressBar>(fgui.UIPackage.createObject("GameMain", "adProgressBar"));
	}

	protected onConstruct():void {
		this.m_ratio = <fgui.GTextField>(this.getChildAt(2));
	}
}