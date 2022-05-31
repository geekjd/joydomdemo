/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_D_refreshDiamond extends fgui.GButton {

	public m_bg:fgui.GLoader;
	public m_countLabel:fgui.GTextField;
	public static URL:string = "ui://kk7g5mmmlqz41fs";

	public static createInstance():FGUI_D_refreshDiamond {
		return <FGUI_D_refreshDiamond>(fgui.UIPackage.createObject("GameMain", "D_refreshDiamond"));
	}

	protected onConstruct():void {
		this.m_bg = <fgui.GLoader>(this.getChildAt(0));
		this.m_countLabel = <fgui.GTextField>(this.getChildAt(4));
	}
}