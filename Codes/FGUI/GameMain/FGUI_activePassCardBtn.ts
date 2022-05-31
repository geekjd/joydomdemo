/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_activePassCardBtn extends fgui.GButton {

	public m_c1:fgui.Controller;
	public static URL:string = "ui://kk7g5mmmxo4z1br";

	public static createInstance():FGUI_activePassCardBtn {
		return <FGUI_activePassCardBtn>(fgui.UIPackage.createObject("GameMain", "activePassCardBtn"));
	}

	protected onConstruct():void {
		this.m_c1 = this.getControllerAt(0);
	}
}