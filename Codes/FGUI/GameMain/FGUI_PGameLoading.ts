/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_PGameLoading extends fgui.GComponent {

	public m_progress:fgui.GProgressBar;
	public m_text:fgui.GTextField;
	public m_t0:fgui.Transition;
	public static URL:string = "ui://kk7g5mmmg7a1o";

	public static createInstance():FGUI_PGameLoading {
		return <FGUI_PGameLoading>(fgui.UIPackage.createObject("GameMain", "PGameLoading"));
	}

	protected onConstruct():void {
		this.m_progress = <fgui.GProgressBar>(this.getChildAt(1));
		this.m_text = <fgui.GTextField>(this.getChildAt(2));
		this.m_t0 = this.getTransitionAt(0);
	}
}