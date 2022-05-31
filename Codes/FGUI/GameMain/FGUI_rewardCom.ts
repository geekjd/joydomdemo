/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_rewardCom extends fgui.GComponent {

	public m_rewardImg:fgui.GLoader;
	public m_rewardCount:fgui.GTextField;
	public static URL:string = "ui://kk7g5mmmorqz1b2";

	public static createInstance():FGUI_rewardCom {
		return <FGUI_rewardCom>(fgui.UIPackage.createObject("GameMain", "rewardCom"));
	}

	protected onConstruct():void {
		this.m_rewardImg = <fgui.GLoader>(this.getChildAt(1));
		this.m_rewardCount = <fgui.GTextField>(this.getChildAt(2));
	}
}