/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_PassBuyLvBtn extends fgui.GButton {

	public m_bg:fgui.GLoader;
	public static URL:string = "ui://kk7g5mmmzbsj1fa";

	public static createInstance():FGUI_PassBuyLvBtn {
		return <FGUI_PassBuyLvBtn>(fgui.UIPackage.createObject("GameMain", "PassBuyLvBtn"));
	}

	protected onConstruct():void {
		this.m_bg = <fgui.GLoader>(this.getChildAt(0));
	}
}