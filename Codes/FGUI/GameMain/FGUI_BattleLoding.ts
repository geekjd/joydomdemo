/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_nativeCom from "./FGUI_nativeCom";

export default class FGUI_BattleLoding extends fgui.GComponent {

	public m_Bg:fgui.GLoader;
	public m_TipsM:fgui.GTextField;
	public m_TipsEnterGame:fgui.GTextField;
	public m_nativeComp:FGUI_nativeCom;
	public m_nativeClosebut:fgui.GButton;
	public m_t0:fgui.Transition;
	public static URL:string = "ui://kk7g5mmmspun1dp";

	public static createInstance():FGUI_BattleLoding {
		return <FGUI_BattleLoding>(fgui.UIPackage.createObject("GameMain", "BattleLoding"));
	}

	protected onConstruct():void {
		this.m_Bg = <fgui.GLoader>(this.getChildAt(0));
		this.m_TipsM = <fgui.GTextField>(this.getChildAt(2));
		this.m_TipsEnterGame = <fgui.GTextField>(this.getChildAt(3));
		this.m_nativeComp = <FGUI_nativeCom>(this.getChildAt(4));
		this.m_nativeClosebut = <fgui.GButton>(this.getChildAt(5));
		this.m_t0 = this.getTransitionAt(0);
	}
}