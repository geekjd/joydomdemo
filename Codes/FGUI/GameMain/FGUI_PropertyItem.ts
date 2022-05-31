/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_PropertyItem extends fgui.GComponent {

	public m_lab_name:fgui.GTextField;
	public m_lab_level:fgui.GTextField;
	public m_lab_harm:fgui.GTextField;
	public m_ProgressBar_harm:fgui.GProgressBar;
	public m_lab_hp:fgui.GTextField;
	public m_ProgressBar_hp:fgui.GProgressBar;
	public m_lab_range:fgui.GTextField;
	public m_ProgressBar_range:fgui.GProgressBar;
	public m_lab_attack:fgui.GTextField;
	public static URL:string = "ui://kk7g5mmmjvqn1rq";

	public static createInstance():FGUI_PropertyItem {
		return <FGUI_PropertyItem>(fgui.UIPackage.createObject("GameMain", "PropertyItem"));
	}

	protected onConstruct():void {
		this.m_lab_name = <fgui.GTextField>(this.getChildAt(0));
		this.m_lab_level = <fgui.GTextField>(this.getChildAt(1));
		this.m_lab_harm = <fgui.GTextField>(this.getChildAt(14));
		this.m_ProgressBar_harm = <fgui.GProgressBar>(this.getChildAt(15));
		this.m_lab_hp = <fgui.GTextField>(this.getChildAt(17));
		this.m_ProgressBar_hp = <fgui.GProgressBar>(this.getChildAt(18));
		this.m_lab_range = <fgui.GTextField>(this.getChildAt(20));
		this.m_ProgressBar_range = <fgui.GProgressBar>(this.getChildAt(21));
		this.m_lab_attack = <fgui.GTextField>(this.getChildAt(23));
	}
}