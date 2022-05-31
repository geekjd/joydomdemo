/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_RoleHeadItem extends fgui.GComponent {

	public m_img_bg:fgui.GLoader;
	public m_lab_level:fgui.GTextField;
	public m_img_head:fgui.GLoader;
	public m_img_nameBg:fgui.GLoader;
	public m_lab_name:fgui.GTextField;
	public m_lab_weaponName:fgui.GTextField;
	public m_img_fight:fgui.GLoader;
	public static URL:string = "ui://kk7g5mmmjvqn1ru";

	public static createInstance():FGUI_RoleHeadItem {
		return <FGUI_RoleHeadItem>(fgui.UIPackage.createObject("GameMain", "RoleHeadItem"));
	}

	protected onConstruct():void {
		this.m_img_bg = <fgui.GLoader>(this.getChildAt(0));
		this.m_lab_level = <fgui.GTextField>(this.getChildAt(1));
		this.m_img_head = <fgui.GLoader>(this.getChildAt(2));
		this.m_img_nameBg = <fgui.GLoader>(this.getChildAt(3));
		this.m_lab_name = <fgui.GTextField>(this.getChildAt(4));
		this.m_lab_weaponName = <fgui.GTextField>(this.getChildAt(5));
		this.m_img_fight = <fgui.GLoader>(this.getChildAt(6));
	}
}