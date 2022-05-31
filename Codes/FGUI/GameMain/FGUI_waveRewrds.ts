/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_waveRewrds extends fgui.GButton {

	public m_blue:fgui.GLoader;
	public m_rewrdsUI:fgui.GLoader;
	public static URL:string = "ui://kk7g5mmmjfzj1ov";

	public static createInstance():FGUI_waveRewrds {
		return <FGUI_waveRewrds>(fgui.UIPackage.createObject("GameMain", "waveRewrds"));
	}

	protected onConstruct():void {
		this.m_blue = <fgui.GLoader>(this.getChildAt(0));
		this.m_rewrdsUI = <fgui.GLoader>(this.getChildAt(1));
	}
}