/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_huntTaskBoard from "./FGUI_huntTaskBoard";

export default class FGUI_PHuntTask extends fgui.GComponent {

	public m_taskBoard:FGUI_huntTaskBoard;
	public static URL:string = "ui://kk7g5mmmorqz1az";

	public static createInstance():FGUI_PHuntTask {
		return <FGUI_PHuntTask>(fgui.UIPackage.createObject("GameMain", "PHuntTask"));
	}

	protected onConstruct():void {
		this.m_taskBoard = <FGUI_huntTaskBoard>(this.getChildAt(1));
	}
}