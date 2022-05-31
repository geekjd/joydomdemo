/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_getCardCom extends fgui.GComponent {

	public m_vivoUI:fgui.GLoader;
	public static URL:string = "ui://kk7g5mmmfowl1cb";

	public static createInstance():FGUI_getCardCom {
		return <FGUI_getCardCom>(fgui.UIPackage.createObject("GameMain", "getCardCom"));
	}

	protected onConstruct():void {
		this.m_vivoUI = <fgui.GLoader>(this.getChildAt(5));
	}
}