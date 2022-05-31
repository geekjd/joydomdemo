/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_SilverTicket extends fgui.GComponent {

	public m_mask:fgui.GImage;
	public static URL:string = "ui://kk7g5mmmnigj1eu";

	public static createInstance():FGUI_SilverTicket {
		return <FGUI_SilverTicket>(fgui.UIPackage.createObject("GameMain", "SilverTicket"));
	}

	protected onConstruct():void {
		this.m_mask = <fgui.GImage>(this.getChildAt(2));
	}
}