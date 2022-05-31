/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_levelProgressBar extends fgui.GProgressBar {

	public m_LevleTxt:fgui.GTextField;
	public static URL:string = "ui://kk7g5mmmorqz1aq";

	public static createInstance():FGUI_levelProgressBar {
		return <FGUI_levelProgressBar>(fgui.UIPackage.createObject("GameMain", "levelProgressBar"));
	}

	protected onConstruct():void {
		this.m_LevleTxt = <fgui.GTextField>(this.getChildAt(2));
	}
}