/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_Component20 extends fgui.GComponent {

	public m_title:fgui.GTextField;
	public static URL:string = "ui://kk7g5mmmrbpj1nv";

	public static createInstance():FGUI_Component20 {
		return <FGUI_Component20>(fgui.UIPackage.createObject("GameMain", "Component20"));
	}

	protected onConstruct():void {
		this.m_title = <fgui.GTextField>(this.getChildAt(1));
	}
}