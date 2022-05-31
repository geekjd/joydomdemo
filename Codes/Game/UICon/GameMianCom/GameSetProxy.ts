
import FGUI_PGameSet from "src/FGUI/GameMain/FGUI_PGameSet";
import FGUI_toggleBtn from "src/FGUI/GameMain/FGUI_toggleBtn";
import { SetDataProxy } from "src/Game/Data/SetDataProxy";
import AudioProxy from "src/Game/Manager/AudioProxy";
import { EUIEvent } from "src/Game/MesEvent/EUIEvent";
import { ESounds } from "src/Game/ResE/ESounds";
import BattleRoomCon from "src/Ldz_GameCore/SceneScripts/BattleScene/BattleRoomCon";
import BaseSingleUICon from "src/_T/D2/FGUI/BaseSingleUICon";
import { EUILayer } from "src/_T/D2/FGUI/EUILayer";
import MesManager from "src/_T/Mes/MesManager";
import InstanceT from "src/_T/Ts/InstanceT";
import LayaUtils from "src/_T/Utils/LayaUtils";
import { PGameFitingPlanProxy } from "./PGameFitingPlanProxy";



@InstanceT.DecorateInstance()
//设置界面
export class GameSetProxy extends BaseSingleUICon<FGUI_PGameSet> {
    public static readonly instance: GameSetProxy;
    protected _UI = FGUI_PGameSet;
    protected _layer = EUILayer.Panel;
    public isOpenAudio: boolean;
    public isOpenMusic: boolean;
    public isOpenShake: boolean;
    NativeData: any;
    isLoadResSuccess: boolean = false;
    private constructor() {
        super();
    }
    m_Isbattle: boolean = false;
    Init() {
        MesManager.on(EUIEvent.ShowSetPanel, this, this.OpenShow);
    }
    OpenShow(Isbattle: boolean = false) {
        this.m_Isbattle = Isbattle;
        this.Show();
    }
    //显示回调
    protected _onShow(_ifNew: boolean = false, ...par) {

        console.log(' set');
        Laya.timer.scale = 0;
        LayaUtils.timeScale = 0;
        this.ui.m_audioToggleTxt.text = "音效";
        this.ui.m_musicToggleTxt.text = "音乐";
        this.ui.m_shakeToggleTxt.text = "振动";
        //TODO 初始化音效、音乐、振动布尔值
        this.ui.m_audioToggle.m_IsOpen.selectedIndex = SetDataProxy.instance.data.ifOpenSound ? 0 : 1;
        this.ui.m_musicToggle.m_IsOpen.selectedIndex = SetDataProxy.instance.data.ifOpenMusic ? 0 : 1;
        this.ui.m_shakeToggle.m_IsOpen.selectedIndex = SetDataProxy.instance.data.ifOpenVibration ? 0 : 1;
        //音效开关
        this.ui.m_audioToggle.onClick(this, this.onClickAudio);
        //音乐开关
        this.ui.m_musicToggle.onClick(this, this.onClickMusic);
        //振动开关
        this.ui.m_shakeToggle.onClick(this, this.onClickShake);

        this.ui.m_setCloseBtn.visible = true;
        this.ui.m_setCloseBtn.onClick(this, this.OnCloseBtnClick);
        /** */
        if (this.m_Isbattle) {
            this.ui.m_close.visible = true;
            this.ui.m_close.onClick(this, this.OnCloseGameBtnClick);
        } else {
            //退出      
            this.ui.m_close.visible = false;

        }
        console.log('进入set panel');
        // if (PlatformEnum.HuaWei == 'huawei') {
        //     console.log('进入set huawei not space', PlatformEnum.HuaWei);
        // } else {
        //     console.log('进入set huawei has space', PlatformEnum.HuaWei);
        // }


        /**Nativebanner广告 */
        // if (QddSDKHelper.TestSwitchAll) {
        //     console.log('TestSwitchAll*************** ');
        //     this.ShowadOrder();

        // }

    }

    public AdUIBtnFun() {
        console.log(' @@AdUIBtnFun ');
        //   this.OnClickHidePanel();
        if (this.isLoadResSuccess) {
            // QddSDKHelper.instance.reportNativeAdImageClick(this.data.adId);
        } else {
            console.log(' 原生广告没有拉取成功');

        }
    }

