/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_PropertyItem1 from "./FGUI_PropertyItem1";
import FGUI_PropertyItem2 from "./FGUI_PropertyItem2";
import FGUI_PropertyItem3 from "./FGUI_PropertyItem3";
import FGUI_PropertyItem4 from "./FGUI_PropertyItem4";
import FGUI_DesBtnp from "./FGUI_DesBtnp";

export default class FGUI_NewPropertyComp extends fgui.GComponent {

	public m_item_1:FGUI_PropertyItem1;
	public m_item_2:FGUI_PropertyItem2;
	public m_item_3:FGUI_PropertyItem3;
	public m_item_4:FGUI_PropertyItem4;
	public m_DesBtn:FGUI_DesBtnp;
	public static URL:string = "ui://kk7g5mmmpy6f194";

	public static createInstance():FGUI_NewPropertyComp {
		return <FGUI_NewPropertyComp>(fgui.UIPackage.createObject("GameMain", "NewPropertyComp"));
	}

	protected onConstruct():void {
		this.m_item_1 = <FGUI_PropertyItem1>(this.getChildAt(1));
		this.m_item_2 = <FGUI_PropertyItem2>(this.getChildAt(2));
		this.m_item_3 = <FGUI_PropertyItem3>(this.getChildAt(3));
		this.m_item_4 = <FGUI_PropertyItem4>(this.getChildAt(4));
		this.m_DesBtn = <FGUI_DesBtnp>(this.getChildAt(6));
	}
}