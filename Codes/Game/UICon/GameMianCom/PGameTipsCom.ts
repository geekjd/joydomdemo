import FGUI_TipsComp from "src/FGUI/GameMain/FGUI_TipsComp";
import { EUIEvent } from "src/Game/MesEvent/EUIEvent";
import BaseSingleUICon from "src/_T/D2/FGUI/BaseSingleUICon";
import { EUILayer } from "src/_T/D2/FGUI/EUILayer";
import MesManager from "src/_T/Mes/MesManager";
import InstanceT from "src/_T/Ts/InstanceT";


@InstanceT.DecorateInstance()
export class PGameTipsCom extends BaseSingleUICon<FGUI_TipsComp> {
    public static readonly instance: PGameTipsCom;
    protected _UI = FGUI_TipsComp;
    protected _layer = EUILayer.Top;

    private constructor() {
        super();
    }

    Init() {
        MesManager.on(EUIEvent.tipsCom, this, this.Show);
    }

    protected _onShow(_ifNew: boolean, ...par) {

    }
    canPlay: boolean = true;
    PLayTips(text: string) {
        if (!this.canPlay) {
            return;
        }
        this.Show();
        this.ui.m_tips_txt.text = text.toString();
        this.ui.m_tips_txt.visible = true;
        this.ui.m_t1.play(Laya.Handler.create(this, () => {
            /** */
            this.ui.m_tips_txt.visible = false;
            this.canPlay = true;
            this.Hide();
        }), 1);
    }
}