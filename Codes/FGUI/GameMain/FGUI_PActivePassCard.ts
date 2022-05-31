/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_RoundImg from "./FGUI_RoundImg";
import FGUI_passCardVideoBtn from "./FGUI_passCardVideoBtn";
import FGUI_nativeCom from "./FGUI_nativeCom";

export default class FGUI_PActivePassCard extends fgui.GComponent {

	public m_mask:fgui.GLoader;
	public m_bg:fgui.GLoader;
	public m_bottombg:fgui.GImage;
	public m_txt1:fgui.GTextField;
	public m_txt5:fgui.GTextField;
	public m_closeBtn:fgui.GButton;
	public m_txt2:fgui.GTextField;
	public m_txt3:fgui.GTextField;
	public m_txt6:fgui.GTextField;
	public m_rewardImg:FGUI_RoundImg;
	public m_mid:fgui.GGroup;
	public m_txt4:fgui.GTextField;
	public m_playVideoBtn:FGUI_passCardVideoBtn;
	public m_bottom:fgui.GGroup;
	public m_nativeComp:FGUI_nativeCom;
	public m_nativeClosebut:fgui.GButton;
	public m_DetailsBtn:fgui.GButton;
	public static URL:string = "ui://kk7g5mmmxo4z1c5";

	public static createInstance():FGUI_PActivePassCard {
		return <FGUI_PActivePassCard>(fgui.UIPackage.createObject("GameMain", "PActivePassCard"));
	}

	protected onConstruct():void {
		this.m_mask = <fgui.GLoader>(this.getChildAt(0));
		this.m_bg = <fgui.GLoader>(this.getChildAt(2));
		this.m_bottombg = <fgui.GImage>(this.getChildAt(5));
		this.m_txt1 = <fgui.GTextField>(this.getChildAt(6));
		this.m_txt5 = <fgui.GTextField>(this.getChildAt(7));
		this.m_closeBtn = <fgui.GButton>(this.getChildAt(8));
		this.m_txt2 = <fgui.GTextField>(this.getChildAt(9));
		this.m_txt3 = <fgui.GTextField>(this.getChildAt(10));
		this.m_txt6 = <fgui.GTextField>(this.getChildAt(11));
		this.m_rewardImg = <FGUI_RoundImg>(this.getChildAt(13));
		this.m_mid = <fgui.GGroup>(this.getChildAt(14));
		this.m_txt4 = <fgui.GTextField>(this.getChildAt(16));
		this.m_playVideoBtn = <FGUI_passCardVideoBtn>(this.getChildAt(17));
		this.m_bottom = <fgui.GGroup>(this.getChildAt(18));
		this.m_nativeComp = <FGUI_nativeCom>(this.getChildAt(19));
		this.m_nativeClosebut = <fgui.GButton>(this.getChildAt(20));
		this.m_DetailsBtn = <fgui.GButton>(this.getChildAt(21));
	}
}