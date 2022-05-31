/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_BoxRewardBtn from "./FGUI_BoxRewardBtn";
import FGUI_GameBoxconfirm from "./FGUI_GameBoxconfirm";

export default class FGUI_PGameBox extends fgui.GComponent {

	public m_icon:fgui.GLoader;
	public m_closeBtn:fgui.GButton;
	public m_nameLabel:fgui.GTextField;
	public m_getBtn:FGUI_BoxRewardBtn;
	public m_goldLabel:fgui.GTextField;
	public m_spLabel:fgui.GTextField;
	public m_confirm:FGUI_GameBoxconfirm;
	public static URL:string = "ui://kk7g5mmmwzbk1h5";

	public static createInstance():FGUI_PGameBox {
		return <FGUI_PGameBox>(fgui.UIPackage.createObject("GameMain", "PGameBox"));
	}

	protected onConstruct():void {
		this.m_icon = <fgui.GLoader>(this.getChildAt(4));
		this.m_closeBtn = <fgui.GButton>(this.getChildAt(5));
		this.m_nameLabel = <fgui.GTextField>(this.getChildAt(8));
		this.m_getBtn = <FGUI_BoxRewardBtn>(this.getChildAt(13));
		this.m_goldLabel = <fgui.GTextField>(this.getChildAt(15));
		this.m_spLabel = <fgui.GTextField>(this.getChildAt(17));
		this.m_confirm = <FGUI_GameBoxconfirm>(this.getChildAt(18));
	}
}