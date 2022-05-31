/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_TipsComp extends fgui.GComponent {

	public m_tips_txt:fgui.GTextField;
	public m_t1:fgui.Transition;
	public static URL:string = "ui://kk7g5mmmz2nw1ok";

	public static createInstance():FGUI_TipsComp {
		return <FGUI_TipsComp>(fgui.UIPackage.createObject("GameMain", "TipsComp"));
	}

	protected onConstruct():void {
		this.m_tips_txt = <fgui.GTextField>(this.getChildAt(0));
		this.m_t1 = this.getTransitionAt(0);
	}
}