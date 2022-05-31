/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_BaseUpgradeView extends fgui.GComponent {

	public m_img_bg:fgui.GLoader;
	public m_lab_level:fgui.GTextField;
	public m_btn_colse:fgui.GButton;
	public m_lab_efficiency1:fgui.GTextField;
	public m_list_prop1:fgui.GList;
	public m_lab_efficiency2:fgui.GTextField;
	public m_list_prop2:fgui.GList;
	public m_lab_time1:fgui.GTextField;
	public m_lab_time2:fgui.GTextField;
	public m_list_expend:fgui.GList;
	public m_btn_upgrade:fgui.GButton;
	public static URL:string = "ui://kk7g5mmmtcc71sd";

	public static createInstance():FGUI_BaseUpgradeView {
		return <FGUI_BaseUpgradeView>(fgui.UIPackage.createObject("GameMain", "BaseUpgradeView"));
	}

	protected onConstruct():void {
		this.m_img_bg = <fgui.GLoader>(this.getChildAt(0));
		this.m_lab_level = <fgui.GTextField>(this.getChildAt(1));
		this.m_btn_colse = <fgui.GButton>(this.getChildAt(2));
		this.m_lab_efficiency1 = <fgui.GTextField>(this.getChildAt(7));
		this.m_list_prop1 = <fgui.GList>(this.getChildAt(8));
		this.m_lab_efficiency2 = <fgui.GTextField>(this.getChildAt(12));
		this.m_list_prop2 = <fgui.GList>(this.getChildAt(13));
		this.m_lab_time1 = <fgui.GTextField>(this.getChildAt(17));
		this.m_lab_time2 = <fgui.GTextField>(this.getChildAt(20));
		this.m_list_expend = <fgui.GList>(this.getChildAt(24));
		this.m_btn_upgrade = <fgui.GButton>(this.getChildAt(25));
	}
}