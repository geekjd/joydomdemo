/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_deadMsgCom extends fgui.GComponent {

	public m_headImg:fgui.GLoader;
	public m_nameTxt:fgui.GTextField;
	public static URL:string = "ui://kk7g5mmmorqz1au";

	public static createInstance():FGUI_deadMsgCom {
		return <FGUI_deadMsgCom>(fgui.UIPackage.createObject("GameMain", "deadMsgCom"));
	}

	protected onConstruct():void {
		this.m_headImg = <fgui.GLoader>(this.getChildAt(1));
		this.m_nameTxt = <fgui.GTextField>(this.getChildAt(2));
	}
}