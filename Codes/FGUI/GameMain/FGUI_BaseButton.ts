/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_BaseButton extends fgui.GButton {

	public m_videoUI:fgui.GLoader;
	public static URL:string = "ui://kk7g5mmms9kj1h2";

	public static createInstance():FGUI_BaseButton {
		return <FGUI_BaseButton>(fgui.UIPackage.createObject("GameMain", "BaseButton"));
	}

	protected onConstruct():void {
		this.m_videoUI = <fgui.GLoader>(this.getChildAt(2));
	}
}