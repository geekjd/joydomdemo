/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_RoleHp_Bar extends fgui.GProgressBar {

	public m_Bg:fgui.GLoader;
	public m_bar_Yellow:fgui.GProgressBar;
	public m_AncrownIcon:fgui.GLoader;
	public m_FlagIcon:fgui.GLoader;
	public m_LevleTxt:fgui.GTextField;
	public m_RoleName:fgui.GTextField;
	public static URL:string = "ui://kk7g5mmml1oc1dn";

	public static createInstance():FGUI_RoleHp_Bar {
		return <FGUI_RoleHp_Bar>(fgui.UIPackage.createObject("GameMain", "RoleHp_Bar"));
	}

	protected onConstruct():void {
		this.m_Bg = <fgui.GLoader>(this.getChildAt(0));
		this.m_bar_Yellow = <fgui.GProgressBar>(this.getChildAt(1));
		this.m_AncrownIcon = <fgui.GLoader>(this.getChildAt(4));
		this.m_FlagIcon = <fgui.GLoader>(this.getChildAt(5));
		this.m_LevleTxt = <fgui.GTextField>(this.getChildAt(6));
		this.m_RoleName = <fgui.GTextField>(this.getChildAt(7));
	}
}