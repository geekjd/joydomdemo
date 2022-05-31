/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_Component13 from "./FGUI_Component13";

export default class FGUI_homeMidItem extends fgui.GComponent {

	public m_RewrdsPro:FGUI_Component13;
	public m_protxt:fgui.GTextField;
	public m_trophyNum:fgui.GTextField;
	public m_ba:fgui.GLoader;
	public m_lvtxt:fgui.GTextField;
	public m_rewardBg:fgui.GLoader;
	public m_icon:fgui.GLoader;
	public m_lrtip:fgui.GTextField;
	public m_rewardBtn:fgui.GGroup;
	public static URL:string = "ui://kk7g5mmmbsf417z";

	public static createInstance():FGUI_homeMidItem {
		return <FGUI_homeMidItem>(fgui.UIPackage.createObject("GameMain", "homeMidItem"));
	}

	protected onConstruct():void {
		this.m_RewrdsPro = <FGUI_Component13>(this.getChildAt(1));
		this.m_protxt = <fgui.GTextField>(this.getChildAt(2));
		this.m_trophyNum = <fgui.GTextField>(this.getChildAt(3));
		this.m_ba = <fgui.GLoader>(this.getChildAt(5));
		this.m_lvtxt = <fgui.GTextField>(this.getChildAt(6));
		this.m_rewardBg = <fgui.GLoader>(this.getChildAt(7));
		this.m_icon = <fgui.GLoader>(this.getChildAt(8));
		this.m_lrtip = <fgui.GTextField>(this.getChildAt(9));
		this.m_rewardBtn = <fgui.GGroup>(this.getChildAt(10));
	}
}