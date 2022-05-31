// import { create } from "domain";
import FGUI_ComTips from "src/FGUI/GameMain/FGUI_ComTips";
import { EUIEvent } from "src/Game/MesEvent/EUIEvent";
import BaseSingleUICon from "src/_T/D2/FGUI/BaseSingleUICon";
import { EUILayer } from "src/_T/D2/FGUI/EUILayer";
import MesManager from "src/_T/Mes/MesManager";
import InstanceT from "src/_T/Ts/InstanceT";

@InstanceT.DecorateInstance()
export class PGameComTips extends BaseSingleUICon<FGUI_ComTips> {
    public static readonly instance: PGameComTips;
    protected _UI = FGUI_ComTips;
    protected _layer = EUILayer.Popup;

    private id: number = 0;

    private constructor() {
        super();
    }
    Init() {
        MesManager.on(EUIEvent.COMTips, this, this.Show);
    }
    //显示回调
    protected _onShow(_ifNew: boolean, ...par) {

    }
    public playComTips(info: string) {
        this.Show();
        this.ui.m_TipsCom_txt.visible = true;
        /**赋值信息 */
        this.ui.m_TipsCom_txt.text = info;
        this.ui.m_t0.play(Laya.Handler.create(this, () => {
            /**隐藏和关闭 */
            this.ui.m_TipsCom_txt.visible = false;
            this.Hide();
        }), 1);

    }



}