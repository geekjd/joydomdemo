/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_FreeRewardBtn extends fgui.GButton {

	public m_vivoUI:fgui.GLoader;
	public static URL:string = "ui://kk7g5mmmgakg1g8";

	public static createInstance():FGUI_FreeRewardBtn {
		return <FGUI_FreeRewardBtn>(fgui.UIPackage.createObject("GameMain", "FreeRewardBtn"));
	}

	protected onConstruct():void {
		this.m_vivoUI = <fgui.GLoader>(this.getChildAt(2));
	}
}