    OnClickHidePanel() {
        /** */
        console.log('OnClickHidePanel@@@');
        this.ui.m_nativeComp.visible = false;
        this.ui.m_nativeClosebut.visible = false;
    }

    public ShowadOrder() {
        // switch (QddSDKHelper.instance.getPackingPlatform().toString()) {
        //     case PlatformEnum.Wechat:
        //         QddSDKHelper.instance.showBannerAd();
        //         console.log('==>> Wechat ');

        //         break;

        //     case PlatformEnum.TouTiao:
        //         QddSDKHelper.instance.showBannerAd();
        //         console.log('==>> TouTiao  @@@@ ');
        //         break;
        //     case PlatformEnum.Qq:
        //         console.log('==>> qq ');
        //         QddSDKHelper.instance.showBannerAd();
        //         console.log(' qq平台，应显示积木广告');
        //         let optional2 = { left: 5, top: 230, size: 1, orientation: 'vertical' }
        //         QddSDKHelper.instance.showBlockAd(optional2);

        //         break;
        //     case PlatformEnum.Oppo:
        //         console.log('==>> oppo ');
        //         // if (PGameFitingPlanProxy.instance.ifShow) {
        //         //     // QddSDKHelper.instance.cancelNativeRefresh();
        //         //     // QddSDKHelper.instance.hideNativeImage();
        //         //     QddSDKHelper.instance.hideBannerAd();
        //         // }
        //         QddSDKHelper.instance.showBannerAd();

        //         break;
        //     case PlatformEnum.Vivo:
        //         if (PGameFitingPlanProxy.instance.ifShow) {
        //             // QddSDKHelper.instance.cancelNativeRefresh();
        //             // QddSDKHelper.instance.hideNativeImage();
        //             QddSDKHelper.instance.hideBannerAd();
        //         }
        //         QddSDKHelper.instance.showBannerAd();
        //         console.log('==>> vivo ');
        //         break;
        //     case PlatformEnum.HuaWei:
        //         if (PGameFitingPlanProxy.instance.ifShow) {
        //             // QddSDKHelper.instance.cancelNativeRefresh();
        //             // QddSDKHelper.instance.hideNativeImage();
        //             QddSDKHelper.instance.hideBannerAd();
        //         }
        //         QddSDKHelper.instance.showBannerAd();
        //         console.log('==>> XiaoMi ');
        //         break;

        //     default:

        //         break;

        // }
        // if (QddSDKHelper.instance.isNativeMI()) {
        //     let optionalXiaoMiNative: {
        //         parentNode: undefined
        //         resultCallback: (resultCode: boolean) => void,
        //         closeCallback: undefined
        //         probability: 80,
        //     }
        //     // optionalXiaoMiNative['resultCallback'] = (resultCode: boolean) => {
        //     //     /** 如果显示插屏不陈宫*/
        //     //     console.log('  插屏显示结果resultCode==', resultCode);
        //     //     if (!resultCode) {
        //     //         let optionalXiaoMiNative2: {
        //     //             parentNode: undefined
        //     //             resultCallback: (resultCode: boolean) => void,
        //     //             closeCallback: undefined
        //     //             probability: 80,
        //     //         }
        //     //         NativeSDK.getInstance().showNativeInsertAd(optionalXiaoMiNative2)
        //     //         QddSDKHelper.instance.showNativeInsertAd();
        //     //     }
        //     // };
        //     console.log("打开小米APP插屏");
        //     QddSDKHelper.instance.showIntertAd(optionalXiaoMiNative);
        // }

    }

