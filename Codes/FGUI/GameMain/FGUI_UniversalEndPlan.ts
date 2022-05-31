/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_UniversalEndPlan extends fgui.GComponent {

	public m_TitleTxt:fgui.GTextField;
	public m_WaveAndRank:fgui.GTextField;
	public static URL:string = "ui://kk7g5mmmiiis1dx";

	public static createInstance():FGUI_UniversalEndPlan {
		return <FGUI_UniversalEndPlan>(fgui.UIPackage.createObject("GameMain", "UniversalEndPlan"));
	}

	protected onConstruct():void {
		this.m_TitleTxt = <fgui.GTextField>(this.getChildAt(1));
		this.m_WaveAndRank = <fgui.GTextField>(this.getChildAt(2));
	}
}