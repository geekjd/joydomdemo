/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_homeTabCom from "./FGUI_homeTabCom";
import FGUI_MainResitem from "./FGUI_MainResitem";
import FGUI_TipLabelCom from "./FGUI_TipLabelCom";
import FGUI_SetCom from "./FGUI_SetCom";

export default class FGUI_PGameMain extends fgui.GComponent {

	public m_homeTabCom:FGUI_homeTabCom;
	public m_AddGold:FGUI_MainResitem;
	public m_AddDiamon:FGUI_MainResitem;
	public m_TopResCom:fgui.GGroup;
	public m_tipMask:fgui.GLoader;
	public m_tip:FGUI_TipLabelCom;
	public m_Ticket:FGUI_MainResitem;
	public m_SetComp:FGUI_SetCom;
	public m_showTip:fgui.Transition;
	public static URL:string = "ui://kk7g5mmmsyta9f";

	public static createInstance():FGUI_PGameMain {
		return <FGUI_PGameMain>(fgui.UIPackage.createObject("GameMain", "PGameMain"));
	}

	protected onConstruct():void {
		this.m_homeTabCom = <FGUI_homeTabCom>(this.getChildAt(0));
		this.m_AddGold = <FGUI_MainResitem>(this.getChildAt(1));
		this.m_AddDiamon = <FGUI_MainResitem>(this.getChildAt(2));
		this.m_TopResCom = <fgui.GGroup>(this.getChildAt(3));
		this.m_tipMask = <fgui.GLoader>(this.getChildAt(4));
		this.m_tip = <FGUI_TipLabelCom>(this.getChildAt(5));
		this.m_Ticket = <FGUI_MainResitem>(this.getChildAt(6));
		this.m_SetComp = <FGUI_SetCom>(this.getChildAt(7));
		this.m_showTip = this.getTransitionAt(0);
	}
}