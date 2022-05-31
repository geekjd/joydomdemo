/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_Component16 from "./FGUI_Component16";

export default class FGUI_ActiveTopCom extends fgui.GComponent {

	public m_integral:fgui.GTextField;
	public m_eventName:fgui.GTextField;
	public m_exclamation:fgui.GComponent;
	public m_maxScore:fgui.GTextField;
	public m_trophyNUm:FGUI_Component16;
	public m_timeTxt:fgui.GTextField;
	public static URL:string = "ui://kk7g5mmmexxd18x";

	public static createInstance():FGUI_ActiveTopCom {
		return <FGUI_ActiveTopCom>(fgui.UIPackage.createObject("GameMain", "ActiveTopCom"));
	}

	protected onConstruct():void {
		this.m_integral = <fgui.GTextField>(this.getChildAt(2));
		this.m_eventName = <fgui.GTextField>(this.getChildAt(3));
		this.m_exclamation = <fgui.GComponent>(this.getChildAt(6));
		this.m_maxScore = <fgui.GTextField>(this.getChildAt(10));
		this.m_trophyNUm = <FGUI_Component16>(this.getChildAt(12));
		this.m_timeTxt = <fgui.GTextField>(this.getChildAt(13));
	}
}