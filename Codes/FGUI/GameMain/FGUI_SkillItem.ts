/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_SkillItem extends fgui.GComponent {

	public m_img_icon:fgui.GLoader;
	public static URL:string = "ui://kk7g5mmmjvqn1rs";

	public static createInstance():FGUI_SkillItem {
		return <FGUI_SkillItem>(fgui.UIPackage.createObject("GameMain", "SkillItem"));
	}

	protected onConstruct():void {
		this.m_img_icon = <fgui.GLoader>(this.getChildAt(0));
	}
}