/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_MysteriousRewards extends fgui.GComponent {

	public m_c1:fgui.Controller;
	public m_RewardsCube:fgui.GLoader;
	public m_MysterialBtn:fgui.GButton;
	public m_RewardsDiamond:fgui.GLoader;
	public m_diamonNum:fgui.GTextField;
	public m_closeBtn:fgui.GButton;
	public static URL:string = "ui://kk7g5mmmjyv21no";

	public static createInstance():FGUI_MysteriousRewards {
		return <FGUI_MysteriousRewards>(fgui.UIPackage.createObject("GameMain", "MysteriousRewards"));
	}

	protected onConstruct():void {
		this.m_c1 = this.getControllerAt(0);
		this.m_RewardsCube = <fgui.GLoader>(this.getChildAt(1));
		this.m_MysterialBtn = <fgui.GButton>(this.getChildAt(3));
		this.m_RewardsDiamond = <fgui.GLoader>(this.getChildAt(4));
		this.m_diamonNum = <fgui.GTextField>(this.getChildAt(5));
		this.m_closeBtn = <fgui.GButton>(this.getChildAt(6));
	}
}