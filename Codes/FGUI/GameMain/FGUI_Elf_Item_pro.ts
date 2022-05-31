/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_Elf_Item_pro extends fgui.GProgressBar {

	public m_bg:fgui.GLoader;
	public static URL:string = "ui://kk7g5mmmngfc18r";

	public static createInstance():FGUI_Elf_Item_pro {
		return <FGUI_Elf_Item_pro>(fgui.UIPackage.createObject("GameMain", "Elf_Item_pro"));
	}

	protected onConstruct():void {
		this.m_bg = <fgui.GLoader>(this.getChildAt(0));
	}
}