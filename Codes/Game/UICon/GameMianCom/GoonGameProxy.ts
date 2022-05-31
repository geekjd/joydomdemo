import FGUI_GoonGame from "src/FGUI/GameMain/FGUI_GoonGame";
import { EUIEvent } from "src/Game/MesEvent/EUIEvent";
import BaseSingleUICon from "src/_T/D2/FGUI/BaseSingleUICon";
import { EUILayer } from "src/_T/D2/FGUI/EUILayer";
import MesManager from "src/_T/Mes/MesManager";
import InstanceT from "src/_T/Ts/InstanceT";
import { PGameBoxProxy } from "./PGameBoxProxy";

/**继续游戏弹窗 */
@InstanceT.DecorateInstance()
export class GoonGameProxy extends BaseSingleUICon<FGUI_GoonGame>{
    public static readonly instance: PGameBoxProxy;
    protected _UI = FGUI_GoonGame;
    protected _layer = EUILayer.Popup;

    private constructor() {
        super();
    }
    Init() {
        MesManager.on(EUIEvent.ShowGoonGame, this, this.Show);
    }

    //显示回调
    protected _onShow(_ifNew: boolean, ...par) {
        var time: string = par[0];
        this.ui.m_leftTime.text = "剩余时间：" + time;

        this.ui.m_goBtn.onClick(this, this.onGoonGame);
    }
    private onGoonGame() {
        console.log("继续游戏");

        this.Hide();
    }

    private overGame() {
        console.log("结束游戏");

        this.Hide();
    }
}