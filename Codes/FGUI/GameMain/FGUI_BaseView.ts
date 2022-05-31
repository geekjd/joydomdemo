/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_BaseView extends fgui.GComponent {

	public m_img_bg:fgui.GImage;
	public m_building_plant:fgui.GButton;
	public m_building_lab:fgui.GButton;
	public m_building_HQ:fgui.GButton;
	public m_lab_level:fgui.GTextField;
	public m_lab_time:fgui.GTextField;
	public static URL:string = "ui://kk7g5mmmtcc71sa";

	public static createInstance():FGUI_BaseView {
		return <FGUI_BaseView>(fgui.UIPackage.createObject("GameMain", "BaseView"));
	}

	protected onConstruct():void {
		this.m_img_bg = <fgui.GImage>(this.getChildAt(0));
		this.m_building_plant = <fgui.GButton>(this.getChildAt(1));
		this.m_building_lab = <fgui.GButton>(this.getChildAt(3));
		this.m_building_HQ = <fgui.GButton>(this.getChildAt(5));
		this.m_lab_level = <fgui.GTextField>(this.getChildAt(7));
		this.m_lab_time = <fgui.GTextField>(this.getChildAt(10));
	}
}