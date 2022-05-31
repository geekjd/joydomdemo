/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_RoundHalfImg extends fgui.GComponent {

	public m_icon:fgui.GLoader;
	public m_mask:fgui.GImage;
	public static URL:string = "ui://kk7g5mmmlqz41fm";

	public static createInstance():FGUI_RoundHalfImg {
		return <FGUI_RoundHalfImg>(fgui.UIPackage.createObject("GameMain", "RoundHalfImg"));
	}

	protected onConstruct():void {
		this.m_icon = <fgui.GLoader>(this.getChildAt(0));
		this.m_mask = <fgui.GImage>(this.getChildAt(1));
	}
}