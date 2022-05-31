/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_ActiveTopCom from "./FGUI_ActiveTopCom";

export default class FGUI_PGameActive extends fgui.GComponent {

	public m_AddDiamon:FGUI_ActiveTopCom;
	public m_ActiveList:fgui.GList;
	public static URL:string = "ui://kk7g5mmmexxd18t";

	public static createInstance():FGUI_PGameActive {
		return <FGUI_PGameActive>(fgui.UIPackage.createObject("GameMain", "PGameActive"));
	}

	protected onConstruct():void {
		this.m_AddDiamon = <FGUI_ActiveTopCom>(this.getChildAt(2));
		this.m_ActiveList = <fgui.GList>(this.getChildAt(3));
	}
}