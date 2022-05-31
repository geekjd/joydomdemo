/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_refreshBtn extends fgui.GButton {

	public m_bg:fgui.GLoader;
	public m_vivoUI:fgui.GLoader;
	public static URL:string = "ui://kk7g5mmmq21s188";

	public static createInstance():FGUI_refreshBtn {
		return <FGUI_refreshBtn>(fgui.UIPackage.createObject("GameMain", "refreshBtn"));
	}

	protected onConstruct():void {
		this.m_bg = <fgui.GLoader>(this.getChildAt(1));
		this.m_vivoUI = <fgui.GLoader>(this.getChildAt(3));
	}
}