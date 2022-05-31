/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_RoundHalfImg from "./FGUI_RoundHalfImg";

export default class FGUI_yellowkuang extends fgui.GComponent {

	public m_type:fgui.Controller;
	public m_buy_state:fgui.Controller;
	public m_Img:FGUI_RoundHalfImg;
	public m_addBG:fgui.GLoader;
	public m_spLabel:fgui.GTextField;
	public m_PriceLabel:fgui.GTextField;
	public m_hunter:fgui.GGroup;
	public m_boxIcon:fgui.GLoader;
	public m_boxName:fgui.GTextField;
	public m_oldPrice:fgui.GTextField;
	public m_newPrice:fgui.GTextField;
	public m_box:fgui.GGroup;
	public m_locked:fgui.GGroup;
	public static URL:string = "ui://kk7g5mmmbsf417w";

	public static createInstance():FGUI_yellowkuang {
		return <FGUI_yellowkuang>(fgui.UIPackage.createObject("GameMain", "yellowkuang"));
	}

	protected onConstruct():void {
		this.m_type = this.getControllerAt(0);
		this.m_buy_state = this.getControllerAt(1);
		this.m_Img = <FGUI_RoundHalfImg>(this.getChildAt(1));
		this.m_addBG = <fgui.GLoader>(this.getChildAt(2));
		this.m_spLabel = <fgui.GTextField>(this.getChildAt(3));
		this.m_PriceLabel = <fgui.GTextField>(this.getChildAt(5));
		this.m_hunter = <fgui.GGroup>(this.getChildAt(7));
		this.m_boxIcon = <fgui.GLoader>(this.getChildAt(9));
		this.m_boxName = <fgui.GTextField>(this.getChildAt(11));
		this.m_oldPrice = <fgui.GTextField>(this.getChildAt(14));
		this.m_newPrice = <fgui.GTextField>(this.getChildAt(16));
		this.m_box = <fgui.GGroup>(this.getChildAt(18));
		this.m_locked = <fgui.GGroup>(this.getChildAt(22));
	}
}