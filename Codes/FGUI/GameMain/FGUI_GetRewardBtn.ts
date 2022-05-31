/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_GetRewardBtn extends fgui.GComponent {

	public m_bounce:fgui.Transition;
	public static URL:string = "ui://kk7g5mmmnigj1ex";

	public static createInstance():FGUI_GetRewardBtn {
		return <FGUI_GetRewardBtn>(fgui.UIPackage.createObject("GameMain", "GetRewardBtn"));
	}

	protected onConstruct():void {
		this.m_bounce = this.getTransitionAt(0);
	}
}