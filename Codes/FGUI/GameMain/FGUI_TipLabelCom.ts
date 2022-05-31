/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_TipLabelCom extends fgui.GComponent {

	public m_tipLabel:fgui.GTextField;
	public m_showTip:fgui.Transition;
	public static URL:string = "ui://kk7g5mmmsm2d1gu";

	public static createInstance():FGUI_TipLabelCom {
		return <FGUI_TipLabelCom>(fgui.UIPackage.createObject("GameMain", "TipLabelCom"));
	}

	protected onConstruct():void {
		this.m_tipLabel = <fgui.GTextField>(this.getChildAt(0));
		this.m_showTip = this.getTransitionAt(0);
	}
}