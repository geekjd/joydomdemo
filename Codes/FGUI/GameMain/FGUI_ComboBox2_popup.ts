/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_ComboBox2_popup extends fgui.GComponent {

	public m_list:fgui.GList;
	public static URL:string = "ui://kk7g5mmmr3dt16x";

	public static createInstance():FGUI_ComboBox2_popup {
		return <FGUI_ComboBox2_popup>(fgui.UIPackage.createObject("GameMain", "ComboBox2_popup"));
	}

	protected onConstruct():void {
		this.m_list = <fgui.GList>(this.getChildAt(1));
	}
}