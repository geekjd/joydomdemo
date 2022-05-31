/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_ActiveItem extends fgui.GComponent {

	public m_bg:fgui.GLoader;
	public m_icon:fgui.GLoader;
	public m_levelNum:fgui.GTextField;
	public m_mode:fgui.GTextField;
	public m_arrow:fgui.GImage;
	public m_mask:fgui.GImage;
	public static URL:string = "ui://kk7g5mmmexxd18w";

	public static createInstance():FGUI_ActiveItem {
		return <FGUI_ActiveItem>(fgui.UIPackage.createObject("GameMain", "ActiveItem"));
	}

	protected onConstruct():void {
		this.m_bg = <fgui.GLoader>(this.getChildAt(1));
		this.m_icon = <fgui.GLoader>(this.getChildAt(2));
		this.m_levelNum = <fgui.GTextField>(this.getChildAt(4));
		this.m_mode = <fgui.GTextField>(this.getChildAt(6));
		this.m_arrow = <fgui.GImage>(this.getChildAt(7));
		this.m_mask = <fgui.GImage>(this.getChildAt(8));
	}
}