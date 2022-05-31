/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_Component17 from "./FGUI_Component17";

export default class FGUI_skillDesComp extends fgui.GComponent {

	public m_skillDes:fgui.GTextField;
	public m_skillTipsbottomBtn:FGUI_Component17;
	public m_zhuanBtn:FGUI_Component17;
	public m_closeBtn:fgui.GButton;
	public static URL:string = "ui://kk7g5mmmpy6f196";

	public static createInstance():FGUI_skillDesComp {
		return <FGUI_skillDesComp>(fgui.UIPackage.createObject("GameMain", "skillDesComp"));
	}

	protected onConstruct():void {
		this.m_skillDes = <fgui.GTextField>(this.getChildAt(1));
		this.m_skillTipsbottomBtn = <FGUI_Component17>(this.getChildAt(2));
		this.m_zhuanBtn = <FGUI_Component17>(this.getChildAt(3));
		this.m_closeBtn = <fgui.GButton>(this.getChildAt(4));
	}
}