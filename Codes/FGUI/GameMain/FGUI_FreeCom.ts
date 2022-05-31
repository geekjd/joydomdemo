/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_FreeCom extends fgui.GButton {

	public m_bg0:fgui.GLoader;
	public m_redPoint:fgui.GLoader;
	public m_bounce:fgui.Transition;
	public static URL:string = "ui://kk7g5mmmr3dtto";

	public static createInstance():FGUI_FreeCom {
		return <FGUI_FreeCom>(fgui.UIPackage.createObject("GameMain", "FreeCom"));
	}

	protected onConstruct():void {
		this.m_bg0 = <fgui.GLoader>(this.getChildAt(0));
		this.m_redPoint = <fgui.GLoader>(this.getChildAt(4));
		this.m_bounce = this.getTransitionAt(0);
	}
}