/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_TopItem from "./FGUI_TopItem";
import FGUI_HuntBottomComp from "./FGUI_HuntBottomComp";
import FGUI_UnLockSkin from "./FGUI_UnLockSkin";

export default class FGUI_PGameHunter extends fgui.GComponent {

	public m_Mask:fgui.GLoader;
	public m_huntTopCom:FGUI_TopItem;
	public m_HeroCom:FGUI_HuntBottomComp;
	public m_unlockSkin:FGUI_UnLockSkin;
	public static URL:string = "ui://kk7g5mmmngfc18k";

	public static createInstance():FGUI_PGameHunter {
		return <FGUI_PGameHunter>(fgui.UIPackage.createObject("GameMain", "PGameHunter"));
	}

	protected onConstruct():void {
		this.m_Mask = <fgui.GLoader>(this.getChildAt(0));
		this.m_huntTopCom = <FGUI_TopItem>(this.getChildAt(1));
		this.m_HeroCom = <FGUI_HuntBottomComp>(this.getChildAt(2));
		this.m_unlockSkin = <FGUI_UnLockSkin>(this.getChildAt(3));
	}
}