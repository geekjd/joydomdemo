import FGUI_PGetCard from "src/FGUI/GameMain/FGUI_PGetCard";
import AudioProxy from "src/Game/Manager/AudioProxy";
import { EUIEvent } from "src/Game/MesEvent/EUIEvent";
import { ESounds } from "src/Game/ResE/ESounds";
import BaseSingleUICon from "src/_T/D2/FGUI/BaseSingleUICon";
import { EUILayer } from "src/_T/D2/FGUI/EUILayer";
import MesManager from "src/_T/Mes/MesManager";
import InstanceT from "src/_T/Ts/InstanceT";

@InstanceT.DecorateInstance()
export class PGetCardProxy extends BaseSingleUICon<FGUI_PGetCard> {
    public static readonly instance: PGetCardProxy;
    protected _UI = FGUI_PGetCard;
    protected _layer = EUILayer.Top;

    private constructor() {
        super();
    }

    Init() {
        MesManager.on(EUIEvent.ShowGetCardPanel, this, this.Show);
    }

    protected _onShow(_ifNew: boolean, ...par) {
        this.ui.m_getCardBoard.m_closeBtn.onClick(this, this.OnCloseBtnClick);
        this.ui.m_getCardBoard.m_playVedio.onClick(this, this.OnPlayVedioBtnClick);
        this.ui.m_getCardBoard.m_payGem.onClick(this, this.OnPayGemBtnClick);

        // if (QddSDKHelper.instance.isTtPlatform()) {
        //     this.ui.m_getCardBoard.m_playVedio.m_vivoUI.url = 'ui://kk7g5mmmgqnv1oj';
        // }
    }
    OnPayGemBtnClick() {
        AudioProxy.instance.playSound(ESounds.click, 1);
        console.log("支付宝石");
    }
    OnPlayVedioBtnClick() {
        AudioProxy.instance.playSound(ESounds.click, 1);
        console.log("播放视频");
    }
    OnCloseBtnClick() {
        AudioProxy.instance.playSound(ESounds.chest_landing, 1);
        this.Hide();
    }
}