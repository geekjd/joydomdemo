/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_FreeRewardItem from "./FGUI_FreeRewardItem";

export default class FGUI_FreeReward extends fgui.GComponent {

	public m_allClear:fgui.Controller;
	public m_bg:fgui.GLoader;
	public m_bg2:fgui.GLoader;
	public m_closeBtn2:fgui.GLoader;
	public m_item1:FGUI_FreeRewardItem;
	public m_item2:FGUI_FreeRewardItem;
	public m_item3:FGUI_FreeRewardItem;
	public m_item4:FGUI_FreeRewardItem;
	public m_t16:fgui.GTextField;
	public m_newTime:fgui.GTextField;
	public m_closeBtn:fgui.GButton;
	public static URL:string = "ui://kk7g5mmmgakg1g6";

	public static createInstance():FGUI_FreeReward {
		return <FGUI_FreeReward>(fgui.UIPackage.createObject("GameMain", "FreeReward"));
	}

	protected onConstruct():void {
		this.m_allClear = this.getControllerAt(0);
		this.m_bg = <fgui.GLoader>(this.getChildAt(0));
		this.m_bg2 = <fgui.GLoader>(this.getChildAt(1));
		this.m_closeBtn2 = <fgui.GLoader>(this.getChildAt(2));
		this.m_item1 = <FGUI_FreeRewardItem>(this.getChildAt(3));
		this.m_item2 = <FGUI_FreeRewardItem>(this.getChildAt(4));
		this.m_item3 = <FGUI_FreeRewardItem>(this.getChildAt(5));
		this.m_item4 = <FGUI_FreeRewardItem>(this.getChildAt(6));
		this.m_t16 = <fgui.GTextField>(this.getChildAt(12));
		this.m_newTime = <fgui.GTextField>(this.getChildAt(13));
		this.m_closeBtn = <fgui.GButton>(this.getChildAt(15));
	}
}