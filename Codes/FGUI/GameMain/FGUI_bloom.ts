/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_bloom extends fgui.GProgressBar {

	public m_bg:fgui.GLoader;
	public static URL:string = "ui://kk7g5mmmjfzj1ot";

	public static createInstance():FGUI_bloom {
		return <FGUI_bloom>(fgui.UIPackage.createObject("GameMain", "bloom"));
	}

	protected onConstruct():void {
		this.m_bg = <fgui.GLoader>(this.getChildAt(0));
	}
}