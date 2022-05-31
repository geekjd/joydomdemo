import FGUI_MysteriousRewards from "src/FGUI/GameMain/FGUI_MysteriousRewards";
import { HunterGameDataMediator } from "src/Game/Data/HunterGameDataMediator";
import AudioProxy from "src/Game/Manager/AudioProxy";
import { EUIEvent } from "src/Game/MesEvent/EUIEvent";
import { ESounds } from "src/Game/ResE/ESounds";
import { TaskType, TaskTypeTwo } from "src/Ldz_GameCore/GeneralScripts/GameDefine";
import BaseSingleUICon from "src/_T/D2/FGUI/BaseSingleUICon";
import { EUILayer } from "src/_T/D2/FGUI/EUILayer";
import MesManager from "src/_T/Mes/MesManager";
import InstanceT from "src/_T/Ts/InstanceT";
import PGameGameOverMediator from "./PGameGameOverMediator";

@InstanceT.DecorateInstance()
export class PGameMysterious extends BaseSingleUICon<FGUI_MysteriousRewards> {
    public static readonly instance: PGameMysterious;
    protected _UI = FGUI_MysteriousRewards;
    protected _layer = EUILayer.Top;

    private constructor() {
        super();
    }

    Init() {
        MesManager.on(EUIEvent.Mysterious, this, this.Show);
    }

    protected _onShow(_ifNew: boolean, ...par) {
        this.ui.m_c1.selectedIndex = 0;
        this.ui.m_MysterialBtn.onClick(this, this.getRewards22);


    }


    getRewards22() {
        AudioProxy.instance.playSound(ESounds.chest_landing, 1);
        this.Hide();
    }

    getRewards() {
        AudioProxy.instance.playSound(ESounds.chest_landing, 1);

        /**微信白包临时写法，有广告ID后直接删掉 */
        // if (QddSDKHelper.instance.isWxPlatform()) {
        //     MesManager.event(TaskType.Audio + TaskTypeTwo.Look);
        //     console.log('观看完成，弹出神秘奖励面板，领取后 可以再玩一次');
        //     HunterGameDataMediator.instance.data.Gemstone += 50;
        //     Laya.timer.scale = 1;
        //     PGameGameOverMediator.instance.PlayAgainGame();
        //     console.log('观看完成，弹出神秘奖励面板，领取后 可以再玩一次22222');
        //     Laya.timer.once(100, this, () => {
        //         console.log(' oppo 观看完成');

        //     });
        //     return;
        // }


        Laya.timer.scale = 0;
        // if (AdControlUtils.autoClickNativeInsertAd) {
        //     let optional: { videoCallback?: (resultCode: boolean) => void, videOnStartCallback?: () => void, adLocation?: string } = {}
        //     optional['videoCallback'] = (resultCode: boolean) => {
        //         console.log('videoCallback==', resultCode);
        //         if (resultCode) {
        //             /**观看完成，弹出神秘奖励面板，领取后 可以再玩一次 */
        //             MesManager.event(TaskType.Audio + TaskTypeTwo.Look);
        //             console.log('观看完成，弹出神秘奖励面板，领取后 可以再玩一次');
        //             HunterGameDataMediator.instance.data.Gemstone += 50;
        //             Laya.timer.scale = 1;
        //             PGameGameOverMediator.instance.PlayAgainGame();
        //             console.log('观看完成，弹出神秘奖励面板，领取后 可以再玩一次22222');
        //             Laya.timer.once(100, this, () => {
        //                 console.log(' oppo 观看完成');

        //             });
        //         } else {
        //             /**直接重新开始游戏 */
        //             Laya.timer.scale = 1;
        //             PGameGameOverMediator.instance.PlayAgainGame();
        //             console.log(' 直接重新开始游戏222');
        //             Laya.timer.once(100, this, () => {
        //                 console.log(' 直接重新开始游戏');

        //             });
        //         }
        //     }
        //     QddSDKHelper.instance.showVideoAd(optional);
        // }
        this.Hide();
    }
}