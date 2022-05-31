/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_ButItemOne extends fgui.GButton {

	public m_c1:fgui.Controller;
	public m_oriange:fgui.GLoader;
	public m_yellow:fgui.GLoader;
	public m_blue:fgui.GLoader;
	public static URL:string = "ui://kk7g5mmmjfzj1ou";

	public static createInstance():FGUI_ButItemOne {
		return <FGUI_ButItemOne>(fgui.UIPackage.createObject("GameMain", "ButItemOne"));
	}

	protected onConstruct():void {
		this.m_c1 = this.getControllerAt(0);
		this.m_oriange = <fgui.GLoader>(this.getChildAt(0));
		this.m_yellow = <fgui.GLoader>(this.getChildAt(1));
		this.m_blue = <fgui.GLoader>(this.getChildAt(2));
	}
}