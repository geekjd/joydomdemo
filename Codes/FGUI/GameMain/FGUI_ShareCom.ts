/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_ShareCom extends fgui.GComponent {

	public m_PrizeDes:fgui.GLoader;
	public m_ShareBtnp:fgui.GButton;
	public m_CloseBtn:fgui.GButton;
	public static URL:string = "ui://kk7g5mmmdcjv1ne";

	public static createInstance():FGUI_ShareCom {
		return <FGUI_ShareCom>(fgui.UIPackage.createObject("GameMain", "ShareCom"));
	}

	protected onConstruct():void {
		this.m_PrizeDes = <fgui.GLoader>(this.getChildAt(3));
		this.m_ShareBtnp = <fgui.GButton>(this.getChildAt(4));
		this.m_CloseBtn = <fgui.GButton>(this.getChildAt(5));
	}
}