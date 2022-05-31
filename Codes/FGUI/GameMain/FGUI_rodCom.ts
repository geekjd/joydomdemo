/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_PassBuyLvBtn from "./FGUI_PassBuyLvBtn";

export default class FGUI_rodCom extends fgui.GComponent {

	public m_buyLv:FGUI_PassBuyLvBtn;
	public static URL:string = "ui://kk7g5mmmxo4z1bl";

	public static createInstance():FGUI_rodCom {
		return <FGUI_rodCom>(fgui.UIPackage.createObject("GameMain", "rodCom"));
	}

	protected onConstruct():void {
		this.m_buyLv = <FGUI_PassBuyLvBtn>(this.getChildAt(1));
	}
}