/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_AttackTxT extends fgui.GComponent {

	public m_OutTxt:fgui.GTextField;
	public m_t0:fgui.Transition;
	public static URL:string = "ui://kk7g5mmmngc61gx";

	public static createInstance():FGUI_AttackTxT {
		return <FGUI_AttackTxT>(fgui.UIPackage.createObject("GameMain", "AttackTxT"));
	}

	protected onConstruct():void {
		this.m_OutTxt = <fgui.GTextField>(this.getChildAt(0));
		this.m_t0 = this.getTransitionAt(0);
	}
}