/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_PassComp extends fgui.GButton {

	public m_Barbar:fgui.GProgressBar;
	public m_upgradeRate:fgui.GTextField;
	public m_Coin:fgui.GLoader;
	public m_bg3:fgui.GLoader;
	public m_Num:fgui.GTextField;
	public static URL:string = "ui://kk7g5mmmr3dttp";

	public static createInstance():FGUI_PassComp {
		return <FGUI_PassComp>(fgui.UIPackage.createObject("GameMain", "PassComp"));
	}

	protected onConstruct():void {
		this.m_Barbar = <fgui.GProgressBar>(this.getChildAt(2));
		this.m_upgradeRate = <fgui.GTextField>(this.getChildAt(3));
		this.m_Coin = <fgui.GLoader>(this.getChildAt(4));
		this.m_bg3 = <fgui.GLoader>(this.getChildAt(5));
		this.m_Num = <fgui.GTextField>(this.getChildAt(6));
	}
}