/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_CommondityItemBtn extends fgui.GButton {

	public m_type:fgui.Controller;
	public m_addLabel:fgui.GTextField;
	public m_box:fgui.GLoader;
	public m_boxName:fgui.GTextField;
	public m_priceLabel:fgui.GTextField;
	public static URL:string = "ui://kk7g5mmmq21s189";

	public static createInstance():FGUI_CommondityItemBtn {
		return <FGUI_CommondityItemBtn>(fgui.UIPackage.createObject("GameMain", "CommondityItemBtn"));
	}

	protected onConstruct():void {
		this.m_type = this.getControllerAt(0);
		this.m_addLabel = <fgui.GTextField>(this.getChildAt(2));
		this.m_box = <fgui.GLoader>(this.getChildAt(3));
		this.m_boxName = <fgui.GTextField>(this.getChildAt(5));
		this.m_priceLabel = <fgui.GTextField>(this.getChildAt(7));
	}
}