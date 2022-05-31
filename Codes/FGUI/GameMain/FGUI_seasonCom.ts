/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_seasonCom extends fgui.GComponent {

	public m_bg:fgui.GLoader;
	public m_txt1:fgui.GTextField;
	public m_txt2:fgui.GTextField;
	public m_rotateAni:fgui.Transition;
	public static URL:string = "ui://kk7g5mmmxo4z1bs";

	public static createInstance():FGUI_seasonCom {
		return <FGUI_seasonCom>(fgui.UIPackage.createObject("GameMain", "seasonCom"));
	}

	protected onConstruct():void {
		this.m_bg = <fgui.GLoader>(this.getChildAt(0));
		this.m_txt1 = <fgui.GTextField>(this.getChildAt(3));
		this.m_txt2 = <fgui.GTextField>(this.getChildAt(4));
		this.m_rotateAni = this.getTransitionAt(0);
	}
}