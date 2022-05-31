/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_Component16 extends fgui.GButton {

	public m_bg:fgui.GLoader;
	public static URL:string = "ui://kk7g5mmmexxd18v";

	public static createInstance():FGUI_Component16 {
		return <FGUI_Component16>(fgui.UIPackage.createObject("GameMain", "Component16"));
	}

	protected onConstruct():void {
		this.m_bg = <fgui.GLoader>(this.getChildAt(0));
	}
}