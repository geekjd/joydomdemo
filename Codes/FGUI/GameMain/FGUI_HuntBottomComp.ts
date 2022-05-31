/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_BlockComp from "./FGUI_BlockComp";

export default class FGUI_HuntBottomComp extends fgui.GComponent {

	public m_UnblockNum:fgui.GTextField;
	public m_UnblockNumDes:fgui.GTextField;
	public m_UnBlockList:fgui.GList;
	public m_BlockComp:FGUI_BlockComp;
	public static URL:string = "ui://kk7g5mmmvgsf1ej";

	public static createInstance():FGUI_HuntBottomComp {
		return <FGUI_HuntBottomComp>(fgui.UIPackage.createObject("GameMain", "HuntBottomComp"));
	}

	protected onConstruct():void {
		this.m_UnblockNum = <fgui.GTextField>(this.getChildAt(1));
		this.m_UnblockNumDes = <fgui.GTextField>(this.getChildAt(2));
		this.m_UnBlockList = <fgui.GList>(this.getChildAt(3));
		this.m_BlockComp = <FGUI_BlockComp>(this.getChildAt(4));
	}
}