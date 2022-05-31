/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_taskProcessingCom from "./FGUI_taskProcessingCom";
import FGUI_rewardCom from "./FGUI_rewardCom";

export default class FGUI_taskItemCom extends fgui.GComponent {

	public m_c1:fgui.Controller;
	public m_taskDetail:FGUI_taskProcessingCom;
	public m_getBtn:fgui.GButton;
	public m_reward:FGUI_rewardCom;
	public m_taskCompleteTxt:fgui.GTextField;
	public m_taskImghightligt:fgui.GLoader;
	public m_taskImg:fgui.GLoader;
	public m_ContinuteBtn:fgui.GButton;
	public static URL:string = "ui://kk7g5mmmorqz1b4";

	public static createInstance():FGUI_taskItemCom {
		return <FGUI_taskItemCom>(fgui.UIPackage.createObject("GameMain", "taskItemCom"));
	}

	protected onConstruct():void {
		this.m_c1 = this.getControllerAt(0);
		this.m_taskDetail = <FGUI_taskProcessingCom>(this.getChildAt(1));
		this.m_getBtn = <fgui.GButton>(this.getChildAt(2));
		this.m_reward = <FGUI_rewardCom>(this.getChildAt(3));
		this.m_taskCompleteTxt = <fgui.GTextField>(this.getChildAt(4));
		this.m_taskImghightligt = <fgui.GLoader>(this.getChildAt(5));
		this.m_taskImg = <fgui.GLoader>(this.getChildAt(6));
		this.m_ContinuteBtn = <fgui.GButton>(this.getChildAt(8));
	}
}