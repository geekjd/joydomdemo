/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_HuntBtn extends fgui.GButton {

	public m_bg:fgui.GLoader;
	public static URL:string = "ui://kk7g5mmmp4ua1j7";

	public static createInstance():FGUI_HuntBtn {
		return <FGUI_HuntBtn>(fgui.UIPackage.createObject("GameMain", "HuntBtn"));
	}

	protected onConstruct():void {
		this.m_bg = <fgui.GLoader>(this.getChildAt(0));
	}
}