/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_SkillCom from "./FGUI_SkillCom";

export default class FGUI_chooseSkillCom extends fgui.GComponent {

	public m_s1:FGUI_SkillCom;
	public m_s2:FGUI_SkillCom;
	public static URL:string = "ui://kk7g5mmmorqz1ay";

	public static createInstance():FGUI_chooseSkillCom {
		return <FGUI_chooseSkillCom>(fgui.UIPackage.createObject("GameMain", "chooseSkillCom"));
	}

	protected onConstruct():void {
		this.m_s1 = <FGUI_SkillCom>(this.getChildAt(3));
		this.m_s2 = <FGUI_SkillCom>(this.getChildAt(4));
	}
}