/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_ComTips extends fgui.GComponent {

	public m_TipsCom_txt:fgui.GTextField;
	public m_t0:fgui.Transition;
	public static URL:string = "ui://kk7g5mmmaajw1n7";

	public static createInstance():FGUI_ComTips {
		return <FGUI_ComTips>(fgui.UIPackage.createObject("GameMain", "ComTips"));
	}

	protected onConstruct():void {
		this.m_TipsCom_txt = <fgui.GTextField>(this.getChildAt(0));
		this.m_t0 = this.getTransitionAt(0);
	}
}