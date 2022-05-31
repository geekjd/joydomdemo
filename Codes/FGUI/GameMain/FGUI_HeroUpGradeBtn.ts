/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_HeroUpGradeBtn extends fgui.GButton {

	public m_st:fgui.Controller;
	public m_bg:fgui.GLoader;
	public m_gold:fgui.GTextField;
	public m_icon_UI:fgui.GImage;
	public m_title_g:fgui.GTextField;
	public static URL:string = "ui://kk7g5mmmpy6f1a3";

	public static createInstance():FGUI_HeroUpGradeBtn {
		return <FGUI_HeroUpGradeBtn>(fgui.UIPackage.createObject("GameMain", "HeroUpGradeBtn"));
	}

	protected onConstruct():void {
		this.m_st = this.getControllerAt(0);
		this.m_bg = <fgui.GLoader>(this.getChildAt(0));
		this.m_gold = <fgui.GTextField>(this.getChildAt(1));
		this.m_icon_UI = <fgui.GImage>(this.getChildAt(3));
		this.m_title_g = <fgui.GTextField>(this.getChildAt(4));
	}
}