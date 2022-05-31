/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_goldItem extends fgui.GButton {

	public m_nameLabel:fgui.GTextField;
	public m_addLabel:fgui.GTextField;
	public m_itemIcon:fgui.GLoader;
	public m_vivoUI:fgui.GLoader;
	public m_priceLabel:fgui.GTextField;
	public m_adMoveleft:fgui.GGroup;
	public static URL:string = "ui://kk7g5mmmngfc18h";

	public static createInstance():FGUI_goldItem {
		return <FGUI_goldItem>(fgui.UIPackage.createObject("GameMain", "goldItem"));
	}

	protected onConstruct():void {
		this.m_nameLabel = <fgui.GTextField>(this.getChildAt(1));
		this.m_addLabel = <fgui.GTextField>(this.getChildAt(2));
		this.m_itemIcon = <fgui.GLoader>(this.getChildAt(3));
		this.m_vivoUI = <fgui.GLoader>(this.getChildAt(4));
		this.m_priceLabel = <fgui.GTextField>(this.getChildAt(5));
		this.m_adMoveleft = <fgui.GGroup>(this.getChildAt(6));
	}
}