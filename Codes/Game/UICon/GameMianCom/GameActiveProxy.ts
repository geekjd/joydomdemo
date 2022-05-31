import FGUI_PGameActive from "src/FGUI/GameMain/FGUI_PGameActive";
import { EUIEvent } from "src/Game/MesEvent/EUIEvent";
import BaseSingleUICon from "src/_T/D2/FGUI/BaseSingleUICon";
import { EUILayer } from "src/_T/D2/FGUI/EUILayer";
import MesManager from "src/_T/Mes/MesManager";
import InstanceT from "src/_T/Ts/InstanceT";

@InstanceT.DecorateInstance()
//解锁物品的弹出界面
export class GameActiveProxy extends BaseSingleUICon<FGUI_PGameActive> {
    public static readonly instance: GameActiveProxy;
    protected _UI = FGUI_PGameActive;
    protected _layer = EUILayer.Panel;
    private constructor() {
        super();
    }
    Init() {
        MesManager.on(EUIEvent.Active, this, this.Show);
    }
    //显示回调
    protected _onShow(_ifNew: boolean, ...par) {
        console.log(' Active');

        // if (QddSDKHelper.instance.isNativeMI()) {
        //     QddSDKHelper.instance.showBannerAd();
        // }


    }




}