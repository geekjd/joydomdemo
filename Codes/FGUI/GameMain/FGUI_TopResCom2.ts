/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_MainResitem from "./FGUI_MainResitem";

export default class FGUI_TopResCom2 extends fgui.GComponent {

	public m_AddDiamon:FGUI_MainResitem;
	public m_AddGold:FGUI_MainResitem;
	public static URL:string = "ui://kk7g5mmmpy6f195";

	public static createInstance():FGUI_TopResCom2 {
		return <FGUI_TopResCom2>(fgui.UIPackage.createObject("GameMain", "TopResCom2"));
	}

	protected onConstruct():void {
		this.m_AddDiamon = <FGUI_MainResitem>(this.getChildAt(0));
		this.m_AddGold = <FGUI_MainResitem>(this.getChildAt(1));
	}
}