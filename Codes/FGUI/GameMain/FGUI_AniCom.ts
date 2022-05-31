/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_AniCom extends fgui.GComponent {

	public m_t0:fgui.Transition;
	public static URL:string = "ui://kk7g5mmma1h11lw";

	public static createInstance():FGUI_AniCom {
		return <FGUI_AniCom>(fgui.UIPackage.createObject("GameMain", "AniCom"));
	}

	protected onConstruct():void {
		this.m_t0 = this.getTransitionAt(0);
	}
}