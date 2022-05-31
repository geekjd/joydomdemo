/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_rotatingRay from "./FGUI_rotatingRay";
import FGUI_AniCom from "./FGUI_AniCom";

export default class FGUI_Ray extends fgui.GComponent {

	public m_ray:FGUI_rotatingRay;
	public m_midTxt:FGUI_AniCom;
	public m_t0:fgui.Transition;
	public static URL:string = "ui://kk7g5mmmozi71gz";

	public static createInstance():FGUI_Ray {
		return <FGUI_Ray>(fgui.UIPackage.createObject("GameMain", "Ray"));
	}

	protected onConstruct():void {
		this.m_ray = <FGUI_rotatingRay>(this.getChildAt(0));
		this.m_midTxt = <FGUI_AniCom>(this.getChildAt(2));
		this.m_t0 = this.getTransitionAt(0);
	}
}