/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_UniversalTwoEndPlan extends fgui.GComponent {

	public m_ItemIcon:fgui.GLoader;
	public m_ItemTxt:fgui.GTextField;
	public m_ItemIconCup:fgui.GLoader;
	public m_ItemCountCup:fgui.GTextField;
	public static URL:string = "ui://kk7g5mmmiiis1dz";

	public static createInstance():FGUI_UniversalTwoEndPlan {
		return <FGUI_UniversalTwoEndPlan>(fgui.UIPackage.createObject("GameMain", "UniversalTwoEndPlan"));
	}

	protected onConstruct():void {
		this.m_ItemIcon = <fgui.GLoader>(this.getChildAt(1));
		this.m_ItemTxt = <fgui.GTextField>(this.getChildAt(2));
		this.m_ItemIconCup = <fgui.GLoader>(this.getChildAt(3));
		this.m_ItemCountCup = <fgui.GTextField>(this.getChildAt(4));
	}
}