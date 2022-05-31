import FGUI_BattleLoding from "src/FGUI/GameMain/FGUI_BattleLoding";
import { HunterGameDataMediator } from "src/Game/Data/HunterGameDataMediator";
import { EUIEvent } from "src/Game/MesEvent/EUIEvent";
import BaseSingleUICon from "src/_T/D2/FGUI/BaseSingleUICon";
import { EUILayer } from "src/_T/D2/FGUI/EUILayer";
import MesManager from "src/_T/Mes/MesManager";
import InstanceT from "src/_T/Ts/InstanceT";
import MathUtils from "src/_T/Utils/MathUtils";
import { TipsConfig } from "../TipsConfig";
import { PGameFitingPlanProxy } from "./PGameFitingPlanProxy";

@InstanceT.DecorateInstance()
//设置界面
export class BattleLodingProxy extends BaseSingleUICon<FGUI_BattleLoding> {
    public static readonly instance: BattleLodingProxy;
    protected _UI = FGUI_BattleLoding;
    protected _layer = EUILayer.Top;
    IsFirst: boolean = true;
    isLoadResSuccess: any;
    private constructor() {
        super();
    }
    Init() {
        MesManager.on(EUIEvent.ShowBattleLoding, this, this.gameLoading);
        MesManager.on(EUIEvent.CloseBattleLoding, this, this.Close);
    }
    //显示时的生命周期函数
    protected _OnShow() {
        // if (QddSDKHelper.TestSwitchAll) {
        //     console.log('TestSwitchAll*************** ');

        //     // this.ShowadOrder();

        // }
    }

    public ShowadOrder() {
        // switch (QddSDKHelper.instance.getPackingPlatform().toString()) {
        //     case PlatformEnum.Wechat:
        //         QddSDKHelper.instance.showBannerAd();
        //         break;
        //     case PlatformEnum.TouTiao:
        //         QddSDKHelper.instance.showBannerAd();
        //         break;
        //     case PlatformEnum.Qq:
        //         QddSDKHelper.instance.showBannerAd();
        //         break;
        //     case PlatformEnum.Oppo:
        //         QddSDKHelper.instance.showBannerAd();

        //         break;
        //     case PlatformEnum.Vivo:
        //         if (HunterGameDataMediator.instance.data.firstrtimes) {
        //             HunterGameDataMediator.instance.data.firstrtimes = false;
        //             Laya.timer.once(5000, this, () => {
        //                 if (this.ifShow) {
        //                     QddSDKHelper.instance.showBannerAd();
        //                 }
        //             });
        //         } else {
        //             QddSDKHelper.instance.showBannerAd();
        //         }
        //         break;
        //     case PlatformEnum.HuaWei:
        //         QddSDKHelper.instance.showBannerAd();
        //         break;
        //     case PlatformEnum.XiaoMi:
        //         QddSDKHelper.instance.showBannerAd();
        //         break;
        // }
    }
    //隐藏时的生命周期函数
    protected _OnHide() {
        // if (false) {
        //     console.log('TestSwitchAll*************** ');
        //     switch (QddSDKHelper.instance.getPackingPlatform().toString()) {
        //         case PlatformEnum.Wechat:
        //             QddSDKHelper.instance.hideBannerAd();
        //             break;
        //         case PlatformEnum.TouTiao:
        //             QddSDKHelper.instance.hideBannerAd();
        //             break;
        //         case PlatformEnum.Qq:
        //             QddSDKHelper.instance.hideBannerAd();
        //             break;
        //         case PlatformEnum.Oppo:
        //             QddSDKHelper.instance.hideBannerAd();
        //             break;
        //         case PlatformEnum.Vivo:
        //             QddSDKHelper.instance.hideBannerAd();
        //             break;
        //         case PlatformEnum.HuaWei:
        //             QddSDKHelper.instance.hideBannerAd();
        //             break;
        //         case PlatformEnum.XiaoMi:
        //             QddSDKHelper.instance.hideBannerAd();
        //             break;
        //     }
        // }
    }


    tipsFun() {
        let ran = MathUtils.randomRangeInt(1, 10);
        let temp = TipsConfig.tipsArr[ran];
        console.warn('tops==', temp);

        this.ui.m_TipsM.text = temp.TipsID;
        this.ui.m_TipsEnterGame.text = temp.Tips;
    }

    Isshow = false;
    private Open() {
        this.Show();
        //this.ui.m_progress.value = 0;
        this.Isshow = true;
        console.log(' has open loading');

    }
    public Close() {
        console.log(' has close  loading');
        this.Isshow = false;
        //延迟15帧，等待渲染
        Laya.timer.frameOnce(15, this, () => {
            //console.log("@@@@");
            this.Hide();

            /**开场动画 */
            PGameFitingPlanProxy.instance.ShowGameStar();
            Laya.timer.clearAll(this);
        });
        this.IsFirst = true;
    }
    /**
      * 关卡加载中事件
      * @param _number 加载进度 
      */
    public gameLoading(_i: number) {
        if (!this.Isshow) { this.Open(); }
        _i *= 100;
        if (this.IsFirst) {
            this.tipsFun();
            this.IsFirst = false;
        }
        //  console.log(' gameLoading ************');


        // this.ui.m_progress.value = _i;
        // if (this.ui.m_progress.value >= 100) return this.Close();
    }

}