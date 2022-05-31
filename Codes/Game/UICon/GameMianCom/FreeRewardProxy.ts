import BaseSingleUICon from "src/_T/D2/FGUI/BaseSingleUICon";
import FGUI_FreeReward from "src/FGUI/GameMain/FGUI_FreeReward";
import InstanceT from "src/_T/Ts/InstanceT";
import { EUILayer } from "src/_T/D2/FGUI/EUILayer";
import MesManager from "src/_T/Mes/MesManager";
import { EUIEvent } from "src/Game/MesEvent/EUIEvent";
import { FreeRewardConfigProxy } from "src/Game/ConfigProxy/FreeRewardConfigProxy";
import FGUI_FreeRewardItem from "src/FGUI/GameMain/FGUI_FreeRewardItem";
import { _FreeRewardConfig } from "src/Game/_config/_FreeRewardConfig";
import ComResUrl from "src/_T/Res/ComResUrl";
import { ResourcePropsDataProxy } from "src/Game/ConfigProxy/ResourcePropsDataProxy";
import { _ResourcePropsConfig } from "src/Game/_config/_ResourcePropsConfig";
import { GameShopDataMediator } from "src/Game/Data/GameShopDataMediator";
import TimeUtils from "src/_T/Utils/TimeUtils";
import { ConstThing, TaskType, TaskTypeTwo } from "src/Ldz_GameCore/GeneralScripts/GameDefine";
import { ESounds } from "src/Game/ResE/ESounds";
import AudioProxy from "src/Game/Manager/AudioProxy";

/**免费奖励面板 */
@InstanceT.DecorateInstance()
export class FreeRewardProxy extends BaseSingleUICon<FGUI_FreeReward>{
    public static readonly instance: FreeRewardProxy;
    protected _UI = FGUI_FreeReward;
    protected _layer = EUILayer.Popup;
    private skills: string[];
    private unlockedSkills: number[];
    private constructor() {
        super();
    }
    Init() {
        MesManager.on(EUIEvent.FreeReward, this, this.Show);
    }
    //显示回调
    protected _onShow(_ifNew: boolean, ...par) {
        this.updateItem();

        this.ui.m_closeBtn.onClick(this, this.Close);
        this.ui.m_closeBtn2.onClick(this, this.Close);

        // if (QddSDKHelper.instance.isTtPlatform()) {
        //     this.ui.m_item1.m_lqBtn.m_vivoUI.url = 'ui://kk7g5mmmgqnv1oj';
        //     this.ui.m_item2.m_lqBtn.m_vivoUI.url = 'ui://kk7g5mmmgqnv1oj';
        //     this.ui.m_item3.m_lqBtn.m_vivoUI.url = 'ui://kk7g5mmmgqnv1oj';
        //     this.ui.m_item4.m_lqBtn.m_vivoUI.url = 'ui://kk7g5mmmgqnv1oj';
        // }

        /**banner */
        // if (QddSDKHelper.TestSwitchAll) {
        //     this.ShowadOrder();
        //     console.log('TestSwitchAll*************** ');
        // }

    }

    public ShowadOrder() {
        // switch (QddSDKHelper.instance.getPackingPlatform().toString()) {
        //     case PlatformEnum.Wechat:
        //         QddSDKHelper.instance.showBannerAd();

        //         /**  原生模板广告*/
        //         let optional = { left: 30, top: 262 }
        //         QddSDKHelper.instance.showCustomAd(optional);
        //         break;
        //     case PlatformEnum.TouTiao:
        //         QddSDKHelper.instance.showBannerAd();
        //         break;
        //     case PlatformEnum.Qq:
        //         let optional2 = { left: 16, top: 100, size: 1, orientation: 'vertical' }
        //         QddSDKHelper.instance.showBlockAd(optional2);
        //         QddSDKHelper.instance.showBannerAd();
        //         break;
        //     case PlatformEnum.Oppo:
        //         QddSDKHelper.instance.showBannerAd();
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
        //     // let optionalXiaoMiNative: {
        //     //     parentNode: undefined
        //     //     resultCallback: undefined
        //     //     closeCallback: undefined
        //     //     probability: 40,
        //     // }
        //     // QddSDKHelper.instance.showIntertAd(optionalXiaoMiNative);
        //     QddSDKHelper.instance.showBannerAd();
        // }

    }

    public Close() {
        if (this.ifShow)
            this.Hide();

    }

