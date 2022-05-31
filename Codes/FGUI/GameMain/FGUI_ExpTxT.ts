/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_ExpTxT extends fgui.GComponent {

	public m_Outtxt:fgui.GTextField;
	public m_t0:fgui.Transition;
	public static URL:string = "ui://kk7g5mmmngc61gy";

	public static createInstance():FGUI_ExpTxT {
		return <FGUI_ExpTxT>(fgui.UIPackage.createObject("GameMain", "ExpTxT"));
	}

	protected onConstruct():void {
		this.m_Outtxt = <fgui.GTextField>(this.getChildAt(0));
		this.m_t0 = this.getTransitionAt(0);
	}
}