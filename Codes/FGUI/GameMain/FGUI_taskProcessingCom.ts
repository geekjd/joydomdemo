/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_taskProcessingCom extends fgui.GComponent {

	public m_taskTittle:fgui.GRichTextField;
	public m_taskDescription:fgui.GRichTextField;
	public m_taskProgress:fgui.GProgressBar;
	public static URL:string = "ui://kk7g5mmmorqz1b1";

	public static createInstance():FGUI_taskProcessingCom {
		return <FGUI_taskProcessingCom>(fgui.UIPackage.createObject("GameMain", "taskProcessingCom"));
	}

	protected onConstruct():void {
		this.m_taskTittle = <fgui.GRichTextField>(this.getChildAt(0));
		this.m_taskDescription = <fgui.GRichTextField>(this.getChildAt(1));
		this.m_taskProgress = <fgui.GProgressBar>(this.getChildAt(2));
	}
}