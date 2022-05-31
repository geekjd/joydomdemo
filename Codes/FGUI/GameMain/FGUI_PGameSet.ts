/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_toggleBtn from "./FGUI_toggleBtn";
import FGUI_nativeCom from "./FGUI_nativeCom";

export default class FGUI_PGameSet extends fgui.GComponent {

	public m_audioToggle:FGUI_toggleBtn;
	public m_audioToggleTxt:fgui.GTextField;
	public m_musicToggle:FGUI_toggleBtn;
	public m_musicToggleTxt:fgui.GTextField;
	public m_shakeToggle:FGUI_toggleBtn;
	public m_shakeToggleTxt:fgui.GTextField;
	public m_close:fgui.GButton;
	public m_setCloseBtn:fgui.GButton;
	public m_nativeComp:FGUI_nativeCom;
	public m_nativeClosebut:fgui.GButton;
	public static URL:string = "ui://kk7g5mmmxfev1af";

	public static createInstance():FGUI_PGameSet {
		return <FGUI_PGameSet>(fgui.UIPackage.createObject("GameMain", "PGameSet"));
	}

	protected onConstruct():void {
		this.m_audioToggle = <FGUI_toggleBtn>(this.getChildAt(2));
		this.m_audioToggleTxt = <fgui.GTextField>(this.getChildAt(3));
		this.m_musicToggle = <FGUI_toggleBtn>(this.getChildAt(4));
		this.m_musicToggleTxt = <fgui.GTextField>(this.getChildAt(5));
		this.m_shakeToggle = <FGUI_toggleBtn>(this.getChildAt(6));
		this.m_shakeToggleTxt = <fgui.GTextField>(this.getChildAt(7));
		this.m_close = <fgui.GButton>(this.getChildAt(8));
		this.m_setCloseBtn = <fgui.GButton>(this.getChildAt(9));
		this.m_nativeComp = <FGUI_nativeCom>(this.getChildAt(15));
		this.m_nativeClosebut = <fgui.GButton>(this.getChildAt(16));
	}
}