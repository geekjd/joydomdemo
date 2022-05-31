/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_RoundImg extends fgui.GComponent {

	public m_icon:fgui.GLoader;
	public m_mask:fgui.GImage;
	public static URL:string = "ui://kk7g5mmmt2q71fe";

	public static createInstance():FGUI_RoundImg {
		return <FGUI_RoundImg>(fgui.UIPackage.createObject("GameMain", "RoundImg"));
	}

	protected onConstruct():void {
		this.m_icon = <fgui.GLoader>(this.getChildAt(0));
		this.m_mask = <fgui.GImage>(this.getChildAt(1));
	}
}