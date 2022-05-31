/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_taskBtnFinishedCout extends fgui.GComponent {

	public m_taskCount:fgui.GTextField;
	public static URL:string = "ui://kk7g5mmmorqz1b8";

	public static createInstance():FGUI_taskBtnFinishedCout {
		return <FGUI_taskBtnFinishedCout>(fgui.UIPackage.createObject("GameMain", "taskBtnFinishedCout"));
	}

	protected onConstruct():void {
		this.m_taskCount = <fgui.GTextField>(this.getChildAt(2));
	}
}