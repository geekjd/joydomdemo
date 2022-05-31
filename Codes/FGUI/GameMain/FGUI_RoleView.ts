/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_HeadPos from "./FGUI_HeadPos";
import FGUI_PropertyItem from "./FGUI_PropertyItem";

export default class FGUI_RoleView extends fgui.GComponent {

	public m_model:fgui.Controller;
	public m_img_bg:fgui.GLoader;
	public m_headimg:FGUI_HeadPos;
	public m_btn_left:fgui.GButton;
	public m_btn_battle:fgui.GButton;
	public m_btn_right:fgui.GButton;
	public m_property:FGUI_PropertyItem;
	public m_roleSkillList:fgui.GComponent;
	public m_img_property:fgui.GLoader;
	public m_img_roleSkillList:fgui.GLoader;
	public m_list_roleHead:fgui.GList;
	public static URL:string = "ui://kk7g5mmmjvqn1rn";

	public static createInstance():FGUI_RoleView {
		return <FGUI_RoleView>(fgui.UIPackage.createObject("GameMain", "RoleView"));
	}

	protected onConstruct():void {
		this.m_model = this.getControllerAt(0);
		this.m_img_bg = <fgui.GLoader>(this.getChildAt(0));
		this.m_headimg = <FGUI_HeadPos>(this.getChildAt(1));
		this.m_btn_left = <fgui.GButton>(this.getChildAt(2));
		this.m_btn_battle = <fgui.GButton>(this.getChildAt(3));
		this.m_btn_right = <fgui.GButton>(this.getChildAt(4));
		this.m_property = <FGUI_PropertyItem>(this.getChildAt(5));
		this.m_roleSkillList = <fgui.GComponent>(this.getChildAt(6));
		this.m_img_property = <fgui.GLoader>(this.getChildAt(7));
		this.m_img_roleSkillList = <fgui.GLoader>(this.getChildAt(8));
		this.m_list_roleHead = <fgui.GList>(this.getChildAt(9));
	}
}