/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_HeadPos extends fgui.GComponent {

	public m_shadow:fgui.GLoader;
	public m_headimg:fgui.GLoader;
	public static URL:string = "ui://kk7g5mmmtlx61ei";

	public static createInstance():FGUI_HeadPos {
		return <FGUI_HeadPos>(fgui.UIPackage.createObject("GameMain", "HeadPos"));
	}

	protected onConstruct():void {
		this.m_shadow = <fgui.GLoader>(this.getChildAt(0));
		this.m_headimg = <fgui.GLoader>(this.getChildAt(1));
	}
}