/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_GameOverRole extends fgui.GComponent {

	public m_RolePlan:fgui.GLoader;
	public static URL:string = "ui://kk7g5mmmm8lw1fv";

	public static createInstance():FGUI_GameOverRole {
		return <FGUI_GameOverRole>(fgui.UIPackage.createObject("GameMain", "GameOverRole"));
	}

	protected onConstruct():void {
		this.m_RolePlan = <fgui.GLoader>(this.getChildAt(0));
	}
}