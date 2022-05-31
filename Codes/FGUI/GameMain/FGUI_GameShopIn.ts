/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_EverydayDiscountComp from "./FGUI_EverydayDiscountComp";
import FGUI_CommodityComp from "./FGUI_CommodityComp";
import FGUI_DiamontemComp from "./FGUI_DiamontemComp";
import FGUI_GoldComp from "./FGUI_GoldComp";

export default class FGUI_GameShopIn extends fgui.GComponent {

	public m_EverydayDiscountCom:FGUI_EverydayDiscountComp;
	public m_CommodityCom:FGUI_CommodityComp;
	public m_DiamontemCom:FGUI_DiamontemComp;
	public m_GoldCom:FGUI_GoldComp;
	public static URL:string = "ui://kk7g5mmmlqz41fu";

	public static createInstance():FGUI_GameShopIn {
		return <FGUI_GameShopIn>(fgui.UIPackage.createObject("GameMain", "GameShopIn"));
	}

	protected onConstruct():void {
		this.m_EverydayDiscountCom = <FGUI_EverydayDiscountComp>(this.getChildAt(0));
		this.m_CommodityCom = <FGUI_CommodityComp>(this.getChildAt(1));
		this.m_DiamontemCom = <FGUI_DiamontemComp>(this.getChildAt(2));
		this.m_GoldCom = <FGUI_GoldComp>(this.getChildAt(3));
	}
}