/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_Component17 extends fgui.GButton {

	public m_bg:fgui.GLoader;
	public static URL:string = "ui://kk7g5mmmpy6f197";

	public static createInstance():FGUI_Component17 {
		return <FGUI_Component17>(fgui.UIPackage.createObject("GameMain", "Component17"));
	}

	protected onConstruct():void {
		this.m_bg = <fgui.GLoader>(this.getChildAt(0));
	}
}