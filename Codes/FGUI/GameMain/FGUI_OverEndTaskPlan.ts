/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_EnemyIconPlan from "./FGUI_EnemyIconPlan";
import FGUI_EndTaskBar from "./FGUI_EndTaskBar";

export default class FGUI_OverEndTaskPlan extends fgui.GComponent {

	public m_TaskTarget:FGUI_EnemyIconPlan;
	public m_Title:fgui.GTextField;
	public m_Tips:fgui.GTextField;
	public m_TaskBar:FGUI_EndTaskBar;
	public m_RewIcon:fgui.GLoader;
	public m_RewCount:fgui.GTextField;
	public static URL:string = "ui://kk7g5mmmiiis1e0";

	public static createInstance():FGUI_OverEndTaskPlan {
		return <FGUI_OverEndTaskPlan>(fgui.UIPackage.createObject("GameMain", "OverEndTaskPlan"));
	}

	protected onConstruct():void {
		this.m_TaskTarget = <FGUI_EnemyIconPlan>(this.getChildAt(2));
		this.m_Title = <fgui.GTextField>(this.getChildAt(3));
		this.m_Tips = <fgui.GTextField>(this.getChildAt(4));
		this.m_TaskBar = <FGUI_EndTaskBar>(this.getChildAt(5));
		this.m_RewIcon = <fgui.GLoader>(this.getChildAt(6));
		this.m_RewCount = <fgui.GTextField>(this.getChildAt(7));
	}
}