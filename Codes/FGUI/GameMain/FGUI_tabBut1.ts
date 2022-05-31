/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_tabBut1 extends fgui.GButton {

	public m_bg:fgui.GLoader;
	public m_hightlight:fgui.GButton;
	public m_countBg:fgui.GImage;
	public m_count:fgui.GTextField;
	public m_redPoint:fgui.GLoader;
	public static URL:string = "ui://kk7g5mmms9kj1h1";

	public static createInstance():FGUI_tabBut1 {
		return <FGUI_tabBut1>(fgui.UIPackage.createObject("GameMain", "tabBut1"));
	}

	protected onConstruct():void {
		this.m_bg = <fgui.GLoader>(this.getChildAt(0));
		this.m_hightlight = <fgui.GButton>(this.getChildAt(1));
		this.m_countBg = <fgui.GImage>(this.getChildAt(4));
		this.m_count = <fgui.GTextField>(this.getChildAt(5));
		this.m_redPoint = <fgui.GLoader>(this.getChildAt(7));
	}
}