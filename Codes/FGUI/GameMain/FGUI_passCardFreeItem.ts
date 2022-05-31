/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_passCardFreeItem extends fgui.GComponent {

	public m_state:fgui.Controller;
	public m_type:fgui.Controller;
	public m_hunter:fgui.GLoader;
	public m_resource:fgui.GLoader;
	public m_restxt:fgui.GTextField;
	public m_boxIcon:fgui.GLoader;
	public m_tickshadow:fgui.GImage;
	public static URL:string = "ui://kk7g5mmmnigj1f2";

	public static createInstance():FGUI_passCardFreeItem {
		return <FGUI_passCardFreeItem>(fgui.UIPackage.createObject("GameMain", "passCardFreeItem"));
	}

	protected onConstruct():void {
		this.m_state = this.getControllerAt(0);
		this.m_type = this.getControllerAt(1);
		this.m_hunter = <fgui.GLoader>(this.getChildAt(5));
		this.m_resource = <fgui.GLoader>(this.getChildAt(6));
		this.m_restxt = <fgui.GTextField>(this.getChildAt(7));
		this.m_boxIcon = <fgui.GLoader>(this.getChildAt(9));
		this.m_tickshadow = <fgui.GImage>(this.getChildAt(12));
	}
}