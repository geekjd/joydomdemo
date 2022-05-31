/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_Component20 from "./FGUI_Component20";

export default class FGUI_Button1 extends fgui.GButton {

	public m_watchTimes:FGUI_Component20;
	public static URL:string = "ui://kk7g5mmmrbpj1nw";

	public static createInstance():FGUI_Button1 {
		return <FGUI_Button1>(fgui.UIPackage.createObject("GameMain", "Button1"));
	}

	protected onConstruct():void {
		this.m_watchTimes = <FGUI_Component20>(this.getChildAt(1));
	}
}