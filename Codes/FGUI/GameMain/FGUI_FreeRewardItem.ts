/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_FreeRewardBtn from "./FGUI_FreeRewardBtn";

export default class FGUI_FreeRewardItem extends fgui.GComponent {

	public m_state:fgui.Controller;
	public m_nameLabel:fgui.GTextField;
	public m_lqBtn:FGUI_FreeRewardBtn;
	public m_iconbg:fgui.GLoader;
	public m_icon:fgui.GLoader;
	public m_rewardsMask:fgui.GLoader;
	public m_rewrdsNum:fgui.GTextField;
	public static URL:string = "ui://kk7g5mmmgakg1g7";

	public static createInstance():FGUI_FreeRewardItem {
		return <FGUI_FreeRewardItem>(fgui.UIPackage.createObject("GameMain", "FreeRewardItem"));
	}

	protected onConstruct():void {
		this.m_state = this.getControllerAt(0);
		this.m_nameLabel = <fgui.GTextField>(this.getChildAt(2));
		this.m_lqBtn = <FGUI_FreeRewardBtn>(this.getChildAt(3));
		this.m_iconbg = <fgui.GLoader>(this.getChildAt(7));
		this.m_icon = <fgui.GLoader>(this.getChildAt(8));
		this.m_rewardsMask = <fgui.GLoader>(this.getChildAt(10));
		this.m_rewrdsNum = <fgui.GTextField>(this.getChildAt(11));
	}
}