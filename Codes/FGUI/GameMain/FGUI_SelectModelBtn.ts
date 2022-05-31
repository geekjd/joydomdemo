/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_SelectModelBtn extends fgui.GButton {

	public m_bg:fgui.GImage;
	public static URL:string = "ui://kk7g5mmmtlx61ef";

	public static createInstance():FGUI_SelectModelBtn {
		return <FGUI_SelectModelBtn>(fgui.UIPackage.createObject("GameMain", "SelectModelBtn"));
	}

	protected onConstruct():void {
		this.m_bg = <fgui.GImage>(this.getChildAt(0));
	}
}