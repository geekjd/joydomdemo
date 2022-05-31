/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_taskBtnFinishedCout from "./FGUI_taskBtnFinishedCout";

export default class FGUI_taskBtn extends fgui.GButton {

	public m_c1:fgui.Controller;
	public m_highLight:fgui.GLoader;
	public m_finishedCoutCom:FGUI_taskBtnFinishedCout;
	public m_taskType:fgui.GTextField;
	public static URL:string = "ui://kk7g5mmmorqz1b5";

	public static createInstance():FGUI_taskBtn {
		return <FGUI_taskBtn>(fgui.UIPackage.createObject("GameMain", "taskBtn"));
	}

	protected onConstruct():void {
		this.m_c1 = this.getControllerAt(0);
		this.m_highLight = <fgui.GLoader>(this.getChildAt(1));
		this.m_finishedCoutCom = <FGUI_taskBtnFinishedCout>(this.getChildAt(2));
		this.m_taskType = <fgui.GTextField>(this.getChildAt(3));
	}
}