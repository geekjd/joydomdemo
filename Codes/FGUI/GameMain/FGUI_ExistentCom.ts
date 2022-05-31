/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_bloom from "./FGUI_bloom";
import FGUI_ButItemOne from "./FGUI_ButItemOne";
import FGUI_waveRewrds from "./FGUI_waveRewrds";

export default class FGUI_ExistentCom extends fgui.GComponent {

	public m_waveBar:FGUI_bloom;
	public m_itemOne:FGUI_ButItemOne;
	public m_itemTwo:FGUI_ButItemOne;
	public m_itemThree:FGUI_ButItemOne;
	public m_itemFour:FGUI_ButItemOne;
	public m_itemFive:FGUI_ButItemOne;
	public m_waveRewrdsBtn:FGUI_waveRewrds;
	public m_WaveNum:fgui.GTextField;
	public static URL:string = "ui://kk7g5mmmjfzj1ol";

	public static createInstance():FGUI_ExistentCom {
		return <FGUI_ExistentCom>(fgui.UIPackage.createObject("GameMain", "ExistentCom"));
	}

	protected onConstruct():void {
		this.m_waveBar = <FGUI_bloom>(this.getChildAt(0));
		this.m_itemOne = <FGUI_ButItemOne>(this.getChildAt(1));
		this.m_itemTwo = <FGUI_ButItemOne>(this.getChildAt(2));
		this.m_itemThree = <FGUI_ButItemOne>(this.getChildAt(3));
		this.m_itemFour = <FGUI_ButItemOne>(this.getChildAt(4));
		this.m_itemFive = <FGUI_ButItemOne>(this.getChildAt(5));
		this.m_waveRewrdsBtn = <FGUI_waveRewrds>(this.getChildAt(6));
		this.m_WaveNum = <fgui.GTextField>(this.getChildAt(7));
	}
}