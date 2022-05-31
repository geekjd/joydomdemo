/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_VirtualRocker from "./FGUI_VirtualRocker";
import FGUI_timeCom from "./FGUI_timeCom";
import FGUI_experienceBarCom from "./FGUI_experienceBarCom";
import FGUI_playerCom from "./FGUI_playerCom";
import FGUI_deadMsgCom from "./FGUI_deadMsgCom";
import FGUI_chooseSkillCom from "./FGUI_chooseSkillCom";
import FGUI_Ray from "./FGUI_Ray";
import FGUI_LifeTime30 from "./FGUI_LifeTime30";
import FGUI_nativeCom from "./FGUI_nativeCom";
import FGUI_ExistentCom from "./FGUI_ExistentCom";

export default class FGUI_GameFitingPlan extends fgui.GComponent {

	public m_ShowCon:fgui.Controller;
	public m_HP_Prant:fgui.GComponent;
	public m_redScreen:fgui.GLoader;
	public m_VirtualRocker:FGUI_VirtualRocker;
	public m_btnSetting:fgui.GButton;
	public m_time:FGUI_timeCom;
	public m_levelBar:FGUI_experienceBarCom;
	public m_playList:FGUI_playerCom;
	public m_deadMsg:FGUI_deadMsgCom;
	public m_chooseSkill:FGUI_chooseSkillCom;
	public m_ray:FGUI_Ray;
	public m_lifeTime:FGUI_LifeTime30;
	public m_nativeComp:FGUI_nativeCom;
	public m_nativeClosebut:fgui.GButton;
	public m_TopWave:FGUI_ExistentCom;
	public m_LevelTips:fgui.GTextField;
	public m_t0:fgui.Transition;
	public m_t2:fgui.Transition;
	public static URL:string = "ui://kk7g5mmme7q21al";

	public static createInstance():FGUI_GameFitingPlan {
		return <FGUI_GameFitingPlan>(fgui.UIPackage.createObject("GameMain", "GameFitingPlan"));
	}

	protected onConstruct():void {
		this.m_ShowCon = this.getControllerAt(0);
		this.m_HP_Prant = <fgui.GComponent>(this.getChildAt(0));
		this.m_redScreen = <fgui.GLoader>(this.getChildAt(1));
		this.m_VirtualRocker = <FGUI_VirtualRocker>(this.getChildAt(2));
		this.m_btnSetting = <fgui.GButton>(this.getChildAt(3));
		this.m_time = <FGUI_timeCom>(this.getChildAt(4));
		this.m_levelBar = <FGUI_experienceBarCom>(this.getChildAt(5));
		this.m_playList = <FGUI_playerCom>(this.getChildAt(6));
		this.m_deadMsg = <FGUI_deadMsgCom>(this.getChildAt(7));
		this.m_chooseSkill = <FGUI_chooseSkillCom>(this.getChildAt(8));
		this.m_ray = <FGUI_Ray>(this.getChildAt(9));
		this.m_lifeTime = <FGUI_LifeTime30>(this.getChildAt(10));
		this.m_nativeComp = <FGUI_nativeCom>(this.getChildAt(11));
		this.m_nativeClosebut = <fgui.GButton>(this.getChildAt(12));
		this.m_TopWave = <FGUI_ExistentCom>(this.getChildAt(13));
		this.m_LevelTips = <fgui.GTextField>(this.getChildAt(14));
		this.m_t0 = this.getTransitionAt(0);
		this.m_t2 = this.getTransitionAt(1);
	}
}