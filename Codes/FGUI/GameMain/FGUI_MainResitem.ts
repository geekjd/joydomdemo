/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_MainResitem extends fgui.GButton {

	public m_bg:fgui.GLoader;
	public m_AddBtn:fgui.GButton;
	public m_redpoint:fgui.GLoader;
	public static URL:string = "ui://kk7g5mmmr3dt16q";

	public static createInstance():FGUI_MainResitem {
		return <FGUI_MainResitem>(fgui.UIPackage.createObject("GameMain", "MainResitem"));
	}

	protected onConstruct():void {
		this.m_bg = <fgui.GLoader>(this.getChildAt(0));
		this.m_AddBtn = <fgui.GButton>(this.getChildAt(2));
		this.m_redpoint = <fgui.GLoader>(this.getChildAt(4));
	}
}