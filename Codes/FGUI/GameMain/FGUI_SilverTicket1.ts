/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_SilverTicket1 extends fgui.GComponent {

	public m_light:fgui.Transition;
	public static URL:string = "ui://kk7g5mmmnigj1f5";

	public static createInstance():FGUI_SilverTicket1 {
		return <FGUI_SilverTicket1>(fgui.UIPackage.createObject("GameMain", "SilverTicket1"));
	}

	protected onConstruct():void {
		this.m_light = this.getTransitionAt(0);
	}
}