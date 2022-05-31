/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_EndTaskBar extends fgui.GProgressBar {

	public m_Bg:fgui.GLoader;
	public m_Tips:fgui.GTextField;
	public static URL:string = "ui://kk7g5mmmiiis1e1";

	public static createInstance():FGUI_EndTaskBar {
		return <FGUI_EndTaskBar>(fgui.UIPackage.createObject("GameMain", "EndTaskBar"));
	}

	protected onConstruct():void {
		this.m_Bg = <fgui.GLoader>(this.getChildAt(0));
		this.m_Tips = <fgui.GTextField>(this.getChildAt(2));
	}
}