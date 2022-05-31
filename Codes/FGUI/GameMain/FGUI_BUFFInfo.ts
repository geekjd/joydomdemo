/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_BUFFInfo extends fgui.GComponent {

	public m_bg:fgui.GLoader;
	public m_nameLabel:fgui.GTextField;
	public m_infoLabel:fgui.GRichTextField;
	public m_icon:fgui.GLoader;
	public static URL:string = "ui://kk7g5mmmn1zd1g4";

	public static createInstance():FGUI_BUFFInfo {
		return <FGUI_BUFFInfo>(fgui.UIPackage.createObject("GameMain", "BUFFInfo"));
	}

	protected onConstruct():void {
		this.m_bg = <fgui.GLoader>(this.getChildAt(0));
		this.m_nameLabel = <fgui.GTextField>(this.getChildAt(3));
		this.m_infoLabel = <fgui.GRichTextField>(this.getChildAt(4));
		this.m_icon = <fgui.GLoader>(this.getChildAt(6));
	}
}