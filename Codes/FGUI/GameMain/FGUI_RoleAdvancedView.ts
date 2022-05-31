/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_PropertyItem from "./FGUI_PropertyItem";

export default class FGUI_RoleAdvancedView extends fgui.GComponent {

	public m_img_bg:fgui.GLoader;
	public m_lab_advance:fgui.GTextField;
	public m_lab_upgrade:fgui.GTextField;
	public m_img_btnBg:fgui.GLoader;
	public m_btn_cutAdvance:fgui.GButton;
	public m_btn_cutUpgrade:fgui.GButton;
	public m_property_now:FGUI_PropertyItem;
	public m_property_after:FGUI_PropertyItem;
	public m_list_prop:fgui.GList;
	public m_btn_advance:fgui.GButton;
	public m_list_roleHead:fgui.GList;
	public m_btn_left:fgui.GButton;
	public m_btn_right:fgui.GButton;
	public static URL:string = "ui://kk7g5mmmeo871rv";

	public static createInstance():FGUI_RoleAdvancedView {
		return <FGUI_RoleAdvancedView>(fgui.UIPackage.createObject("GameMain", "RoleAdvancedView"));
	}

	protected onConstruct():void {
		this.m_img_bg = <fgui.GLoader>(this.getChildAt(0));
		this.m_lab_advance = <fgui.GTextField>(this.getChildAt(1));
		this.m_lab_upgrade = <fgui.GTextField>(this.getChildAt(2));
		this.m_img_btnBg = <fgui.GLoader>(this.getChildAt(3));
		this.m_btn_cutAdvance = <fgui.GButton>(this.getChildAt(4));
		this.m_btn_cutUpgrade = <fgui.GButton>(this.getChildAt(5));
		this.m_property_now = <FGUI_PropertyItem>(this.getChildAt(6));
		this.m_property_after = <FGUI_PropertyItem>(this.getChildAt(8));
		this.m_list_prop = <fgui.GList>(this.getChildAt(11));
		this.m_btn_advance = <fgui.GButton>(this.getChildAt(12));
		this.m_list_roleHead = <fgui.GList>(this.getChildAt(13));
		this.m_btn_left = <fgui.GButton>(this.getChildAt(14));
		this.m_btn_right = <fgui.GButton>(this.getChildAt(15));
	}
}