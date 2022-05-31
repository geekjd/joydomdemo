/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_UniversalEndPlan from "./FGUI_UniversalEndPlan";
import FGUI_UniversalTwoEndPlan from "./FGUI_UniversalTwoEndPlan";
import FGUI_GameOverRole from "./FGUI_GameOverRole";
import FGUI_BaseButton from "./FGUI_BaseButton";
import FGUI_OverEndTaskPlan from "./FGUI_OverEndTaskPlan";
import FGUI_nativeCom from "./FGUI_nativeCom";
import FGUI_ShareCom from "./FGUI_ShareCom";

export default class FGUI_GameOverPlan extends fgui.GComponent {

	public m_Mask:fgui.GLoader;
	public m_Exit:fgui.GButton;
	public m_UniversalEndPlan:FGUI_UniversalEndPlan;
	public m_UniversalTwoEndPlan:FGUI_UniversalTwoEndPlan;
	public m_RolePlan:FGUI_GameOverRole;
	public m_PlayAgain:fgui.GButton;
	public m_nameLabel:fgui.GTextField;
	public m_3beiBtn:FGUI_BaseButton;
	public m_OverEndTaskPlan:FGUI_OverEndTaskPlan;
	public m_anySpace:fgui.GTextField;
	public m_nativeComp:FGUI_nativeCom;
	public m_nativeClosebut:fgui.GButton;
	public m_ShareComp:FGUI_ShareCom;
	public m_closeBtn:fgui.GButton;
	public m_Task:fgui.Transition;
	public m_3beiScale:fgui.Transition;
	public static URL:string = "ui://kk7g5mmmiiis1dw";

	public static createInstance():FGUI_GameOverPlan {
		return <FGUI_GameOverPlan>(fgui.UIPackage.createObject("GameMain", "GameOverPlan"));
	}

	protected onConstruct():void {
		this.m_Mask = <fgui.GLoader>(this.getChildAt(0));
		this.m_Exit = <fgui.GButton>(this.getChildAt(1));
		this.m_UniversalEndPlan = <FGUI_UniversalEndPlan>(this.getChildAt(3));
		this.m_UniversalTwoEndPlan = <FGUI_UniversalTwoEndPlan>(this.getChildAt(4));
		this.m_RolePlan = <FGUI_GameOverRole>(this.getChildAt(5));
		this.m_PlayAgain = <fgui.GButton>(this.getChildAt(6));
		this.m_nameLabel = <fgui.GTextField>(this.getChildAt(7));
		this.m_3beiBtn = <FGUI_BaseButton>(this.getChildAt(8));
		this.m_OverEndTaskPlan = <FGUI_OverEndTaskPlan>(this.getChildAt(9));
		this.m_anySpace = <fgui.GTextField>(this.getChildAt(12));
		this.m_nativeComp = <FGUI_nativeCom>(this.getChildAt(13));
		this.m_nativeClosebut = <fgui.GButton>(this.getChildAt(14));
		this.m_ShareComp = <FGUI_ShareCom>(this.getChildAt(15));
		this.m_closeBtn = <fgui.GButton>(this.getChildAt(16));
		this.m_Task = this.getTransitionAt(0);
		this.m_3beiScale = this.getTransitionAt(1);
	}
}