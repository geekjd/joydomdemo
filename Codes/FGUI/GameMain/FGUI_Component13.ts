/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_Component13 extends fgui.GProgressBar {

	public m_bg:fgui.GLoader;
	public static URL:string = "ui://kk7g5mmmr3dt16u";

	public static createInstance():FGUI_Component13 {
		return <FGUI_Component13>(fgui.UIPackage.createObject("GameMain", "Component13"));
	}

	protected onConstruct():void {
		this.m_bg = <fgui.GLoader>(this.getChildAt(0));
	}
}