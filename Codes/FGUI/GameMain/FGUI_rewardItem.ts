/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_rewardItem extends fgui.GComponent {

	public m_type:fgui.Controller;
	public m_rewardImg:fgui.GLoader;
	public m_heroIcon:fgui.GLoader;
	public m_count:fgui.GTextField;
	public static URL:string = "ui://kk7g5mmmxo4z1c3";

	public static createInstance():FGUI_rewardItem {
		return <FGUI_rewardItem>(fgui.UIPackage.createObject("GameMain", "rewardItem"));
	}

	protected onConstruct():void {
		this.m_type = this.getControllerAt(0);
		this.m_rewardImg = <fgui.GLoader>(this.getChildAt(3));
		this.m_heroIcon = <fgui.GLoader>(this.getChildAt(4));
		this.m_count = <fgui.GTextField>(this.getChildAt(5));
	}
}