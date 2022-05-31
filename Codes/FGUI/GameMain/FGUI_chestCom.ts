/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_chestCom extends fgui.GComponent {

	public m_chestImg:fgui.GLoader;
	public m_txt1:fgui.GTextField;
	public static URL:string = "ui://kk7g5mmmxo4z1c1";

	public static createInstance():FGUI_chestCom {
		return <FGUI_chestCom>(fgui.UIPackage.createObject("GameMain", "chestCom"));
	}

	protected onConstruct():void {
		this.m_chestImg = <fgui.GLoader>(this.getChildAt(1));
		this.m_txt1 = <fgui.GTextField>(this.getChildAt(2));
	}
}