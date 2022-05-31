/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_EnemyIconPlan extends fgui.GComponent {

	public m_TarGetIcon:fgui.GLoader;
	public static URL:string = "ui://kk7g5mmmiiis1e2";

	public static createInstance():FGUI_EnemyIconPlan {
		return <FGUI_EnemyIconPlan>(fgui.UIPackage.createObject("GameMain", "EnemyIconPlan"));
	}

	protected onConstruct():void {
		this.m_TarGetIcon = <fgui.GLoader>(this.getChildAt(2));
	}
}