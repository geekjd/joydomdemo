/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_foreverItem extends fgui.GComponent {

	public m_state:fgui.Controller;
	public m_icon:fgui.GLoader;
	public m_lv:fgui.GTextField;
	public static URL:string = "ui://kk7g5mmmngfc18o";

	public static createInstance():FGUI_foreverItem {
		return <FGUI_foreverItem>(fgui.UIPackage.createObject("GameMain", "foreverItem"));
	}

	protected onConstruct():void {
		this.m_state = this.getControllerAt(0);
		this.m_icon = <fgui.GLoader>(this.getChildAt(2));
		this.m_lv = <fgui.GTextField>(this.getChildAt(4));
	}
}