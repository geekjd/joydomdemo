/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_NoviceLoding extends fgui.GComponent {

	public m_Bg:fgui.GLoader;
	public static URL:string = "ui://kk7g5mmmspun1du";

	public static createInstance():FGUI_NoviceLoding {
		return <FGUI_NoviceLoding>(fgui.UIPackage.createObject("GameMain", "NoviceLoding"));
	}

	protected onConstruct():void {
		this.m_Bg = <fgui.GLoader>(this.getChildAt(0));
	}
}