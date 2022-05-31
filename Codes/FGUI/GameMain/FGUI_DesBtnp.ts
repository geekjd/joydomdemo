/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_DesBtnp extends fgui.GButton {

	public m_iconbg:fgui.GLoader;
	public static URL:string = "ui://kk7g5mmmexxd18y";

	public static createInstance():FGUI_DesBtnp {
		return <FGUI_DesBtnp>(fgui.UIPackage.createObject("GameMain", "DesBtnp"));
	}

	protected onConstruct():void {
		this.m_iconbg = <fgui.GLoader>(this.getChildAt(0));
	}
}