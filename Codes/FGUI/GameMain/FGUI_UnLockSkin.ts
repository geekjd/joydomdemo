/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_UnLockSkin extends fgui.GComponent {

	public m_btnYes:fgui.GButton;
	public m_btnNo:fgui.GButton;
	public static URL:string = "ui://kk7g5mmmjogg1gt";

	public static createInstance():FGUI_UnLockSkin {
		return <FGUI_UnLockSkin>(fgui.UIPackage.createObject("GameMain", "UnLockSkin"));
	}

	protected onConstruct():void {
		this.m_btnYes = <fgui.GButton>(this.getChildAt(4));
		this.m_btnNo = <fgui.GButton>(this.getChildAt(5));
	}
}