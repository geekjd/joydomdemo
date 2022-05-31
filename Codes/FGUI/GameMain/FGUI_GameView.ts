/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_GameView extends fgui.GComponent {

	public m_img_bottomBg:fgui.GLoader;
	public m_btn_diamond:fgui.GButton;
	public m_btn_energy:fgui.GButton;
	public m_btn_gold:fgui.GButton;
	public m_btn_role:fgui.GButton;
	public m_btn_Advanced:fgui.GButton;
	public m_btn_world:fgui.GButton;
	public m_btn_base:fgui.GButton;
	public m_btn_shop:fgui.GButton;
	public static URL:string = "ui://kk7g5mmmjdq31rb";

	public static createInstance():FGUI_GameView {
		return <FGUI_GameView>(fgui.UIPackage.createObject("GameMain", "GameView"));
	}

	protected onConstruct():void {
		this.m_img_bottomBg = <fgui.GLoader>(this.getChildAt(1));
		this.m_btn_diamond = <fgui.GButton>(this.getChildAt(2));
		this.m_btn_energy = <fgui.GButton>(this.getChildAt(3));
		this.m_btn_gold = <fgui.GButton>(this.getChildAt(4));
		this.m_btn_role = <fgui.GButton>(this.getChildAt(5));
		this.m_btn_Advanced = <fgui.GButton>(this.getChildAt(6));
		this.m_btn_world = <fgui.GButton>(this.getChildAt(7));
		this.m_btn_base = <fgui.GButton>(this.getChildAt(8));
		this.m_btn_shop = <fgui.GButton>(this.getChildAt(9));
	}
}