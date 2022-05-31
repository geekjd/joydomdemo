/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_BeginButton from "./FGUI_BeginButton";

export default class FGUI_StartView extends fgui.GComponent {

	public m_img_bg:fgui.GImage;
	public m_lab_name:fgui.GTextField;
	public m_lab_layer:fgui.GTextField;
	public m_lab_layerNum:fgui.GTextField;
	public m_list_Mount:fgui.GList;
	public m_btn_left:fgui.GButton;
	public m_btn_right:fgui.GButton;
	public m_btn_box:fgui.GButton;
	public m_lab_layer_2:fgui.GTextField;
	public m_lab_layerNum_2:fgui.GTextField;
	public m_btn_pattern1:fgui.GButton;
	public m_btn_pattern2:fgui.GButton;
	public m_btn_begin:FGUI_BeginButton;
	public static URL:string = "ui://kk7g5mmmk2ej1rh";

	public static createInstance():FGUI_StartView {
		return <FGUI_StartView>(fgui.UIPackage.createObject("GameMain", "StartView"));
	}

	protected onConstruct():void {
		this.m_img_bg = <fgui.GImage>(this.getChildAt(0));
		this.m_lab_name = <fgui.GTextField>(this.getChildAt(2));
		this.m_lab_layer = <fgui.GTextField>(this.getChildAt(3));
		this.m_lab_layerNum = <fgui.GTextField>(this.getChildAt(4));
		this.m_list_Mount = <fgui.GList>(this.getChildAt(5));
		this.m_btn_left = <fgui.GButton>(this.getChildAt(6));
		this.m_btn_right = <fgui.GButton>(this.getChildAt(7));
		this.m_btn_box = <fgui.GButton>(this.getChildAt(8));
		this.m_lab_layer_2 = <fgui.GTextField>(this.getChildAt(9));
		this.m_lab_layerNum_2 = <fgui.GTextField>(this.getChildAt(10));
		this.m_btn_pattern1 = <fgui.GButton>(this.getChildAt(11));
		this.m_btn_pattern2 = <fgui.GButton>(this.getChildAt(12));
		this.m_btn_begin = <FGUI_BeginButton>(this.getChildAt(13));
	}
}