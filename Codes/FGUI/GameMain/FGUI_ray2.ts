/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_ray2 extends fgui.GComponent {

	public m_t0:fgui.Transition;
	public static URL:string = "ui://kk7g5mmmxo4z1by";

	public static createInstance():FGUI_ray2 {
		return <FGUI_ray2>(fgui.UIPackage.createObject("GameMain", "ray2"));
	}

	protected onConstruct():void {
		this.m_t0 = this.getTransitionAt(0);
	}
}