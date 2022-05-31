/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_BlockComp extends fgui.GComponent {

	public m_blockNumDes:fgui.GTextField;
	public m_BlockHunterList:fgui.GList;
	public static URL:string = "ui://kk7g5mmmexxd190";

	public static createInstance():FGUI_BlockComp {
		return <FGUI_BlockComp>(fgui.UIPackage.createObject("GameMain", "BlockComp"));
	}

	protected onConstruct():void {
		this.m_blockNumDes = <fgui.GTextField>(this.getChildAt(1));
		this.m_BlockHunterList = <fgui.GList>(this.getChildAt(2));
	}
}