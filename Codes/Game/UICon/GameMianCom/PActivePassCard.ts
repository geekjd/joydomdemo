import FGUI_PActivePassCard from "src/FGUI/GameMain/FGUI_PActivePassCard";
import { HeroAttributeInfoDataProxy } from "src/Game/ConfigProxy/HeroAttributeInfoDataProxy";
import { ResourcePropsDataProxy } from "src/Game/ConfigProxy/ResourcePropsDataProxy";
import { HunterGameDataMediator } from "src/Game/Data/HunterGameDataMediator";
import AudioProxy from "src/Game/Manager/AudioProxy";
import { EUIEvent } from "src/Game/MesEvent/EUIEvent";
import { ESounds } from "src/Game/ResE/ESounds";
import { _ResourcePropsConfig } from "src/Game/_config/_ResourcePropsConfig";
import { TaskType, TaskTypeTwo } from "src/Ldz_GameCore/GeneralScripts/GameDefine";
import BaseSingleUICon from "src/_T/D2/FGUI/BaseSingleUICon";
import { EUILayer } from "src/_T/D2/FGUI/EUILayer";
import MesManager from "src/_T/Mes/MesManager";
import ComResUrl from "src/_T/Res/ComResUrl";
import InstanceT from "src/_T/Ts/InstanceT";
import { PPassProxy } from "./PPassProxy";

@InstanceT.DecorateInstance()
//解锁物品的弹出界面
export class PActivePassCard extends BaseSingleUICon<FGUI_PActivePassCard> {
    public static readonly instance: PActivePassCard;
    protected _UI = FGUI_PActivePassCard;
    protected _layer = EUILayer.Popup;
    // NativeData: void | NativeAdDataImpl;
    // data: NativeAdDataImpl;
    isLoadResSuccess: boolean;
    private constructor() {
        super();
    }
    HeroID: number = 22006;
    Init() {
        MesManager.on(EUIEvent.ShowActivePassPanel, this, this.Show);
    }
    //显示回调
    protected _onShow(_ifNew: boolean, ...par) {
        this.ui.m_closeBtn.onClick(this, this.OnCloseBtnClick);
        let props: _ResourcePropsConfig.DataType = ResourcePropsDataProxy.instance.GetResourcePropsByMiscID(this.HeroID);
        let heroConfig = HeroAttributeInfoDataProxy.instance.GetHeroAttributeInfoByMiscID(props.HeroID);
        this.ui.m_rewardImg.m_icon.url = ComResUrl.MainFgui_url(heroConfig.HeroIcon);
        //播放视频按钮
        this.ui.m_playVideoBtn.onClick(this, this.OnPlayVideoBtnClick);
        // if (QddSDKHelper.TestSwitchAll) {
        //     this.ShowadOrder();
        //     console.log('TestSwitchAll*************** ');
        // }

        // if (QddSDKHelper.instance.isTtPlatform()) {
        //     this.ui.m_playVideoBtn.m_vivoUI.url = 'ui://kk7g5mmmgqnv1oj';
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
        //         //   QddSDKHelper.instance.showBannerAd();
        //         if (QddSDKHelper.TestSwitchAll) {
        //             console.log('TestSwitchAll*************** ');
        //             this.SetNativeData();
        //         }
        //         break;
        //     case PlatformEnum.Vivo:
        //         QddSDKHelper.instance.showBannerAd();
        //         break;
        //     case PlatformEnum.HuaWei:
        //         QddSDKHelper.instance.showBannerAd();
        //         break;
        //     case PlatformEnum.XiaoMi:
        //         QddSDKHelper.instance.showBannerAd();
        //         break;
        // }
        // if (QddSDKHelper.instance.isNativeMI()) {
        //     QddSDKHelper.instance.showBannerAd();
        // }

    }

