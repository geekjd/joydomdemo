/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_playerCom extends fgui.GComponent {

	public m_RoleList:fgui.GList;
	public static URL:string = "ui://kk7g5mmme7q21ao";

	public static createInstance():FGUI_playerCom {
		return <FGUI_playerCom>(fgui.UIPackage.createObject("GameMain", "playerCom"));
	}

	protected onConstruct():void {
		this.m_RoleList = <fgui.GList>(this.getChildAt(1));
	}
}