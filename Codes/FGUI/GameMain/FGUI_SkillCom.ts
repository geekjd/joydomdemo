/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_SkillCom extends fgui.GComponent {

	public m_skillName:fgui.GTextField;
	public m_skillImg:fgui.GLoader;
	public static URL:string = "ui://kk7g5mmmorqz1ax";

	public static createInstance():FGUI_SkillCom {
		return <FGUI_SkillCom>(fgui.UIPackage.createObject("GameMain", "SkillCom"));
	}

	protected onConstruct():void {
		this.m_skillName = <fgui.GTextField>(this.getChildAt(1));
		this.m_skillImg = <fgui.GLoader>(this.getChildAt(3));
	}
}