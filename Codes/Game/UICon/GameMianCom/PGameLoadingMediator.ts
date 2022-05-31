import FGUI_PGameLoading from "src/FGUI/GameMain/FGUI_PGameLoading";
import { EUIEvent } from "src/Game/MesEvent/EUIEvent";
import BaseSingleUICon from "src/_T/D2/FGUI/BaseSingleUICon";
import { EUILayer } from "src/_T/D2/FGUI/EUILayer";
import MesManager from "src/_T/Mes/MesManager";
import InstanceT from "src/_T/Ts/InstanceT";

/**
 * 游戏加载中页面调度者
 */
@InstanceT.DecorateInstance()
export default class PGameLoadingMediator extends BaseSingleUICon<FGUI_PGameLoading>{
    public static readonly instance: PGameLoadingMediator;
    protected _UI = FGUI_PGameLoading;
    private constructor() { super(); }
    //层级
    protected _layer: EUILayer = EUILayer.Loading;//加载层
    Init() {
        MesManager.on(EUIEvent.OnLevelLoad, this, this.gameLoading);//游戏加载中
    }
    isopenAd: boolean = false;
    //显示时的生命周期函数
    protected _OnShow() {
        if (this.isopenAd) {
            // if (QddSDKHelper.TestSwitchAll) {
            //     // this.ShowadOrder();
            //     console.log('TestSwitchAll*************** ');
            // }
        }
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
        //         // QddSDKHelper.instance.showBannerAd();



        //         break;
        //     case PlatformEnum.Vivo:
        //         QddSDKHelper.instance.showBannerAd();
        //     default:
        //         break;
        // }
    }

    //隐藏时的生命周期函数
    protected _OnHide() {
        if (false) {
            // console.log('TestSwitchAll*************** ');
            // switch (QddSDKHelper.instance.getPackingPlatform().toString()) {
            //     case PlatformEnum.Wechat:
            //         QddSDKHelper.instance.hideBannerAd();
            //         break;
            //     case PlatformEnum.TouTiao:
            //         QddSDKHelper.instance.hideBannerAd();
            //         break;
            //     case PlatformEnum.Qq:
            //         QddSDKHelper.instance.hideBannerAd();
            //         break;
            //     case PlatformEnum.Oppo:
            //         QddSDKHelper.instance.hideBannerAd();
            //         break;
            //     case PlatformEnum.Vivo:
            //         QddSDKHelper.instance.hideBannerAd();
            //         break;
            //     default:

            //         break;
            // }
        }

    }
    Isshow = false;
    private Open() {
        this.Show();
        this.ui.m_progress.value = 0;
        this.ui.m_text.text = "0%";
        this.Isshow = true;
    }
    public Close() {
        this.Isshow = false;
        //延迟15帧，等待渲染
        Laya.timer.frameOnce(15, this, () => {
            //console.log("@@@@");
            this.Hide();
            Laya.timer.clearAll(this);
        });
    }
    /**
      * 关卡加载中事件
      * @param _number 加载进度 
      */
    public gameLoading(_i: number, isopenAd: boolean) {
        if (!this.Isshow) {
            this.isopenAd = isopenAd;
            this.Open();
        }
        _i *= 100;
        this.ui.m_progress.value = _i;
        this.ui.m_text.text = Math.round(_i) + "%";
        // if (this.ui.m_progress.value >= 100)
        //     return this.Close();
    }

}