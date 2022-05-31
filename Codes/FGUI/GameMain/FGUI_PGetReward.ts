/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_ray2 from "./FGUI_ray2";
import FGUI_chestCom from "./FGUI_chestCom";
import FGUI_rewardCom2 from "./FGUI_rewardCom2";
import FGUI_getRewardBottomCom from "./FGUI_getRewardBottomCom";
import FGUI_nativeCom from "./FGUI_nativeCom";

export default class FGUI_PGetReward extends fgui.GComponent {

	public m_c1:fgui.Controller;
	public m_existenceBg:fgui.GLoader;
	public m_ray:FGUI_ray2;
	public m_HeroPoint:fgui.GComponent;
	public m_chestImg:FGUI_chestCom;
	public m_reward:FGUI_rewardCom2;
	public m_bottom:FGUI_getRewardBottomCom;
	public m_rewardList:fgui.GList;
	public m_clickMask:fgui.GLoader;
	public m_txtYiHuoDe:fgui.GTextField;
	public m_requireRewrds:fgui.GButton;
	public m_details:fgui.GButton;
	public m_nativeComp:FGUI_nativeCom;
	public m_nativeClosebut:fgui.GButton;
	public static URL:string = "ui://kk7g5mmmxo4z1bu";

	public static createInstance():FGUI_PGetReward {
		return <FGUI_PGetReward>(fgui.UIPackage.createObject("GameMain", "PGetReward"));
	}

	protected onConstruct():void {
		this.m_c1 = this.getControllerAt(0);
		this.m_existenceBg = <fgui.GLoader>(this.getChildAt(0));
		this.m_ray = <FGUI_ray2>(this.getChildAt(3));
		this.m_HeroPoint = <fgui.GComponent>(this.getChildAt(4));
		this.m_chestImg = <FGUI_chestCom>(this.getChildAt(5));
		this.m_reward = <FGUI_rewardCom2>(this.getChildAt(6));
		this.m_bottom = <FGUI_getRewardBottomCom>(this.getChildAt(7));
		this.m_rewardList = <fgui.GList>(this.getChildAt(8));
		this.m_clickMask = <fgui.GLoader>(this.getChildAt(9));
		this.m_txtYiHuoDe = <fgui.GTextField>(this.getChildAt(11));
		this.m_requireRewrds = <fgui.GButton>(this.getChildAt(12));
		this.m_details = <fgui.GButton>(this.getChildAt(13));
		this.m_nativeComp = <FGUI_nativeCom>(this.getChildAt(14));
		this.m_nativeClosebut = <fgui.GButton>(this.getChildAt(15));
	}
}