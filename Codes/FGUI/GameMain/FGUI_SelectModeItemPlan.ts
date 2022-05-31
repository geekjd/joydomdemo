/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_SelectModeItem from "./FGUI_SelectModeItem";
import FGUI_SelectModeButton from "./FGUI_SelectModeButton";

export default class FGUI_SelectModeItemPlan extends fgui.GButton {

	public m_ItemCon:fgui.Controller;
	public m_SelectModeItem:FGUI_SelectModeItem;
	public m_TipsButton:FGUI_SelectModeButton;
	public static URL:string = "ui://kk7g5mmmh7p81dh";

	public static createInstance():FGUI_SelectModeItemPlan {
		return <FGUI_SelectModeItemPlan>(fgui.UIPackage.createObject("GameMain", "SelectModeItemPlan"));
	}

	protected onConstruct():void {
		this.m_ItemCon = this.getControllerAt(0);
		this.m_SelectModeItem = <FGUI_SelectModeItem>(this.getChildAt(0));
		this.m_TipsButton = <FGUI_SelectModeButton>(this.getChildAt(1));
	}
}