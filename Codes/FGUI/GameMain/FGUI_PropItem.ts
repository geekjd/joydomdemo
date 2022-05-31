/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_PropItem extends fgui.GComponent {

	public m_img_bg:fgui.GLoader;
	public m_img_propIcon:fgui.GLoader;
	public static URL:string = "ui://kk7g5mmmeo871rx";

	public static createInstance():FGUI_PropItem {
		return <FGUI_PropItem>(fgui.UIPackage.createObject("GameMain", "PropItem"));
	}

	protected onConstruct():void {
		this.m_img_bg = <fgui.GLoader>(this.getChildAt(0));
		this.m_img_propIcon = <fgui.GLoader>(this.getChildAt(1));
	}
}