    private setData(index: number, item: FGUI_FreeRewardItem, fdata: _FreeRewardConfig.DataType) {
        var props: _ResourcePropsConfig.DataType = ResourcePropsDataProxy.instance.GetResourcePropsByMiscID(fdata.propID);
        if (index > GameShopDataMediator.instance.data.FreeRewardGetPoint) {
            item.m_state.selectedIndex = 0;
            if (index == GameShopDataMediator.instance.data.FreeRewardGetPoint + 1) {
                item.m_rewardsMask.visible = false;
            } else {
                item.m_rewardsMask.visible = true;
            }
            //else {
            //     item.m_state.selectedIndex = 1;
            // }

            if (fdata.propID == ConstThing.GOLD_ID) {//金币
                item.m_nameLabel.text = fdata.count + " 金币";
            } else if (fdata.propID == ConstThing.DIAMOND_ID) {//钻石
                item.m_nameLabel.text = fdata.count + " 钻石";
            } else if (fdata.propID == ConstThing.Daibi) {
                item.m_nameLabel.text = fdata.count + " 代币";
            } else {//宝箱
                item.m_nameLabel.text = props.HeroChineseName;
            }
            item.m_lqBtn.onClick(this, this.getFreeReward, [index]);
        } else {
            item.m_rewardsMask.visible = true;
            item.m_state.selectedIndex = 1;
        }
        item.m_icon.url = ComResUrl.MainFgui_url(props.HeroUiIcon);
        item.m_rewrdsNum.text = fdata.count + '';
    }

    private updateItem() {
        var dataList = FreeRewardConfigProxy.instance.dataList;
        this.setData(0, this.ui.m_item1, dataList[0]);
        this.setData(1, this.ui.m_item2, dataList[1]);
        this.setData(2, this.ui.m_item3, dataList[2]);
        this.setData(3, this.ui.m_item4, dataList[3]);
        //如果全领完了
        if (GameShopDataMediator.instance.data.FreeRewardGetPoint >= 3) {
            this.ui.m_allClear.selectedIndex = 1;
            //到前天早上00:00点的时间差
            var date: Date = new Date();
            //刷新时间，明天早上00:00
            var refreshTime: number = Date.parse(date.toDateString()) + 1000 * 60 * 60 * 24;
            var timeDiff: number = refreshTime - date.getTime();

            this.ui.m_newTime.text = TimeUtils.makeTimeLeftShortString(timeDiff / 1000, ":", true);
            GameShopDataMediator.instance.data.nextreFreshTime = refreshTime;
        } else {
            this.ui.m_allClear.selectedIndex = 0;

        }
    }

    private getFreeReward(index: number) {
        AudioProxy.instance.playSound(ESounds.click, 1);
        // if (QddSDKHelper.TestSwitchAll) {
        //     console.log('TestSwitchAll***********  ');
        //     /**微信白包临时写法，有广告ID后直接删掉 */
        //     if (QddSDKHelper.instance.isWxPlatform()) {
        //         if (index == GameShopDataMediator.instance.data.FreeRewardGetPoint + 1) {
        //             console.log("领取第", index, "个奖励")
        //             var data = FreeRewardConfigProxy.instance.dataList[index];
        //             MesManager.event(EUIEvent.ShowRewardPanel, [data.propID, data.count]);
        //             GameShopDataMediator.instance.data.FreeRewardGetPoint++;
        //             this.updateItem();
        //         } else {
        //             console.log("请先领取前面的奖励");
        //         }
        //         MesManager.event(TaskType.Audio + TaskTypeTwo.Look);
        //         return;
        //     }


        //     /**观看le视频 */
        //     let optional: { videoCallback?: (resultCode: boolean) => void, videOnStartCallback?: () => void, adLocation?: string } = {}
        //     optional['videoCallback'] = (resultCode: boolean) => {
        //         if (resultCode) {
        //             /**看完 */
        //             if (index == GameShopDataMediator.instance.data.FreeRewardGetPoint + 1) {
        //                 console.log("领取第", index, "个奖励")
        //                 var data = FreeRewardConfigProxy.instance.dataList[index];
        //                 MesManager.event(EUIEvent.ShowRewardPanel, [data.propID, data.count]);
        //                 GameShopDataMediator.instance.data.FreeRewardGetPoint++;
        //                 this.updateItem();
        //             } else {
        //                 console.log("请先领取前面的奖励");
        //             }
        //             MesManager.event(TaskType.Audio + TaskTypeTwo.Look);
        //         } else {
        //             /**关闭 */
        //         }
        //     }
        //     QddSDKHelper.instance.showVideoAd(optional);
        // }
    }
    _onHide() {
        AudioProxy.instance.playSound(ESounds.chest_landing, 1);

        // if (QddSDKHelper.TestSwitchAll) {
        //     console.log('TestSwitchAll*************** ');
        //     switch (QddSDKHelper.instance.getPackingPlatform().toString()) {
        //         case PlatformEnum.Wechat:
        //             QddSDKHelper.instance.hideBannerAd();
        //             /**  原生模板广告*/
        //             QddSDKHelper.instance.hideCustomAd();
        //             break;
        //         case PlatformEnum.TouTiao:
        //             QddSDKHelper.instance.hideBannerAd();
        //             break;
        //         case PlatformEnum.Qq:
        //             QddSDKHelper.instance.hideBannerAd();
        //             /** 隐藏积木qq */
        //             QddSDKHelper.instance.hideBlockAd();
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

        //     if (QddSDKHelper.instance.isNativeMI()) {
        //         QddSDKHelper.instance.hideBannerAd();
        //     }
        // }


    }
}