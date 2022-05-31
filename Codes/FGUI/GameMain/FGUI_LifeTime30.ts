/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_LifeTime30 extends fgui.GComponent {

	public m_flash:fgui.Transition;
	public static URL:string = "ui://kk7g5mmmosvk1hd";

	public static createInstance():FGUI_LifeTime30 {
		return <FGUI_LifeTime30>(fgui.UIPackage.createObject("GameMain", "LifeTime30"));
	}

	protected onConstruct():void {
		this.m_flash = this.getTransitionAt(0);
	}
}