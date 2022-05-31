/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_BoxRewardBtn extends fgui.GButton {

	public m_videoUI:fgui.GLoader;
	public static URL:string = "ui://kk7g5mmmwzbk1h6";

	public static createInstance():FGUI_BoxRewardBtn {
		return <FGUI_BoxRewardBtn>(fgui.UIPackage.createObject("GameMain", "BoxRewardBtn"));
	}

	protected onConstruct():void {
		this.m_videoUI = <fgui.GLoader>(this.getChildAt(1));
	}
}