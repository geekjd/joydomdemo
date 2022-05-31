/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_ConfirmBuy extends fgui.GComponent {

	public m_type:fgui.Controller;
	public m_money:fgui.Controller;
	public m_closeBtn:fgui.GButton;
	public m_goldBtn:fgui.GButton;
	public m_diamondBtn:fgui.GButton;
	public m_mask:fgui.GLoader;
	public m_heroIcon:fgui.GLoader;
	public m_heroName:fgui.GTextField;
	public m_heroTatter:fgui.GTextField;
	public m_tatter:fgui.GGroup;
	public m_boxName:fgui.GTextField;
	public m_boxIcon:fgui.GLoader;
	public m_resIcon:fgui.GLoader;
	public m_resTypeIcon:fgui.GLoader;
	public m_resCount:fgui.GTextField;
	public m_dbLabel:fgui.GTextField;
	public static URL:string = "ui://kk7g5mmme9gv1gh";

	public static createInstance():FGUI_ConfirmBuy {
		return <FGUI_ConfirmBuy>(fgui.UIPackage.createObject("GameMain", "ConfirmBuy"));
	}

	protected onConstruct():void {
		this.m_type = this.getControllerAt(0);
		this.m_money = this.getControllerAt(1);
		this.m_closeBtn = <fgui.GButton>(this.getChildAt(2));
		this.m_goldBtn = <fgui.GButton>(this.getChildAt(3));
		this.m_diamondBtn = <fgui.GButton>(this.getChildAt(4));
		this.m_mask = <fgui.GLoader>(this.getChildAt(5));
		this.m_heroIcon = <fgui.GLoader>(this.getChildAt(8));
		this.m_heroName = <fgui.GTextField>(this.getChildAt(10));
		this.m_heroTatter = <fgui.GTextField>(this.getChildAt(11));
		this.m_tatter = <fgui.GGroup>(this.getChildAt(12));
		this.m_boxName = <fgui.GTextField>(this.getChildAt(13));
		this.m_boxIcon = <fgui.GLoader>(this.getChildAt(14));
		this.m_resIcon = <fgui.GLoader>(this.getChildAt(15));
		this.m_resTypeIcon = <fgui.GLoader>(this.getChildAt(16));
		this.m_resCount = <fgui.GTextField>(this.getChildAt(17));
		this.m_dbLabel = <fgui.GTextField>(this.getChildAt(20));
	}
}