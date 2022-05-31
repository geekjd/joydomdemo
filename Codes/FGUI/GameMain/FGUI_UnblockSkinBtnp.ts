/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_UnblockSkinBtnp extends fgui.GButton {

	public m_bg:fgui.GLoader;
	public m_numLabel:fgui.GTextField;
	public static URL:string = "ui://kk7g5mmmngfc18n";

	public static createInstance():FGUI_UnblockSkinBtnp {
		return <FGUI_UnblockSkinBtnp>(fgui.UIPackage.createObject("GameMain", "UnblockSkinBtnp"));
	}

	protected onConstruct():void {
		this.m_bg = <fgui.GLoader>(this.getChildAt(0));
		this.m_numLabel = <fgui.GTextField>(this.getChildAt(2));
	}
}