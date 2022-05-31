/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_GoonGame extends fgui.GComponent {

	public m_leftTime:fgui.GTextField;
	public m_cancelBtn:fgui.GButton;
	public m_goBtn:fgui.GButton;
	public static URL:string = "ui://kk7g5mmmosvk1hc";

	public static createInstance():FGUI_GoonGame {
		return <FGUI_GoonGame>(fgui.UIPackage.createObject("GameMain", "GoonGame"));
	}

	protected onConstruct():void {
		this.m_leftTime = <fgui.GTextField>(this.getChildAt(4));
		this.m_cancelBtn = <fgui.GButton>(this.getChildAt(5));
		this.m_goBtn = <fgui.GButton>(this.getChildAt(6));
	}
}