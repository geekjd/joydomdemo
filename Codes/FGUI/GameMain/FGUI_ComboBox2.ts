/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_ComboBox2 extends fgui.GComboBox {

	public m_title2:fgui.GTextField;
	public static URL:string = "ui://kk7g5mmmr3dt16y";

	public static createInstance():FGUI_ComboBox2 {
		return <FGUI_ComboBox2>(fgui.UIPackage.createObject("GameMain", "ComboBox2"));
	}

	protected onConstruct():void {
		this.m_title2 = <fgui.GTextField>(this.getChildAt(3));
	}
}