/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_levelProgressBar from "./FGUI_levelProgressBar";

export default class FGUI_experienceBarCom extends fgui.GComponent {

	public m_levelBar:FGUI_levelProgressBar;
	public static URL:string = "ui://kk7g5mmmorqz1ar";

	public static createInstance():FGUI_experienceBarCom {
		return <FGUI_experienceBarCom>(fgui.UIPackage.createObject("GameMain", "experienceBarCom"));
	}

	protected onConstruct():void {
		this.m_levelBar = <FGUI_levelProgressBar>(this.getChildAt(0));
	}
}