    SetNativeData() {

        this.loopShowNativeImg();
        // Laya.timer.loop(15 * 1000, this, this.loopShowNativeImg);

    }
    public loopShowNativeImg() {
        // let optional: NativeImageOption = {}
        // optional['nativeRefresh'] = true;
        // QddSDKHelper.instance.showNativeImageAd(optional);

        // this.NativeData = QddSDKHelper.instance.getNativeAdImageData();
        // if (this.NativeData) {
        //     console.log('原生数据 not 为空@@@', this.NativeData);
        //     console.log('原生数据 not 为空@@@333', JSON.stringify(this.NativeData));
        //     this.ui.m_nativeComp.visible = true;
        //     this.ui.m_nativeClosebut.visible = true;

        //     this.data = this.NativeData as NativeAdDataImpl;
        //     this.isLoadResSuccess = true;

        //     // this.ui.m_nativeClosebut.onClick(this, this.OnClickHidePanel);
        //     // this.ui.m_nativeComp.onClick(this, this.AdUIBtnFun)
        //     this.ui.m_DetailsBtn.visible = true;
        //     this.ui.m_DetailsBtn.onClick(this, this.AdUIBtnFun);

        //     /**logo */
        //     // this.ui.m_nativeComp.icon= this.NativeData.logoUrl;
        //     /**UI */
        //     this.ui.m_nativeComp.icon = this.data.imgUrl;
        //     /**Des */
        //     this.ui.m_nativeComp.title = this.data.desc;

        // } else {
        //     console.log('原生数据为空@@@', this.NativeData);
        //     return;
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



    public OnCloseBtnClick() {
        AudioProxy.instance.playSound(ESounds.chest_landing, 1);
        this.Hide();
    }
    public OnPlayVideoBtnClick() {
        AudioProxy.instance.playSound(ESounds.click, 1);
        /**微信白包临时写法，有广告ID后直接删掉 */
        // if (QddSDKHelper.instance.isWxPlatform()) {
        //     /**看完 */
        //     this.ActivePASSCARD();
        //     return;
        // }

        // if (QddSDKHelper.TestSwitchAll) {
        //     /**观看广告解锁  进阶通行证 */
        //     let optional: { videoCallback?: (resultCode: boolean) => void, videOnStartCallback?: () => void, adLocation?: string } = {}
        //     optional['videoCallback'] = (resultCode: boolean) => {
        //         if (resultCode) {
        //             this.ActivePASSCARD();
        //         }
        //     }
        //     QddSDKHelper.instance.showVideoAd(optional);
        // } else {
        this.ActivePASSCARD();
        // }
    }

    private ActivePASSCARD() {
        HunterGameDataMediator.instance.data.havePass = true;
        //
        MesManager.event(EUIEvent.ShowRewardPanel, [this.HeroID, 1]);
        /*隐藏按钮本身*/
        PPassProxy.instance.updateGetPassPlusState();
        /**更新进阶通行证界面 数据  */
        PPassProxy.instance.updateList();
        this.Hide();
        MesManager.event(TaskType.Audio + TaskTypeTwo.Look);
    }

    public _onHide() {
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
        //             QddSDKHelper.instance.hideBannerAd();
        //             QddSDKHelper.instance.cancelNativeRefresh();
        //             Laya.timer.clear(this, this.loopShowNativeImg);
        //             QddSDKHelper.instance.hideNativeImage();
        //             break;
        //         case PlatformEnum.Vivo:
        //             QddSDKHelper.instance.hideBannerAd();
        //             QddSDKHelper.instance.cancelNativeRefresh();
        //             Laya.timer.clear(this, this.loopShowNativeImg);
        //             QddSDKHelper.instance.hideNativeImage();

        //             break;
        //         case PlatformEnum.HuaWei:
        //             QddSDKHelper.instance.hideBannerAd();
        //             break;

        //     }

        //     if (QddSDKHelper.instance.isNativeMI()) {
        //         QddSDKHelper.instance.hideBannerAd();
        //     }

        // }

    }
}