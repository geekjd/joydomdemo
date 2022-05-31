/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_nativeCom extends fgui.GButton {

	public m_adIcon:fgui.GLoader;
	public static URL:string = "ui://kk7g5mmmdkf91nm";

	public static createInstance():FGUI_nativeCom {
		return <FGUI_nativeCom>(fgui.UIPackage.createObject("GameMain", "nativeCom"));
	}

	protected onConstruct():void {
		this.m_adIcon = <fgui.GLoader>(this.getChildAt(2));
	}
}