    OnCloseGameBtnClick() {
        BattleRoomCon.Instance.GameOver();
        //MesManager.event(ESceneEvent.LodeMainScene);
        this.Hide();
    }
    OnCloseBtnClick() {
        console.log("设置界面关闭 x");
        AudioProxy.instance.playSound(ESounds.chest_landing, 1);
        this.Hide();
        if (!this.m_Isbattle) {
            MesManager.event(EUIEvent.ShowUIMain);
            MesManager.event(EUIEvent.ShowHome);
        }

        if (PGameFitingPlanProxy.instance.ifShow) {
            // if (QddSDKHelper.TestSwitchAll) {
            //     switch (QddSDKHelper.instance.getPackingPlatform().toString()) {
            //         case PlatformEnum.Wechat:
            //             QddSDKHelper.instance.showBannerAd();
            //             break;
            //         case PlatformEnum.TouTiao:
            //             QddSDKHelper.instance.showBannerAd();
            //             break;
            //         case PlatformEnum.Qq:

            //             QddSDKHelper.instance.showBannerAd();
            //             break;
            //         case PlatformEnum.Oppo:
            //             // let optional: NativeImageOption = {}
            //             // optional['nativeRefresh'] = true;
            //             // QddSDKHelper.instance.showNativeImageAd(optional);                   
            //             QddSDKHelper.instance.showBannerAd();
            //             break;
            //         case PlatformEnum.Vivo:
            //             // let optional2: NativeImageOption = {}
            //             // optional2['nativeRefresh'] = true;
            //             // QddSDKHelper.instance.showNativeImageAd(optional2);

            //             QddSDKHelper.instance.showBannerAd();
            //             break;
            //         case PlatformEnum.HuaWei:
            //             QddSDKHelper.instance.showBannerAd();
            //             break;
            //     }
            // }

        }
    }

    private onClickAudio() {
        SetDataProxy.instance.data.ifOpenSound = !SetDataProxy.instance.data.ifOpenSound;
        SetDataProxy.instance.data.ifOpenSound ? AudioProxy.instance.soundGoOn() : AudioProxy.instance.soundSuspend();
        this.ui.m_audioToggle.m_IsOpen.selectedIndex = SetDataProxy.instance.data.ifOpenSound ? 0 : 1;
        AudioProxy.instance.playSound(ESounds.click, 1);
        SetDataProxy.instance.Save();
    }

    private onClickMusic() {
        SetDataProxy.instance.data.ifOpenMusic = !SetDataProxy.instance.data.ifOpenMusic;
        this.ui.m_musicToggle.m_IsOpen.selectedIndex = SetDataProxy.instance.data.ifOpenMusic ? 0 : 1;
        AudioProxy.instance.playSound(ESounds.click, 1);
        SetDataProxy.instance.Save();
        SetDataProxy.instance.data.ifOpenMusic ? AudioProxy.instance.BGMGoOn() : AudioProxy.instance.stopMusic();
    }

    private onClickShake() {
        SetDataProxy.instance.data.ifOpenVibration = !SetDataProxy.instance.data.ifOpenVibration;
        this.ui.m_shakeToggle.m_IsOpen.selectedIndex = SetDataProxy.instance.data.ifOpenVibration ? 0 : 1;
        AudioProxy.instance.playSound(ESounds.click, 1);
        SetDataProxy.instance.Save();
    }

    OnTrueBtnClick(value: boolean, target: FGUI_toggleBtn) {
        value = false;
        target.m_falseBtn.visible = true;
        target.m_trueBtn.visible = false;
    }
    OnFalseBtnClick(value: boolean, target: FGUI_toggleBtn) {
        value = true;
        target.m_falseBtn.visible = false;
        target.m_trueBtn.visible = true;
    }
    _onHide() {

        Laya.timer.scale = 1;
        LayaUtils.timeScale = 1;
        console.log(' close set panel');

        // if (QddSDKHelper.TestSwitchAll) {
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
        //             /**这里会跟着界面一起关掉 */
        //             // QddSDKHelper.instance.cancelNativeRefresh();
        //             // Laya.timer.clear(this, this.loopShowNativeImg);
        //             console.log('set panel close banner@@');
        //             QddSDKHelper.instance.hideBannerAd();

        //             break;
        //         case PlatformEnum.Vivo:
        //             /**这里会跟着界面一起关掉 */
        //             // QddSDKHelper.instance.cancelNativeRefresh();
        //             // Laya.timer.clear(this, this.loopShowNativeImg);
        //             QddSDKHelper.instance.hideBannerAd();
        //             break;
        //         case PlatformEnum.HuaWei:
        //             QddSDKHelper.instance.hideBannerAd();
        //             break;
        //         default:
        //             break;
        //     }

        // }

    }

}