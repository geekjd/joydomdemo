/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_SkillCom from "./FGUI_SkillCom";
import FGUI_DesBtnp from "./FGUI_DesBtnp";

export default class FGUI_SkillSelect extends fgui.GComponent {

	public m_state:fgui.Controller;
	public m_select:fgui.Controller;
	public m_skill:FGUI_SkillCom;
	public m_selected:fgui.GLoader;
	public m_DesBtn:FGUI_DesBtnp;
	public m_mask:fgui.GLoader;
	public static URL:string = "ui://kk7g5mmmn1zd1g3";

	public static createInstance():FGUI_SkillSelect {
		return <FGUI_SkillSelect>(fgui.UIPackage.createObject("GameMain", "SkillSelect"));
	}

	protected onConstruct():void {
		this.m_state = this.getControllerAt(0);
		this.m_select = this.getControllerAt(1);
		this.m_skill = <FGUI_SkillCom>(this.getChildAt(0));
		this.m_selected = <fgui.GLoader>(this.getChildAt(1));
		this.m_DesBtn = <FGUI_DesBtnp>(this.getChildAt(2));
		this.m_mask = <fgui.GLoader>(this.getChildAt(4));
	}
}