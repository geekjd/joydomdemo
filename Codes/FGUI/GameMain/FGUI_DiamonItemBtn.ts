/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_DiamonItemBtn extends fgui.GButton {

	public m_first:fgui.Controller;
	public m_rewardLabel:fgui.GTextField;
	public m_AdTimesLabel:fgui.GTextField;
	public m_vivoUI:fgui.GLoader;
	public m_txt:fgui.GTextField;
	public static URL:string = "ui://kk7g5mmmngfc18f";

	public static createInstance():FGUI_DiamonItemBtn {
		return <FGUI_DiamonItemBtn>(fgui.UIPackage.createObject("GameMain", "DiamonItemBtn"));
	}

	protected onConstruct():void {
		this.m_first = this.getControllerAt(0);
		this.m_rewardLabel = <fgui.GTextField>(this.getChildAt(1));
		this.m_AdTimesLabel = <fgui.GTextField>(this.getChildAt(2));
		this.m_vivoUI = <fgui.GLoader>(this.getChildAt(4));
		this.m_txt = <fgui.GTextField>(this.getChildAt(5));
	}
}