/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_Elf_Item_pro from "./FGUI_Elf_Item_pro";

export default class FGUI_HunterItem extends fgui.GButton {

	public m_exp_state:fgui.Controller;
	public m_locked:fgui.Controller;
	public m_selectedbg:fgui.GLoader;
	public m_bg:fgui.GLoader;
	public m_HunterIcon:fgui.GLoader;
	public m_name:fgui.GTextField;
	public m_HeroNumPro:FGUI_Elf_Item_pro;
	public m_arrow:fgui.GLoader;
	public m_protxt:fgui.GTextField;
	public m_trophy_num:fgui.GTextField;
	public m_lockedbg:fgui.GLoader;
	public m_jiesuoNum:fgui.GTextField;
	public m_lock:fgui.GLoader;
	public m_BlackMask:fgui.GLoader;
	public m_lvtext:fgui.GTextField;
	public m_t4:fgui.Transition;
	public static URL:string = "ui://kk7g5mmmngfc18q";

	public static createInstance():FGUI_HunterItem {
		return <FGUI_HunterItem>(fgui.UIPackage.createObject("GameMain", "HunterItem"));
	}

	protected onConstruct():void {
		this.m_exp_state = this.getControllerAt(0);
		this.m_locked = this.getControllerAt(1);
		this.m_selectedbg = <fgui.GLoader>(this.getChildAt(0));
		this.m_bg = <fgui.GLoader>(this.getChildAt(1));
		this.m_HunterIcon = <fgui.GLoader>(this.getChildAt(2));
		this.m_name = <fgui.GTextField>(this.getChildAt(3));
		this.m_HeroNumPro = <FGUI_Elf_Item_pro>(this.getChildAt(4));
		this.m_arrow = <fgui.GLoader>(this.getChildAt(5));
		this.m_protxt = <fgui.GTextField>(this.getChildAt(6));
		this.m_trophy_num = <fgui.GTextField>(this.getChildAt(7));
		this.m_lockedbg = <fgui.GLoader>(this.getChildAt(9));
		this.m_jiesuoNum = <fgui.GTextField>(this.getChildAt(10));
		this.m_lock = <fgui.GLoader>(this.getChildAt(11));
		this.m_BlackMask = <fgui.GLoader>(this.getChildAt(13));
		this.m_lvtext = <fgui.GTextField>(this.getChildAt(15));
		this.m_t4 = this.getTransitionAt(0);
	}
}