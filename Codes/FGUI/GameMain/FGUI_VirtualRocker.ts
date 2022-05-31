/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_VirtualRocker extends fgui.GComponent {

	public m_VirtualRocker:fgui.GGraph;
	public m_ImageJoyBG:fgui.GLoader;
	public m_ImageJoy:fgui.GLoader;
	public static URL:string = "ui://kk7g5mmmb0xba0";

	public static createInstance():FGUI_VirtualRocker {
		return <FGUI_VirtualRocker>(fgui.UIPackage.createObject("GameMain", "VirtualRocker"));
	}

	protected onConstruct():void {
		this.m_VirtualRocker = <fgui.GGraph>(this.getChildAt(0));
		this.m_ImageJoyBG = <fgui.GLoader>(this.getChildAt(1));
		this.m_ImageJoy = <fgui.GLoader>(this.getChildAt(2));
	}
}