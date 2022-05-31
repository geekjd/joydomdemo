/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_PropertyItem4 extends fgui.GComponent {

	public m_bgColor:fgui.Controller;
	public m_item_bg1:fgui.GLoader;
	public m_oneNum:fgui.GTextField;
	public m_line:fgui.GLoader;
	public static URL:string = "ui://kk7g5mmmtlx61ec";

	public static createInstance():FGUI_PropertyItem4 {
		return <FGUI_PropertyItem4>(fgui.UIPackage.createObject("GameMain", "PropertyItem4"));
	}

	protected onConstruct():void {
		this.m_bgColor = this.getControllerAt(0);
		this.m_item_bg1 = <fgui.GLoader>(this.getChildAt(0));
		this.m_oneNum = <fgui.GTextField>(this.getChildAt(1));
		this.m_line = <fgui.GLoader>(this.getChildAt(4));
	}
}