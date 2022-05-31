/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_HeadPos from "./FGUI_HeadPos";
import FGUI_foreverItem from "./FGUI_foreverItem";
import FGUI_NewPropertyComp from "./FGUI_NewPropertyComp";
import FGUI_skillDesComp from "./FGUI_skillDesComp";
import FGUI_UnblockSkinBtnp from "./FGUI_UnblockSkinBtnp";
import FGUI_HeroUpGradeBtn from "./FGUI_HeroUpGradeBtn";

export default class FGUI_TopItem extends fgui.GComponent {

	public m_model:fgui.Controller;
	public m_headimg:FGUI_HeadPos;
	public m_skill1:FGUI_foreverItem;
	public m_skill2:FGUI_foreverItem;
	public m_skill3:FGUI_foreverItem;
	public m_buffSlots:fgui.GGroup;
	public m_NewPropertyCom:FGUI_NewPropertyComp;
	public m_skillDesCom:FGUI_skillDesComp;
	public m_UnblockSkinBtn:FGUI_UnblockSkinBtnp;
	public m_HeroUpGradeBtn:FGUI_HeroUpGradeBtn;
	public m_choseChar:fgui.GButton;
	public m_modelList:fgui.GList;
	public m_HeroName:fgui.GTextField;
	public m_DegreeNum:fgui.GTextField;
	public m_prevBtn:fgui.GButton;
	public m_nextBtn:fgui.GButton;
	public static URL:string = "ui://kk7g5mmmngfc18l";

	public static createInstance():FGUI_TopItem {
		return <FGUI_TopItem>(fgui.UIPackage.createObject("GameMain", "TopItem"));
	}

	protected onConstruct():void {
		this.m_model = this.getControllerAt(0);
		this.m_headimg = <FGUI_HeadPos>(this.getChildAt(1));
		this.m_skill1 = <FGUI_foreverItem>(this.getChildAt(2));
		this.m_skill2 = <FGUI_foreverItem>(this.getChildAt(3));
		this.m_skill3 = <FGUI_foreverItem>(this.getChildAt(4));
		this.m_buffSlots = <fgui.GGroup>(this.getChildAt(5));
		this.m_NewPropertyCom = <FGUI_NewPropertyComp>(this.getChildAt(6));
		this.m_skillDesCom = <FGUI_skillDesComp>(this.getChildAt(7));
		this.m_UnblockSkinBtn = <FGUI_UnblockSkinBtnp>(this.getChildAt(8));
		this.m_HeroUpGradeBtn = <FGUI_HeroUpGradeBtn>(this.getChildAt(9));
		this.m_choseChar = <fgui.GButton>(this.getChildAt(10));
		this.m_modelList = <fgui.GList>(this.getChildAt(11));
		this.m_HeroName = <fgui.GTextField>(this.getChildAt(13));
		this.m_DegreeNum = <fgui.GTextField>(this.getChildAt(14));
		this.m_prevBtn = <fgui.GButton>(this.getChildAt(16));
		this.m_nextBtn = <fgui.GButton>(this.getChildAt(17));
	}
}