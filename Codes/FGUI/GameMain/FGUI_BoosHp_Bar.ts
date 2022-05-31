/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_BoosHp_Bar extends fgui.GProgressBar {

	public m_Bg:fgui.GLoader;
	public m_bar_Yellow:fgui.GProgressBar;
	public m_Name:fgui.GTextField;
	public static URL:string = "ui://kk7g5mmmaajw1n8";

	public static createInstance():FGUI_BoosHp_Bar {
		return <FGUI_BoosHp_Bar>(fgui.UIPackage.createObject("GameMain", "BoosHp_Bar"));
	}

	protected onConstruct():void {
		this.m_Bg = <fgui.GLoader>(this.getChildAt(0));
		this.m_bar_Yellow = <fgui.GProgressBar>(this.getChildAt(1));
		this.m_Name = <fgui.GTextField>(this.getChildAt(4));
	}
}