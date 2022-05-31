/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_GameShopIn from "./FGUI_GameShopIn";

export default class FGUI_PGameShop extends fgui.GComponent {

	public m_Mask:fgui.GLoader;
	public m_Content:FGUI_GameShopIn;
	public static URL:string = "ui://kk7g5mmmr3dt16z";

	public static createInstance():FGUI_PGameShop {
		return <FGUI_PGameShop>(fgui.UIPackage.createObject("GameMain", "PGameShop"));
	}

	protected onConstruct():void {
		this.m_Mask = <fgui.GLoader>(this.getChildAt(0));
		this.m_Content = <FGUI_GameShopIn>(this.getChildAt(1));
	}
}