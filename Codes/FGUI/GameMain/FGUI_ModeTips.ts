/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_ModeTips extends fgui.GComponent {

	public m_TipsTxt:fgui.GTextField;
	public m_Title:fgui.GTextField;
	public m_Close:fgui.GButton;
	public static URL:string = "ui://kk7g5mmmh7p81df";

	public static createInstance():FGUI_ModeTips {
		return <FGUI_ModeTips>(fgui.UIPackage.createObject("GameMain", "ModeTips"));
	}

	protected onConstruct():void {
		this.m_TipsTxt = <fgui.GTextField>(this.getChildAt(2));
		this.m_Title = <fgui.GTextField>(this.getChildAt(3));
		this.m_Close = <fgui.GButton>(this.getChildAt(4));
	}
}