/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_D_refreshGold extends fgui.GButton {

	public m_bg:fgui.GLoader;
	public m_countLabel:fgui.GTextField;
	public static URL:string = "ui://kk7g5mmmlqz41ft";

	public static createInstance():FGUI_D_refreshGold {
		return <FGUI_D_refreshGold>(fgui.UIPackage.createObject("GameMain", "D_refreshGold"));
	}

	protected onConstruct():void {
		this.m_bg = <fgui.GLoader>(this.getChildAt(0));
		this.m_countLabel = <fgui.GTextField>(this.getChildAt(4));
	}
}