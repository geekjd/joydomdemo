/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_PassCardHead extends fgui.GComponent {

	public m_head:fgui.Transition;
	public m_arm:fgui.Transition;
	public m_lightRotate:fgui.Transition;
	public static URL:string = "ui://kk7g5mmmt2q71fc";

	public static createInstance():FGUI_PassCardHead {
		return <FGUI_PassCardHead>(fgui.UIPackage.createObject("GameMain", "PassCardHead"));
	}

	protected onConstruct():void {
		this.m_head = this.getTransitionAt(0);
		this.m_arm = this.getTransitionAt(1);
		this.m_lightRotate = this.getTransitionAt(2);
	}
}