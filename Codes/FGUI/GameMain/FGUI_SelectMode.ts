/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_SelectMode extends fgui.GComponent {

	public m_SelectModeList:fgui.GList;
	public static URL:string = "ui://kk7g5mmmh7p81de";

	public static createInstance():FGUI_SelectMode {
		return <FGUI_SelectMode>(fgui.UIPackage.createObject("GameMain", "SelectMode"));
	}

	protected onConstruct():void {
		this.m_SelectModeList = <fgui.GList>(this.getChildAt(0));
	}
}