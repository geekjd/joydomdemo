/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_confirmBoardCom extends fgui.GComponent {

	public m_btnYes:fgui.GButton;
	public m_btnNo:fgui.GButton;
	public static URL:string = "ui://kk7g5mmmfowl1ci";

	public static createInstance():FGUI_confirmBoardCom {
		return <FGUI_confirmBoardCom>(fgui.UIPackage.createObject("GameMain", "confirmBoardCom"));
	}

	protected onConstruct():void {
		this.m_btnYes = <fgui.GButton>(this.getChildAt(4));
		this.m_btnNo = <fgui.GButton>(this.getChildAt(5));
	}
}