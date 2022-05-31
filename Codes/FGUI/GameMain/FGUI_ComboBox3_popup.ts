/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_ComboBox3_popup extends fgui.GComponent {

	public m_list:fgui.GList;
	public static URL:string = "ui://kk7g5mmmz2fu1n4";

	public static createInstance():FGUI_ComboBox3_popup {
		return <FGUI_ComboBox3_popup>(fgui.UIPackage.createObject("GameMain", "ComboBox3_popup"));
	}

	protected onConstruct():void {
		this.m_list = <fgui.GList>(this.getChildAt(1));
	}
}