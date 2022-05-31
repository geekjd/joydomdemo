/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_lingQuBtn extends fgui.GComponent {

	public m_button:fgui.Controller;
	public static URL:string = "ui://kk7g5mmmxo4z1bj";

	public static createInstance():FGUI_lingQuBtn {
		return <FGUI_lingQuBtn>(fgui.UIPackage.createObject("GameMain", "lingQuBtn"));
	}

	protected onConstruct():void {
		this.m_button = this.getControllerAt(0);
	}
}