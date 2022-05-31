/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_GoldTicket extends fgui.GComponent {

	public m_mask:fgui.GImage;
	public static URL:string = "ui://kk7g5mmmnigj1et";

	public static createInstance():FGUI_GoldTicket {
		return <FGUI_GoldTicket>(fgui.UIPackage.createObject("GameMain", "GoldTicket"));
	}

	protected onConstruct():void {
		this.m_mask = <fgui.GImage>(this.getChildAt(2));
	}
}