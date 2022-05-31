/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_toggleBtn extends fgui.GButton {

	public m_IsOpen:fgui.Controller;
	public m_trueBtn:fgui.GLoader;
	public m_falseBtn:fgui.GLoader;
	public static URL:string = "ui://kk7g5mmmxfev1ah";

	public static createInstance():FGUI_toggleBtn {
		return <FGUI_toggleBtn>(fgui.UIPackage.createObject("GameMain", "toggleBtn"));
	}

	protected onConstruct():void {
		this.m_IsOpen = this.getControllerAt(0);
		this.m_trueBtn = <fgui.GLoader>(this.getChildAt(1));
		this.m_falseBtn = <fgui.GLoader>(this.getChildAt(3));
	}
}