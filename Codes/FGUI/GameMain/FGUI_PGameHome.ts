/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_FreeCom from "./FGUI_FreeCom";
import FGUI_PassComp from "./FGUI_PassComp";
import FGUI_homeMidItem from "./FGUI_homeMidItem";
import FGUI_GetRewardBtn from "./FGUI_GetRewardBtn";
import FGUI_tabBut1 from "./FGUI_tabBut1";
import FGUI_HuntBtn from "./FGUI_HuntBtn";
import FGUI_ComboBox2 from "./FGUI_ComboBox2";

export default class FGUI_PGameHome extends fgui.GComponent {

	public m_c1:fgui.Controller;
	public m_freeRewrdsBtn:FGUI_FreeCom;
	public m_PassCom:FGUI_PassComp;
	public m_homeMideCom:FGUI_homeMidItem;
	public m_getRewardBtn:FGUI_GetRewardBtn;
	public m_ActionBtn:FGUI_tabBut1;
	public m_ComStartBtn:FGUI_HuntBtn;
	public m_daibiUI:fgui.GLoader;
	public m_upgradeRate:fgui.GTextField;
	public m_leftTime:fgui.GTextField;
	public m_DaibiOneState:fgui.GGroup;
	public m_modeSelectBtn:FGUI_ComboBox2;
	public m_AddToDesk:fgui.GButton;
	public m_NinePortalCom:fgui.GButton;
	public m_ModeSelectBtn:fgui.GButton;
	public m_daibiUI2:fgui.GLoader;
	public m_upgradeRate2:fgui.GTextField;
	public m_DaibiOneState2:fgui.GGroup;
	public m_t0:fgui.Transition;
	public static URL:string = "ui://kk7g5mmmngfc18j";

	public static createInstance():FGUI_PGameHome {
		return <FGUI_PGameHome>(fgui.UIPackage.createObject("GameMain", "PGameHome"));
	}

	protected onConstruct():void {
		this.m_c1 = this.getControllerAt(0);
		this.m_freeRewrdsBtn = <FGUI_FreeCom>(this.getChildAt(0));
		this.m_PassCom = <FGUI_PassComp>(this.getChildAt(1));
		this.m_homeMideCom = <FGUI_homeMidItem>(this.getChildAt(2));
		this.m_getRewardBtn = <FGUI_GetRewardBtn>(this.getChildAt(3));
		this.m_ActionBtn = <FGUI_tabBut1>(this.getChildAt(4));
		this.m_ComStartBtn = <FGUI_HuntBtn>(this.getChildAt(5));
		this.m_daibiUI = <fgui.GLoader>(this.getChildAt(7));
		this.m_upgradeRate = <fgui.GTextField>(this.getChildAt(8));
		this.m_leftTime = <fgui.GTextField>(this.getChildAt(9));
		this.m_DaibiOneState = <fgui.GGroup>(this.getChildAt(10));
		this.m_modeSelectBtn = <FGUI_ComboBox2>(this.getChildAt(11));
		this.m_AddToDesk = <fgui.GButton>(this.getChildAt(12));
		this.m_NinePortalCom = <fgui.GButton>(this.getChildAt(13));
		this.m_ModeSelectBtn = <fgui.GButton>(this.getChildAt(14));
		this.m_daibiUI2 = <fgui.GLoader>(this.getChildAt(16));
		this.m_upgradeRate2 = <fgui.GTextField>(this.getChildAt(17));
		this.m_DaibiOneState2 = <fgui.GGroup>(this.getChildAt(18));
		this.m_t0 = this.getTransitionAt(0);
	}
}