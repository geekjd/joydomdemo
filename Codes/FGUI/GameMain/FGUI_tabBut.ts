/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_tabBut extends fgui.GButton {

	public m_bg:fgui.GLoader;
	public m_hightlight:fgui.GButton;
	public m_countBg:fgui.GImage;
	public m_count:fgui.GTextField;
	public static URL:string = "ui://kk7g5mmmr3dttk";

	public static createInstance():FGUI_tabBut {
		return <FGUI_tabBut>(fgui.UIPackage.createObject("GameMain", "tabBut"));
	}

	protected onConstruct():void {
		this.m_bg = <fgui.GLoader>(this.getChildAt(0));
		this.m_hightlight = <fgui.GButton>(this.getChildAt(2));
		this.m_countBg = <fgui.GImage>(this.getChildAt(5));
		this.m_count = <fgui.GTextField>(this.getChildAt(6));
	}
}