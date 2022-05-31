/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_SelectModeItem extends fgui.GButton {

	public m_ItemCon:fgui.Controller;
	public m_ItemIcon:fgui.GLoader;
	public m_RightModeTxt:fgui.GTextField;
	public m_leftTopTxt:fgui.GTextField;
	public static URL:string = "ui://kk7g5mmmp6f51d9";

	public static createInstance():FGUI_SelectModeItem {
		return <FGUI_SelectModeItem>(fgui.UIPackage.createObject("GameMain", "SelectModeItem"));
	}

	protected onConstruct():void {
		this.m_ItemCon = this.getControllerAt(0);
		this.m_ItemIcon = <fgui.GLoader>(this.getChildAt(2));
		this.m_RightModeTxt = <fgui.GTextField>(this.getChildAt(3));
		this.m_leftTopTxt = <fgui.GTextField>(this.getChildAt(4));
	}
}