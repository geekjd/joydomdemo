/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_passCardVideoBtn extends fgui.GButton {

	public m_bg:fgui.GLoader;
	public m_vivoUI:fgui.GLoader;
	public static URL:string = "ui://kk7g5mmmxo4z1c6";

	public static createInstance():FGUI_passCardVideoBtn {
		return <FGUI_passCardVideoBtn>(fgui.UIPackage.createObject("GameMain", "passCardVideoBtn"));
	}

	protected onConstruct():void {
		this.m_bg = <fgui.GLoader>(this.getChildAt(0));
		this.m_vivoUI = <fgui.GLoader>(this.getChildAt(2));
	}
}