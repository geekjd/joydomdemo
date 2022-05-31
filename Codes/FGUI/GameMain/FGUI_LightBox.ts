/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_LightBox extends fgui.GComponent {

	public m_light:fgui.Transition;
	public static URL:string = "ui://kk7g5mmmlqz41fq";

	public static createInstance():FGUI_LightBox {
		return <FGUI_LightBox>(fgui.UIPackage.createObject("GameMain", "LightBox"));
	}

	protected onConstruct():void {
		this.m_light = this.getTransitionAt(0);
	}
}