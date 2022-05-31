/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_TicketLight extends fgui.GComponent {

	public m_light:fgui.Transition;
	public static URL:string = "ui://kk7g5mmmnigj1ev";

	public static createInstance():FGUI_TicketLight {
		return <FGUI_TicketLight>(fgui.UIPackage.createObject("GameMain", "TicketLight"));
	}

	protected onConstruct():void {
		this.m_light = this.getTransitionAt(0);
	}
}