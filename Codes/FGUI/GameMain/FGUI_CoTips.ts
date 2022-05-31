/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_CoTips extends fgui.GComponent {

	public m_Title:fgui.GTextField;
	public m_Tips:fgui.GTextField;
	public static URL:string = "ui://kk7g5mmmnr2i1he";

	public static createInstance():FGUI_CoTips {
		return <FGUI_CoTips>(fgui.UIPackage.createObject("GameMain", "CoTips"));
	}

	protected onConstruct():void {
		this.m_Title = <fgui.GTextField>(this.getChildAt(0));
		this.m_Tips = <fgui.GTextField>(this.getChildAt(3));
	}
}