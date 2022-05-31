/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_PropertyItem2 extends fgui.GComponent {

	public m_bgColor:fgui.Controller;
	public m_item_bg1:fgui.GLoader;
	public m_addNum:fgui.GTextField;
	public m_oneNum:fgui.GTextField;
	public m_line:fgui.GLoader;
	public static URL:string = "ui://kk7g5mmmtlx61ea";

	public static createInstance():FGUI_PropertyItem2 {
		return <FGUI_PropertyItem2>(fgui.UIPackage.createObject("GameMain", "PropertyItem2"));
	}

	protected onConstruct():void {
		this.m_bgColor = this.getControllerAt(0);
		this.m_item_bg1 = <fgui.GLoader>(this.getChildAt(0));
		this.m_addNum = <fgui.GTextField>(this.getChildAt(2));
		this.m_oneNum = <fgui.GTextField>(this.getChildAt(3));
		this.m_line = <fgui.GLoader>(this.getChildAt(5));
	}
}