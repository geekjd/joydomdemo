/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_GoldTicket1 extends fgui.GComponent {

	public m_light:fgui.Transition;
	public static URL:string = "ui://kk7g5mmmzbsj1f8";

	public static createInstance():FGUI_GoldTicket1 {
		return <FGUI_GoldTicket1>(fgui.UIPackage.createObject("GameMain", "GoldTicket1"));
	}

	protected onConstruct():void {
		this.m_light = this.getTransitionAt(0);
	}
}