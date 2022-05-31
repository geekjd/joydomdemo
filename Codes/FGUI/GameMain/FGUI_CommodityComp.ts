/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_CommodityComp extends fgui.GComponent {

	public m_commodityItemList:fgui.GList;
	public static URL:string = "ui://kk7g5mmmngfc18d";

	public static createInstance():FGUI_CommodityComp {
		return <FGUI_CommodityComp>(fgui.UIPackage.createObject("GameMain", "CommodityComp"));
	}

	protected onConstruct():void {
		this.m_commodityItemList = <fgui.GList>(this.getChildAt(3));
	}
}