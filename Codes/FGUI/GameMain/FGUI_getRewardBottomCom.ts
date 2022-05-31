/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_getRewardBottomCom extends fgui.GComponent {

	public m_count:fgui.GTextField;
	public static URL:string = "ui://kk7g5mmmxo4z1c2";

	public static createInstance():FGUI_getRewardBottomCom {
		return <FGUI_getRewardBottomCom>(fgui.UIPackage.createObject("GameMain", "getRewardBottomCom"));
	}

	protected onConstruct():void {
		this.m_count = <fgui.GTextField>(this.getChildAt(2));
	}
}