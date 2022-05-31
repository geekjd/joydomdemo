/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_PPassCardTop from "./FGUI_PPassCardTop";
import FGUI_PassCardListCom from "./FGUI_PassCardListCom";
import FGUI_PConfirm from "./FGUI_PConfirm";

export default class FGUI_PPassCard extends fgui.GComponent {

	public m_top:FGUI_PPassCardTop;
	public m_listCom:FGUI_PassCardListCom;
	public m_btnReturn:fgui.GButton;
	public m_expBar:fgui.GProgressBar;
	public m_passLv:fgui.GTextField;
	public m_expTxt:fgui.GTextField;
	public m_expCom:fgui.GGroup;
	public m_buyLvCom:FGUI_PConfirm;
	public static URL:string = "ui://kk7g5mmmxo4z1bk";

	public static createInstance():FGUI_PPassCard {
		return <FGUI_PPassCard>(fgui.UIPackage.createObject("GameMain", "PPassCard"));
	}

	protected onConstruct():void {
		this.m_top = <FGUI_PPassCardTop>(this.getChildAt(1));
		this.m_listCom = <FGUI_PassCardListCom>(this.getChildAt(2));
		this.m_btnReturn = <fgui.GButton>(this.getChildAt(4));
		this.m_expBar = <fgui.GProgressBar>(this.getChildAt(5));
		this.m_passLv = <fgui.GTextField>(this.getChildAt(8));
		this.m_expTxt = <fgui.GTextField>(this.getChildAt(9));
		this.m_expCom = <fgui.GGroup>(this.getChildAt(10));
		this.m_buyLvCom = <FGUI_PConfirm>(this.getChildAt(11));
	}
}