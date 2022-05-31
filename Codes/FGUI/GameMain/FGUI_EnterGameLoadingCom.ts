/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_EnterGameLoadingCom extends fgui.GComponent {

	public m_bg:fgui.GLoader;
	public m_bg1:fgui.GLoader;
	public m_bg2:fgui.GLoader;
	public m_bg3:fgui.GLoader;
	public m_t1:fgui.Transition;
	public static URL:string = "ui://kk7g5mmma1h11lv";

	public static createInstance():FGUI_EnterGameLoadingCom {
		return <FGUI_EnterGameLoadingCom>(fgui.UIPackage.createObject("GameMain", "EnterGameLoadingCom"));
	}

	protected onConstruct():void {
		this.m_bg = <fgui.GLoader>(this.getChildAt(0));
		this.m_bg1 = <fgui.GLoader>(this.getChildAt(1));
		this.m_bg2 = <fgui.GLoader>(this.getChildAt(2));
		this.m_bg3 = <fgui.GLoader>(this.getChildAt(3));
		this.m_t1 = this.getTransitionAt(0);
	}
}