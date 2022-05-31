/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_GameBoxconfirm extends fgui.GComponent {

	public m_okBtn:fgui.GButton;
	public m_cancelBtn:fgui.GButton;
	public static URL:string = "ui://kk7g5mmmwzbk1h7";

	public static createInstance():FGUI_GameBoxconfirm {
		return <FGUI_GameBoxconfirm>(fgui.UIPackage.createObject("GameMain", "GameBoxconfirm"));
	}

	protected onConstruct():void {
		this.m_okBtn = <fgui.GButton>(this.getChildAt(5));
		this.m_cancelBtn = <fgui.GButton>(this.getChildAt(6));
	}
}