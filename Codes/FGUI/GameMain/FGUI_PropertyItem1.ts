/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_PropertyItem1 extends fgui.GComponent {

	public m_bgColor:fgui.Controller;
	public m_item_bg1:fgui.GLoader;
	public m_addNum:fgui.GTextField;
	public m_oneNum:fgui.GTextField;
	public m_line:fgui.GLoader;
	public m_line2:fgui.GLoader;
	public m_line3:fgui.GLoader;
	public static URL:string = "ui://kk7g5mmmtlx61e9";

	public static createInstance():FGUI_PropertyItem1 {
		return <FGUI_PropertyItem1>(fgui.UIPackage.createObject("GameMain", "PropertyItem1"));
	}

	protected onConstruct():void {
		this.m_bgColor = this.getControllerAt(0);
		this.m_item_bg1 = <fgui.GLoader>(this.getChildAt(0));
		this.m_addNum = <fgui.GTextField>(this.getChildAt(2));
		this.m_oneNum = <fgui.GTextField>(this.getChildAt(3));
		this.m_line = <fgui.GLoader>(this.getChildAt(5));
		this.m_line2 = <fgui.GLoader>(this.getChildAt(6));
		this.m_line3 = <fgui.GLoader>(this.getChildAt(7));
	}
}