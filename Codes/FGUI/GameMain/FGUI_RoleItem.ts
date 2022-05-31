/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_RoleItem extends fgui.GComponent {

	public m_img_icon:fgui.GLoader;
	public static URL:string = "ui://kk7g5mmmjvqn1ro";

	public static createInstance():FGUI_RoleItem {
		return <FGUI_RoleItem>(fgui.UIPackage.createObject("GameMain", "RoleItem"));
	}

	protected onConstruct():void {
		this.m_img_icon = <fgui.GLoader>(this.getChildAt(1));
	}
}