/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_HeadPos from "./FGUI_HeadPos";
import FGUI_RoundImg from "./FGUI_RoundImg";

export default class FGUI_rewardCom2 extends fgui.GComponent {

	public m_type:fgui.Controller;
	public m_hpos:FGUI_HeadPos;
	public m_rewardImg:fgui.GLoader;
	public m_name:fgui.GTextField;
	public m_count:fgui.GTextField;
	public m_shadow:fgui.GImage;
	public m_heroIcon:FGUI_RoundImg;
	public m_spHeroIcon:fgui.GLoader;
	public m_whiteMask:fgui.GGraph;
	public m_showHero:fgui.Transition;
	public static URL:string = "ui://kk7g5mmmxo4z1c0";

	public static createInstance():FGUI_rewardCom2 {
		return <FGUI_rewardCom2>(fgui.UIPackage.createObject("GameMain", "rewardCom2"));
	}

	protected onConstruct():void {
		this.m_type = this.getControllerAt(0);
		this.m_hpos = <FGUI_HeadPos>(this.getChildAt(0));
		this.m_rewardImg = <fgui.GLoader>(this.getChildAt(1));
		this.m_name = <fgui.GTextField>(this.getChildAt(2));
		this.m_count = <fgui.GTextField>(this.getChildAt(3));
		this.m_shadow = <fgui.GImage>(this.getChildAt(4));
		this.m_heroIcon = <FGUI_RoundImg>(this.getChildAt(8));
		this.m_spHeroIcon = <fgui.GLoader>(this.getChildAt(10));
		this.m_whiteMask = <fgui.GGraph>(this.getChildAt(11));
		this.m_showHero = this.getTransitionAt(0);
	}
}