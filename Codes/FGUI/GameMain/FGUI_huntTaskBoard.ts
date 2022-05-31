/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_taskBtn from "./FGUI_taskBtn";
import FGUI_adItem from "./FGUI_adItem";
import FGUI_Button1 from "./FGUI_Button1";

export default class FGUI_huntTaskBoard extends fgui.GComponent {

	public m_everyDayList:fgui.GList;
	public m_everyWeekList:fgui.GList;
	public m_animalFableList:fgui.GList;
	public m_everyDayBtn:FGUI_taskBtn;
	public m_everyWeekBtn:FGUI_taskBtn;
	public m_animalFableBtn:FGUI_taskBtn;
	public m_ad:FGUI_adItem;
	public m_closeBtn:fgui.GButton;
	public m_tipsBtnpp:FGUI_Button1;
	public static URL:string = "ui://kk7g5mmmorqz1b9";

	public static createInstance():FGUI_huntTaskBoard {
		return <FGUI_huntTaskBoard>(fgui.UIPackage.createObject("GameMain", "huntTaskBoard"));
	}

	protected onConstruct():void {
		this.m_everyDayList = <fgui.GList>(this.getChildAt(0));
		this.m_everyWeekList = <fgui.GList>(this.getChildAt(1));
		this.m_animalFableList = <fgui.GList>(this.getChildAt(2));
		this.m_everyDayBtn = <FGUI_taskBtn>(this.getChildAt(3));
		this.m_everyWeekBtn = <FGUI_taskBtn>(this.getChildAt(4));
		this.m_animalFableBtn = <FGUI_taskBtn>(this.getChildAt(5));
		this.m_ad = <FGUI_adItem>(this.getChildAt(6));
		this.m_closeBtn = <fgui.GButton>(this.getChildAt(9));
		this.m_tipsBtnpp = <FGUI_Button1>(this.getChildAt(10));
	}
}