/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_timeCom extends fgui.GComponent {

	public m_timeTxt:fgui.GTextField;
	public static URL:string = "ui://kk7g5mmmorqz1as";

	public static createInstance():FGUI_timeCom {
		return <FGUI_timeCom>(fgui.UIPackage.createObject("GameMain", "timeCom"));
	}

	protected onConstruct():void {
		this.m_timeTxt = <fgui.GTextField>(this.getChildAt(1));
	}
}